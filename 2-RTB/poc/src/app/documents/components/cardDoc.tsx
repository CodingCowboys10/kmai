import React from 'react';
import Image from 'next/image'
import icon from '../../../../public/pdficon.png';

interface DocCardProps{
  name: string;
  date: string;
  size: number
}

function DocCard ({ name, date , size}: DocCardProps) {
  return (
    <li className=' bg-[--background-contrast] border-4 border-[--background-contrast] hover:border-[--primary]  rounded-xl w-full h-full text-[--text]'>
        <div className='flex items-center justify-center py-2 bg-[--background] rounded-t-xl rounded-b-lg' >
            <Image src={icon} alt='PDF'  />
        </div>
        <div className="flex flex-col text-center px-2 py-2">
            <h1 className='text-xl font-medium text-center whitespace-pre-line break-all'>{name}</h1>
            <p className='text-[--primary]'>{date}</p>
        </div>

        <div className='flex flex-row items-center justify-center px-2 py-2'>
            <p className='text-[--primary] opacity-80'>{size.toFixed(2)} kB</p>
        </div>
    </li>
  );
}

export default DocCard;