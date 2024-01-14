import React from 'react';
import UploadDoc from "@/app/documents/components/uploadDoc";
import Link from "next/link";



function DocMenu ({ model, setDocsChanged }: { model : string, setDocsChanged: (docsChanged: boolean) => void}) {
    async function handleClick(){
        try {
            const res = await fetch('/api/delete', {          //chiamata per eliminare il documento, gli passo il nome del documento da eliminare
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name: model
                }),
            });
            if (!res.ok) throw new Error(await res.text());
            setDocsChanged(true);
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <div className='h-full flex flex-col justify-between pt-2 lg:w-3/12 md:5/12 w-full shadow-lg rounded-xl p-2 '>

            <UploadDoc model={model} setDocsChanged={setDocsChanged}/>

            <button className="w-full p-3 rounded-xl shadow-lg bg-red-500 font-medium mb-auto mt-10 hover:scale-105 hover:shadow-2xl animation duration-300 ease-out" onClick={handleClick}> Cancella Collezione </button>

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