import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatOpenAI } from "@langchain/openai";

const llms = {
  Ollama: new ChatOllama({
    model: "starling-lm",
    temperature: 0,
    baseUrl: process.env.OLLAMA_URL,
  }),
  OpenAi: new ChatOpenAI({
    modelName: "gpt-3.5-turbo-instruct",
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    streaming: true,
  }),
};

class Service {
  private _model: ChatOllama | ChatOpenAI;

  constructor(model: "OpenAi" | "Ollama" = "OpenAi") {
    this._model = llms[model];
  }

  get model(): ChatOllama | ChatOpenAI {
    return this._model;
  }

  set model(model: "OpenAi" | "Ollama") {
    this._model = llms[model];
  }
}

export const Services = new Service("Ollama");
