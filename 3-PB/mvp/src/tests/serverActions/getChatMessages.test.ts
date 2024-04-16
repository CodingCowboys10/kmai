// npx jest src/tests/serverActions/getChatMessages.test.ts --coverage
import "reflect-metadata";
import { getChatMessages } from '@/serverActions/chats/getChatMessages';
import { GetChatMessagesUsecase } from '@/usecase/chat/getChatMessagesUsecase';
import { GetChatMessagesController } from '@/controllers/chat/getChatMessagesController';
import { IChatRepository, MessageSource } from '@/lib/config/interfaces';
import { Message } from "ai";
import { NextResponse } from "next/server";

const mockChatRepository: jest.Mocked<IChatRepository> = {
    addChat: jest.fn(),
    addChatMessages: jest.fn(),
    deleteAllChat: jest.fn(),
    deleteChat: jest.fn(),
    getChatMessages: jest.fn(),
    getChats: jest.fn(),
};

const mockUsecase: GetChatMessagesUsecase = new GetChatMessagesUsecase(mockChatRepository);

mockUsecase.execute = jest.fn();

const mockController: GetChatMessagesController = new GetChatMessagesController(mockUsecase);


describe('getChatMessages server action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica che getChatMessages lanci un errore con esito negativo', async () => {
    
    const mockResponse = {
      ok: false,
      json: async () => ({ error: "Internal Server Error" }),
    };

    mockController.handle = jest.fn().mockResolvedValueOnce(mockResponse as Response);

    const id = 1;

    try {
      await getChatMessages(id);
    } catch (error: any) {
        expect(error.message).toBe("Internal Server Error");
    }
  });
  
});