interface RisultatoQuery{
    name: string;
    path: string;
    date: string;
}

let result = [];
export async function GET(req: Request, { params }: { params: { model: string } }) {                                       //chiamato per prendere dal database le info sui documenti
const model = params.model;

let sql;
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./src/db/databaseDoc.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});

sql = `SELECT * FROM ${model}`;                                                //query per avere le info dei documenti in database
db.all(sql, [], (err, rows: RisultatoQuery[]) =>  {
    if (err) return console.error(err.message);
    result = rows;
});
db.close((err) => {                                                             //chiusura del db quando ho finito di operare su di lui
    if (err) {
        return console.error(err.message);
    }
    //console.log("Closed the database connection after read.");                //decommentare per verificare il funzionamento
});
return Response.json(result);
}