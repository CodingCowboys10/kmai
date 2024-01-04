interface RisultatoQuery{
    name: string;
    path: string;
    date: string;
}

let result = [];
export async function GET(req: Request, { params }: { params: { model: string } }) {
    const model = params.model;
    let sql;
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database("./src/db/databaseDoc.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) return console.error(err.message);
    });

    sql = `SELECT * FROM ${model}`;
    
    db.all(sql, [], (err, rows: RisultatoQuery[]) => {
        if (err) {
            db.close(); // Chiudi il database in caso di errore
            return console.error(err.message);
        }

        db.close((err) => {
            if (err) {
                return console.error(err.message);
            }
            // Invia la risposta solo dopo aver chiuso il database
            // Assicurati di gestire correttamente questo flusso asincrono
            Response.json(rows);
        });
    });
}
