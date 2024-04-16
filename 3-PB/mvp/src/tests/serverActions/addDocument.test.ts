// npx jest src/tests/serverActions/addDocument.test.ts --coverage
import "reflect-metadata";
import { addDocument } from '@/serverActions/document/addDocument';
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


describe('addDocument server action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica che addDocument lanci un errore con esito negativo', async () => {
    
    const mockResponse = {
      ok: false,
      json: async () => ({ error: "Errore durante l'aggiunta" }),
    };

    addDocumentController.handle = jest.fn().mockResolvedValueOnce(mockResponse as Response);

    const data = new FormData();
        data.set("file", new File(['document content'], 'document.txt'));
        data.set("model", 'Ollama');

    try {
      await addDocument(data);
    } catch (error: any) {
        expect(error.message).toBe("Errore durante l'aggiunta");
    }
  });
});