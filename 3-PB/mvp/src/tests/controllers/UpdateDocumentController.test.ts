// npx jest src/tests/controllers/UpdateDocumentController.test.ts --coverage
import "reflect-metadata";
import { UpdateDocumentUsecase } from '@/usecase/document/UpdateDocumentUsecase';
import { UpdateDocumentController } from '@/controllers/document/UpdateDocumentController';
import { IDocumentRepository, IEmbeddingRepository, IModel, Metadatas } from '@/lib/config/interfaces';

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

const mockUpdateDocumentUsecase: UpdateDocumentUsecase = new UpdateDocumentUsecase(mockDocumentRepository, mockEmbeddingRepository);
mockUpdateDocumentUsecase.execute = jest.fn();

const updateDocumentController: UpdateDocumentController = new UpdateDocumentController(mockUpdateDocumentUsecase);

describe('UpdateDocumentController', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che UpdateDocumentController chiami correttamente UpdateDocumentUsecase", async () => {

        const docName = 'exampleDocument';
        const model: IModel = 'OpenAi';
        const updatedMetadas: Metadatas = {
            visibility: true,
          };
  
        await updateDocumentController.handle(docName, model, updatedMetadas);
        expect(mockUpdateDocumentUsecase.execute).toHaveBeenCalledWith({docName, model, updatedMetadas});
    });

    it("Verifica che UpdateDocumentController restituisca status 200 con esito positivo", async () => {

        const docName = 'exampleDocument';
        const model: IModel = 'OpenAi';
        const updatedMetadas: Metadatas = {
            visibility: true,
          };

        const response = await updateDocumentController.handle(docName, model, updatedMetadas);

        expect(response.status).toBe(200);
    });

    it("Verifica che UpdateDocumentController restituisca status 500 con esito negativo", async () => {

        const docName = 'exampleDocument';
        const model: IModel = 'OpenAi';
        const updatedMetadas: Metadatas = {
            visibility: true,
          };

        const mockError = new Error('Internal Server Error');
        const mockUpdateDocumentUsecase500: UpdateDocumentUsecase = new UpdateDocumentUsecase(mockDocumentRepository, mockEmbeddingRepository);
        mockUpdateDocumentUsecase500.execute = jest.fn().mockRejectedValueOnce(mockError);
      
        const updateDocumentController500: UpdateDocumentController = new UpdateDocumentController(mockUpdateDocumentUsecase500);

        const response = await updateDocumentController500.handle(docName, model, updatedMetadas);

        expect(response.status).toBe(500);

    });
});