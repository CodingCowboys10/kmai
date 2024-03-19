import type {
  Document,
  Embeddings,
  IChatRepository,
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
class AddChatUsecase implements IUsecase<{ title: string }, void> {
  private readonly _chatRepository: IChatRepository;

  constructor(@inject("chatRepository") chatRepository: IChatRepository) {
    this._chatRepository = chatRepository;
  }

  async execute({ title }: { title: string }) {
    return await this._chatRepository.addChat(title);
  }
}

export { AddChatUsecase };
