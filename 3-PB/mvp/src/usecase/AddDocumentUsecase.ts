import {Document} from "@/domain/entity/Document";
import type {IDocumentRepository, IUsecase} from "@/utils/interfaces";
import {injectable, inject} from "tsyringe";

@injectable()
class AddDocumentUsecase implements IUsecase<{file: File, model: string }, void>{
    private readonly _documentRepository : IDocumentRepository;

    constructor(@inject("documentRepository") documentRepository: IDocumentRepository) {
        this._documentRepository = documentRepository;
    }

    async execute({file, model}: {file: File, model: string }) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const name =`${file.name}`;
        const size = `${file.size}`;
        const date = new Date();
        const doc: Document = {
            name: name,
            date: date,
            size: parseFloat(size),
            content: buffer
        };
        return this._documentRepository.addDocument(doc, model);
    }
}

export {AddDocumentUsecase}