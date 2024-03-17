"use server";

// @ts-ignore
import { addDocumentController } from "@/lib/config/container";

export async function addDocument(data: FormData) {
  try {
    const res = await (await addDocumentController.handle(data)).json();
    console.log(res);
    throw Error;
    return res;
  } catch (e: any) {
    throw e;
  }
}
