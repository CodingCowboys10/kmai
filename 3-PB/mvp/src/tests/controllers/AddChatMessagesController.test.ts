// npx jest src/tests/controllers/AddChatMessagesController.test.ts --coverage
import "reflect-metadata";
import { AddChatMessagesUsecase } from '@/usecase/chat/addChatMessagesUsecase';
import { AddChatMessagesController } from '@/controllers/chat/addChatMessagesController';
import { IChatRepository, ICustomMessages } from '@/lib/config/interfaces';

const mockChatRepository: jest.Mocked<IChatRepository> = {
    addChat: jest.fn(),
    addChatMessages: jest.fn(),
    deleteAllChat: jest.fn(),
    deleteChat: jest.fn(),
    getChatMessages: jest.fn(),
    getChats: jest.fn(),
};

const mockAddChatMessagesUsecase: AddChatMessagesUsecase = new AddChatMessagesUsecase(mockChatRepository);
mockAddChatMessagesUsecase.execute = jest.fn();

const addChatMessagesController: AddChatMessagesController = new AddChatMessagesController(mockAddChatMessagesUsecase);

describe('AddChatMessagesController', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che AddChatMessagesController chiami correttamente AddChatMessagesUsecase", async () => {
      
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
  
        await addChatMessagesController.handle(messages);
        expect(mockAddChatMessagesUsecase.execute).toHaveBeenCalledWith({messages});
    });

    it("Verifica che AddChatMessagesController restituisca status 200 con esito positivo", async () => {
      
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

        const response = await addChatMessagesController.handle(messages);

        expect(response.status).toBe(200);
    });

    it("Verifica che AddChatController restituisca status 500 con esito negativo", async () => {

        const mockError = new Error('Internal Server Error');
        const mockAddChatMessagesUsecase500: AddChatMessagesUsecase = new AddChatMessagesUsecase(mockChatRepository);
        mockAddChatMessagesUsecase500.execute = jest.fn().mockRejectedValueOnce(mockError);
      
        const addChatMessagesController500: AddChatMessagesController = new AddChatMessagesController(mockAddChatMessagesUsecase500);

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
        
        

        const response = await addChatMessagesController500.handle(messages);

        expect(response.status).toBe(500);

    });
});