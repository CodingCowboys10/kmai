/**
 * llm_menu_box.tsx è un componente che contiene il box del menu,
 * viene utilizzato da page.tsx per la selezione degli LLM da utilizzare.
 * Il box si autodimensiona in base al contenuto, rimane sempre una colonna singola.
 * 
 * Created by Francesco Ferraioli on 20/12/23
 */
"use client"
import {Properties} from "csstype";
import LlmMenuComponents from "./llm_menu_components"; // importa il componente che contiene i bottoni


function LlmMenuBox (){
    // Stile del box del menu
    const llmMenuBoxStyle :Properties = {
        borderRadius: "1em",
        border: "solid",
        margin: "1em",
        width: "min-content", //il box si adatta al contenuto di dimensione minima
        height: "min-content", //il box si adatta al contenuto di dimensione minima
    };

    // Ritorna il box del menu e i bottoni al suo interno
    return(
        <div style={llmMenuBoxStyle}>
            <LlmMenuComponents/> 
        </div>
    );
}

export default LlmMenuBox; // esporta il componente per poterlo utilizzare su page.tsx