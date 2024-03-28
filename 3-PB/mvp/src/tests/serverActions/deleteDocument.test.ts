// npx jest src/tests/serverActions/deleteDocument.test.ts --coverage
import "reflect-metadata";
import { deleteDocument } from '@/serverActions/document/deleteDocument';
import { DeleteDocumentUsecase } from '@/usecase/document/DeleteDocumentUsecase';
import { DeleteDocumentController } from '@/controllers/document/DeleteDocumentController';
import { IDocumentRepository, IEmbeddingRepository, IModel } from '@/lib/config/interfaces';

const mockDocumentRepository: jest.Mocked<IDocumentRepository> = {
    addDocument: jest.fn(),
    deleteDocument: jest.fn(),
    updateDocument: jest.fn(),
    getDocumentContent: jest.fn(),
    getDocuments: jest.fn(),
};

  const mockEmbeddingRepository: jest.Mocked<IEmbeddingRepository> = {
    addEmbedding: jest.fn(),
    updateMetadatas: jest.fn(),
    getIdsEmbedding: jest.fn(),
    deleteEmbedding: jest.fn(),
};

const mockDeleteDocumentUsecase: DeleteDocumentUsecase = new DeleteDocumentUsecase(mockDocumentRepository, mockEmbeddingRepository);
mockDeleteDocumentUsecase.execute = jest.fn();

const deleteDocumentController: DeleteDocumentController = new DeleteDocumentController(mockDeleteDocumentUsecase);

describe('deleteDocument server action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica che deleteDocument lanci un errore con esito negativo', async () => {
    
    const mockResponse = {
      ok: false,
      json: async () => ({ error: "Errore durante l'eliminazione" }),
    };

    const name = 'exampleDocument';
    const model: IModel = 'OpenAi';

    deleteDocumentController.handle = jest.fn().mockResolvedValueOnce(mockResponse as Response);

    try {
      await deleteDocument({name, model});
    } catch (error: any) {
        expect(error.message).toBe("Errore durante l'eliminazione");
    }
  });
});