import { UpdateDocumentUsecase } from "@/usecase/document/UpdateDocumentUsecase";
import { injectable, inject } from "tsyringe";
import { NextResponse } from "next/server";
import { IModel } from "@/lib/config/interfaces";

@injectable()
class UpdateDocumentController {
  private readonly _useCase: UpdateDocumentUsecase;

  constructor(@inject("updateDocUsecase") useCase: UpdateDocumentUsecase) {
    this._useCase = useCase;
  }

  async handle(docName: string, model: IModel, visibility: boolean): Promise<Response> {
    try {
      await this._useCase.execute({ docName: docName, model: model, visibility: visibility });
      return NextResponse.json(
        { message: "Documento aggiornato correttamente" },
        {
          status: 200,
          statusText: "OK",
        },
      );
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { error: "Errore durante l'aggiornamento" },
        {
          status: 500,
        },
      );
    }
  }
}

export { UpdateDocumentController };
