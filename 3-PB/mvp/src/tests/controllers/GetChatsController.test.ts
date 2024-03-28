// npx jest src/tests/controllers/GetChatsController.test.ts --coverage
import "reflect-metadata";
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

const mockGetChatsUsecase: GetChatsUsecase = new GetChatsUsecase(mockChatRepository);
mockGetChatsUsecase.execute = jest.fn();

const getChatsController: GetChatsController = new GetChatsController(mockGetChatsUsecase);

describe('GetChatsController', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che GetChatsController chiami correttamente GetChatsUsecase", async () => {
  
        await getChatsController.handle();
        expect(mockGetChatsUsecase.execute).toHaveBeenCalled();
    });

    it("Verifica che GetChatsController restituisca status 200 con esito positivo", async () => {

        const response = await getChatsController.handle();

        expect(response.status).toBe(200);
    });

    it("Verifica che GetChatsController restituisca status 500 con esito negativo", async () => {

        const mockError = new Error('Internal Server Error');
        const mockGetChatsUsecase500: GetChatsUsecase = new GetChatsUsecase(mockChatRepository);
        mockGetChatsUsecase500.execute = jest.fn().mockRejectedValueOnce(mockError);
      
        const getChatsController500: GetChatsController = new GetChatsController(mockGetChatsUsecase500);

        const response = await getChatsController500.handle();

        expect(response.status).toBe(500);

    });
});