import type {
    IDocumentRepository,
    IUsecase,
    IEmbeddingRepository,
    IModel,
  } from "@/lib/config/interfaces";
  import { injectable, inject } from "tsyringe";
  
  @injectable()
  class UpdateDocumentUsecase
    implements IUsecase<{ docName: string; model: IModel; visibility: boolean }, void>
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
  
    async execute({ docName, model, visibility }: { docName: string; model: IModel; visibility: boolean }) {
      await this._documentRepository.updateDocument(docName, model, visibility);
      const ids = await this._embeddingRepository.getIdsEmbedding(docName, model);
      const metadatas = { visibility: visibility };
      await this._embeddingRepository.updateMetadatas(metadatas, model, ids);
    }
  }
  
  export { UpdateDocumentUsecase };