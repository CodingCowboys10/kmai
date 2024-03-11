import { DeleteDocumentUsecase } from "@/usecase/document/DeleteDocumentUsecase";
import { injectable, inject } from "tsyringe";
import { DeleteEmbeddingUsecase } from "@/usecase/embeddings/DeleteEmbeddingUsecase";
import { NextResponse } from "next/server";
import { GetIdsEmbeddingUsecase } from "@/usecase/embeddings/GetIdsEmbeddingUsecase";

@injectable()
class DeleteDocumentController {
  private readonly _useCase: DeleteDocumentUsecase;
  private readonly _useCaseE: DeleteEmbeddingUsecase;
  private readonly _useCaseI: GetIdsEmbeddingUsecase;

  constructor(
    @inject("delDocUsecase") useCase: DeleteDocumentUsecase,
    @inject("getIdsEmbeddingUsecase") useCaseI: GetIdsEmbeddingUsecase,
    @inject("deleteEmbeddingUsecase") useCaseE: DeleteEmbeddingUsecase,
  ) {
    this._useCase = useCase;
    this._useCaseE = useCaseE;
    this._useCaseI = useCaseI;
  }

  async handle(docName: string, model: string): Promise<Response> {
    try {
      await this._useCase.execute({ docName: docName, model: model });
      const ids = await this._useCaseI.execute({
        docName: docName,
        model: model,
      });
      console.log(ids);
      await this._useCaseE.execute({ ids: ids, model: model });
      return NextResponse.json(
        { message: "Document Deleted successfully" },
        {
          status: 200,
          statusText: "OK",
        },
      );
    } catch (e) {
      console.error(e);
      return NextResponse.json(
        { error: "Internal Server Error during the Delete" },
        {
          status: 500,
        },
      );
    }
  }
}

export { DeleteDocumentController };
