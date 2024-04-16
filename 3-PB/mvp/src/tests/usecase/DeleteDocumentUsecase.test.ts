// npx jest src/tests/usecase/DeleteDocumentUsecase.test.ts --coverage
import "reflect-metadata";
import { DeleteDocumentUsecase } from '@/usecase/document/DeleteDocumentUsecase';
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

const deleteDocumentUsecase = new DeleteDocumentUsecase(mockDocumentRepository,mockEmbeddingRepository);

describe('DeleteDocumentUsecase', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('Verifica che DeleteDocumentUsecase chiami correttamente DocumentRepository e EmbeddingRepository', async () => {
      
        const docName = 'exampleDocument';
        const model: IModel = 'OpenAi';

        mockEmbeddingRepository.getIdsEmbedding.mockResolvedValueOnce(['id1', 'id2']);
  
        await deleteDocumentUsecase.execute({ docName, model });

        expect(mockDocumentRepository.deleteDocument).toHaveBeenCalledWith(docName, model);
        expect(mockEmbeddingRepository.getIdsEmbedding).toHaveBeenCalledWith(docName, model);
        expect(mockEmbeddingRepository.deleteEmbedding).toHaveBeenCalledWith(['id1', 'id2'], model);
    });
});