import { injectable, inject } from "tsyringe";
import { NextResponse } from "next/server";
import { AddChatUsecase } from "@/usecase/chat/addChatUsecase";

@injectable()
class AddChatController {
  private readonly _useCase: AddChatUsecase;

  constructor(@inject("addChatUsecase") useCase: AddChatUsecase) {
    this._useCase = useCase;
  }

  async handle(title: string): Promise<Response> {
    try {
      const res = await this._useCase.execute({ title });
      return NextResponse.json(
        { id: res },
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

export { AddChatController };
