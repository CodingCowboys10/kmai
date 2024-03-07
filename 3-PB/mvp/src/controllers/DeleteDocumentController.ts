import {DeleteDocumentUsecase} from "@/usecase/DeleteDocumentUsecase";
import {injectable, inject} from "tsyringe";

@injectable()
class DeleteDocumentController {
    private readonly _useCase: DeleteDocumentUsecase;

    constructor(@inject("delDocUsecase") useCase: DeleteDocumentUsecase) {
        this._useCase = useCase;
    }

    async handle(docName: string, model: string): Promise<Response>{
        await this._useCase.execute({docName: docName, model: model});
        return Response.json("", {
            status: 200,
            statusText: "OK"
        })
    }
}

export {DeleteDocumentController};