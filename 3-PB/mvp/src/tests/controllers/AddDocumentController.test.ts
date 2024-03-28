// npx jest src/tests/controllers/AddDocumentController.test.ts --coverage
import "reflect-metadata";
import { AddDocumentUsecase } from '@/usecase/document/AddDocumentUsecase';
import { AddDocumentController } from '@/controllers/document/AddDocumentController';
import { IDocumentRepository, IEmbeddingRepository } from '@/lib/config/interfaces';

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

const mockAddDocumentUsecase: AddDocumentUsecase = new AddDocumentUsecase(mockDocumentRepository, mockEmbeddingRepository);
mockAddDocumentUsecase.execute = jest.fn();

const addDocumentController: AddDocumentController = new AddDocumentController(mockAddDocumentUsecase);

describe('AddDocumentController', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che AddDocumentController chiami correttamente AddDocumentUsecase", async () => {

        const data = new FormData();
        data.set("file", new File(['document content'], 'document.txt'));
        data.set("model", 'Ollama');
  
        await addDocumentController.handle(data);
        expect(mockAddDocumentUsecase.execute).toHaveBeenCalledWith(data);
    });

    it("Verifica che AddDocumentController restituisca status 200 con esito positivo", async () => {

        const data = new FormData();
        data.set("file", new File(['document content'], 'document.txt'));
        data.set("model", 'Ollama');

        const response = await addDocumentController.handle(data);

        expect(response.status).toBe(200);
    });

    it("Verifica che AddDocumentController restituisca status 500 con esito negativo", async () => {

        const data = new FormData();
        data.set("file", new File(['document content'], 'document.txt'));
        data.set("model", 'Ollama');

        const mockError = new Error('Internal Server Error');
        const mockAddDocumentUsecase500: AddDocumentUsecase = new AddDocumentUsecase(mockDocumentRepository, mockEmbeddingRepository);
        mockAddDocumentUsecase500.execute = jest.fn().mockRejectedValueOnce(mockError);
      
        const addDocumentController500: AddDocumentController = new AddDocumentController(mockAddDocumentUsecase500);

        const response = await addDocumentController500.handle(data);

        expect(response.status).toBe(500);

    });
});