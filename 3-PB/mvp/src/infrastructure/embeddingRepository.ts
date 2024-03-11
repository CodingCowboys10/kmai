import type {
  Embeddings,
  IEmbeddingDataSource,
  IEmbeddingRepository,
  Metadatas,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";

@injectable()
class EmbeddingRepository implements IEmbeddingRepository {
  private _embeddingsDataSource: IEmbeddingDataSource;

  constructor(
    @inject("embeddingDataSource") embeddingsDataSource: IEmbeddingDataSource,
  ) {
    this._embeddingsDataSource = embeddingsDataSource;
  }

  async addEmbedding(embeddings: Embeddings, model: string) {
    await this._embeddingsDataSource.addOne({
      embeddings: embeddings,
      model: model,
    });
  }

  async deleteEmbedding(ids: string[], model: string) {
    await this._embeddingsDataSource.deleteOne({ ids: ids, model: model });
  }

  async updateMetadatas(metadatas: Metadatas, model: string, ids: string[]) {
    await this._embeddingsDataSource.updateOne({
      metadatas: metadatas,
      model: model,
      ids: ids,
    });
  }

  async getIdsEmbedding(docName: string, model: string) {
    return await this._embeddingsDataSource.getIds({
      docName: docName,
      model: model,
    });
  }
}

export { EmbeddingRepository };
