import type {
  Document,
  IDocumentDataSource,
  IDocumentRepository,
  IModel,
  Metadatas,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";

@injectable()
class DocumentRepository implements IDocumentRepository {
  private _documentDataSource: IDocumentDataSource;

  constructor(
    @inject("documentDataSource") documentDataSource: IDocumentDataSource,
  ) {
    this._documentDataSource = documentDataSource;
  }

  async addDocument(doc: Document, model: IModel) {
    await this._documentDataSource.addOne({
      doc: doc,
      model: model,
    });
  }

  async deleteDocument(docName: string, model: IModel): Promise<void> {
    await this._documentDataSource.deleteOne({
      docName: docName,
      model: model,
    });
  }

  async getDocuments(model: IModel): Promise<Document[]> {
    return await this._documentDataSource.getAll(model);
  }

  async getDocumentContent(docName: string, model: IModel): Promise<string> {
    return await this._documentDataSource.getContent({
      docName: docName,
      model: model,
    });
  }

  async updateDocument(
    docName: string,
    model: IModel,
    tag: Metadatas,
  ): Promise<void> {
    await this._documentDataSource.updateOne({
      docName: docName,
      model: model,
      tag: tag,
    });
  }
}

export { DocumentRepository };
