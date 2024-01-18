import {OllamaEmbeddings} from "langchain/embeddings/ollama";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {ChatOllama} from "langchain/chat_models/ollama";
import {OpenAI} from "langchain/llms/openai";
import {CallbackManager} from "langchain/callbacks";


export function getLLM(model: string , handlers: any  ){
    const models : Record<string, any> = {
        // Ollama Model
        llama2 : new ChatOllama({
            model: 'llama2',
            temperature : 0,
            baseUrl : 'http://localhost:11434',
            callbacks: CallbackManager.fromHandlers(handlers),
        }),
        //openChat Model
        openChat : new ChatOllama({
            model: 'openchat:latest',
            temperature : 0,
            baseUrl : 'http://localhost:11434',
            callbacks: CallbackManager.fromHandlers(handlers),
        }),
        //mistral Model
        mistral : new ChatOllama({
            model: 'mistral',
            temperature : 0,
            baseUrl : 'http://localhost:11434',
            callbacks: CallbackManager.fromHandlers(handlers),
        }),
        mixtral : new ChatOllama({
            model: 'mixtral:latest',
            baseUrl : 'http://localhost:11434',
            callbacks: CallbackManager.fromHandlers(handlers),
        }),
        //openChat Model
        starling : new ChatOllama({
            model: 'starling-lm',
            temperature : 0,
            baseUrl : 'http://localhost:11434',
            callbacks: CallbackManager.fromHandlers(handlers),
        }),

        // Gpt Model
        openAi : new OpenAI({
            modelName: "gpt-3.5-turbo-instruct",
            temperature: 0,
            callbacks: CallbackManager.fromHandlers(handlers),
            streaming: true,
        })
    }
    return models[model];
}

export const embeddings: Record<string, any>   = {
    llama2 : new OllamaEmbeddings({
        model : 'llama2',
        baseUrl:'http://localhost:11434'
    }),
    mistral : new OllamaEmbeddings({
        model: 'mistral',
        baseUrl : 'http://localhost:11434'
    }),
    mixtral : new OllamaEmbeddings({
        model: 'mixtral:latest',
        baseUrl : 'http://localhost:11434'
    }),
    openChat : new OllamaEmbeddings({
        model: 'openchat:latest',
        baseUrl:'http://localhost:11434'
    }),
    starling : new OllamaEmbeddings({
        model: 'starling-lm',
        baseUrl:'http://localhost:11434'
    }),
    openAi : new OpenAIEmbeddings({
        batchSize: 512, // Default value if omitted is 512. Max is 2048
    })
}

export const collections : Record<string, string>  = {
    llama2 : "llama2_poc_collections",
    openChat : "openChat_poc_collections",
    mistral : "mistral_poc_collections",
    mixtral : "mixtral_poc_collections",
    starling : "starling_poc_collections",
    openAi : "openAi_poc_collections",
}

export function setPrompt(){
    return  `Sei un assistente AI che deve chattare a supporto di un documento, hai il compito di rispondere alle mie domande unicamente inerenti al contesto del documento. 
    Se la domanda NON E' pertinente al contesto del documento o a qualisasi altra cosa NON DEVI RISPONDERE.
    Se non conosci la risposta NON rispondere.
    Il contesto e' : {context},
    La domanda e':  {question}, 
    La chat history : {chat_history},
    La tua risposta ( in italiano ) : `;
}




