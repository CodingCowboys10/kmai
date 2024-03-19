//eseguire una volta sola con comando node ./setDB.js
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

async function createChatThreadsTable() {
  try {
    const query = `
            CREATE TABLE IF NOT EXISTS chat_threads (
              id SERIAL PRIMARY KEY,
	            title TEXT NOT NULL,
	            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
    await pool.query(query);
    console.log("Table chat_threads started");
  } catch (e) {
    console.error(e);
    console.error("Error starting chat_threads table");
  }
}

async function createMessagesTable() {
  try {
    const query = `
            CREATE TABLE IF NOT EXISTS messages (
                id VARCHAR(255) PRIMARY KEY,
                thread_id INTEGER REFERENCES chat_threads(id) ON DELETE CASCADE,
                content TEXT NOT NULL,
                role VARCHAR(255),
                created_at TIMESTAMP,
                sourcePage VARCHAR(30),
                sourceLink VARCHAR(30),
                UNIQUE (thread_id, id)
            );
        `;
    await pool.query(query);
    console.log("Table messages started");
  } catch (e) {
    console.error(e);
    console.error("Error starting messages table");
  }
}

async function createIndex() {
  try {
    const query = `
            CREATE INDEX IF NOT EXISTS idx_messages_content ON messages(content);
        `;
    await pool.query(query);
    console.log("Index started");
  } catch (e) {
    console.error(e);
    console.error("Error starting index");
  }
}

async function test() {
  try {
    const query = `INSERT INTO chat_threads (title) VALUES ('Qual è il tempo domani?');
        INSERT INTO messages (thread_id, content, role) VALUES (1, 'Qual è il tempo oggi?', 'user'),
                                                               (1, 'Il tempo oggi è soleggiato.', 'model');`;
    /*const query = `INSERT INTO chat_threads (title) VALUES ('Come mi chiamo?');
                       INSERT INTO messages (thread_id, content, role) VALUES (2, 'Come mi chiamo?', 'user'),
                                                                              (2, 'Ti chiami Francesco', 'model'),
                                                                              (2, 'Quanti anni ho?', 'user'),
                                                                              (2, 'Hai 22 anni', 'model');`;*/
    await pool.query(query);
    console.log("Test started");
  } catch (e) {
    console.error(e);
    console.error("Error starting test");
  }
}

async function cancella() {
  try {
    await pool.query(`DROP TABLE IF EXISTS messages;`);
    console.log("Table messages deleted");
    await pool.query(`DROP TABLE IF EXISTS chat_threads;`);
    console.log("Table chat_threads deleted");
    await pool.query(`DROP INDEX IF EXISTS idx_messages_content;`);
    console.log("Index deleted");
  } catch (e) {
    console.error(e);
    console.error("Error deleting tables");
  }
}

async function crea() {
  try {
    await createChatThreadsTable();
    await createMessagesTable();
    await createIndex();
  } catch (e) {
    console.error(e);
    console.error("Error creating tables");
  }
}

async function stampa() {
  try {
    console.log("CHAT THREADS");
    let query = "SELECT * from chat_threads";
    let res = await pool.query(query);
    console.log(res.rows);
    console.log("-----------------------------------------------");
    console.log("MESSAGES");
    query = "SELECT * from messages";
    res = await pool.query(query);
    console.log(res.rows);
  } catch (e) {
    console.error(e);
    console.error("Error printing tables");
  }
}

async function svuota() {
  try {
    await pool.query(`DELETE FROM messages;`);
    console.log("Messages deleted");
    await pool.query(`DELETE FROM chat_threads;`);
    console.log("Chat threads deleted");
  } catch (e) {
    console.error(e);
    console.error("Error deleting tables");
  }
}

//decommenta la funzione che vuoi eseguire

crea(); //crea le tabelle e l'indice se non esistono
//cancella(); //cancella le tabelle e l'indice integralmente
//stampa(); //stampa i contenuti delle tabelle
//svuota(); //svuota le tabelle senza cancellarle

//console.log('-----------------------------------------------');

//test();   //inserisce dati di test
