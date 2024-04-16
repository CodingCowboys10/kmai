CREATE TABLE IF NOT EXISTS chat_threads (
                id SERIAL PRIMARY KEY,
	            title TEXT NOT NULL,
	            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	          );

CREATE TABLE IF NOT EXISTS messages (
                id VARCHAR(255) PRIMARY KEY,
                thread_id INTEGER REFERENCES chat_threads(id) ON DELETE CASCADE,
                content TEXT NOT NULL,
                role VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                sourcePage VARCHAR(30),
                sourceLink VARCHAR(255),
                UNIQUE (thread_id, id)
            );

CREATE INDEX IF NOT EXISTS idx_messages_content ON messages(content);