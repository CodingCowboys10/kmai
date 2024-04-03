// npx jest src/tests/controllers/DeleteDocumentController.test.ts --coverage
import "reflect-metadata";
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

describe('DeleteDocumentController', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che DeleteDocumentController chiami correttamente DeleteDocumentUsecase", async () => {

        const docName = 'exampleDocument';
        const model: IModel = 'OpenAi';
  
        await deleteDocumentController.handle(docName, model);
        expect(mockDeleteDocumentUsecase.execute).toHaveBeenCalledWith({docName, model});
    });

    it("Verifica che DeleteDocumentController restituisca status 200 con esito positivo", async () => {

        const docName = 'exampleDocument';
        const model: IModel = 'OpenAi';

        const response = await deleteDocumentController.handle(docName, model);

        expect(response.status).toBe(200);
    });

    it("Verifica che DeleteDocumentController restituisca status 500 con esito negativo", async () => {

        const docName = 'exampleDocument';
        const model: IModel = 'OpenAi';

        const mockError = new Error('Internal Server Error');
        const mockDeleteDocumentUsecase500: DeleteDocumentUsecase = new DeleteDocumentUsecase(mockDocumentRepository, mockEmbeddingRepository);
        mockDeleteDocumentUsecase500.execute = jest.fn().mockRejectedValueOnce(mockError);
      
        const deleteDocumentController500: DeleteDocumentController = new DeleteDocumentController(mockDeleteDocumentUsecase500);

        const response = await deleteDocumentController500.handle(docName, model);

        expect(response.status).toBe(500);

    });
});