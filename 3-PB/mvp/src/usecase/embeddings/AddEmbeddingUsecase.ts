import type {
  Document,
  Embeddings,
  IEmbeddingDataSource,
  IEmbeddingRepository,
  IUsecase,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";

@injectable()
class AddEmbeddingUsecase
  implements IUsecase<{ file: File; model: string }, void>
{
  private readonly _embeddingRepo: IEmbeddingRepository;

  constructor(
    @inject("embeddingRepository") embeddingRepository: IEmbeddingRepository,
  ) {
    this._embeddingRepo = embeddingRepository;
  }

  async execute({ file, model }: { file: File; model: string }) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const documentName = `${file.name}`;
    const bufferAsBlob = new Blob([buffer]);
    // ChromaDbUpload
    /*
    const loader = new PDFLoader(bufferAsBlob, {
      splitPages: true,
      parsedItemSeparator: "",
    });


    let docs = await loader.load();

    docs = docs.map((doc) => ({
      ...doc,
      metadata: {
        page: doc.metadata.loc.pageNumber,
        date: new Date().toLocaleString(),
        name: documentName,
      },
    }));

    // Calcolare embedding

    const ids = docs.map((doc) => documentName + "_" + doc.metadata.page);
    const doc = docs.map((doc) => doc.pageContent);
    const metadata = docs.map((doc) => doc.metadata);
 */
    return this._embeddingRepo.addEmbedding(
      {
        ids: ["ids"],
        metadata: [],
        embedding: [],
        doc: ["doc"],
      },
      model,
    );
  }
}

export { AddEmbeddingUsecase };
