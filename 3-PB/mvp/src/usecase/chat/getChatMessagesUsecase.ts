import type {
    IChatRepository,
    IUsecase,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";
import {MessageSource} from "@/lib/config/interfaces";
import {Message} from "ai";

@injectable()
class GetChatMessagesUsecase implements IUsecase<number, Promise<{ allMessages: Message[]; source: MessageSource }>> {
    private readonly _chatRepository: IChatRepository;

    constructor(@inject("chatRepository") chatRepository: IChatRepository) {
        this._chatRepository = chatRepository;
    }

    async execute(id: number,) {
        return await this._chatRepository.getChatMessages(id);
    }
}

export { GetChatMessagesUsecase };
