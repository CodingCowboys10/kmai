import { injectable, inject } from "tsyringe";
import { NextResponse } from "next/server";
import { DeleteAllChatUsecase } from "@/usecase/chat/deleteAllChatUsecase";

@injectable()
class DeleteAllChatController {
  private readonly _useCase: DeleteAllChatUsecase;

  constructor(@inject("deleteAllChatUsecase") useCase: DeleteAllChatUsecase) {
    this._useCase = useCase;
  }

  async handle(): Promise<Response> {
    try {
      await this._useCase.execute();
      return NextResponse.json(
        { message: "Ok" },
        {
          status: 200,
        },
      );
    } catch (e) {
      return NextResponse.json(
        { error: "Internal Server Error Adding the Document" },
        {
          status: 500,
        },
      );
    }
  }
}

export { DeleteAllChatController };
