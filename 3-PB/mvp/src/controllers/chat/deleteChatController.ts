import { injectable, inject } from "tsyringe";
import { NextResponse } from "next/server";
import { DeleteChatUsecase } from "@/usecase/chat/deleteChatUsecase";

@injectable()
class DeleteChatController {
  private readonly _useCase: DeleteChatUsecase;

  constructor(@inject("deleteChatUsecase") useCase: DeleteChatUsecase) {
    this._useCase = useCase;
  }

  async handle(id: number): Promise<Response> {
    try {
      await this._useCase.execute({ id });
      return NextResponse.json(
        { message: "Ok" },
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

export { DeleteChatController };
