import type {
  IChatRepository,
  IUsecase,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";

@injectable()
class DeleteAllChatUsecase implements IUsecase<void, void> {
  private readonly _chatRepository: IChatRepository;

  constructor(@inject("chatRepository") chatRepository: IChatRepository) {
    this._chatRepository = chatRepository;
  }

  async execute() {
    return await this._chatRepository.deleteAllChat();
  }
}

export { DeleteAllChatUsecase };
