import {GetDocumentContentUsecase} from "@/usecase/document/GetDocumentContentUsecase";
import {injectable, inject} from "tsyringe";

@injectable()
class GetDocumentContentController {
    private readonly _useCase: GetDocumentContentUsecase;

    constructor(@inject("getDocContUsecase") useCase: GetDocumentContentUsecase) {
        this._useCase = useCase;
    }

    async handle(docName: string, model: string): Promise<Response>{
        const url = await this._useCase.execute({docName: docName, model: model});
        return Response.json({url:url}, {
            status: 200,
            statusText: "OK"
        })
    }
}

export {GetDocumentContentController};