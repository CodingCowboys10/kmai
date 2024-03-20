import { injectable, inject } from "tsyringe";
import { NextResponse } from "next/server";
import { AddChatMessagesUsecase } from "@/usecase/chat/addChatMessagesUsecase";
import { ICustomMessages } from "@/lib/config/interfaces";

@injectable()
class AddChatMessagesController {
  private readonly _useCase: AddChatMessagesUsecase;

  constructor(
    @inject("addChatMessagesUsecase") useCase: AddChatMessagesUsecase,
  ) {
    this._useCase = useCase;
  }

  async handle(messages: ICustomMessages): Promise<Response> {
    try {
      await this._useCase.execute({ messages });
      return NextResponse.json(
        { message: "Ok" },
        {
          status: 200,
        },
      );
    } catch (e) {
      console.log(e);
      return NextResponse.json(
        { error: "Internal Server Error" },
        {
          status: 500,
        },
      );
    }
  }
}

export { AddChatMessagesController };
