// npx jest src/tests/serverActions/addChat.test.ts --coverage
import "reflect-metadata";
import { addChat } from '@/serverActions/chats/addChat';
import { AddChatUsecase } from '@/usecase/chat/addChatUsecase';
import { AddChatController } from '@/controllers/chat/addChatController';
import { IChatRepository } from '@/lib/config/interfaces';

const mockChatRepository: jest.Mocked<IChatRepository> = {
    addChat: jest.fn(),
    addChatMessages: jest.fn(),
    deleteAllChat: jest.fn(),
    deleteChat: jest.fn(),
    getChatMessages: jest.fn(),
    getChats: jest.fn(),
};

const mockUsecase: AddChatUsecase = new AddChatUsecase(mockChatRepository);
mockUsecase.execute = jest.fn();

const mockController: AddChatController = new AddChatController(mockUsecase);


describe('addChat server action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica che addChat lanci un errore con esito negativo', async () => {
    
    const mockResponse = {
      ok: false,
      json: async () => ({ error: "Internal Server Error" }),
    };

    mockController.handle = jest.fn().mockResolvedValueOnce(mockResponse as Response);

    const title = "Titolo";

    try {
      await addChat(title);
    } catch (error: any) {
        expect(error.message).toBe("Internal Server Error");
    }
  });

});