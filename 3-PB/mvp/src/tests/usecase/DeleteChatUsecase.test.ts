// npx jest src/tests/usecase/DeleteChatUsecase.test.ts --coverage
import "reflect-metadata";
import { DeleteChatUsecase } from '@/usecase/chat/deleteChatUsecase';
import { IChatRepository } from '@/lib/config/interfaces';

const mockChatRepository: jest.Mocked<IChatRepository> = {
    addChat: jest.fn(),
    addChatMessages: jest.fn(),
    deleteAllChat: jest.fn(),
    deleteChat: jest.fn(),
    getChatMessages: jest.fn(),
    getChats: jest.fn(),
};

const deleteChatUsecase = new DeleteChatUsecase(mockChatRepository);

describe('DeleteChatUsecase', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che DeleteChatUsecase chiami correttamente ChatRepository", async () => {

        const id = 1;
  
        await deleteChatUsecase.execute({id});
        expect(mockChatRepository.deleteChat).toHaveBeenCalledWith(id);
    });
});