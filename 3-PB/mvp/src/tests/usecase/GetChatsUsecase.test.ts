// npx jest src/tests/usecase/GetChatsUsecase.test.ts --coverage
import "reflect-metadata";
import { GetChatsUsecase } from '@/usecase/chat/getChatsUsecase';
import { IChatRepository, Chat } from '@/lib/config/interfaces';

const mockChatRepository: jest.Mocked<IChatRepository> = {
    addChat: jest.fn(),
    addChatMessages: jest.fn(),
    deleteAllChat: jest.fn(),
    deleteChat: jest.fn(),
    getChatMessages: jest.fn(),
    getChats: jest.fn(),
};

const getChatsUsecase = new GetChatsUsecase(mockChatRepository);

describe('GetChatsUsecase', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che GetChatsUsecase chiami correttamente ChatRepository", async () => {

        await getChatsUsecase.execute();
        expect(mockChatRepository.getChats).toHaveBeenCalled();
    });

    it("Verifica che GetChatsUsecase restituisca le chat ritornate da ChatRepository", async () => {

        const expectedChat: Chat[] = [
            {title: "Titolo1", id: 1},
            {title: "Titolo2", id: 2},
        ]

        mockChatRepository.getChats.mockResolvedValueOnce(expectedChat);
  
        const result = await getChatsUsecase.execute();
        expect(result).toEqual(expectedChat);
    });
});