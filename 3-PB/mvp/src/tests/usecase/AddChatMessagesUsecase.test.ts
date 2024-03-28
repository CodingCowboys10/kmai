// npx jest src/tests/usecase/AddChatMessagesUsecase.test.ts --coverage
import "reflect-metadata";
import { AddChatMessagesUsecase } from '@/usecase/chat/addChatMessagesUsecase';
import { IChatRepository, ICustomMessages } from '@/lib/config/interfaces';

const mockChatRepository: jest.Mocked<IChatRepository> = {
    addChat: jest.fn(),
    addChatMessages: jest.fn(),
    deleteAllChat: jest.fn(),
    deleteChat: jest.fn(),
    getChatMessages: jest.fn(),
    getChats: jest.fn(),
};

const addChatMessagesUsecase = new AddChatMessagesUsecase(mockChatRepository);

describe('AddChatMessagesUsecase', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che AddChatMessagesUsecase chiami correttamente ChatRepository", async () => {
      
        const messages: ICustomMessages = {
            messageAI: {
                id: "id" ,
                content: "Contenuto" ,
                role: "assistant"
            },
            messageUser: {
                id: "id" ,
                content: "Contenuto" ,
                role: "user"
            },
            sessionId: 12345,
            source: {
              source: ""
            },
          };
  
        await addChatMessagesUsecase.execute({ messages });
        expect(mockChatRepository.addChatMessages).toHaveBeenCalledWith(messages);
    });
});