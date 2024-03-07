import "reflect-metadata"
import {container} from "tsyringe";
import AWS from "aws-sdk";
import {AddDocumentController} from "@/controllers/AddDocumentController";
import {GetDocumentsController} from "@/controllers/GetDocumentsController";
import {DeleteDocumentController} from "@/controllers/DeleteDocumentController";
import {GetDocumentContentController} from "@/controllers/GetDocumentContentController";
import {DocumentRepository} from "@/infrastructure/documentRepository";
import {MinioDataSource} from "@/infrastructure/data-source/MinioDataSource";
import {AWSParams} from "@/utils/chat_utils";
import {AddDocumentUsecase} from "@/usecase/AddDocumentUsecase";
import {DeleteDocumentUsecase} from "@/usecase/DeleteDocumentUsecase";
import {GetDocumentContentUsecase} from "@/usecase/GetDocumentContentUsecase";
import {GetDocumentsUsecase} from "@/usecase/GetDocumentsUsecase";

container.register<AWS.S3>("s3", { useValue: new AWS.S3(AWSParams) });
container.register<MinioDataSource>('documentDataSource', { useClass: MinioDataSource });
container.register<DocumentRepository>('documentRepository', { useClass: DocumentRepository });
container.register<AddDocumentUsecase>('addDocUsecase', { useClass: AddDocumentUsecase });
container.register<DeleteDocumentUsecase>('delDocUsecase', { useClass: DeleteDocumentUsecase });
container.register<GetDocumentContentUsecase>('getDocContUsecase', { useClass: GetDocumentContentUsecase });
container.register<GetDocumentsUsecase>('getDocsUsecase', { useClass: GetDocumentsUsecase });

const addDocumentController = container.resolve(AddDocumentController);
const deleteDocumentController = container.resolve(DeleteDocumentController);
const getDocumentsController = container.resolve(GetDocumentsController);
const getDocumentContentController = container.resolve(GetDocumentContentController);

export {addDocumentController, deleteDocumentController, getDocumentsController, getDocumentContentController}