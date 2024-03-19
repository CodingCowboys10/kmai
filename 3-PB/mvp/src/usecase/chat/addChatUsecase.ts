import type {
  IChatRepository,
  IUsecase,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";

@injectable()
class AddChatUsecase implements IUsecase<{ title: string }, void> {
  private readonly _chatRepository: IChatRepository;

  constructor(@inject("chatRepository") chatRepository: IChatRepository) {
    this._chatRepository = chatRepository;
  }

  async execute({ title }: { title: string }) {
    return await this._chatRepository.addChat(title);
  }
}

export { AddChatUsecase };
