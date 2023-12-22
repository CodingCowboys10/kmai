/**
 * llmModel.tsx è un componente che contiene i bottoni del menu.
 * viene utilizzato da llmBody.tsx in esso i bottoni vengono creati e gestiti mediante map,
 * gli handler servono a gestire i casi particolari quali hover del mouse e selezione,
 * il bottone di default è il primo.
 * 
 * Created by Francesco Ferraioli on 20/12/23
 */

import { useState } from "react"; // importa useState per poter gestire lo stato dei bottoni

//interfaccia per i bottoni per poter lavorare con un array di bottoni(map)
interface Button {
    id: string;
    label: string;
}

function LlmModel({ isSelected }: { isSelected:boolean}) {
    // variabili che permettono di gestire lo stato dei bottoni
    const [hoveredButton, setHoveredButton] = useState<string | null>(null); //il bottone con hover può essere anche nullo
    const [selectedButton, setSelectedButton] = useState("bottone1"); // bottone di default, capisce da solo che è string


    // Event handlers per il cambio di colore dei bottoni in base all'hover e alla selezione
    const handleMouseOver = (buttonId: string) => {
        setHoveredButton(buttonId); // setta il bottone su cui è il mouse
    };

    const handleMouseLeave = () => {
        setHoveredButton(null); // rimuove la selezione del bottone su cui è il mouse
    };

    const handleButtonClick = (buttonId: string) => {
        setHoveredButton(null); 
        setSelectedButton(buttonId); // setta il bottone come selezionato
    };
    /*

      <button
                    key={button.id}
                    id={button.id}  // id del bottone
                    className={ //caratteristiche: si dimensioni bottoni 15x5 rem, bordo bianco, margine 4, sfondo nero, testo grassetto,bordo arrotondato
                    `min-w-15rem min-h-5rem max-w-15rem max-h-5rem text-white
                    rounded-xl border-white border-2 m-4 bg-black font-bold
                    ${selectedButton === button.id ? "bg-green-500 text-black" //se il bottone è quello selezionato allora è verde e testo nero
                    : hoveredButton === button.id ? "bg-gray-500 text-red-500" : ""}`} //se il bottone è quello con hover allora è grigio e testo rosso
                    onMouseOver={() => handleMouseOver(button.id)} // event handler per l'hover
                    onMouseLeave={handleMouseLeave} // event handler per l'hover perso
                    onClick={() => handleButtonClick(button.id)} // event handler per la selezione
                    disabled={selectedButton === button.id} // disabilita il bottone se è selezionato
                >
                    {button.label}
                </button>

     */
    // ritorna i bottoni con le proprietà definite sopra
    return (
        <button className={`${isSelected ? "scale-105 bg-[#4c9cac] border-[#4c9cac]" : "" } border-2 border-[--background] font-medium text-[--text]  shadow w-full px-0 py-6 rounded-2xl hover:scale-105 transition duration-150 ease-in hover:ease-out`}>
            starling-lm
        </button>
    );
}

export default LlmModel; // esporta il componente per poterlo utilizzare su llmBody.tsx
