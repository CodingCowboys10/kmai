import {Document} from "@/domain/entity/Document";
import type {IDocumentDataSource, IDocumentRepository} from "@/lib/config/interfaces";
import {injectable, inject} from "tsyringe";

@injectable()
class DocumentRepository implements IDocumentRepository{
    private _documentDataSource: IDocumentDataSource;

    constructor(@inject("documentDataSource") documentDataSource: IDocumentDataSource) {
        this._documentDataSource = documentDataSource;
    }

    async addDocument(doc: Document, model:string) {
        await this._documentDataSource.addOne({
            doc: doc,
            model: model
        });
    }

    async deleteDocument(docName: string, model: string): Promise<void> {
        await this._documentDataSource.deleteOne({
            docName: docName,
            model: model
        });
    }

    async  getDocuments(model: string): Promise<Document[]> {
        return await this._documentDataSource.getAll(model);
    }

    async getDocumentContent(docName: string, model: string): Promise<string> {
        return await this._documentDataSource.getContent({
            docName: docName,
            model: model
        });
    }
}

export {DocumentRepository}