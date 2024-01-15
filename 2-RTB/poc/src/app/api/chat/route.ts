import { NextRequest } from 'next/server';

import { StreamingTextResponse, LangChainStream, Message } from 'ai';

import { PromptTemplate } from 'langchain/prompts';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIChatMessage, HumanChatMessage } from 'langchain/schema';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { Chroma } from 'langchain/vectorstores/chroma';
import {collections, embeddings, getLLM, setPrompt} from "@/utils/chat_utils";


type ChatApiBodyParams = {
    messages: Message[];
    modelName: string;
};

// Scelta del runtime : 1) Edge 2) NextJs. Se usiamo edge abbiamo maggiore velocita' ma vengono create delle dipendenze nei pacchetti.
// Ignorabili se usiamo --force in ogni comando

export const runtime = 'edge';

export async function POST(
    request: NextRequest
) {
    const { messages, modelName}: ChatApiBodyParams = await request.json();
    const { stream, handlers } = LangChainStream();

    // Otteniamo il modello LLM , useremo modelName ma per ora usiamo una stringa.
    const llm = getLLM(modelName, handlers)


    const chain = ConversationalRetrievalQAChain.fromLLM(
        llm,
        (await Chroma.fromExistingCollection(embeddings[modelName], {collectionName: collections[modelName]})).asRetriever(),
        {
            qaChainOptions: {
                type: "stuff",
                prompt: PromptTemplate.fromTemplate(setPrompt()),
            },
            returnSourceDocuments: true,
        }
    );

    const question = messages[messages.length - 1].content;
    
    chain
        .call({
                question,
                chat_history: [],
            }
        )
        .catch(console.error)

    return new StreamingTextResponse(stream, {status: 200});
}


