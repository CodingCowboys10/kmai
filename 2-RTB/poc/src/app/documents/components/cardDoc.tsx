import React from 'react';
import Image from 'next/image'
import DeleteDoc from './deleteDoc';
import icon from '../../../../public/pdficon.png';                               //immagine icon dei documenti pdf, di default per tutti

interface DocCardProps{
  name: string;
  path: string;
  date: string;
}

function DocCard ({ name, path, date }: DocCardProps) {                           //creo le card dei documenti pdf del db, mostrando nome, data di inserimento e costruendo un bottone per eliminare quel documento dal db
  return (
    <li className=' bg-zinc-900 p-4 border border-solid border-indigo-500 rounded-lg m-1 w-64 h-90 basis-1/5'>
      <div className='flex items-center justify-center p-5'>
        <Image src={icon} alt='PDF' width={100} height={100} />
      </div>
      <div className='text-center'>
        <p className='text-center whitespace-pre-line break-all'>{name}</p>
        <p className='pt-2 text-indigo-500'>Inserito il:</p>
        <p className='text-indigo-500'>{date}</p>
      </div>
      <DeleteDoc name={name}/>                                                    
    </li>
  );
};

export default DocCard;