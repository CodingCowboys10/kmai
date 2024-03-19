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
import { NextResponse } from "next/server";

@injectable()
class AddEmbeddingUsecase
  implements IUsecase<{ file: File; model: string }, void>
{
  private readonly _embeddingRepo: IEmbeddingRepository;
  private readonly _EmbeddingsFunction: any = {
    Ollama: new OllamaEmbeddings({
      model: "starling-lm",
      baseUrl: "http://ollama:11434",
    }),

    OpenAi: new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      batchSize: 512,
    }),
  };

  constructor(
    @inject("embeddingRepository") embeddingRepository: IEmbeddingRepository,
  ) {
    this._embeddingRepo = embeddingRepository;
  }

  async execute({
    file,
    model,
  }: {
    file: File;
    model: "Ollama" | "OpenAi" | string;
  }) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const documentName = `${file.name}`;
    const fileAsBlob = new Blob([buffer]);

    if (!file) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 },
      );
    }

    const loader = new PDFLoader(fileAsBlob, {
      splitPages: true,
      parsedItemSeparator: "",
    });

    let docs = await loader.load();

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
