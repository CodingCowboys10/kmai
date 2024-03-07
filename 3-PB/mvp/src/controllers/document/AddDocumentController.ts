import {AddDocumentUsecase} from "@/usecase/document/AddDocumentUsecase";
import {injectable, inject} from "tsyringe";

@injectable()
class AddDocumentController {
    private readonly _useCase: AddDocumentUsecase;

    constructor( @inject("addDocUsecase") useCase: AddDocumentUsecase) {
        this._useCase = useCase;
    }

    async handle(data: FormData): Promise<Response>{
        const model = data.get('model')!.toString();
        const file: File | null = data.get('file') as unknown as File;
        if (!file) {
            return Response.json("", {
                status: 500,
                statusText: "Internal error"
            })

        }
        await this._useCase.execute({file: file, model: model});
        return Response.json("", {
            status: 200,
            statusText: "OK"
        })
    }
}

export {AddDocumentController};