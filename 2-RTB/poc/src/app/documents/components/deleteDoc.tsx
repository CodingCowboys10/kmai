'use client'
import React from "react";


function DeleteDoc ({ name }){            //creo il bottone per l'eliminazione, associato al nome del documento così da sapere il nome quando voglio eliminarlo
    
    async function handleClick(){
        try {
          const res = await fetch('/api/delete', {          //chiamata per eliminare il documento, gli passo il nome del documento da eliminare
            method: 'POST',
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: name
            }),
          });
          if (!res.ok) throw new Error(await res.text());
          } catch (e) {
            console.error(e);
        }
        
    };
    

    return (
        <button type="button" className="rounded-lg bg-[--accent] hover:scale-105 w-fit h-fit p-2  animation duration-300 ease-out" onClick={handleClick}>Elimina</button>
    );
  };
  
  export default DeleteDoc;