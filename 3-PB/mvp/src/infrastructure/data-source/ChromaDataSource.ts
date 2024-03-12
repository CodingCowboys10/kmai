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

  constructor(@inject("chromaclient") vDb: ChromaClient) {
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
    console.log(collections[model]);
    await collection.add({
      ids: embeddings.ids,
      documents: embeddings.doc,
      metadatas: embeddings.metadata,
      embeddings: embeddings.embedding,
    });
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
  async getIds({ docName, model }: { docName: string; model: string }) {
    const collection = await this._vDb.getCollection({
      name: collections[model],
    });

    return (
      await collection.get({
        where: { name: { $eq: docName } },
        include: [],
      })
    ).ids;
  }
}

export { ChromaDataSource };
