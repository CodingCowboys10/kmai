// npx jest src/tests/infrastructure/ChatRepository.test.ts
import "reflect-metadata";
import {
    ICustomMessages,
    IChatDataSource,
    Chat,
    MessageSource,
} from "@/lib/config/interfaces";
import {ChatRepository} from "@/infrastructure/chatRepository";
import {Message} from "ai";


const mockChatDataSource: jest.Mocked<IChatDataSource> = {
    addOne: jest.fn(),
    deleteOne: jest.fn(),
    deleteAll: jest.fn(),
    getAll: jest.fn(),
    getAllMessages: jest.fn(),
    addMessages: jest.fn(),
};

const chatRepository = new ChatRepository(mockChatDataSource);

describe('ChatRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Verifica che il metodo addChat di ChatRepository chiami correttamente addOne di PostgresDataSource', async () => {
        const title = "exampleChat"
        const exampleId = 1;

        mockChatDataSource.addOne.mockResolvedValue(exampleId)

        const id = await chatRepository.addChat(title)

        expect(mockChatDataSource.addOne).toHaveBeenCalledWith({ title: title});
        expect(id).toEqual(exampleId);
    });

    it('Verifica che il metodo deleteChat di ChatRepository chiami correttamente deleteOne di PostgresDataSource', async () => {
        const id = 1;

        await chatRepository.deleteChat(id);

        expect(mockChatDataSource.deleteOne).toHaveBeenCalledWith({ id: id});
    });

    it('Verifica che il metodo deleteAllChat di ChatRepository chiami correttamente deleteAll di PostgresDataSource', async () => {
        await chatRepository.deleteAllChat();

        expect(mockChatDataSource.deleteAll).toHaveBeenCalledWith()
    });

    it('Verifica che il metodo getChats di ChatRepository chiami correttamente getAll di PostgresDataSource', async () => {
        const chats = await chatRepository.getChats();

        expect(mockChatDataSource.getAll).toHaveBeenCalledWith()
    });

    it('Verifica che il metodo getChats di ChatRepository restituisca correttamente le informazioni sulle sessioni recuperate', async () => {
        const exampleChats : Chat[] = [{title:"Hello", id:1}, {title: "World!", id:2}]

        mockChatDataSource.getAll.mockResolvedValue(exampleChats)

        const chats = await chatRepository.getChats();

        expect(mockChatDataSource.getAll).toHaveBeenCalledWith()
        expect(chats).toEqual(exampleChats);
    });

    it('Verifica che il metodo getChatMessages di ChatRepository restituisca correttamente i messaggi della sessione recuperati', async () => {
        const id = 1;
        const messages : Message[] = [
            {
                id: "sdfsfs",
                content: "Hello!",
                role: "assistant"
            },
            {
                id: "asadada",
                content: "Hello!",
                role: "user"
            }
        ];
        const sources: MessageSource = {
            source: [
                {
                    metadata: {
                        name: "example",
                        page: 1
                    }
                },
                {
                    metadata: {
                        name: "example",
                        page: 2
                    }
                }
            ]
        }

        mockChatDataSource.getAllMessages.mockResolvedValue({allMessages: messages, source: sources});

        const chat = await chatRepository.getChatMessages(id);

        expect(mockChatDataSource.getAllMessages).toHaveBeenCalledWith({id})
        expect(chat).toEqual({allMessages: messages, source: sources});
    });

    it('Verifica che il metodo getChatMessages di ChatRepository chiami correttamente getAllMessages di PostgresDataSource', async () => {
        const id = 1;

        await chatRepository.getChatMessages(id);

        expect(mockChatDataSource.getAllMessages).toHaveBeenCalledWith({id})
    });

    it('Verifica che il metodo addChatMessages di ChatRepository chiami correttamente addMessages di PostgresDataSource', async () => {
        const messages: ICustomMessages = {
            messageAI: {
                id: "sdfsfs",
                content: "Hello!",
                role: "assistant"
            },
            messageUser: {
                id: "asadada",
                content: "Hello!",
                role: "user"
            },
            sessionId: 1,
            source: {page: 1, doc: "example"}
        }

        await chatRepository.addChatMessages(messages);
        expect(mockChatDataSource.addMessages).toHaveBeenCalledWith({messages: messages})
    });

});