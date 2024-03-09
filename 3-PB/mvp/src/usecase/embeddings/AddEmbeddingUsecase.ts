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
import { OpenAIEmbeddings } from "@langchain/openai";

@injectable()
class AddEmbeddingUsecase
  implements IUsecase<{ file: File; model: string }, void>
{
  private readonly _embeddingRepo: IEmbeddingRepository;
  private readonly _EmbeddingsFunction: Record<
    "Ollama" | "OpenAi",
    OllamaEmbeddings | OpenAIEmbeddings
  > = {
    Ollama: new OllamaEmbeddings({
      model: "starling-lm",
      baseUrl: "http://localhost:11434",
    }),
    OpenAi: new OpenAIEmbeddings({
      batchSize: 512, // Default value if omitted is 512. Max is 2048
    }),
  };

  constructor(
    @inject("embeddingRepository") embeddingRepository: IEmbeddingRepository,
  ) {
    this._embeddingRepo = embeddingRepository;
  }

  async execute({ file, model }: { file: File; model: "Ollama" | "OpenAi" }) {
    const data = new FormData();
    data.set("file", file);

    const res = await fetch("/api/document/embedding/loadDocument", {
      method: "POST",
      body: data,
    });

    if (!res.ok) console.log("errore");
    const responseData = await res.json();
    let docs = responseData.docs;
    const documentName = responseData.documentName;

    docs = docs.map((doc: any) => ({
      ...doc,
      metadata: {
        page: doc.metadata.loc.pageNumber,
        date: new Date().toLocaleString(),
        name: documentName,
      },
    }));

    const ids = docs.map((doc: any) => documentName + "_" + doc.metadata.page);
    const doc = docs.map((doc: any) => doc.pageContent);
    const metadata = docs.map((doc: any) => doc.metadata);

    const embeddings =
      await this._EmbeddingsFunction[model].embedDocuments(doc);

    return this._embeddingRepo.addEmbedding(
      {
        ids: ids,
        metadata: metadata,
        embedding: embeddings,
        doc: doc,
      },
      model,
    );
  }
}

export { AddEmbeddingUsecase };
