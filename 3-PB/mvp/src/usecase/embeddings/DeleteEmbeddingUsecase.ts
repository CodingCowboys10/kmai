import type { IEmbeddingRepository, IUsecase } from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";

@injectable()
class DeleteEmbeddingUsecase
  implements IUsecase<{ ids: string[]; model: string }, void>
{
  private readonly _embeddingRepo: IEmbeddingRepository;

  constructor(
    @inject("embeddingRepository") embeddingRepository: IEmbeddingRepository,
  ) {
    this._embeddingRepo = embeddingRepository;
  }

  async execute({ ids, model }: { ids: string[]; model: string }) {
    return this._embeddingRepo.deleteEmbedding(ids, model);
  }
}

export { DeleteEmbeddingUsecase };
