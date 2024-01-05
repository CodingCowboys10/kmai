import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {                                          //chiamato per inserire nuovi documenti nel databse
  
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File
  const modello = data.get('model')

  //console.log(modello)        // dentro a modello è contenuta la stringa corretta del llm di interesse, ora si può usare per le operazioni su chroma

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // È stato inserito in buffer il file in bytes
  // Ora è possibile scrivere il file nel path che vogliamo noi, ovvero dove abbiamo tutti i documenti

  const doc = `${file.name}`                                                                  //nome del documento che avrò in database
  const path = `./src/db/docs/${file.name}`                                                   //path completo del documento che avrò in database
  await writeFile(path, buffer)
  //console.log(`open ${path} to see the uploaded file`)                                      //decommentare per verificare il funzionamento


  let sql;
  const sqlite3 = require('sqlite3').verbose();
  const db = new sqlite3.Database("./src/db/databaseDoc.db", sqlite3.OPEN_READWRITE, (err) => {
      if (err) return console.error(err.message);
  });
  // messo di default openAi, fin che non capiamo il perché del comportamento della stringa model
  sql = 'INSERT INTO openAi(name,path) VALUES (?,?)';                                      //query per inserire il nuovo documento
  db.run(
    sql,
    [doc,path],
    (err) => {
        if (err) return console.error(err.message);
  });


  return NextResponse.json({ success: true })
}