import type {
  Document,
  IDocumentRepository,
  IUsecase,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";

@injectable()
class GetDocumentsUsecase
  implements IUsecase<{ model: IModel }, Promise<Document[]>>
{
  private readonly _documentRepository: IDocumentRepository;

  constructor(
    @inject("documentRepository") documentRepository: IDocumentRepository,
  ) {
    this._documentRepository = documentRepository;
  }

  async execute({ model }: { model: string }): Promise<Document[]> {
    return await this._documentRepository.getDocuments(model);
  }
}

export { GetDocumentsUsecase };
