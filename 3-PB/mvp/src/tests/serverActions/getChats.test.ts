// npx jest src/tests/serverActions/getChats.test.ts --coverage
import "reflect-metadata";
import { getChats } from '@/serverActions/chats/getChats';
import { GetChatsUsecase } from '@/usecase/chat/getChatsUsecase';
import { GetChatsController } from '@/controllers/chat/getChatsController';
import { IChatRepository } from '@/lib/config/interfaces';

const mockChatRepository: jest.Mocked<IChatRepository> = {
    addChat: jest.fn(),
    addChatMessages: jest.fn(),
    deleteAllChat: jest.fn(),
    deleteChat: jest.fn(),
    getChatMessages: jest.fn(),
    getChats: jest.fn(),
};

const mockUsecase: GetChatsUsecase = new GetChatsUsecase(mockChatRepository);
mockUsecase.execute = jest.fn();

const mockController: GetChatsController = new GetChatsController(mockUsecase);


describe('getChats server action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica che getChats lanci un errore con esito negativo', async () => {
    
    const mockResponse = {
      ok: false,
      json: async () => ({ error: "Internal Server Error" }),
    };

    mockController.handle = jest.fn().mockResolvedValueOnce(mockResponse as Response);

    try {
      await getChats();
    } catch (error: any) {
        expect(error.message).toBe("Internal Server Error");
    }
  });
});