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
}

function LlmModel({ isSelected, onClick }: LlmModelProps) { 
  return (
    <button
      className={`${isSelected ? "scale-105 bg-[#4c9cac] border-[#4c9cac] cursor-default" : "" }
         border-2 border-[--background] font-medium text-[--text]  shadow w-full px-0 py-6 rounded-2xl
         hover:scale-105 transition duration-150 ease-in hover:ease-out`}
      onClick={onClick} // Gestisci il click chiamando la funzione fornita
    >
      starling-lm
    </button>
  );
}

export default LlmModel;

