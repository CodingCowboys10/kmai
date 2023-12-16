import { NextRequest } from 'next/server';

import { StreamingTextResponse, LangChainStream, Message } from 'ai';
import { PromptTemplate } from 'langchain/prompts';
import { CallbackManager } from 'langchain/callbacks';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { AIChatMessage, HumanChatMessage } from 'langchain/schema';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { Chroma } from 'langchain/vectorstores/chroma';
import {collections, embeddings, models, setPrompt} from "@/utils/chat_utils";
import {ChatOllama} from "langchain/chat_models/ollama";


type ChatApiBodyParams = {
    messages: Message[];
};

export const runtime = 'edge';

export async function POST(
    request: NextRequest
) {
    const { messages }: ChatApiBodyParams = await request.json();
    const { stream, handlers } = LangChainStream();

    const llm = new ChatOpenAI({
        streaming: true,
        callbacks: CallbackManager.fromHandlers(handlers),
    });

    //const questionLlm = new ChatOpenAI({});
    const questionLlm = new ChatOllama({
        model: 'openchat:7b-v3.5',
        temperature : 0,
        baseUrl : 'http://localhost:11434'
    })

    const chatHistory = ConversationalRetrievalQAChain.getChatHistoryString(
        messages.map((m) => {
            if (m.role == 'user') {
                return new HumanChatMessage(m.content);
            }
            return new AIChatMessage(m.content);
        })
    );

    const chain = ConversationalRetrievalQAChain.fromLLM(
        questionLlm,
        (await Chroma.fromExistingCollection(embeddings["openChat"], {collectionName: collections["openChat"]})).asRetriever(),
        {
            qaChainOptions: {
                type: "stuff",
                prompt: PromptTemplate.fromTemplate(setPrompt()),
            },
            returnSourceDocuments: true,

            questionGeneratorChainOptions: {
                llm: questionLlm,
            },
        }
    );

    const question = messages[messages.length - 1].content;
    chain
        .call({
            question,
            chat_history: chatHistory,
        })
        .catch(console.error)

    return new StreamingTextResponse(stream);
}


