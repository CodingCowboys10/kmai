import { DeleteDocumentUsecase } from "@/usecase/document/DeleteDocumentUsecase";
import { injectable, inject } from "tsyringe";
import { NextResponse } from "next/server";
import { IModel } from "@/lib/config/interfaces";

@injectable()
class DeleteDocumentController {
  private readonly _useCase: DeleteDocumentUsecase;

  constructor(@inject("delDocUsecase") useCase: DeleteDocumentUsecase) {
    this._useCase = useCase;
  }

  async handle(docName: string, model: IModel): Promise<Response> {
    try {
      await this._useCase.execute({ docName: docName, model: model });
      return NextResponse.json(
        { message: "Documento eliminato correttamente" },
        {
          status: 200,
          statusText: "OK",
        },
      );
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { error: "Errore durante l'eliminazione" },
        {
          status: 500,
        },
      );
    }
  }
}

export { DeleteDocumentController };
