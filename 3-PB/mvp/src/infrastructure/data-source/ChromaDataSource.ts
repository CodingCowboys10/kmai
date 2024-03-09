import {
  Embeddings,
  IEmbeddingDataSource,
  Metadatas,
} from "@/lib/config/interfaces";

class ChromaDataSource implements IEmbeddingDataSource {
  constructor() {}

  async addOne({
    embeddings,
    model,
  }: {
    embeddings: Embeddings;
    model: string;
  }) {
    const res = await fetch("/api/document/embedding/addOne", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        embeddings: embeddings,
        model: model,
      }),
    });
  }

  async deleteOne({ ids, model }: { ids: string[]; model: string }) {
    const res = await fetch("/api/document/embedding/deleteOne", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        ids: ids,
        model: model,
      }),
    });
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
    /*
    const collection = await this._vDb.getCollection({
      name: collections[model],
    });
    await collection.update({
      ids: ids,
      metadatas: metadatas,
    });

     */
  }
}

export { ChromaDataSource };
