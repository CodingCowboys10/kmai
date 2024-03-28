// npx jest src/tests/serverActions/addChatMessages.test.ts --coverage
import "reflect-metadata";
import { addChatMessages } from '@/serverActions/chats/addChatMessages';
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

const mockUsecase: AddChatMessagesUsecase = new AddChatMessagesUsecase(mockChatRepository);
mockUsecase.execute = jest.fn();

const mockController: AddChatMessagesController = new AddChatMessagesController(mockUsecase);


describe('addChatMessages server action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica che addChatMessages lanci un errore con esito negativo', async () => {
    
    const mockResponse = {
      ok: false,
      json: async () => ({ error: "Internal Server Error" }),
    };

    mockController.handle = jest.fn().mockResolvedValueOnce(mockResponse as Response);

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

    try {
      await addChatMessages(messages);
    } catch (error: any) {
        expect(error.message).toBe("Internal Server Error");
    }
  });
});