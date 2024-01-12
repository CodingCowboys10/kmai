'use client'
import { useState } from 'react'


function UploadDoc ({ model }){

  const [file, setFile] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set('file', file);
      //
      data.set('model', model)

      const res = await fetch('/api/upload', {      //chiamata per aggiungere il nuovo documento quando clicco su upload
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error(await res.text());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form className=" bg-[--background-contrast] lg:w-full flex lg:mx-0 md:mx-0 mx-auto flex-col gap-5 rounded-xl p-4 shadow-2xl " onSubmit={onSubmit} >
      <label className="text-sky-950 dark:text-sky-50 text-xl font-medium text-center">
          Upload a Document </label>
      <input
        type="file"
        name="file"
        accept=".pdf"
        className="bg-[--background-input] rounded-lg p-2 text-left cursor-pointer"
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <input type="submit" value="Upload" className="cursor-pointer bg-[--primary] w-full p-2 mx-auto rounded-lg hover:scale-105
      animation duration-300 ease-out" />
    </form>
  );
}

export default UploadDoc;