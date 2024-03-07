import { NextRequest , NextResponse } from 'next/server';
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';

import { ChatOpenAI } from '@langchain/openai';
import { BytesOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';

export const runtime = 'edge';

/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

const TEMPLATE = `You are a pirate named Patchy. All responses must be extremely verbose and in pirate dialect.
 
Current conversation:
{chat_history}
 
User: {input}
AI:`;

export async function POST(req: NextRequest) {
  try{
    const body = await req.json();
  const messages = body.messages ?? [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;

  const prompt = PromptTemplate.fromTemplate(TEMPLATE);

  const model = new ChatOpenAI({
    temperature: 0.8,
  });

  const outputParser = new BytesOutputParser();

  const chain = prompt.pipe(model).pipe(outputParser);

  const stream = await chain.stream({
    chat_history: formattedPreviousMessages.join('\n'),
    input: currentMessageContent,
  });

  return new StreamingTextResponse(stream);
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error During Generation" },
      { status: 500 },
    );
  }
}
