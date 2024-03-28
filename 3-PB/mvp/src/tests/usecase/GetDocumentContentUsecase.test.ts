// npx jest src/tests/usecase/GetDocumentContentUsecase.test.ts --coverage
import "reflect-metadata";
import { GetDocumentContentUsecase } from '@/usecase/document/GetDocumentContentUsecase';
import { IDocumentRepository, IModel } from '@/lib/config/interfaces';

const mockDocumentRepository: jest.Mocked<IDocumentRepository> = {
    addDocument: jest.fn(),
    deleteDocument: jest.fn(),
    updateDocument: jest.fn(),
    getDocumentContent: jest.fn(),
    getDocuments: jest.fn(),
};

const getDocumentUsecase = new GetDocumentContentUsecase(mockDocumentRepository);

describe('GetDocumentUsecase', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che GetDocumentContentUsecase chiami correttamente DocumentRepository", async () => {
      
        const docName = 'exampleDocument';
        const model: IModel = 'OpenAi';
  
        const result = await getDocumentUsecase.execute({ docName, model });
        expect(mockDocumentRepository.getDocumentContent).toHaveBeenCalledWith(docName, model);
    });

    it("Verifica che GetDocumentContentUsecase restituisca l'url del documento recuperato dal DocumentRepository", async () => {
      
        const docName = 'exampleDocument';
        const model: IModel = 'OpenAi';
        const expectedContent = 'exampleUrlString';

        mockDocumentRepository.getDocumentContent.mockResolvedValueOnce(expectedContent);
  
        const result = await getDocumentUsecase.execute({ docName, model });
        expect(result).toBe(expectedContent);
    });
});