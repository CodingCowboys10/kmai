'use client'
import React from "react";
import DocCard from "./cardDoc";
import { useEffect, useState } from 'react';


interface RisultatoQuery{
    name: string;
    path: string;
    date: string;
  }


function ListDoc (){
    const [dati, setDati] = useState<RisultatoQuery[]>([]);
    useEffect(() => {
        async function fetchData (){
        try {
            const response = await fetch('/api/read', {method: 'GET',});    //chiamata per leggere il database dei documenti
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
    }, []);

    return(
        <div className="overflow-scroll ">

            <p className="text-[--text-button] text-xl font-medium text-center">
                Il tuo Archivio </p>
            <ul className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-5 overflow-clip  p-5 ">
                {dati.map((item, index) => <DocCard key={index} name={item.name} path={item.path} date={item.date}/>)}
            </ul>
        </div>
    );
}

export default ListDoc;
