import type {
  IDocumentRepository,
  IUsecase,
  IEmbeddingRepository,
  IModel,
  Metadatas,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";

@injectable()
class UpdateDocumentUsecase
  implements
    IUsecase<
      { docName: string; model: IModel; updatedMetadas: Metadatas },
      void
    >
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

  async execute({
    docName,
    model,
    updatedMetadas,
  }: {
    docName: string;
    model: IModel;
    updatedMetadas: Metadatas;
  }) {
    await this._documentRepository.updateDocument(
      docName,
      model,
      updatedMetadas,
    );
    const ids = await this._embeddingRepository.getIdsEmbedding(docName, model);
    await this._embeddingRepository.updateMetadatas(updatedMetadas, model, ids);
  }
}

export { UpdateDocumentUsecase };
