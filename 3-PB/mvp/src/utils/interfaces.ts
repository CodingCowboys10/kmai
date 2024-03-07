import {Document} from "@/domain/entity/Document";

interface IUsecase<A, T>{
    execute(...args: A[]) : T;
}

interface IDocumentRepository{
    addDocument(doc: Document, model: string): Promise<void>;
    deleteDocument(docName: string, model: string): Promise<void>;
    getDocumentContent(docName: string, model: string): Promise<string>
    getDocuments(model:string): Promise<Document[]>
}

interface IDocumentDataSource{
    addOne({doc, model}:{doc:Document, model:string}): Promise<void>;
    deleteOne({docName, model}:{docName: string, model:string}): Promise<void>;
    getContent({docName, model}:{docName: string, model: string}): Promise<string>;
    getAll(model: string): Promise<Document[]>;
}

export type {IUsecase, IDocumentRepository, IDocumentDataSource}