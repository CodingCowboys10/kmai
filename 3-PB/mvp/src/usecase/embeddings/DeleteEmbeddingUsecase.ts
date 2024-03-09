import type {
  Document,
  Embeddings,
  IEmbeddingDataSource,
  IEmbeddingRepository,
  IUsecase,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";

@injectable()
class DeleteEmbeddingUsecase
  implements IUsecase<{ docName: string; model: string }, void>
{
  private readonly _embeddingRepo: IEmbeddingRepository;

  constructor(
    @inject("embeddingRepository") embeddingRepository: IEmbeddingRepository,
  ) {
    this._embeddingRepo = embeddingRepository;
  }

  async execute({ docName, model }: { docName: string; model: string }) {
    const res = await fetch("/api/document/embedding/getIds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ docName: docName, model: model }),
    });
    const responseData = await res.json();
    const ids = responseData.ids;

    if (!res.ok) console.log("errore");
    return this._embeddingRepo.deleteEmbedding(ids, model);
  }
}

export { DeleteEmbeddingUsecase };
