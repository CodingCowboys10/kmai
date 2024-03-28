// npx jest src/tests/infrastructure/data-source/PostgresDataSource.test.ts
import "reflect-metadata";
import { Pool } from "pg";
import {
    ICustomMessages,
    IChatDataSource,
    Chat,
    MessageSource,
} from "@/lib/config/interfaces";
import { PostgresDataSource } from "@/infrastructure/data-source/PostgresDataSource";
import {Message} from "ai";
import { title } from "process";

const mockPg: jest.Mocked<Pool> = {
    query: jest.fn(),
}  as any;

const mockPostgresDataSource = new PostgresDataSource(mockPg);

describe('PostgresDataSource', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Verifica che il metodo addMessages di PostgresDataSource effettui le query corrette al database', async () => {
        
        const messages: ICustomMessages = {
            messageAI: {
                id: "sdfsfs",
                content: "Hello!",
                role: "assistant"
            },
            messageUser: {
                id: "asadada",
                content: "Hello!",
                role: "user"
            },
            sessionId: 1,
            source: {page: 1, doc: "example"}
        }
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

        await mockPostgresDataSource.addMessages({messages});

        const mockCalls = mockPg.query.mock.calls;
        expect(mockCalls.length).toBe(2);

        const [query1Args, values1Args] = mockCalls[0];
        expect(query1Args).toEqual(queryMessageUser);
        expect(values1Args).toEqual(valuesUser); 

        const [query2Args, values2Args] = mockCalls[1];
        expect(query2Args).toEqual(queryMessageAi);
        expect(values2Args).toEqual(valuesAi);
    });

    it('Verifica che il metodo addOne di PostgresDataSource effettui le query corrette al database', async () => {

        const title = "Title";
        const query = `INSERT INTO chat_threads (title) VALUES ($1) RETURNING id`;
        const values = [title];

        try {
            await mockPostgresDataSource.addOne({title});
        } catch (error) {
            // Ignora l'errore
        }

        const mockCalls = mockPg.query.mock.calls;
        expect(mockCalls.length).toBe(1);

        const [query1Args, values1Args] = mockCalls[0];
        expect(query1Args).toEqual(query);
        expect(values1Args).toEqual(values);
    });

    it('Verifica che il metodo deleteAll di PostgresDataSource effettui le query corrette al database', async () => {

        const deleteQuery = `DELETE FROM chat_threads `;

        await mockPostgresDataSource.deleteAll();

        const mockCalls = mockPg.query.mock.calls;
        expect(mockCalls.length).toBe(1);

        const [query1Args] = mockCalls[0];
        expect(query1Args).toEqual(deleteQuery);
    });

    it('Verifica che il metodo deleteOne di PostgresDataSource effettui le query corrette al database', async () => {

        const id = 1;
        const deleteQuery = `DELETE FROM chat_threads WHERE id = ${id}`;

        await mockPostgresDataSource.deleteOne({id});

        const mockCalls = mockPg.query.mock.calls;
        expect(mockCalls.length).toBe(1);

        const [query1Args] = mockCalls[0];
        expect(query1Args).toEqual(deleteQuery);
    });

    it('Verifica che il metodo getAll di PostgresDataSource effettui le query corrette al database', async () => {

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

        try {
            await mockPostgresDataSource.getAll();
        } catch (error) {
            // Ignora l'errore
        }

        const mockCalls = mockPg.query.mock.calls;
        expect(mockCalls.length).toBe(1);

        const [query1Args] = mockCalls[0];
        expect(query1Args).toEqual(query);
    });

    it('Verifica che il metodo getAllMessages di PostgresDataSource effettui le query corrette al database', async () => {

        const id = 1;
        const countQuery = `SELECT id,content, role , created_at , sourcepage , sourcelink FROM messages WHERE thread_id = ${id} ORDER BY created_at`;

        try {
            await mockPostgresDataSource.getAllMessages({id});
        } catch (error) {
            // Ignora l'errore
        }

        const mockCalls = mockPg.query.mock.calls;
        expect(mockCalls.length).toBe(1);

        const [query1Args] = mockCalls[0];
        expect(query1Args).toEqual(countQuery);
    });

});