import {OllamaEmbeddings} from "langchain/embeddings/ollama";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {ChatOllama} from "langchain/chat_models/ollama";
import {OpenAI} from "langchain/llms/openai";
import {Chroma} from "langchain/vectorstores/chroma";

console.log(process.env.OPENAI_API_KEY) //


export const models : Record<string, any> = {
    // Ollama Model
    llama2 : new ChatOllama({
        model: 'llama2',
        temperature : 0,
        baseUrl : 'http://localhost:11434'
    }),
    //openChat Model
    openChat : new ChatOllama({
        model: 'openchat:7b-v3.5',
        temperature : 0,
        baseUrl : 'http://localhost:11434'
    }),
    //mistral Model
    mistral : new ChatOllama({
        model: 'mistral',
        temperature : 0,
        baseUrl : 'http://localhost:11434'
    }),
    //openChat Model
    starling : new ChatOllama({
        model: 'starling-lm',
        temperature : 0,
        baseUrl : 'http://localhost:11434'
    }),

    // Gpt Model
    openAi : new OpenAI({
        modelName: "gpt-3.5-turbo-instruct", // Defaults to "gpt-3.5-turbo-instruct" if no model provided.
        temperature: 0,
        openAIApiKey: process.env.OPENAI_API_KEY,
        streaming: true,// In Node.js defaults to process.env.OPENAI_API_KEY
    })
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
    openChat : new OllamaEmbeddings({
        model: 'openchat:7b-v3.5',
        baseUrl:'http://localhost:11434'
    }),
    starling : new OllamaEmbeddings({
        model: 'starling-lm',
        baseUrl:'http://localhost:11434'
    }),
    openAi : new OpenAIEmbeddings({
        openAIApiKey: process.env.OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
        batchSize: 512, // Default value if omitted is 512. Max is 2048
    })
}

export const collections : Record<string, string>  = {
    llama2 : "test_29_11_llama2",
    openChat : "test_29_11_openChat",
    mistral : "test_29_11_mistral",
    starling : "test_29_11_starling",
    openAi : "test_29_11_openAi",
}

export function setPrompt(){
    return  `Sei un assistente AI che deve chattare a supporto di un documento, hai il compito di rispondere alle mie domande unicamente inerenti al contesto del documento. 
    Se la domanda NON E' pertinente al contesto del documento o si riferisce ad altro non rispondere.
    Se non conosci la risposta NON rispondere.
    Il contesto e' : {context},
    La domanda e':  {question}, 
    La chat history : {chat_history},
    La tua risposta ( in italiano ) : `;
}

export const vectorStore = await Chroma.fromExistingCollection(embeddings["openAi"], {collectionName: collections["openAi"]})



