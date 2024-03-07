import {GetDocumentsUsecase} from "@/usecase/GetDocumentsUsecase";
import {injectable, inject} from "tsyringe";

@injectable()
class GetDocumentsController {
    private readonly _useCase: GetDocumentsUsecase;

    constructor(@inject("getDocsUsecase") useCase: GetDocumentsUsecase) {
        this._useCase = useCase;
    }

    async handle(model: string): Promise<Response>{
        const docs = await this._useCase.execute({model: model});
        const datas = docs.map((doc) =>{
            return {
                id: doc.name,
                data: doc.date.toISOString(),
                size: doc.size,
                url: typeof doc.content === 'string'? doc.content : ""
            }
        })
        return Response.json(datas, {
            status: 200,
            statusText: "Ok"
        });
    }
}

export {GetDocumentsController};