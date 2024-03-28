// npx jest src/tests/serverActions/deleteChat.test.ts --coverage
import "reflect-metadata";
import { deleteChat } from '@/serverActions/chats/deleteChat';
import { DeleteChatUsecase } from '@/usecase/chat/deleteChatUsecase';
import { DeleteChatController } from '@/controllers/chat/deleteChatController';
import { IChatRepository, ICustomMessages } from '@/lib/config/interfaces';

const mockChatRepository: jest.Mocked<IChatRepository> = {
    addChat: jest.fn(),
    addChatMessages: jest.fn(),
    deleteAllChat: jest.fn(),
    deleteChat: jest.fn(),
    getChatMessages: jest.fn(),
    getChats: jest.fn(),
};

const mockUsecase: DeleteChatUsecase = new DeleteChatUsecase(mockChatRepository);
mockUsecase.execute = jest.fn();

const mockController: DeleteChatController = new DeleteChatController(mockUsecase);


describe('deleteChat server action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica che deleteChat lanci un errore con esito negativo', async () => {
    
    const mockResponse = {
      ok: false,
      json: async () => ({ error: "Internal Server Error" }),
    };

    mockController.handle = jest.fn().mockResolvedValueOnce(mockResponse as Response);

    const id = 1;

    try {
      await deleteChat(id);
    } catch (error: any) {
        expect(error.message).toBe("Internal Server Error");
    }
  });
});