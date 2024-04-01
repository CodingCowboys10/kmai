import { AddDocumentUsecase } from "@/usecase/document/AddDocumentUsecase";
import { injectable, inject } from "tsyringe";
import { NextResponse } from "next/server";
import { IModel } from "@/lib/config/interfaces";

@injectable()
class AddDocumentController {
  private readonly _useCase: AddDocumentUsecase;

  constructor(@inject("addDocUsecase") useCase: AddDocumentUsecase) {
    this._useCase = useCase;
  }

  async handle(data: FormData): Promise<Response> {
    try {
      const model: IModel = data.get("model")!.toString() as IModel;
      const file: File | null = data.get("file") as unknown as File;
      if (!file) {
        return Response.json("", {
          status: 500,
          statusText: "Internal error",
        });
      }
      await this._useCase.execute({ file: file, model: model });

      return NextResponse.json(
        { message: "Documento inserito correttamente" },
        {
          status: 200,
          statusText: "OK",
        },
      );
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { error: "Errore durante l'aggiunta" },
        {
          status: 500,
        },
      );
    }
  }
}

export { AddDocumentController };
