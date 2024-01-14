'use client'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {NextResponse} from "next/server";

function UploadDoc ({ model, setDocsChanged } : { model: string, setDocsChanged: (docsChanged: boolean) => void}){

  const [file, setFile] = useState();

  const onSubmit = async (e : Event) => {
    e.preventDefault();
    if (!file) {
        toast.warning("Selezionare un file!", {
            position: "top-center"
        });
        return;
    }

    try {
      const data = new FormData();
      data.set('file', file);
      data.set('model', model)
      console.log("-----------errore ricevuto")
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });


      if (res.ok) {
          setDocsChanged(true);
          toast.success("Documento Caricato", {
              position: "top-center"
          })
      }else{
          toast.error("Errore durante il caricamento!", {
              position: "top-center"
          });
      }
    } catch (e) {
        toast.error("Errore durante il caricamento!", {
            position: "top-center"
        });
      console.error(e);
    }
  };

  return (
      <>
          <form
              className=" bg-[--background-contrast] lg:w-full flex lg:mx-0 md:mx-0 mx-auto flex-col gap-5 rounded-xl p-4 shadow-2xl "
              onSubmit={onSubmit}>
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
                        animation duration-300 ease-out"/>

          </form>
          <ToastContainer limit={3} autoClose={3000}/>
      </>


  );
}

export default UploadDoc;