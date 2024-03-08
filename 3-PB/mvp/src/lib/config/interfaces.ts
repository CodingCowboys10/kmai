export interface Document {
  name: string;
  date: Date;
  size: number;
  content?: Buffer | string;
}

export type Metadatas = Record<string, string | number | boolean>;
export interface Embeddings {
  ids: string[];
  embedding: number[][];
  doc: string[];
  metadata: Metadatas[];
}

interface IUsecase<A, T> {
  execute(...args: A[]): T;
}

interface IEmbeddingRepository {
  addEmbedding(embeddings: Embeddings, model: string): Promise<void>;
  deleteEmbedding(ids: string[], model: string): Promise<void>;
  updateMetadatas(
    metadatas: Metadatas,
    model: string,
    ids: string[],
  ): Promise<void>;
}

interface IEmbeddingDataSource {
  addOne({
    embeddings,
    model,
  }: {
    embeddings: Embeddings;
    model: string;
  }): Promise<void>;
  deleteOne({ ids, model }: { ids: string[]; model: string }): Promise<void>;
  updateOne({
    metadatas,
    model,
    ids,
  }: {
    metadatas: Metadatas;
    model: string;
    ids: string[];
  }): Promise<void>;
}

interface IDocumentRepository {
  addDocument(doc: Document, model: string): Promise<void>;
  deleteDocument(docName: string, model: string): Promise<void>;
  getDocumentContent(docName: string, model: string): Promise<string>;
  getDocuments(model: string): Promise<Document[]>;
}

interface IDocumentDataSource {
  addOne({ doc, model }: { doc: Document; model: string }): Promise<void>;
  deleteOne({
    docName,
    model,
  }: {
    docName: string;
    model: string;
  }): Promise<void>;
  getContent({
    docName,
    model,
  }: {
    docName: string;
    model: string;
  }): Promise<string>;
  getAll(model: string): Promise<Document[]>;
}

export type {
  IUsecase,
  IDocumentRepository,
  IDocumentDataSource,
  IEmbeddingDataSource,
  IEmbeddingRepository,
};
