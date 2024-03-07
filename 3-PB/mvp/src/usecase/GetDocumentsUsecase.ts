import type {IDocumentRepository, IUsecase} from "@/utils/interfaces";
import {Document} from "@/domain/entity/Document";
import {injectable, inject} from "tsyringe";

@injectable()
class GetDocumentsUsecase implements IUsecase<{ model: string }, Promise<Document[]>>{
    private readonly _documentRepository : IDocumentRepository;

    constructor( @inject("documentRepository") documentRepository: IDocumentRepository) {
        this._documentRepository = documentRepository;
    }

    async execute({model}:{model: string}) : Promise<Document[]> {
        return await this._documentRepository.getDocuments(model);
    }
}

export {GetDocumentsUsecase}