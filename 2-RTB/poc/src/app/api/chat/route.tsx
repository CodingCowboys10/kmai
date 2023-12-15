import { NextRequest } from 'next/server';
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';

import { BytesOutputParser } from 'langchain/schema/output_parser';
import { PromptTemplate } from 'langchain/prompts';
import {ChatOllama} from "langchain/chat_models/ollama";
import {ChromaClient} from "chromadb";

export const runtime = 'edge';

const formatMessage = (message: VercelChatMessage) => {
    return `${message.role}: ${message.content}`;
};

const TEMPLATE = `You are an assistant. You are helping a people with their problem.
Current conversation:
{chat_history}
 
User: {input}
AI:`;

export async function POST(req: NextRequest) {
    const vectorStore = new ChromaClient({path : 'http://localhost:8000'});

    const body = await req.json();
    const messages = body.messages ?? [];
    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const currentMessageContent = messages[messages.length - 1].content;

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);

    // Funziona anche con ollama cosi a caso
    const model = new ChatOllama({
            model: 'llama2',
            temperature : 0,
            baseUrl : 'http://localhost:11434'
        })

    const outputParser = new BytesOutputParser();

    const chain = prompt.pipe(model).pipe(outputParser);

    const stream = await chain.stream({
        chat_history: formattedPreviousMessages.join('\n'),
        input: currentMessageContent,
    });

    return new StreamingTextResponse(stream);
}


