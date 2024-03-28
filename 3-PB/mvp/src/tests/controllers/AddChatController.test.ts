// npx jest src/tests/controllers/AddChatController.test.ts --coverage
import "reflect-metadata";
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

const mockAddChatUsecase: AddChatUsecase = new AddChatUsecase(mockChatRepository);
mockAddChatUsecase.execute = jest.fn();

const addChatController: AddChatController = new AddChatController(mockAddChatUsecase);

describe('AddChatController', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che AddChatController chiami correttamente AddChatUsecase", async () => {
      
        const title = "Titolo della sessione";
  
        await addChatController.handle(title);
        expect(mockAddChatUsecase.execute).toHaveBeenCalledWith({title});
    });

    it("Verifica che AddChatController restituisca status 200 con esito positivo", async () => {
      
        const title = "Titolo della sessione";

        const response = await addChatController.handle(title);

        expect(response.status).toBe(200);
    });

    it("Verifica che AddChatController restituisca status 500 con esito negativo", async () => {

        const mockError = new Error('Internal Server Error');
        const mockAddChatUsecase500: AddChatUsecase = new AddChatUsecase(mockChatRepository);
        mockAddChatUsecase500.execute = jest.fn().mockRejectedValueOnce(mockError);
      
        const addChatController500: AddChatController = new AddChatController(mockAddChatUsecase500);

        const title = "Titolo della sessione";
        
        

        const response = await addChatController500.handle(title);

        expect(response.status).toBe(500);

    });
});