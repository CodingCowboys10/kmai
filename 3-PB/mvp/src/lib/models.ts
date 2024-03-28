import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
import { IModel } from "@/lib/config/interfaces";

const llmsChat = {
  Ollama: new ChatOllama({
    model: "starling-lm",
    baseUrl: "http://localhost:11434",
    temperature: 0,
  }),
  OpenAi: new ChatOpenAI({
    modelName: "gpt-3.5-turbo-1106",
    temperature: 0,
    streaming: true,
  }),
};

const llmsEmbedding = {
  Ollama: new OllamaEmbeddings({
    model: "starling-lm",
    baseUrl: "http://localhost:11434",
  }),
  OpenAi: new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    batchSize: 512,
  }),
};

const collections: Record<
  IModel,
  "starling-mvp-collections" | "openai-mvp-collections"
> = {
  Ollama: "starling-mvp-collections",
  OpenAi: "openai-mvp-collections",
};

export { llmsChat, llmsEmbedding, collections };
