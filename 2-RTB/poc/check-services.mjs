
import { exec } from 'child_process';
import axios from "axios";


const errors = []

// Controllo ChromaDb
const checkService = (port) => {
    return new Promise((resolve) => {
        exec(`lsof -i :${port} -sTCP:LISTEN`, (error) => {
            if (error) {
                errors.push("× | ChromaDB non e' in esecuzione")
            } else {
                console.log("✔ | ChromaDb e' in Esecuzione. ");
            }
            resolve();

        });
    });
};

// Controllo Ollama

const checkOllama= async () => {
    try {
        const response = await axios.get('http://localhost:11434/api/tags');
        console.log("✔ | Ollama e' in Esecuzione.")
        if (Array.isArray(response.data)) {
            console.log('\tOllama is running and returned an array of tags:', response.data);
        }
    }catch (e){
        errors.push("× | Ollama non e' in esecuzione")
    }
}

const checkOpenAi = async() => {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (openaiApiKey) {
        console.log(`✔ | OPENAI_API_KEY trovata: ${openaiApiKey}`);
    } else {
        errors.push('× | OPENAI_API_KEY non trovata');
    }
}

const checkServices = async () => {
    await checkService(8000);
    await checkOllama();
     checkOpenAi();
};

checkServices().then(() => {
    if (errors.length !== 0) {
        errors.forEach((error) => console.error(error));
        console.log("\n")
        process.exit(1);
    }
}).catch((error) => {
    process.exit(1);
});
