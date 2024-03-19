import { Pool } from "pg";

import { injectable, inject } from "tsyringe";

import { Message } from "ai";

import {
  Chat,
  IChatDataSource,
  ICustomMessages,
  MessageSource,
  // @ts-ignore
} from "@/lib/config/interfaces";

@injectable()
class PostgresDataSource implements IChatDataSource {
  private readonly _dB: Pool;

  constructor(@inject("postgrespool") dB: Pool) {
    this._dB = dB;
  }
  async addMessages({
    messages,
  }: {
    messages: ICustomMessages;
  }): Promise<void> {
    const messageAI = messages.messageAI;
    const messageUser = messages.messageUser;
    const sessionId = messages.sessionId;
    const sourcePage = messages.source[0]?.metadata.page;
    const sourceDoc = messages.source[0]?.metadata.name;

    const queryMessageUser = `
      INSERT INTO messages (id, thread_id, content, role , sourcePage , sourceLink)
      VALUES 
      ($1, $2, $3, $4 , $5, $6)`;
    const queryMessageAi = `
      INSERT INTO messages (id, thread_id, content, role , sourcePage , sourceLink)
      VALUES 
      ($1, $2, $3, $4 , $5, $6)`;

    const valuesUser = [
      messageUser.id,
      sessionId,
      messageUser.content,
      messageUser.role,
      null,
      null,
    ];
    const valuesAi = [
      messageAI.id,
      sessionId,
      messageAI.content,
      messageAI.role,
      sourcePage,
      sourceDoc,
    ];

    await this._dB.query(queryMessageUser, valuesUser);
    await this._dB.query(queryMessageAi, valuesAi);
  }

  async addOne({ title }: { title: string }): Promise<number> {
    //"use server";
    const query = `INSERT INTO chat_threads (title) VALUES ($1) RETURNING id`;
    const values = [title];
    const res = await this._dB.query(query, values);
    return res.rows[0].id;
  }

  async deleteAll(): Promise<void> {
    const deleteQuery = `DELETE FROM chat_threads `;
    await this._dB.query(deleteQuery);
  }

  async deleteOne({ id }: { id: number }): Promise<void> {
    const deleteQuery = `DELETE FROM chat_threads WHERE id = ${id}`;
    await this._dB.query(deleteQuery);
  }

  async getAll(): Promise<Chat[]> {
    const query = `
                  SELECT * 
                  FROM chat_threads ct
                  LEFT JOIN (
                      SELECT thread_id, MAX(created_at) AS max_created_at
                      FROM messages
                      GROUP BY thread_id
                  ) AS max_messages ON ct.id = max_messages.thread_id
                  ORDER BY COALESCE(max_messages.max_created_at, ct.created_at) DESC;
                  `;

    const { rows } = await this._dB.query(query);

    return rows.map((row: any) => ({
      id: row.id,
      title: row.title,
    }));
  }

  async getAllMessages({
    id,
  }: {
    id: number;
  }): Promise<{ allMessages: Message[]; source: MessageSource }> {
    const countQuery = `SELECT id,content, role , created_at , sourcepage , sourcelink FROM messages WHERE thread_id = ${id} ORDER BY created_at`;

    const result = await this._dB.query(countQuery);

    const allMessages: Message[] = result.rows.map((row: any) => ({
      id: row.id,
      content: row.content,
      role: row.role,
      createdAt: new Date(new Date(row.created_at).getTime() + 3600 * 1000),
    }));

    const source: MessageSource = result.rows.reduce((acc, row) => {
      acc[row.id] = [
        {
          metadata: {
            name: row.sourcelink,
            page: row.sourcepage,
          },
        },
      ];
      return acc;
    }, {});

    return { allMessages, source };
  }
}

export { PostgresDataSource };
