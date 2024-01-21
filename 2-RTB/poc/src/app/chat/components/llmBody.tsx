"use client"

import LlmModel from "./llmModel";
import React, { useState } from "react";

export const models = [
    "openAi",
    "llama2",
    "openChat",
    "mistral",
    "mixtral",
    "starling",
]

interface LlmBodyProps {
    classProp: string;
    updateModel: (newModelName: string) => void;
    children? : any
}

function LlmBody({classProp, updateModel, children } : LlmBodyProps) {
        const [selectedButton, setSelectedButton] = useState(0);   //definisce selectedButton come variabile di stato, inizializzata a 0

        const handleButtonClick = (index: number) => { // gestisce il click sul bottone
            setSelectedButton(index); // imposta selectedButton al valore del bottone cliccato
            updateModel(models[index])
        };
        return (
            <div 
            className={classProp}>
                {children}
                {models.map((modelName, index) => ( // crea i bottoni come elementi di un array
                    <LlmModel
                        text={modelName} // testo del bottone
                        key={index} // chiave univoca per ogni bottone
                        isSelected={selectedButton === index} // controlla se il bottone è selezionato
                        onClick={() => handleButtonClick(index)} // gestisce il click sul bottone chiamando la funzione handleButtonClick
                    />
                ))}
            </div>
        );
    }

export default LlmBody; // esporta il componente per poterlo utilizzare su page.tsx
