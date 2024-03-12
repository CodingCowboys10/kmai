import { AddDocumentUsecase } from "@/usecase/document/AddDocumentUsecase";
import { injectable, inject } from "tsyringe";
import { AddEmbeddingUsecase } from "@/usecase/embeddings/AddEmbeddingUsecase";
import { NextResponse } from "next/server";
import { GetAnswerUseCase } from "@/usecase/chat/GetAnswerUseCase";
import { Message } from "ai";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { BytesOutputParser } from "@langchain/core/output_parsers";

@injectable()
class GetAnswerController {
  private readonly _useCase: GetAnswerUseCase;

  constructor(@inject("getAnswerUseCase") useCase: GetAnswerUseCase) {
    this._useCase = useCase;
  }

  async handle(messages: Message[], model: string) {
    return await this._useCase.execute({ messages, model });
  }
}

export { GetAnswerController };
