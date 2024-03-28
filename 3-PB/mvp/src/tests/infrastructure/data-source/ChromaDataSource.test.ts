// npx jest src/tests/infrastructure/data-source/ChromaDataSource.test.ts
import "reflect-metadata";
import { ChromaClient, Collection } from "chromadb";
import { ChromaDataSource } from "@/infrastructure/data-source/ChromaDataSource";
import { IModel, Embeddings, Metadatas } from "@/lib/config/interfaces";
import { collections } from "@/lib/models";

const mockCollection: jest.Mocked<Collection> = {
    add: jest.fn(),
    get: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
}  as any;
const mockChromaClient: jest.Mocked<ChromaClient> = {
    getCollection: jest.fn().mockResolvedValue(mockCollection),
} as any;

const mockChromaDataSource = new ChromaDataSource(mockChromaClient);

describe('ChromaDataSource', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Verifica che il metodo addOne di ChromaDataSource chiami correttamente add di ChromaClient', async () => {
        const embeddings: Embeddings = {
            ids: ["example-1"],
            embedding: [[0.711, 0.722], [0.733, 0.744]],
            doc: ["example.pdf"],
            metadata: [{visibility: true}]
        };
        const model: IModel = 'Ollama';

        await mockChromaDataSource.addOne({embeddings, model});

        expect(mockChromaClient.getCollection).toHaveBeenCalledWith({
            name: collections[model],
          });
          expect(mockCollection.add).toHaveBeenCalledWith({
            ids: embeddings.ids,
            documents: embeddings.doc,
            metadatas: embeddings.metadata,
            embeddings: embeddings.embedding,
          });
    });

    it('Verifica che il metodo deleteOne di ChromaDataSource chiami correttamente delete di ChromaClient', async () => {
        const ids = ["example-1"];
        const model: IModel = 'Ollama';

        await mockChromaDataSource.deleteOne({ids, model});

        expect(mockChromaClient.getCollection).toHaveBeenCalledWith({
            name: collections[model],
          });
          expect(mockCollection.delete).toHaveBeenCalledWith({ ids: ids });
    });

    it('Verifica che il metodo updateOne di ChromaDataSource chiami correttamente update di ChromaClient', async () => {
        const ids = ['exampleDocument-1'];
        const model: IModel = 'Ollama';
        const metadatas : Metadatas = {visibility: true};

        await mockChromaDataSource.updateOne({metadatas, model, ids});
        const meta = ids.map(() => (metadatas));

        expect(mockChromaClient.getCollection).toHaveBeenCalledWith({
            name: collections[model],
        });
        expect(mockCollection.update).toHaveBeenCalledWith({
            ids: ids,
            metadatas: meta,
        });
    });

    it('Verifica che il metodo getIds di ChromaDataSource chiami correttamente get di ChromaClient', async () => {
        const model: IModel = 'Ollama';
        const docName = "exampleDocument";

        try {
            await mockChromaDataSource.getIds({docName, model});
        } catch(e) {
        }
        
        expect(mockChromaClient.getCollection).toHaveBeenCalledWith({
            name: collections[model],
        });
        expect(mockCollection.get).toHaveBeenCalledWith({
            where: { name: { $eq: docName } },
            include: [],
          });
    });
});