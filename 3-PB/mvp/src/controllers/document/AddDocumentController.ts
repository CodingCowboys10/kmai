import { AddDocumentUsecase } from "@/usecase/document/AddDocumentUsecase";
import { injectable, inject } from "tsyringe";
import { AddEmbeddingUsecase } from "@/usecase/embeddings/AddEmbeddingUsecase";

@injectable()
class AddDocumentController {
  private readonly _useCase: AddDocumentUsecase;
  private readonly _useCaseE: AddEmbeddingUsecase;

  constructor(
    @inject("addDocUsecase") useCase: AddDocumentUsecase,
    @inject("addEmbeddingUsecase") useCaseE: AddEmbeddingUsecase,
  ) {
    this._useCase = useCase;
    this._useCaseE = useCaseE;
  }

  async handle(data: FormData): Promise<Response> {
    const model: string = data.get("model")!.toString();
    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      return Response.json("", {
        status: 500,
        statusText: "Internal error",
      });
    }
    await this._useCase.execute({ file: file, model: model });
    await this._useCaseE.execute({ file: file, model: model });
    return Response.json("", {
      status: 200,
      statusText: "OK",
    });
  }
}

export { AddDocumentController };
