import { AddDocumentUsecase } from "@/usecase/document/AddDocumentUsecase";
import { injectable, inject } from "tsyringe";
import { AddEmbeddingUsecase } from "@/usecase/embeddings/AddEmbeddingUsecase";
import { NextResponse } from "next/server";
import { GetAnswerUseCase } from "@/usecase/chat/GetAnswerUseCase";

@injectable()
class GetAnswerController {
  private readonly _useCase: GetAnswerUseCase;

  constructor(@inject("getAnswerUseCase") useCase: GetAnswerUseCase) {
    this._useCase = useCase;
  }

  async handle(data: FormData): Promise<Response> {
    try {
    } catch (e) {}
  }
}

export { GetAnswerController };
