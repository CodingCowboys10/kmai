// npx jest src/tests/serverActions/getDocuments.test.ts --coverage

import "reflect-metadata";
import { getDocument } from '@/serverActions/document/getDocument';
import { GetDocumentsUsecase } from '@/usecase/document/GetDocumentsUsecase';
import { GetDocumentsController } from '@/controllers/document/GetDocumentsController';
import { IDocumentRepository, IModel } from '@/lib/config/interfaces';

const mockDocumentRepository: jest.Mocked<IDocumentRepository> = {
    addDocument: jest.fn(),
    deleteDocument: jest.fn(),
    updateDocument: jest.fn(),
    getDocumentContent: jest.fn(),
    getDocuments: jest.fn(),
};

const mockGetDocumentsUsecase: GetDocumentsUsecase = new GetDocumentsUsecase(mockDocumentRepository);
mockGetDocumentsUsecase.execute = jest.fn();

const getDocumentsController: GetDocumentsController = new GetDocumentsController(mockGetDocumentsUsecase);

describe('getDocument server action', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica che getDocument lanci un errore con esito negativo', async () => {
    
    const mockResponse = {
        ok: false,
        json: async () => ({ error: "Internal Server Error Retrieving the Document" }),
    };
    
    const model: IModel = 'OpenAi';
    getDocumentsController.handle = jest.fn().mockResolvedValueOnce(mockResponse as Response);
    
    try {
        await getDocument(model);
    } catch (error: any) {
        expect(error.message).toBe('Internal Server Error Retrieving the Document');
    }

  });


});