// npx jest src/tests/infrastructure/DocumentRepository.test.ts --coverage
import "reflect-metadata";
import { DocumentRepository } from "@/infrastructure/documentRepository";
import { IDocumentDataSource, Document, IModel, Metadatas } from "@/lib/config/interfaces";

const mockDocumentDataSource: jest.Mocked<IDocumentDataSource> = {
  addOne: jest.fn(),
  deleteOne: jest.fn(),
  updateOne: jest.fn(),
  getAll: jest.fn(),
  getContent: jest.fn(),
};

const documentRepository = new DocumentRepository(mockDocumentDataSource);

describe('DocumentRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verifica che il metodo addDocument di DocumentRepository chiami correttamente addOne di MinioDataSource', async () => {
    const doc: Document = {
      name: 'document.pdf',
      date: new Date(),
      size: 100,
      content: Buffer.from('document content'),
    };
    const model: IModel = 'Ollama';

    await documentRepository.addDocument(doc, model);

    expect(mockDocumentDataSource.addOne).toHaveBeenCalledWith({ doc, model });
  });

  it('Verifica che il metodo deleteDocument di DocumentRepository chiami correttamente deleteOne di MinioDataSource', async () => {
    
    const docName = 'ExampleDocument';
    const model: IModel = 'Ollama';

    await documentRepository.deleteDocument(docName, model);

    expect(mockDocumentDataSource.deleteOne).toHaveBeenCalledWith({ docName, model });
  });

  it('Verifica che il metodo updateDocument di DocumentRepository chiami correttamente updateOne di MinioDataSource', async () => {
    
    const docName = 'ExampleDocument';
    const model: IModel = 'Ollama';
    const tag: Metadatas = {
        visibility: true,
      };

    await documentRepository.updateDocument(docName, model, tag);

    expect(mockDocumentDataSource.updateOne).toHaveBeenCalledWith({ docName, model, tag });
  });

  it('Verifica che il metodo getDocuments di DocumentRepository chiami correttamente getAll di MinioDataSource', async () => {
    
    const model: IModel = 'Ollama';

    await documentRepository.getDocuments(model);

    expect(mockDocumentDataSource.getAll).toHaveBeenCalledWith(model);
  });

  it('Verifica che il metodo getDocuments di DocumentRepository restituisca correttamente le informazioni sui documenti recuperati', async () => {
    
    const model: IModel = 'Ollama';
    const exampleDocuments: Document[] = [
      { name: 'Document 1', date: new Date(), size: 10 },
    ];

    mockDocumentDataSource.getAll.mockResolvedValue(exampleDocuments);

    const documents = await documentRepository.getDocuments(model);

    expect(mockDocumentDataSource.getAll).toHaveBeenCalledWith(model);
    expect(documents).toEqual(exampleDocuments);
  });

  it('Verifica che il metodo getDocumentContent di DocumentRepository chiami correttamente getContent di MinioDataSource', async () => {
    
    const docName = 'ExampleDocument';
    const model: IModel = 'Ollama';

    await documentRepository.getDocumentContent(docName, model);

    expect(mockDocumentDataSource.getContent).toHaveBeenCalledWith({ docName, model });
  });

  it('Verifica che il metodo getDocumentContent di DocumentRepository restituisca correttamente i link di visualizzazione recuperati', async () => {
    
    const docName = 'ExampleDocument';
    const model: IModel = 'Ollama';
    const content = 'ExampleUrlString';

    mockDocumentDataSource.getContent.mockResolvedValue(content);

    const result = await documentRepository.getDocumentContent(docName, model);

    expect(mockDocumentDataSource.getContent).toHaveBeenCalledWith({ docName, model });
    expect(result).toBe(content);
  });

});
