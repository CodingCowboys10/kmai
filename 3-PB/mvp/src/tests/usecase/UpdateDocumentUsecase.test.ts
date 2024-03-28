// npx jest src/tests/usecase/UpdateDocumentUsecase.test.ts --coverage
import "reflect-metadata";
import { UpdateDocumentUsecase } from '@/usecase/document/UpdateDocumentUsecase';
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

const updateDocumentUsecase = new UpdateDocumentUsecase(mockDocumentRepository,mockEmbeddingRepository);

describe('UpdateDocumentUsecase', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('Verifica che UpdateDocumentUsecase chiami correttamente DocumentRepository e EmbeddingRepository', async () => {
      
        const docName = 'exampleDocument';
        const model: IModel = 'OpenAi';
        const updatedMetadas: Metadatas = {
          visibility: true,
        };

        mockEmbeddingRepository.getIdsEmbedding.mockResolvedValueOnce(['id1', 'id2']);
  
        await updateDocumentUsecase.execute({ docName, model, updatedMetadas });

        expect(mockDocumentRepository.updateDocument).toHaveBeenCalledWith(docName, model, updatedMetadas);
        expect(mockEmbeddingRepository.getIdsEmbedding).toHaveBeenCalledWith(docName, model);
        const metadatas = updatedMetadas;
        expect(mockEmbeddingRepository.updateMetadatas).toHaveBeenCalledWith(metadatas, model, ['id1', 'id2']);
    });
});