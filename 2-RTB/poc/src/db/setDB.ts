//file con cui si è settato il database. Contiene tutte le operazioni eseguibili nel db sqlite3


let sql;
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./databaseMess.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
});


/*
sql = 'CREATE TABLE ChatHistory(id TEXT PRIMARY KEY, message TEXT, role TEXT, model TEXT, date TIMESTAMP)';
db.run(sql);
*/

/*
sql = 'INSERT INTO ChatHistory(message) VALUES (?)';
db.run(
    sql,
    ['Domanda?'],
    (err) => {
        if (err) return console.error(err.message);
    });
*/

/*
sql = 'SELECT * FROM ChatHistory';
db.all(sql, [], (err, rows) =>  {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
        console.log(row);
    })
})
*/

//db.run('DROP TABLE ChatHistory');

//db.run('DELETE FROM ChatHistory');

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
