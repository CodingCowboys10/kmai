import type {
  Embeddings,
  IEmbeddingDataSource,
  IEmbeddingRepository,
  IUsecase,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";

@injectable()
class AddEmbeddingUsecase
  implements IUsecase<{ file: File; model: string }, void>
{
  private readonly _embeddingRepo: IEmbeddingRepository;

  constructor(
    @inject("embeddingRepository") embeddingRepository: IEmbeddingRepository,
  ) {
    this._embeddingRepo = embeddingRepository;
  }

  async execute({ file, model }: { file: File; model: string }) {}
}

export { AddEmbeddingUsecase };
