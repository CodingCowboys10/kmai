import { promises as fsPromises } from 'fs';
import { resolve } from 'path';

export async function POST(request: Request) {                                      //chiamato per eliminare un documento specifico
    const body = await request.json();
    const name = body.name;
  
    let sql;
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database("./src/db/databaseDoc.db", sqlite3.OPEN_READWRITE, (err) => {   //si prepara il db
        if (err) return console.error(err.message);
    });
    sql = 'DELETE FROM documents WHERE name=?';                                     //query per eliminare il documento di interesse
    db.run(
        sql,
        [name],
        (err) => {
            if (err) return console.error(err.message);
    });
    db.close((err) => {                                                             //chiusura del db quando ho finito di operare su di lui
        if (err) {
          return console.error(err.message);
        }
        //console.log("Closed the database connection after elimination.");         //decommentare per verificare il funzionamento
    });

    const path = `./src/db/docs/${name}`                                            //viene impostato il path dove si trova il documento da eliminare
    const absolutePath = resolve(path);                                             //viene verificato il path, per prepararlo all'eliminazione
    await fsPromises.unlink(absolutePath);                                          //viene eliminato il file definitivamente
  
  
    return Response.json({ success: true })                                         //chiamata eseguita correttamente
  }