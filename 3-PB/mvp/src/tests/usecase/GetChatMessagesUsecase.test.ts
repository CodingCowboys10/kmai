// npx jest src/tests/usecase/GetChatMessagesUsecase.test.ts --coverage
import "reflect-metadata";
import { GetChatMessagesUsecase } from '@/usecase/chat/getChatMessagesUsecase';
import { IChatRepository, SourceMetadata, MessageSource } from '@/lib/config/interfaces';
import { Message } from "ai";

const mockChatRepository: jest.Mocked<IChatRepository> = {
    addChat: jest.fn(),
    addChatMessages: jest.fn(),
    deleteAllChat: jest.fn(),
    deleteChat: jest.fn(),
    getChatMessages: jest.fn(),
    getChats: jest.fn(),
};

const getChatMessagesUsecase = new GetChatMessagesUsecase(mockChatRepository);

describe('GetChatMessagesUsecase', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che GetChatMessagesUsecase chiami correttamente ChatRepository", async () => {
      
        const id = 1;
  
        await getChatMessagesUsecase.execute(id);
        expect(mockChatRepository.getChatMessages).toHaveBeenCalledWith(id);
    });

    it("Verifica che GetChatMessagesUsecase restituisca i messaggi ritornati da ChatRepository", async () => {
      
        const id = 1;
        const allMessages: Message[] = [
                { id: "id", content: "Contenuto", role: "assistant" },
        ];

        const source: MessageSource = {
            "key": [
                {metadata: {name: "source", page: 1}}
            ]
        }

        mockChatRepository.getChatMessages.mockResolvedValueOnce({allMessages,source});
  
        const result = await getChatMessagesUsecase.execute(id);
        expect(result).toEqual({allMessages,source});
    });
});