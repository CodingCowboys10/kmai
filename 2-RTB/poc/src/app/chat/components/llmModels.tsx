/**
 * llmModels.tsx è un componente che contiene il box del menu,
 * viene utilizzato da page.tsx per la selezione degli LLM da utilizzare.
 * Il box si autodimensiona in base al contenuto, rimane sempre una colonna singola.
 * 
 * Created by Francesco Ferraioli on 20/12/23
 */
"use client"
import LlmMenuComponents from "./llmBody"; // importa il componente che contiene i bottoni


function LlmMenuBox (){
    // Ritorna il box del menu e i bottoni al suo interno
    return( // il box è un div con bordi arrotondati e bordo bianco,margine di 4 e larghezza minima
        <div className="rounded-xl border-white border-2 m-4 w-min h-min"> 
            <LlmMenuComponents/> 
        </div>
    );
}

export default LlmMenuBox; // esporta il componente per poterlo utilizzare su page.tsx
