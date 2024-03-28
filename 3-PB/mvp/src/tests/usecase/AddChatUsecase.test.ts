// npx jest src/tests/usecase/AddChatUsecase.test.ts --coverage
import "reflect-metadata";
import { AddChatUsecase } from '@/usecase/chat/addChatUsecase';
import { IChatRepository } from '@/lib/config/interfaces';

const mockChatRepository: jest.Mocked<IChatRepository> = {
    addChat: jest.fn(),
    addChatMessages: jest.fn(),
    deleteAllChat: jest.fn(),
    deleteChat: jest.fn(),
    getChatMessages: jest.fn(),
    getChats: jest.fn(),
};

const addChatUsecase = new AddChatUsecase(mockChatRepository);

describe('AddChatUsecase', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che AddChatUsecase chiami correttamente ChatRepository", async () => {
      
        const title = "Titolo della sessione";
  
        await addChatUsecase.execute({ title });
        expect(mockChatRepository.addChat).toHaveBeenCalledWith(title);
    });
});