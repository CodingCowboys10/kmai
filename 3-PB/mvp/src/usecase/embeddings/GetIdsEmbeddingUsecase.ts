import type { IEmbeddingRepository, IUsecase } from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";

@injectable()
class GetIdsEmbeddingUsecase
  implements IUsecase<{ docName: string; model: string }, void>
{
  private readonly _embeddingRepo: IEmbeddingRepository;

  constructor(
    @inject("embeddingRepository") embeddingRepository: IEmbeddingRepository,
  ) {
    this._embeddingRepo = embeddingRepository;
  }

  async execute({ docName, model }: { docName: string; model: string }) {
    return this._embeddingRepo.getIdsEmbedding(docName, model);
  }
}

export { GetIdsEmbeddingUsecase };
