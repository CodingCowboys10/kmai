import type {IDocumentRepository, IUsecase} from "@/utils/interfaces";
import {injectable, inject} from "tsyringe";

@injectable()
class DeleteDocumentUsecase implements IUsecase<{docName: string, model: string }, void>{
    private readonly _documentRepository : IDocumentRepository;

    constructor(@inject("documentRepository")documentRepository: IDocumentRepository) {
        this._documentRepository = documentRepository;
    }

    async execute({docName, model}: {docName: string, model: string }) {
        return this._documentRepository.deleteDocument(docName, model);
    }
}

export {DeleteDocumentUsecase}