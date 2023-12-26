import {chainQA} from "@/utils/conversationalQA"
import {Request, Response} from 'express';
import type { NextApiRequest, NextApiResponse } from 'next'

export async function POST(req: Request , res : Response){

    await (await chainQA("llama2")).call(
        {
            question: "ciao",
            chat_history: [],
        },
        [
            {
                handleLLMNewToken: async (token) => {

                },

            },
        ]
    );


}

