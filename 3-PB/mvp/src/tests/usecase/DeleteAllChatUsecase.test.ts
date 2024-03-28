// npx jest src/tests/usecase/DeleteAllChatUsecase.test.ts --coverage
import "reflect-metadata";
import { DeleteAllChatUsecase } from '@/usecase/chat/deleteAllChatUsecase';
import { IChatRepository } from '@/lib/config/interfaces';

const mockChatRepository: jest.Mocked<IChatRepository> = {
    addChat: jest.fn(),
    addChatMessages: jest.fn(),
    deleteAllChat: jest.fn(),
    deleteChat: jest.fn(),
    getChatMessages: jest.fn(),
    getChats: jest.fn(),
};

const deleteAllChatUsecase = new DeleteAllChatUsecase(mockChatRepository);

describe('DeleteAllChatUsecase', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che DeleteAllChatUsecase chiami correttamente ChatRepository", async () => {
  
        await deleteAllChatUsecase.execute();
        expect(mockChatRepository.deleteAllChat).toHaveBeenCalled();
    });
});