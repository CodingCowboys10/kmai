import type {
  IDocumentRepository,
  IUsecase,
  IEmbeddingRepository,
  IModel,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";

@injectable()
class DeleteDocumentUsecase
  implements IUsecase<{ docName: string; model: IModel }, void>
{
  private readonly _documentRepository: IDocumentRepository;
  private readonly _embeddingRepository: IEmbeddingRepository;

  constructor(
    @inject("documentRepository") documentRepository: IDocumentRepository,
    @inject("embeddingRepository") embeddingRepository: IEmbeddingRepository,
  ) {
    this._documentRepository = documentRepository;
    this._embeddingRepository = embeddingRepository;
  }

  async execute({ docName, model }: { docName: string; model: IModel }) {
    await this._documentRepository.deleteDocument(docName, model);
    const ids = await this._embeddingRepository.getIdsEmbedding(docName, model);
    await this._embeddingRepository.deleteEmbedding(ids, model);
  }
}

export { DeleteDocumentUsecase };
