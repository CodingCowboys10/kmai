import "reflect-metadata";
import { container } from "tsyringe";
import { ChromaClient } from "chromadb";
import AWS from "aws-sdk";
import { AddDocumentController } from "@/controllers/document/AddDocumentController";
import { GetDocumentsController } from "@/controllers/document/GetDocumentsController";
import { DeleteDocumentController } from "@/controllers/document/DeleteDocumentController";
import { GetDocumentContentController } from "@/controllers/document/GetDocumentContentController";
import { UpdateDocumentController } from "@/controllers/document/UpdateDocumentController";
import { DocumentRepository } from "@/infrastructure/documentRepository";
import { MinioDataSource } from "@/infrastructure/data-source/MinioDataSource";
import { AddDocumentUsecase } from "@/usecase/document/AddDocumentUsecase";
import { DeleteDocumentUsecase } from "@/usecase/document/DeleteDocumentUsecase";
import { UpdateDocumentUsecase } from "@/usecase/document/UpdateDocumentUsecase";
import { GetDocumentContentUsecase } from "@/usecase/document/GetDocumentContentUsecase";
import { GetDocumentsUsecase } from "@/usecase/document/GetDocumentsUsecase";
import { ChromaDataSource } from "@/infrastructure/data-source/ChromaDataSource";
import { EmbeddingRepository } from "@/infrastructure/embeddingRepository";
import { Pool } from "pg";
import { ChatRepository } from "@/infrastructure/chatRepository";
import { AddChatUsecase } from "@/usecase/chat/addChatUsecase";
import { AddChatController } from "@/controllers/chat/addChatController";
import { PostgresDataSource } from "@/infrastructure/data-source/PostgresDataSource";
import { AddChatMessagesUsecase } from "@/usecase/chat/addChatMessagesUsecase";
import { AddChatMessagesController } from "@/controllers/chat/addChatMessagesController";
import { DeleteAllChatUsecase } from "@/usecase/chat/deleteAllChatUsecase";
import { DeleteAllChatController } from "@/controllers/chat/deleteAllChatController";
import { DeleteChatController } from "@/controllers/chat/deleteChatController";
import { DeleteChatUsecase } from "@/usecase/chat/deleteChatUsecase";
import { GetChatsController } from "@/controllers/chat/getChatsController";
import { GetChatsUsecase } from "@/usecase/chat/getChatsUsecase";
import { GetChatMessagesUsecase } from "@/usecase/chat/getChatMessagesUsecase";
import { GetChatMessagesController } from "@/controllers/chat/getChatMessagesController";

const AWSParams = {
  endpoint: "http://127.0.0.1:9000", //ristabilito
  accessKeyId: "ROOTUSER",
  secretAccessKey: "CHANGEME123",
  s3ForcePathStyle: true,
};

const PoolParams = {
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "postgres",
};

/* --------Embedding---------  */

container.register<ChromaClient>("chromaclient", {
  useValue: new ChromaClient(),
});

container.register<ChromaDataSource>("embeddingDataSource", {
  useClass: ChromaDataSource,
});
container.register<EmbeddingRepository>("embeddingRepository", {
  useClass: EmbeddingRepository,
});

/* --------Document---------  */

container.register<AWS.S3>("s3", { useValue: new AWS.S3(AWSParams) });

container.register<MinioDataSource>("documentDataSource", {
  useClass: MinioDataSource,
});

container.register<DocumentRepository>("documentRepository", {
  useClass: DocumentRepository,
});

container.register<AddDocumentUsecase>("addDocUsecase", {
  useClass: AddDocumentUsecase,
});

container.register<DeleteDocumentUsecase>("delDocUsecase", {
  useClass: DeleteDocumentUsecase,
});

container.register<GetDocumentContentUsecase>("getDocContUsecase", {
  useClass: GetDocumentContentUsecase,
});

container.register<GetDocumentsUsecase>("getDocsUsecase", {
  useClass: GetDocumentsUsecase,
});

container.register<UpdateDocumentUsecase>("updateDocUsecase", {
  useClass: UpdateDocumentUsecase,
});

/* --------CHAT---------  */

container.register<Pool>("postgrespool", {
  useValue: new Pool(PoolParams),
});

container.register<PostgresDataSource>("chatDataSource", {
  useClass: PostgresDataSource,
});

container.register<ChatRepository>("chatRepository", {
  useClass: ChatRepository,
});

container.register<AddChatUsecase>("addChatUsecase", {
  useClass: AddChatUsecase,
});

container.register<AddChatMessagesUsecase>("addChatMessagesUsecase", {
  useClass: AddChatMessagesUsecase,
});

container.register<DeleteAllChatUsecase>("deleteAllChatUsecase", {
  useClass: DeleteAllChatUsecase,
});

container.register<DeleteChatUsecase>("deleteChatUsecase", {
  useClass: DeleteChatUsecase,
});

container.register<GetChatsUsecase>("getChatsUsecase", {
  useClass: GetChatsUsecase,
});

container.register<GetChatMessagesUsecase>("getChatMessagesUsecase", {
  useClass: GetChatMessagesUsecase,
});

const addDocumentController = container.resolve(AddDocumentController);
const deleteDocumentController = container.resolve(DeleteDocumentController);
const updateDocumentController = container.resolve(UpdateDocumentController);
const getDocumentsController = container.resolve(GetDocumentsController);
const getDocumentContentController = container.resolve(
  GetDocumentContentController,
);

const addChatController = container.resolve(AddChatController);
const addChatMessagesController = container.resolve(AddChatMessagesController);
const deleteAllChatController = container.resolve(DeleteAllChatController);
const deleteChatController = container.resolve(DeleteChatController);
const getChatsController = container.resolve(GetChatsController);
const getChatMessagesController = container.resolve(GetChatMessagesController);

export {
  addDocumentController,
  deleteDocumentController,
  updateDocumentController,
  getDocumentsController,
  getDocumentContentController,
  addChatController,
  addChatMessagesController,
  deleteAllChatController,
  deleteChatController,
  getChatsController,
  getChatMessagesController,
};
