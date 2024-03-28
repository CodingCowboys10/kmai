// npx jest src/tests/controllers/GetChatMessagesController.test.ts --coverage
import "reflect-metadata";
import { GetChatMessagesUsecase } from '@/usecase/chat/getChatMessagesUsecase';
import { GetChatMessagesController } from '@/controllers/chat/getChatMessagesController';
import { IChatRepository, MessageSource } from '@/lib/config/interfaces';

const mockChatRepository: jest.Mocked<IChatRepository> = {
    addChat: jest.fn(),
    addChatMessages: jest.fn(),
    deleteAllChat: jest.fn(),
    deleteChat: jest.fn(),
    getChatMessages: jest.fn(),
    getChats: jest.fn(),
};

const mockGetChatMessagesUsecase: GetChatMessagesUsecase = new GetChatMessagesUsecase(mockChatRepository);
mockGetChatMessagesUsecase.execute = jest.fn();

const getChatMessagesController: GetChatMessagesController = new GetChatMessagesController(mockGetChatMessagesUsecase);

describe('GetChatMessagesController', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che GetChatMessagesController chiami correttamente GetChatMessagesUsecase", async () => {

        const id = 1;
  
        await getChatMessagesController.handle(id);
        expect(mockGetChatMessagesUsecase.execute).toHaveBeenCalledWith(id);
    });

    it("Verifica che GetChatMessagesController restituisca status 200 con esito positivo", async () => {

        const id = 1;

        const response = await getChatMessagesController.handle(id);

        expect(response.status).toBe(200);
    });

    it("Verifica che GetChatMessagesController restituisca status 500 con esito negativo", async () => {

        const id = 1;

        const mockError = new Error('Internal Server Error');
        const mockGetChatMessagesUsecase500: GetChatMessagesUsecase = new GetChatMessagesUsecase(mockChatRepository);
        mockGetChatMessagesUsecase500.execute = jest.fn().mockRejectedValueOnce(mockError);
      
        const getChatMessagesController500: GetChatMessagesController = new GetChatMessagesController(mockGetChatMessagesUsecase500);

        const response = await getChatMessagesController500.handle(id);

        expect(response.status).toBe(500);

    });
});