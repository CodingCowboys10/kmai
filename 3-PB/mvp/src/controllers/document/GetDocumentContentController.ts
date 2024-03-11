import { GetDocumentContentUsecase } from "@/usecase/document/GetDocumentContentUsecase";
import { injectable, inject } from "tsyringe";
import { NextResponse } from "next/server";

@injectable()
class GetDocumentContentController {
  private readonly _useCase: GetDocumentContentUsecase;

  constructor(@inject("getDocContUsecase") useCase: GetDocumentContentUsecase) {
    this._useCase = useCase;
  }

  async handle(docName: string, model: string): Promise<Response> {
    try {
      const url = await this._useCase.execute({
        docName: docName,
        model: model,
      });
      return NextResponse.json(
        { url: url },
        {
          status: 200,
          statusText: "OK",
        },
      );
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { error: "Internal Server Error" },
        {
          status: 500,
        },
      );
    }
  }
}

export { GetDocumentContentController };
