import { injectable, inject } from "tsyringe";
import { NextResponse } from "next/server";
import { GetChatsUsecase } from "@/usecase/chat/getChatsUsecase";

@injectable()
class GetChatsController {
  private readonly _useCase: GetChatsUsecase;

  constructor(@inject("getChatsUsecase") useCase: GetChatsUsecase) {
    this._useCase = useCase;
  }

  async handle(): Promise<Response> {
    try {
      const res = await this._useCase.execute();
      return NextResponse.json(
        { chats: res },
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

export { GetChatsController };
