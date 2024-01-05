import React from 'react';
import UploadDoc from "@/app/documents/components/uploadDoc";
import Link from "next/link";
import LlmBody from "@/app/chat/components/llmBody";
                           //immagine icon dei documenti pdf, di default per tutti

interface DocMenuProps{
    name: string;
    path: string;
    date: string;
    model: string;
}

function DocMenu ({ name, path, date, model }: DocMenuProps) {                           //creo le card dei documenti pdf del db, mostrando nome, data di inserimento e costruendo un bottone per eliminare quel documento dal db
    return (
        <div className='h-full flex flex-col justify-between pt-2 lg:w-3/12 md:5/12 w-full shadow-lg rounded-xl p-2 '>



            <UploadDoc model={model}/>


            <Link className=" text-center w-3/12 h-fit bg-[--primary] font-medium rounded-xl p-3
                  hover:scale-105 hover:shadow-2xl animation duration-300 ease-out" href="/chat">
                <button className="text-[--text-button]">
                    Chat
                </button>
            </Link>


        </div>
    );
};

export default DocMenu;