import type {
    IChatRepository,
    IUsecase,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";

@injectable()
class DeleteChatUsecase implements IUsecase<{ id: number }, void> {
    private readonly _chatRepository: IChatRepository;

    constructor(@inject("chatRepository") chatRepository: IChatRepository) {
        this._chatRepository = chatRepository;
    }

    async execute({id}:{id: number}) {
        return await this._chatRepository.deleteChat(id);
    }
}

export { DeleteChatUsecase };
