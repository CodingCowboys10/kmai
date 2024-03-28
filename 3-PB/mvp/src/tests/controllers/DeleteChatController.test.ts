// npx jest src/tests/controllers/DeleteChatController.test.ts --coverage
import "reflect-metadata";
import { DeleteChatUsecase } from '@/usecase/chat/deleteChatUsecase';
import { DeleteChatController } from '@/controllers/chat/deleteChatController';
import { IChatRepository } from '@/lib/config/interfaces';

const mockChatRepository: jest.Mocked<IChatRepository> = {
    addChat: jest.fn(),
    addChatMessages: jest.fn(),
    deleteAllChat: jest.fn(),
    deleteChat: jest.fn(),
    getChatMessages: jest.fn(),
    getChats: jest.fn(),
};

const mockDeleteChatUsecase: DeleteChatUsecase = new DeleteChatUsecase(mockChatRepository);
mockDeleteChatUsecase.execute = jest.fn();

const deleteChatController: DeleteChatController = new DeleteChatController(mockDeleteChatUsecase);

describe('DeleteAllChatController', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che DeleteChatController chiami correttamente DeleteChatUsecase", async () => {

        const id = 1;
  
        await deleteChatController.handle(id);
        expect(mockDeleteChatUsecase.execute).toHaveBeenCalledWith({id});
    });

    it("Verifica che DeleteChatController restituisca status 200 con esito positivo", async () => {

        const id = 1;

        const response = await deleteChatController.handle(id);

        expect(response.status).toBe(200);
    });

    it("Verifica che DeleteChatController restituisca status 500 con esito negativo", async () => {

        const id = 1;

        const mockError = new Error('Internal Server Error');
        const mockDeleteChatUsecase00: DeleteChatUsecase = new DeleteChatUsecase(mockChatRepository);
        mockDeleteChatUsecase00.execute = jest.fn().mockRejectedValueOnce(mockError);
      
        const deleteChatController500: DeleteChatController = new DeleteChatController(mockDeleteChatUsecase00);

        const response = await deleteChatController500.handle(id);

        expect(response.status).toBe(500);

    });
});