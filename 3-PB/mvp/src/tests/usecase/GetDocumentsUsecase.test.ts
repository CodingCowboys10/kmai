// npx jest src/tests/usecase/GetDocumentsUsecase.test.ts --coverage
import "reflect-metadata";
import { GetDocumentsUsecase } from '@/usecase/document/GetDocumentsUsecase';
import { IDocumentRepository, IModel, Document } from '@/lib/config/interfaces';

const mockDocumentRepository: jest.Mocked<IDocumentRepository> = {
    addDocument: jest.fn(),
    deleteDocument: jest.fn(),
    updateDocument: jest.fn(),
    getDocumentContent: jest.fn(),
    getDocuments: jest.fn(),
};

const getDocumentsUsecase = new GetDocumentsUsecase(mockDocumentRepository);

describe('GetDocumentUsecase', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che GetDocumentsUsecase chiami correttamente DocumentRepository", async () => {
      
        const model: IModel = 'OpenAi';
  
        const result = await getDocumentsUsecase.execute({ model });
        expect(mockDocumentRepository.getDocuments).toHaveBeenCalledWith(model);
    });

    it("Verifica che GetDocumentsUsecase restituisca i documenti ritornati dal DocumentRepository", async () => {
      
        const model: IModel = 'OpenAi';
        const expectedDocuments: Document[] = [
            {
              name: 'Document 1',
              date: new Date(),
              size: 17,
              content: '',
              tag: 'visibility=visible',
            },
            {
              name: 'Document 2',
              date: new Date(),
              size: 17,
              tag: 'visibility=visible',
            }
          ];

        mockDocumentRepository.getDocuments.mockResolvedValueOnce(expectedDocuments);
  
        const result = await getDocumentsUsecase.execute({ model });
        expect(result).toBe(expectedDocuments);
    });
});