"use client"
import React from "react";

interface LlmModelProps {
  isSelected: boolean;
  onClick: () => void;
  text: string; 
}

function LlmModel({ isSelected, onClick , text }: LlmModelProps) {
  return (
    <button
      className={`${isSelected ? "scale-105 bg-[--primary] border-[--primary] cursor-default" : "" }
         text-sky-50 bg-[--background-input] font-medium text-[--text-button] w-full px-2 py-2 rounded-xl
         hover:scale-105 transition duration-150 ease-in hover:ease-out shadow-lg`}
      onClick={onClick} // Gestisci il click chiamando la funzione fornita
    >
      {text}
    </button>
  );
}

export default LlmModel;

