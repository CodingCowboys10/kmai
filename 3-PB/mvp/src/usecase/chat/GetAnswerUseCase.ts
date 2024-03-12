import type {
  Document,
  IDocumentRepository,
  IUsecase,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";
import { Ollama } from "@langchain/community/llms/ollama";
import { Message as VercelChatMessage, Message } from "ai";
import { ChatOpenAI, OpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { BytesOutputParser } from "@langchain/core/output_parsers";

const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

@injectable()
class GetAnswerUseCase
  implements IUsecase<{ messages: Message[]; model: string }, any>
{
  private readonly _documentRepository: IDocumentRepository;
  private _model: any = {
    Ollama: new Ollama({
      model: "starling-lm",
      temperature: 0,
      baseUrl: "http://localhost:11434",
    }),
    OpenAi: new OpenAI({
      modelName: "gpt-3.5-turbo-instruct",
      temperature: 0,
      streaming: true,
    }),
  };
  private TEMPLATE = `Sei un assistente AI che deve chattare a supporto di un documento, hai il compito di rispondere alle mie domande unicamente inerenti al contesto del documento. 
    Se la domanda NON E' pertinente al contesto del documento o a qualisasi altra cosa NON DEVI RISPONDERE.
    Se non conosci la risposta NON rispondere.
    Il contesto e' : {context},
    La domanda e':  {question}, 
    La chat history : {chat_history},
    La tua risposta ( in italiano ) : `;

  constructor(
    @inject("documentRepository") documentRepository: IDocumentRepository,
  ) {
    this._documentRepository = documentRepository;
  }

  async execute({ messages, model }: { messages: Message[]; model: string }) {
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;

    const prompt = PromptTemplate.fromTemplate(this.TEMPLATE);

    const model1 = new ChatOpenAI({
      temperature: 0.8,
    });

    const outputParser = new BytesOutputParser();

    const chain = prompt.pipe(model1).pipe(outputParser);

    return await chain.stream({
      chat_history: formattedPreviousMessages.join("\n"),
      question: currentMessageContent,
      context: "",
    });
  }
}

export { GetAnswerUseCase };
