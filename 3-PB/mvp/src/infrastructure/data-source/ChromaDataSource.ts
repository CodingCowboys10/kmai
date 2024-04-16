import { ChromaClient } from "chromadb";
import {
  Embeddings,
  IEmbeddingDataSource,
  IModel,
  Metadatas,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";
import { collections } from "@/lib/models";

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
    model: IModel;
  }) {
    const collection = await this._vDb.getCollection({
      name: collections[model],
    });
    await collection.add({
      ids: embeddings.ids,
      documents: embeddings.doc,
      metadatas: embeddings.metadata,
      embeddings: embeddings.embedding,
    });
  }

  async deleteOne({ ids, model }: { ids: string[]; model: IModel }) {
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
    model: IModel;
    ids: string[];
  }) {
    const collection = await this._vDb.getCollection({
      name: collections[model],
    });
    const meta = ids.map(() => (metadatas));
    await collection.update({
      ids: ids,
      metadatas: meta,
    });
  }

  async getIds({ docName, model }: { docName: string; model: IModel }) {
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
