// npx jest src/tests/serverActions/updateDocument.test.ts --coverage

import "reflect-metadata";
import { updateDocument } from '@/serverActions/document/updateDocument';
import { UpdateDocumentUsecase } from '@/usecase/document/UpdateDocumentUsecase';
import { UpdateDocumentController } from '@/controllers/document/UpdateDocumentController';
import { IDocumentRepository, IModel, IEmbeddingRepository, Metadatas } from '@/lib/config/interfaces';

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

describe('updateDocument server action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica che updateDocument lanci un errore con esito negativo', async () => {
    
    const mockResponse = {
        ok: false,
        json: async () => ({ error: "Errore durante l'aggiornamento" }),
    };
    
    const docName = 'exampleDocument';
    const model: IModel = 'OpenAi';
    const updatedMetadas: Metadatas = {
      visibility: true,
    };
    updateDocumentController.handle = jest.fn().mockResolvedValueOnce(mockResponse as Response);
    
    try {
        await updateDocument(docName, model, updatedMetadas);
    } catch (error: any) {
        expect(error.message).toBe("Errore durante l'aggiornamento");
    }

  });


});