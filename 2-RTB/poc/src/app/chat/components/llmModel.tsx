/**
 * llmModel.tsx è un componente che contiene il bottone
 * viene utilizzato da llmBody.tsx,
 * gli handler servono a gestire i casi particolari quali hover del mouse e selezione,
 * 
 * Created by Francesco Ferraioli on 20/12/23
 */
"use client"
import React from "react";

interface LlmModelProps { //interfaccia che definisce le proprietà del bottone tramite props
  isSelected: boolean; // Indica se il bottone è selezionato
  onClick: () => void; // Funzione che viene chiamata quando il bottone viene cliccato
  text: string; // Testo del bottone
}

function LlmModel({ isSelected, onClick , text }: LlmModelProps) {
  return (
    <button
      className={`${isSelected ? "scale-105 bg-[--primary] border-[--primary] cursor-default" : "" }
         border-2 border-[white] border-opacity-20  dark:border-[--background]  font-medium text-[--text-button] w-full px-2 py-2 rounded-xl
         hover:scale-105 transition duration-150 ease-in hover:ease-out`}
      onClick={onClick} // Gestisci il click chiamando la funzione fornita
    >
      {text}
    </button>
  );
}

export default LlmModel;

