/**
 * llmBody.tsx è un componente che contiene il box del menu,
 * viene utilizzato da page.tsx per la selezione degli LLM da utilizzare.
 * Il box si autodimensiona in base al contenuto, rimane sempre una colonna singola.
 *
 * Created by Francesco Ferraioli on 20/12/23
 */
"use client"
import LlmModel from "./llmModel"; // importa il componente che contiene il bottone
import React, { useState } from "react"; // importa useState per gestire lo stato del bottone
import {children} from "solid-js"; 

function LlmBody({ children }) {
        const [selectedButton, setSelectedButton] = useState(0);   //definisce selectedButton come variabile di stato, inizializzata a 0
    
        const handleButtonClick = (index: number) => { // gestisce il click sul bottone
            setSelectedButton(index);   // imposta selectedButton al valore del bottone cliccato
        };
    
        return (
            <div 
            className=" flex flex-col shadow-2xl w-1/2 bg-[--background-contrast] p-4 rounded-2xl
             h-fit my-auto justify-evenly gap-2 ">
                {children}
                {[0, 1, 2].map((index) => ( // crea i bottoni come elementi di un array
                    <LlmModel
                        key={index} // chiave univoca per ogni bottone
                        isSelected={selectedButton === index} // controlla se il bottone è selezionato
                        onClick={() => handleButtonClick(index)} // gestisce il click sul bottone chiamando la funzione handleButtonClick
                    />
                ))}
            </div>
        );
    }

export default LlmBody; // esporta il componente per poterlo utilizzare su page.tsx
