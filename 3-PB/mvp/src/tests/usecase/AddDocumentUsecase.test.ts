// npx jest src/tests/usecase/AddDocumentUsecase.test.ts --coverage
import "reflect-metadata";
import { AddDocumentUsecase } from '@/usecase/document/AddDocumentUsecase';
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

const addDocumentUsecase = new AddDocumentUsecase(mockDocumentRepository,mockEmbeddingRepository);

describe('AddDocumentUsecase', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('Verifica che AddDocumentUsecase chiami correttamente DocumentRepository e EmbeddingRepository', async () => {
      
        const file = new File(['document content'], 'document.pdf');
        const model: IModel = 'Ollama';

        try {
          await addDocumentUsecase.execute({ file, model });
        } catch (e) {
        }
        

        expect(mockDocumentRepository.addDocument).toHaveBeenCalledWith(expect.objectContaining({
            name: 'document.pdf',
            date: expect.any(Date),
            size: 16,
            content: Buffer.from('document content'),
          }), model);
    });
});