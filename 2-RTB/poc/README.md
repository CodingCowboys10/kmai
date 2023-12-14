# Come Runnare

```shell
npm install # Installa le dipendenze

npm run dev
```

> **N.B** l'url che vi restituisce ora non e' piu' quello corretto ma dovete aggiungere **/chat**

create un file .env dentro langchain_test e dentro inserite:
```dotenv
#poc/.env.local
OPENAI_API_KEY=sk-xxxx
```

---
Se ancora da errori :

```shell
npm install -S langchain # Installa langchain
npm install -S dotenv # Installa la libreria per .env.local
npm install --save chromadb # Installa chroma db

python3 -m venv .venv  # Crea un ambiente virtuale python in cui scaricare poi chroma db

#Questo passaggio cambia in base al Vostro SO e alla vostra shell, chiedete a chat gpt o cercate su internet. Non tengo voglia di fare le casistiche.
.venv/bin/activate.fish #Runnare il vostro ambiente virtuale

pip install chromadb #installare chroma
chroma run  #Runnare chroma
```

