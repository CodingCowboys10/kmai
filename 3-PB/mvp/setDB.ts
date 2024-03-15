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
                id SERIAL PRIMARY KEY,
                thread_id INTEGER REFERENCES chat_threads(id),
                content TEXT NOT NULL,
                role VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
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
    /*const query = `INSERT INTO chat_threads (title) VALUES ('Qual è il tempo domani?');
        INSERT INTO messages (thread_id, content, role) VALUES (1, 'Qual è il tempo oggi?', 'user'),
                                                               (1, 'Il tempo oggi è soleggiato.', 'model');`;*/
    /*const query = `INSERT INTO chat_threads (title) VALUES ('Come mi chiamo?');
                       INSERT INTO messages (thread_id, content, role) VALUES (2, 'Come mi chiamo?', 'user'),
                                                                              (2, 'Ti chiami Francesco', 'model'),
                                                                              (2, 'Quanti anni ho?', 'user'),
                                                                              (2, 'Hai 22 anni', 'model');`;*/

    const query = `SELECT * from messages`;
    const result = await pool.query(query);
    console.log(result.rows);
    console.log("Test started");
  } catch (e) {
    console.error(e);
    console.error("Error starting test");
  }
}

//createChatThreadsTable();
//createMessagesTable();
//createIndex();

//console.log('-----------------------------------------------');

test();
