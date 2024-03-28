// npx jest src/tests/controllers/GetDocumentsController.test.ts --coverage
import "reflect-metadata";
import { GetDocumentsUsecase } from '@/usecase/document/GetDocumentsUsecase';
import { GetDocumentsController } from '@/controllers/document/GetDocumentsController';
import { IDocumentRepository, IModel, Document } from '@/lib/config/interfaces';

const mockDocumentRepository: jest.Mocked<IDocumentRepository> = {
    addDocument: jest.fn(),
    deleteDocument: jest.fn(),
    updateDocument: jest.fn(),
    getDocumentContent: jest.fn(),
    getDocuments: jest.fn(),
};

const mockGetDocumentUsecase: GetDocumentsUsecase = new GetDocumentsUsecase(mockDocumentRepository);
mockGetDocumentUsecase.execute = jest.fn();

const getDocumentController: GetDocumentsController = new GetDocumentsController(mockGetDocumentUsecase);

describe('GetDocumentsController', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("Verifica che GetDocumentsController chiami correttamente GetDocumentContentUsecase", async () => {

        const model: IModel = 'OpenAi';
  
        await getDocumentController.handle(model);
        expect(mockGetDocumentUsecase.execute).toHaveBeenCalledWith({model});
    });

    it("Verifica che GetDocumentsController restituisca status 200 con esito positivo", async () => {

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

        const mockGetDocumentUsecase200: GetDocumentsUsecase = new GetDocumentsUsecase(mockDocumentRepository);
        mockGetDocumentUsecase200.execute = jest.fn().mockResolvedValueOnce(expectedDocuments);

        const response = await getDocumentController.handle(model);

        expect(response.status).toBe(200);
    });

    it("Verifica che GetDocumentsController restituisca status 500 con esito negativo", async () => {

        const model: IModel = 'OpenAi';

        const mockError = new Error('Internal Server Error');
        const mockGetDocumentUsecase500: GetDocumentsUsecase = new GetDocumentsUsecase(mockDocumentRepository);
        mockGetDocumentUsecase500.execute = jest.fn().mockRejectedValueOnce(mockError);
      
        const getDocumentController500: GetDocumentsController = new GetDocumentsController(mockGetDocumentUsecase500);

        const response = await getDocumentController500.handle(model);

        expect(response.status).toBe(500);

    });
});