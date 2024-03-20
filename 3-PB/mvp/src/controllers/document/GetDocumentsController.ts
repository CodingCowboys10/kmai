import { GetDocumentsUsecase } from "@/usecase/document/GetDocumentsUsecase";
import { injectable, inject } from "tsyringe";
import { NextResponse } from "next/server";
import { IModel } from "@/lib/config/interfaces";

@injectable()
class GetDocumentsController {
  private readonly _useCase: GetDocumentsUsecase;

  constructor(@inject("getDocsUsecase") useCase: GetDocumentsUsecase) {
    this._useCase = useCase;
  }

  async handle(model: IModel): Promise<Response> {
    try {
      const docs = await this._useCase.execute({ model: model });
      const datas = docs.map((doc) => {
        return {
          id: doc.name,
          data: doc.date.toLocaleString("it-IT"),
          size: (doc.size / 1000).toFixed(2),
          url: typeof doc.content === "string" ? doc.content : "",
        };
      });
      return NextResponse.json(datas, {
        status: 200,
        statusText: "Ok",
      });
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { error: "Internal Server Error Retrieving the Document" },
        {
          status: 500,
        },
      );
    }
  }
}

export { GetDocumentsController };
