import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { BytesOutputParser } from "@langchain/core/output_parsers";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `Sei un asssitente AI che aiuta e risponde in italiano.
    {chat_history}
     
    User: {input}
    AI:`;

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

  private _prompt = PromptTemplate.fromTemplate(TEMPLATE);

  constructor(model: "OpenAi" | "Ollama" = "OpenAi") {
    this._model = llms[model];
  }

  get model(): ChatOllama | ChatOpenAI {
    return this._model;
  }

  set model(model: "OpenAi" | "Ollama") {
    this._model = llms[model];
  }

  async chat({ messages }: { messages: any }) {
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;
    const outputParser = new BytesOutputParser();
    const chain = this._prompt.pipe(this._model).pipe(outputParser);

    return await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      input: currentMessageContent,
    });
  }
}

export const Services = new Service("Ollama");
