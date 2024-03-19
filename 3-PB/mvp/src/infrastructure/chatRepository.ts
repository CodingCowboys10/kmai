import type {
  Chat,
  IChatDataSource,
  IChatRepository,
  ICustomMessages,
  MessageSource,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";
import { Message } from "ai";

@injectable()
class ChatRepository implements IChatRepository {
  private _chatDataSource: IChatDataSource;

  constructor(@inject("chatDataSource") chatDataSource: IChatDataSource) {
    this._chatDataSource = chatDataSource;
  }

  async addChat(title: string): Promise<number> {
    return await this._chatDataSource.addOne({
      title: title,
    });
  }

  async addChatMessages(messages: ICustomMessages): Promise<void> {
    await this._chatDataSource.addMessages({ messages: messages });
  }

  async deleteAllChat(): Promise<void> {
    await this._chatDataSource.deleteAll();
  }

  async deleteChat(id: number): Promise<void> {
    await this._chatDataSource.deleteOne({ id: id });
  }

  async getChatMessages(
    id: string,
  ): Promise<{ allMessages: Message[]; source: MessageSource }> {
    return await this._chatDataSource.getAllMessages({ id: id });
  }

  async getChats(): Promise<Chat[]> {
    return await this._chatDataSource.getAll();
  }
}

export { ChatRepository };
