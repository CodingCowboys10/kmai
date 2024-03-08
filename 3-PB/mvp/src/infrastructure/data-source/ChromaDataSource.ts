import { ChromaClient } from "chromadb";
import { collections } from "@/lib/site-config";
import {
  Embeddings,
  IEmbeddingDataSource,
  Metadatas,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";

@injectable()
class ChromaDataSource implements IEmbeddingDataSource {
  private readonly _vDb: ChromaClient;

  constructor(@inject("chromaClient") vDb: ChromaClient) {
    this._vDb = vDb;
  }

  async addOne({
    embeddings,
    model,
  }: {
    embeddings: Embeddings;
    model: string;
  }) {
    const collection = await this._vDb.getCollection({
      name: collections[model],
    });
    await collection.add({
      ids: embeddings.ids,
      embeddings: embeddings.embedding,
      documents: embeddings.doc,
      metadatas: embeddings.metadata,
    });

    //await collection.add(embeddings)
  }

  async deleteOne({ ids, model }: { ids: string[]; model: string }) {
    const collection = await this._vDb.getCollection({
      name: collections[model],
    });
    await collection.delete({ ids: ids });
  }

  async updateOne({
    metadatas,
    model,
    ids,
  }: {
    metadatas: Metadatas;
    model: string;
    ids: string[];
  }) {
    const collection = await this._vDb.getCollection({
      name: collections[model],
    });
    await collection.update({
      ids: ids,
      metadatas: metadatas,
    });
  }
}

export { ChromaDataSource };
