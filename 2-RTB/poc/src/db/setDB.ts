//file con cui si è settato il database. Contiene tutte le operazioni eseguibili nel db sqlite3


let sql;
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./databaseDoc.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});


/*
sql = 'CREATE TABLE openAi(name TEXT PRIMARY KEY, path TEXT, date DATE DEFAULT CURRENT_DATE)';
db.run(sql);
*/

/*
// per inserire un nuovo documento in database
sql = 'INSERT INTO documents(name,path) VALUES (?,?)';
db.run(
    sql,
    ['tabella.pdf','./src/db/docs/tabella.pdf'],
    (err) => {
        if (err) return console.error(err.message);
    });
*/

/*
// restituisce tutti i documenti in database
sql = 'SELECT * FROM openAi';
db.all(sql, [], (err, rows) =>  {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
        console.log(row);
    })
})
*/


/*
let results = [];
sql = 'SELECT * FROM documents';
db.all(sql, [], (err, rows) =>  {
    if (err) return console.error(err.message);
    
    // Aggiungi ogni riga ai risultati
    rows.forEach((row) => {
        results.push(row);
    });

    // Ora results contiene tutti i risultati della query
    console.log(results);
});
*/


//db.run('DROP TABLE starling');


/*
// rimuovere un documento dal database
sql = 'DELETE FROM openAi WHERE name=?';
db.run(
    sql,
    ['Cyrus_Field.pdf'],
    (err) => {
        if (err) return console.error(err.message);
    });
*/


db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Closed the database connection.");
  });
