import "reflect-metadata";
import { container } from "tsyringe";
import { ChromaDataSource } from "@/infrastructure/data-source/ChromaDataSource";
import { ChromaClient } from "chromadb";
import { EmbeddingRepository } from "@/infrastructure/embeddingRepository";
import { AddEmbeddingUsecase } from "@/usecase/embeddings/AddEmbeddingUsecase";

container.register<ChromaClient>("chromaClient", {
    useValue: new ChromaClient(),
  });
  container.register<ChromaDataSource>("embeddingDataSource", {
    useClass: ChromaDataSource,
  });
  container.register<EmbeddingRepository>("embeddingRepository", {
    useClass: EmbeddingRepository,
  });
  container.register<AddEmbeddingUsecase>("addEmbeddingUsecase", {
    useClass: AddEmbeddingUsecase,
  });
