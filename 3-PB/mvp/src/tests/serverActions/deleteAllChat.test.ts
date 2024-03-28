// npx jest src/tests/serverActions/deleteAllChat.test.ts --coverage
import "reflect-metadata";
import { deleteAllChat } from '@/serverActions/chats/deleteAllChat';
import { DeleteAllChatUsecase } from '@/usecase/chat/deleteAllChatUsecase';
import { DeleteAllChatController } from '@/controllers/chat/deleteAllChatController';
import { IChatRepository, ICustomMessages } from '@/lib/config/interfaces';

const mockChatRepository: jest.Mocked<IChatRepository> = {
    addChat: jest.fn(),
    addChatMessages: jest.fn(),
    deleteAllChat: jest.fn(),
    deleteChat: jest.fn(),
    getChatMessages: jest.fn(),
    getChats: jest.fn(),
};

const mockUsecase: DeleteAllChatUsecase = new DeleteAllChatUsecase(mockChatRepository);
mockUsecase.execute = jest.fn();

const mockController: DeleteAllChatController = new DeleteAllChatController(mockUsecase);


describe('deleteAllChat server action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica che deleteAllChat lanci un errore con esito negativo', async () => {
    
    const mockResponse = {
      ok: false,
      json: async () => ({ error: "Internal Server Error" }),
    };

    mockController.handle = jest.fn().mockResolvedValueOnce(mockResponse as Response);

    try {
      await deleteAllChat();
    } catch (error: any) {
        expect(error.message).toBe("Internal Server Error");
    }
  });
});