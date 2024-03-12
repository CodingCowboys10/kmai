import type {
  Document,
  IDocumentRepository,
  IUsecase,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";
import { Ollama } from "@langchain/community/llms/ollama";
import { Message } from "ai";

@injectable()
class GetAnswerUseCase
  implements IUsecase<{ message: Message; model: string }, void>
{
  private readonly _documentRepository: IDocumentRepository;
  private readonly _model: any = {
    Ollama: new Ollama({
      model: "starling-lm",
      baseUrl: "http://localhost:11434",
    }),
  };

  constructor(
    @inject("documentRepository") documentRepository: IDocumentRepository,
  ) {
    this._documentRepository = documentRepository;
  }

  async execute({ file, model }: { file: File; model: string }) {}
}

export { GetAnswerUseCase };
