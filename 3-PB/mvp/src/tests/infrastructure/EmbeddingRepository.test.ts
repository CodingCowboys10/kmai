// npx jest src/tests/infrastructure/EmbeddingRepository.test.ts --coverage
import "reflect-metadata";
import {Embeddings, IEmbeddingDataSource, IModel, Metadatas} from "@/lib/config/interfaces";
import {EmbeddingRepository} from "@/infrastructure/embeddingRepository";

const mockEmbeddingDataSource: jest.Mocked<IEmbeddingDataSource> = {
    addOne: jest.fn(),
    deleteOne: jest.fn(),
    getIds: jest.fn(),
    updateOne: jest.fn(),
};

const embeddingRepository = new EmbeddingRepository(mockEmbeddingDataSource);

describe('EmbeddingRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Verifica che il metodo addEmbedding di EmbeddingRepository chiami correttamente addOne di ChromaDataSource', async () => {
        const embedding: Embeddings = {
            ids: ["example-1"],
            embedding: [[0.711, 0.722], [0.733, 0.744]],
            doc: ["example.pdf"],
            metadata: [{visibility: true}]
        };
        const model: IModel = 'Ollama';

        await embeddingRepository.addEmbedding(embedding, model);

        expect(mockEmbeddingDataSource.addOne).toHaveBeenCalledWith({ embeddings: embedding, model: model });
    });

    it('Verifica che il metodo deleteEmbedding di EmbeddingRepository chiami correttamente deleteOne di ChromaDataSource', async () => {

        const ids = ["example-1"];
        const model: IModel = 'Ollama';

        await embeddingRepository.deleteEmbedding(ids, model);

        expect(mockEmbeddingDataSource.deleteOne).toHaveBeenCalledWith({ ids, model });
    });

    it('Verifica che il metodo getIdsEmbedding di EmbeddingRepository chiami correttamente getIds di ChromaDataSource', async () => {

        const model: IModel = 'Ollama';
        const docName = "exampleDocument"
        const exampleIds = ["exampleDocument-1"];

        await embeddingRepository.getIdsEmbedding(docName, model);

        expect(mockEmbeddingDataSource.getIds).toHaveBeenCalledWith({docName, model});
    });

    it('Verifica che il metodo getIdsEmbedding di EmbeddingRepository restituisca correttamente gli id degli embedding recuperati', async () => {

        const model: IModel = 'Ollama';
        const docName = "exampleDocument"
        const exampleIds = ["exampleDocument-1"];

        mockEmbeddingDataSource.getIds.mockResolvedValue(exampleIds);

        const ids = await embeddingRepository.getIdsEmbedding(docName, model);

        expect(mockEmbeddingDataSource.getIds).toHaveBeenCalledWith({docName, model});
        expect(ids).toEqual(exampleIds);
    });

    it('Verifica che il metodo updateMetadatas di EmbeddingRepository chiami correttamente updateOne di ChromaDataSource', async () => {

        const ids = ['exampleDocument-1'];
        const model: IModel = 'Ollama';
        const metadatas : Metadatas = {visibility: true};

        await embeddingRepository.updateMetadatas(metadatas, model, ids);
        expect(mockEmbeddingDataSource.updateOne).toHaveBeenCalledWith({metadatas, model, ids});
    });

});