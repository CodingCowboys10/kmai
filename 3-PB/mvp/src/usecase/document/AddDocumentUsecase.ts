import type {Document , IDocumentRepository, IUsecase, IEmbeddingRepository} from "@/lib/config/interfaces";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { OpenAIEmbeddings } from "@langchain/openai";
import { NextResponse } from "next/server";
import {injectable, inject} from "tsyringe";

@injectable()
class AddDocumentUsecase implements IUsecase<{file: File, model: string }, void>{
    private readonly _documentRepository : IDocumentRepository;
    private readonly _embeddingRepository: IEmbeddingRepository;
    private readonly _embeddingsFunction: any = {
        Ollama: new OllamaEmbeddings({
        model: "starling-lm",
        baseUrl: "http://localhost:11434",
        }),

        OpenAi: new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY,
        batchSize: 512,
        }),
    };

    constructor(@inject("documentRepository") documentRepository: IDocumentRepository,
                @inject("embeddingRepository") embeddingRepository: IEmbeddingRepository) {
        this._documentRepository = documentRepository;
        this._embeddingRepository = embeddingRepository;
    }

    async execute({file, model}: {file: File, model: string }) {

        const buffer = Buffer.from(await file.arrayBuffer());
        const name =`${file.name}`;
        const size = `${file.size}`;
        const date = new Date();
        const document: Document = {
            name: name,
            date: date,
            size: parseFloat(size),
            content: buffer
        };


        await this._documentRepository.addDocument(document, model);

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
            name: name,
          },
        }));
    
        const ids = docs.map((doc: any) => name + "_" + doc.metadata.page);
        const doc = docs.map((doc: any) => doc.pageContent);
        const metadata = docs.map((doc: any) => doc.metadata);
    
        const embeddings = await this._embeddingsFunction[model].embedDocuments(doc);
    
        await this._embeddingRepository.addEmbedding(
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

export {AddDocumentUsecase};
