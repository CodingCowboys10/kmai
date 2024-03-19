import type {
  Document,
  Embeddings,
  IChatRepository,
  ICustomMessages,
  IEmbeddingDataSource,
  IEmbeddingRepository,
  IUsecase,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { OpenAIEmbeddings } from "@langchain/openai";
import { NextResponse } from "next/server";
import { loadDocument } from "@/serverActions/utils/loadDocument";

@injectable()
class AddChatMessagesUsecase
  implements IUsecase<{ messages: ICustomMessages }, void>
{
  private readonly _chatRepository: IChatRepository;

  constructor(@inject("chatRepository") chatRepository: IChatRepository) {
    this._chatRepository = chatRepository;
  }

  async execute({ messages }: { messages: ICustomMessages }) {
    return await this._chatRepository.addChatMessages(messages);
  }
}

export { AddChatMessagesUsecase };
