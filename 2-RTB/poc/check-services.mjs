
import { exec } from 'child_process';
import axios from "axios";
import {ChromaClient} from "chromadb";

const collections  = {
    llama2 : "llama2_poc_collections",
    openChat : "openChat_poc_collections",
    mistral : "mistral_poc_collections",
    mixtral : "mixtral_poc_collections",
    starling : "starling_poc_collections",
    openAi : "openAi_poc_collections",
};

const ollamaModels = [
   "llama2:latest",
    "openchat:7b-v3.5",
    "mistral",
    "mixtral:8x7b",
    "starling-lm"
];



const errors = []

// Controllo ChromaDb
const checkService = (port) => {
    return new Promise((resolve) => {
        exec(`lsof -i :${port} -sTCP:LISTEN`, (error) => {
            if (error) {
                errors.push("× | ChromaDB non e' in esecuzione");
            } else {
                console.log("✔ | ChromaDb e' in Esecuzione. ");
            }
            resolve();

        });
    });
};

const checkChromaCollections = async () =>{
    const client = new ChromaClient();
    for(const key in collections){
        try {
            await client.getOrCreateCollection({
                name: collections[key]
            });
            //console.log(`✔ | La collezione ${collections[key]} è presente.`);
        } catch (e){
            errors.push("× | Errore nella lettura o creazione delle collezioni");
        }
    }
    console.log("✔ | Sono presenti tutte le collezioni. ");
};

// Controllo Ollama

const checkOllama= async () => {
    try {
        const response = await axios.get('http://localhost:11434/api/tags');
        console.log("✔ | Ollama e' in Esecuzione.")
        if (Array.isArray(response.data.models)) {
            let installedModels = [];
            response.data.models.forEach( (model) =>{
                installedModels.push(model.name);
            });
            ollamaModels.forEach((model) =>{
                if(installedModels.includes(model)){
                    console.log(`✔ | Il modello ${model} è presente`);
                }else{
                    errors.push(`× | Il modello ${model} non è presente`);
                }
            });
        }
    }catch (e){
        errors.push("× | Ollama non e' in esecuzione")
    }
}

const checkOpenAi = () => {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (openaiApiKey) {
        console.log(`✔ | OPENAI_API_KEY trovata: ${openaiApiKey}`);
    } else {
        errors.push('× | OPENAI_API_KEY non trovata');
    }
}

const checkServices = async () => {
    if(await checkService(8000)){
        await checkChromaCollections();
    }
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
