// npx jest src/tests/controllers/DeleteAllChatController.test.ts --coverage
import "reflect-metadata";
import { DeleteAllChatUsecase } from '@/usecase/chat/deleteAllChatUsecase';
import { DeleteAllChatController } from '@/controllers/chat/deleteAllChatController';
import { IChatRepository } from '@/lib/config/interfaces';

const mockChatRepository: jest.Mocked<IChatRepository> = {
    addChat: jest.fn(),
    addChatMessages: jest.fn(),
    deleteAllChat: jest.fn(),
    deleteChat: jest.fn(),
    getChatMessages: jest.fn(),
    getChats: jest.fn(),
};

const mockDeleteAllChatUsecase: DeleteAllChatUsecase = new DeleteAllChatUsecase(mockChatRepository);
mockDeleteAllChatUsecase.execute = jest.fn();

const deleteAllChatController: DeleteAllChatController = new DeleteAllChatController(mockDeleteAllChatUsecase);

describe('DeleteAllChatController', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che DeleteAllChatController chiami correttamente DeleteAllChatUsecase", async () => {
  
        await deleteAllChatController.handle();
        expect(mockDeleteAllChatUsecase.execute).toHaveBeenCalled();
    });

    it("Verifica che DeleteAllChatController restituisca status 200 con esito positivo", async () => {

        const response = await deleteAllChatController.handle();
        expect(response.status).toBe(200);
    });

    it("Verifica che DeleteAllChatController restituisca status 500 con esito negativo", async () => {

        const mockError = new Error('Internal Server Error');
        const mockDeleteAllChatUsecase00: DeleteAllChatUsecase = new DeleteAllChatUsecase(mockChatRepository);
        mockDeleteAllChatUsecase00.execute = jest.fn().mockRejectedValueOnce(mockError);
      
        const deleteAllChatController500: DeleteAllChatController = new DeleteAllChatController(mockDeleteAllChatUsecase00);

        const response = await deleteAllChatController500.handle();

        expect(response.status).toBe(500);

    });
});