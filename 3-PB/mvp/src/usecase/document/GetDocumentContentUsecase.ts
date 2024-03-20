import type {
  IDocumentRepository,
  IModel,
  IUsecase,
} from "@/lib/config/interfaces";
import { inject, injectable } from "tsyringe";

@injectable()
class GetDocumentContentUsecase
  implements IUsecase<{ docName: string; model: IModel }, Promise<string>>
{
  private readonly _documentRepository: IDocumentRepository;

  constructor(
    @inject("documentRepository") documentRepository: IDocumentRepository,
  ) {
    this._documentRepository = documentRepository;
  }

  async execute({ docName, model }: { docName: string; model: IModel }) {
    return await this._documentRepository.getDocumentContent(docName, model);
  }
}

export { GetDocumentContentUsecase };
