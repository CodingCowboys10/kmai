'use client'
import { useState } from 'react'

function UploadDoc (){

  const [file, setFile] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set('file', file);

      const res = await fetch('/api/upload', {      //chiamata per aggiungere il nuovo documento quando clicco su upload
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      console.error(e);
    }
  };

  //form con cui permetto l'upload dei solo pdf, definito dal accept=".pdf"
  return (
    <form className="absolute top-5 right-10 " onSubmit={onSubmit}>
      <input
        type="file"
        name="file"
        
        accept=".pdf"

        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <input type="submit" value="Upload" className="cursor-pointer text-indigo-500 bg-zinc-900 p-2 border border-solid border-indigo-500 rounded-lg m-1" />
    </form>
  );
}

export default UploadDoc;