// npx jest src/tests/controllers/GetDocumentContentController.test.ts --coverage
import "reflect-metadata";
import { GetDocumentContentUsecase } from '@/usecase/document/GetDocumentContentUsecase';
import { GetDocumentContentController } from '@/controllers/document/GetDocumentContentController';
import { IDocumentRepository, IModel } from '@/lib/config/interfaces';

const mockDocumentRepository: jest.Mocked<IDocumentRepository> = {
    addDocument: jest.fn(),
    deleteDocument: jest.fn(),
    updateDocument: jest.fn(),
    getDocumentContent: jest.fn(),
    getDocuments: jest.fn(),
};

const mockGetDocumentUsecase: GetDocumentContentUsecase = new GetDocumentContentUsecase(mockDocumentRepository);
mockGetDocumentUsecase.execute = jest.fn();

const getDocumentController: GetDocumentContentController = new GetDocumentContentController(mockGetDocumentUsecase);

describe('GetDocumentContentController', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che GetDocumentContentController chiami correttamente DeleteDocumentUsecase", async () => {

        const docName = 'exampleDocument';
        const model: IModel = 'OpenAi';
  
        await getDocumentController.handle(docName, model);
        expect(mockGetDocumentUsecase.execute).toHaveBeenCalledWith({docName, model});
    });

    it("Verifica che GetDocumentContentController restituisca status 200 con esito positivo", async () => {

        const docName = 'exampleDocument';
        const model: IModel = 'OpenAi';

        const response = await getDocumentController.handle(docName, model);

        expect(response.status).toBe(200);
    });

    it("Verifica che GetDocumentContentController restituisca status 500 con esito negativo", async () => {

        const docName = 'exampleDocument';
        const model: IModel = 'OpenAi';

        const mockError = new Error('Internal Server Error');
        const mockGetDocumentUsecase500: GetDocumentContentUsecase = new GetDocumentContentUsecase(mockDocumentRepository);
        mockGetDocumentUsecase500.execute = jest.fn().mockRejectedValueOnce(mockError);
      
        const getDocumentController500: GetDocumentContentController = new GetDocumentContentController(mockGetDocumentUsecase500);

        const response = await getDocumentController500.handle(docName, model);

        expect(response.status).toBe(500);

    });
});