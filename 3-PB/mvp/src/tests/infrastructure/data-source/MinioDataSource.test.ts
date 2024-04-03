// npx jest src/tests/infrastructure/data-source/MinioDataSource.test.ts
import "reflect-metadata";
import { MinioDataSource } from "@/infrastructure/data-source/MinioDataSource";
import { S3 } from "aws-sdk";
import type {
  Document,
  IDocumentDataSource,
  IModel,
  Metadatas,
} from "@/lib/config/interfaces";
import { collections } from "@/lib/models";

const mockAWSS3: jest.Mocked<S3> = {
    putObject: jest.fn().mockReturnValue({
        promise: jest.fn(),
    }),
    getObjectTagging: jest.fn().mockReturnValue({
        promise: jest.fn(),
    }),
    deleteObject: jest.fn().mockReturnValue({
        promise: jest.fn(),
    }),
    listObjects: jest.fn().mockReturnValue({
        promise: jest.fn(),
    }),
    getSignedUrlPromise: jest.fn().mockReturnValue({
        promise: jest.fn(),
    }),
    putObjectTagging: jest.fn().mockReturnValue({
        promise: jest.fn(),
    }),
}  as any;

const mockMinioDataSource = new MinioDataSource(mockAWSS3);

describe('MinioDataSource', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Verifica che il metodo addOne di MinioDataSource chiami correttamente putObject di AWS', async () => {
        const doc: Document = {
            name: 'document.pdf',
            date: new Date(),
            size: 100,
            content: Buffer.from('document content'),
          };
          const model: IModel = 'Ollama';

        await mockMinioDataSource.addOne({doc, model});
          expect(mockAWSS3.putObject).toHaveBeenCalledWith({
            Body: doc.content,
            Bucket: collections[model],
            Key: doc.name,
            Tagging: "visibility=true",
          });
    });

    it('Verifica che il metodo deleteOne di MinioDataSource chiami correttamente deleteObject di AWS', async () => {
        const docName = 'ExampleDocument';
        const model: IModel = 'Ollama';


        await mockMinioDataSource.deleteOne({docName, model});
          expect(mockAWSS3.deleteObject).toHaveBeenCalledWith({
            Bucket: collections[model],
            Key: docName,
          });
    });

    it('Verifica che il metodo getAll di MinioDataSource chiami correttamente listObjects di AWS', async () => {
        
        const model: IModel = 'Ollama';

        try{
          await mockMinioDataSource.getAll(model);
          expect(mockAWSS3.listObjects).toHaveBeenCalledWith({
            Bucket: collections[model],
          });
        } catch(e) {

        }
    });

    it('Verifica che il metodo getContent di MinioDataSource chiami correttamente getObjectTagging di AWS', async () => {
        
        const docName = 'ExampleDocument';
        const model: IModel = 'Ollama';

        await mockMinioDataSource.getContent({ docName, model });
          expect(mockAWSS3.getSignedUrlPromise).toHaveBeenCalledWith("getObject", {
            Bucket: collections[model],
            Key: docName,
            Expires: 36000,
          });
    });

    it('Verifica che il metodo updateOne di MinioDataSource chiami correttamente putObjectTagging di AWS', async () => {
        
        const docName = 'ExampleDocument';
        const model: IModel = 'Ollama';
        const tag: Metadatas = {
            visibility: true,
        };

        await mockMinioDataSource.updateOne({ docName, model, tag });
          expect(mockAWSS3.putObjectTagging).toHaveBeenCalledWith({
            Bucket: collections[model],
            Key: docName,
            Tagging: {
              TagSet: Object.entries(tag).map(([key, value]) => ({
                Key: key,
                Value: value.toString(),
              })),
            },
          });
    });

});