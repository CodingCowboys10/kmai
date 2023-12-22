/**
 * llmBody.tsx è un componente che contiene il box del menu,
 * viene utilizzato da page.tsx per la selezione degli LLM da utilizzare.
 * Il box si autodimensiona in base al contenuto, rimane sempre una colonna singola.
 *
 * Created by Francesco Ferraioli on 20/12/23
 */
"use client"
import LlmModel from "./llmModel";
import React from "react";
import {children} from "solid-js"; // importa il componente che contiene i bottoni


function LlmBody({children}){
    // Ritorna il box del menu e i bottoni al suo interno
    return( // il box è un div con bordi arrotondati e bordo bianco,margine di 4 e larghezza minima
        <div className=" flex flex-col shadow-2xl w-1/2 bg-[--background-contrast] p-4 rounded-2xl h-fit my-auto justify-evenly gap-2 ">
                {children}

                <LlmModel isSelected={false}/>
                <LlmModel isSelected={true}/>
                <LlmModel isSelected={false}/>



        </div>
    );
}

export default LlmBody; // esporta il componente per poterlo utilizzare su page.tsx
