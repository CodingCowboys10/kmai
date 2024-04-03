// npx jest src/tests/serverActions/getDocumentContent.test.ts --coverage

import "reflect-metadata";
import { getDocumentContent } from '@/serverActions/document/getDocumentContent';
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

const mockGetDocumentContentUsecase: GetDocumentContentUsecase = new GetDocumentContentUsecase(mockDocumentRepository);
mockGetDocumentContentUsecase.execute = jest.fn();

const getDocumentContentController: GetDocumentContentController = new GetDocumentContentController(mockGetDocumentContentUsecase);

describe('getDocumentContent server action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica che getDocumentContent lanci un errore con esito negativo', async () => {
    
    const mockResponse = {
        ok: false,
        json: async () => ({ error: "Internal Server Error" }),
    };
    
    const docName = 'exampleDocument';
    const model: IModel = 'OpenAi';
    getDocumentContentController.handle = jest.fn().mockResolvedValueOnce(mockResponse as Response);
    
    try {
        await getDocumentContent(docName, model);
    } catch (error: any) {
        expect(error.message).toBe('Internal Server Error');
    }

  });

});