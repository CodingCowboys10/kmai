import type {
    IChatRepository,
    IUsecase,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";
import {Chat} from "@/lib/config/interfaces";

@injectable()
class GetChatsUsecase implements IUsecase<void, Promise<Chat[]>> {
    private readonly _chatRepository: IChatRepository;

    constructor(@inject("chatRepository") chatRepository: IChatRepository) {
        this._chatRepository = chatRepository;
    }

    async execute() {
        return await this._chatRepository.getChats();
    }
}

export { GetChatsUsecase };
