import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { ChatOpenAI } from "@langchain/openai";
import { BytesOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { GetAnswerController } from "@/controllers/chat/GetAnswerController";
import { getAnswerController } from "@/lib/config/container";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];

    const stream = await getAnswerController.handle(messages, "OpenAi");

    return new StreamingTextResponse(stream);
  } catch (e) {
    return NextResponse.json(
      { error: "Internal Server Error During Generation" },
      { status: 500 },
    );
  }
}
