'use client'
import React from "react";


function DeleteDocButton ({ name} : { name :  string}){
    
    async function handleClick(){
       // Work in Progress
    }

    return (
        <button type="button" className="rounded-lg bg-[--accent] hover:scale-105 w-fit h-fit p-2  animation duration-300 ease-out" onClick={handleClick} disabled>Elimina</button>
    );
  }
  
  export default DeleteDocButton;