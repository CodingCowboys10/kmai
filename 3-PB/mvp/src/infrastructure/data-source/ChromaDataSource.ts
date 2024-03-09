import { collections } from "@/lib/site-config";
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
    if (!res.ok) console.log(res.text());
  }

  async deleteOne({ ids, model }: { ids: string[]; model: string }) {
    /*
    const collection = await this._vDb.getCollection({
      name: collections[model],
    });
    await collection.delete({ ids: ids });

     */
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
