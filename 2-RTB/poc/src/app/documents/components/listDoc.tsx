'use client'
import React from "react";
import DocCard from "./cardDoc";
import { useEffect, useState } from 'react';


interface RisultatoQuery{
    name: string;
    path: string;
    date: string;
    size: number;
  }


function ListDoc ({ model } : {model : string}){
    const [dati, setDati] = useState<RisultatoQuery[]>([]);

    useEffect(() => {
        let isMounted = true;
        async function fetchDBdoc(){
            try {
                const response = await fetch(`/api/${model}/read`, {method: 'GET',});
                const result = await response.json();

                if (isMounted) {
                    setDati(result);
                }
            }catch (e){
                console.error('Errore durante la richiesta:', e);
            }


        }
        fetchDBdoc().then(r => console.log("Dati ottenuti con successo"))
        return () => {
            isMounted = false;
        };
    }, [model , ]);

    return(
        <div className="w-full p-5 overflow-y-scroll h-full bg-[--background]  shadow-xl rounded-xl ">
            {dati.length == 0 && (<div className="w-full text-center text-[--text] opacity-70 font-medium text-2xl mt-32 transition duration-300 ease-in">Ancora nessun Documento</div>)}
            <ul className="grid flex-none lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-5 ">
                {dati.map((item, index) => <DocCard key={index} name={item.name} path={item.path} date={item.date} size={item.size/1024}/>)}   {/*crea una card per ogni documento presente nel database*/}
            </ul>
        </div>
    );
}

export default ListDoc;
