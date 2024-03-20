import { Message } from "ai";

type IModel = "Ollama" | "OpenAi";

interface Document {
  name: string;
  date: Date;
  size: number;
  content?: Buffer | string;
}
interface Chat {
  title: string;
  id: number;
}
type SourceMetadata = {
  metadata: {
    name: string;
    page: number;
  };
};

type MessageSource = Record<string, SourceMetadata[]>;

interface ICustomMessages {
  messageAI: Message;
  messageUser: Message;
  sessionId: number | null;
  source: Record<string, any>;
}

type Metadatas = Record<string, string | number | boolean>;
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
  getIdsEmbedding(docName: string, model: string): Promise<string[]>;
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
  deleteOne({ ids, model }: { ids: string[]; model: IModel }): Promise<void>;
  updateOne({
    metadatas,
    model,
    ids,
  }: {
    metadatas: Metadatas;
    model: string;
    ids: string[];
  }): Promise<void>;
  getIds({
    docName,
    model,
  }: {
    docName: string;
    model: string;
  }): Promise<string[]>;
}

interface IDocumentRepository {
  addDocument(doc: Document, model: string): Promise<void>;
  deleteDocument(docName: string, model: string): Promise<void>;
  getDocumentContent(docName: string, model: string): Promise<string>;
  getDocuments(model: string): Promise<Document[]>;
}

interface IDocumentDataSource {
  addOne({ doc, model }: { doc: Document; model: IModel }): Promise<void>;
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

interface IChatDataSource {
  addOne({ title }: { title: string }): Promise<number>;
  deleteOne({ id }: { id: number }): Promise<void>;
  deleteAll(): Promise<void>;
  getAll(): Promise<Chat[]>;
  getAllMessages({ id }: { id: number }): Promise<{
    allMessages: Message[];
    source: MessageSource;
  }>;
  addMessages({ messages }: { messages: ICustomMessages }): Promise<void>;
}
interface IChatRepository {
  addChat(title: string): Promise<number>;
  deleteChat(id: number): Promise<void>;
  deleteAllChat(): Promise<void>;
  getChats(): Promise<Chat[]>;
  getChatMessages(id: number): Promise<{
    allMessages: Message[];
    source: MessageSource;
  }>;
  addChatMessages(messages: ICustomMessages): Promise<void>;
}

export type {
  SourceMetadata,
  MessageSource,
  ICustomMessages,
  Chat,
  IChatDataSource,
  IChatRepository,
  Document,
  Metadatas,
  IUsecase,
  IDocumentRepository,
  IDocumentDataSource,
  IEmbeddingDataSource,
  IEmbeddingRepository,
  IModel,
};
