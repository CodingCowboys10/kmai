import { promises as fsPromises } from 'fs';
import { join } from 'path';
import { ChromaClient } from 'chromadb'
import { collections } from "@/utils/chat_utils"

export async function POST(request: Request) {                                      //chiamato per eliminare un documento specifico
    const body = await request.json();
    const name = body.name;         //da utilizzare se vogliamo eliminare un doc specifico
  
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database("./src/db/databaseDoc.db", sqlite3.OPEN_READWRITE, (err) => {   //si prepara il db
        if (err) return console.error(err.message);
    });
    const sql1 = 'DELETE FROM openAi';                                              //operazioni per reset totale db di tracciamento dei documenti
    db.run(sql1);
    const sql2 = 'DELETE FROM llama2';
    db.run(sql2);
    const sql3 = 'DELETE FROM mistral';
    db.run(sql3);
    const sql4 = 'DELETE FROM mixtral';
    db.run(sql4);
    const sql5 = 'DELETE FROM openChat';
    db.run(sql5);
    const sql6 = 'DELETE FROM starling';
    db.run(sql6);
    db.close((err) => {                                                             //chiusura del db quando ho finito di operare su di lui
        if (err) {
          return console.error(err.message);
        }
        //console.log("Closed the database connection after elimination.");         //decommentare per verificare il funzionamento
    });
    const directoryPath = './src/db/docs';
    const files = await fsPromises.readdir(directoryPath);
    // Elimina ogni file uno per uno
    for (const file of files) {
        const filePath = join(directoryPath, file); // Costruisci il percorso completo del file
        await fsPromises.unlink(filePath);          // Elimina il file
    }
    try {
      const client = new ChromaClient()
      await client.deleteCollection({name : collections['openAi']})                 //operazioni per reset contenuto collezioni embedding chroma
      await client.deleteCollection({name : collections['llama2']})
      await client.deleteCollection({name : collections['openChat']})
      await client.deleteCollection({name : collections['mistral']})
      await client.deleteCollection({name : collections['mixtral']})
      await client.deleteCollection({name : collections['starling']})
    } catch (e) {
      console.log(e)
    }
  
    return Response.json({ success: true })                                         //chiamata eseguita correttamente
  }