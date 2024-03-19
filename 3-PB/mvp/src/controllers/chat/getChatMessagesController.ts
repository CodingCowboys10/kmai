import { injectable, inject } from "tsyringe";
import { NextResponse } from "next/server";
import { GetChatMessagesUsecase } from "@/usecase/chat/getChatMessagesUsecase";

@injectable()
class GetChatMessagesController {
  private readonly _useCase: GetChatMessagesUsecase;

  constructor(
    @inject("getChatMessagesUsecase") useCase: GetChatMessagesUsecase,
  ) {
    this._useCase = useCase;
  }

  async handle(id: number): Promise<Response> {
    try {
      const res = await this._useCase.execute(id);
      const messages = res.allMessages.map((message) => {
        return {
          id: message.id,
          content: message.content,
          role: message.role,
          createdAt: message.createdAt?.toLocaleString("it-IT", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });
      return NextResponse.json(
        { allMessages: messages, source: res.source },
        {
          status: 200,
        },
      );
    } catch (e) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        {
          status: 500,
        },
      );
    }
  }
}

export { GetChatMessagesController };
