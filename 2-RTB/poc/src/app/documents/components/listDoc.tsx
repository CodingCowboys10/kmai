'use client'
import React from "react";
import DocCard from "./cardDoc";
import { useEffect, useState } from 'react';


interface RisultatoQuery{
    name: string;
    path: string;
    date: string;
  }


function ListDoc ({ model }){
    const [dati, setDati] = useState<RisultatoQuery[]>([]);
    useEffect(() => {
        async function fetchData (){
        try {
            //const response = await fetch('/api/read', {method: 'GET',});    //chiamata per leggere il database dei documenti
            const response = await fetch(`/api/${model}/read`, {method: 'GET',}); 
            if (response.ok) {
            const result = await response.json();
            setDati(result);                                                //imposta i dati con cui creare le card dei documenti, sulla base del risultato della query
            } else {
            console.error('Errore nel recupero dei dati');
            }
        } catch (error) {
            console.error('Errore durante la richiesta:', error);
        }
        };

        fetchData();                                            //esegue la chiamata GET per leggere il db dei documenti
        const intervalId = setInterval(fetchData, 1000);        //esegue la chiamata GET per leggere il database ogni secondo, per avere la tabella documenti sempre aggiornata
        return () => clearInterval(intervalId);                 //quando il componente si scompone, viene fermato il timer
    }, [model]);

    return(
        <div className="w-full p-5 overflow-y-scroll h-full bg-[--background]  shadow-xl rounded-xl ">
            {dati.length == 0 && (<div className="w-full text-center text-[--text] opacity-70 font-medium text-2xl mt-32 transition duration-300 ease-in">Ancora nessun Documento</div>)}
            <ul className="grid flex-none lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-5 ">
                {dati.map((item, index) => <DocCard key={index} name={item.name} path={item.path} date={item.date}/>)}   {/*crea una card per ogni documento presente nel database*/}
            </ul>
        </div>
    );
}

export default ListDoc;
