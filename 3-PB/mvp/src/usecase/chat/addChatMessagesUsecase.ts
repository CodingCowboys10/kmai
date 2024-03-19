import type {
  IChatRepository,
  ICustomMessages,
  IUsecase,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";

@injectable()
class AddChatMessagesUsecase
  implements IUsecase<{ messages: ICustomMessages }, void>
{
  private readonly _chatRepository: IChatRepository;

  constructor(@inject("chatRepository") chatRepository: IChatRepository) {
    this._chatRepository = chatRepository;
  }

  async execute({ messages }: { messages: ICustomMessages }) {
    return await this._chatRepository.addChatMessages(messages);
  }
}

export { AddChatMessagesUsecase };
