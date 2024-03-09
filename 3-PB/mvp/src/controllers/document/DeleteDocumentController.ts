import { DeleteDocumentUsecase } from "@/usecase/document/DeleteDocumentUsecase";
import { injectable, inject } from "tsyringe";
import { DeleteEmbeddingUsecase } from "@/usecase/embeddings/DeleteEmbeddingUsecase";

@injectable()
class DeleteDocumentController {
  private readonly _useCase: DeleteDocumentUsecase;
  private readonly _useCaseE: DeleteEmbeddingUsecase;

  constructor(
    @inject("delDocUsecase") useCase: DeleteDocumentUsecase,
    @inject("deleteEmbeddingUsecase") useCaseE: DeleteEmbeddingUsecase,
  ) {
    this._useCase = useCase;
    this._useCaseE = useCaseE;
  }

  async handle(docName: string, model: string): Promise<Response> {
    await this._useCase.execute({ docName: docName, model: model });
    await this._useCaseE.execute({ docName: docName, model: model });
    return Response.json("", {
      status: 200,
      statusText: "OK",
    });
  }
}

export { DeleteDocumentController };
