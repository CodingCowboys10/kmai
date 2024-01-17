
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
    "openchat:latest",
    "mistral:latest",
    "mixtral:latest",
    "starling-lm:latest"
];



const errors = []

// Controllo ChromaDb
const checkChroma = async () => {
    try{
         const client = new ChromaClient();
         await client.version();
         console.log("✔ | ChromaDB è in esecuzione.")
         await checkChromaCollections(client);
    }catch (e) {
        errors.push("× | ChromaDB non è in esecuzione.");
    }
};

const checkChromaCollections = async (client) =>{

    try {
        for(const key in collections) {
            await client.getOrCreateCollection({
                name: collections[key]
            });
        }
        console.log("\t✔ | Sono presenti tutte le collezioni. ");
        //console.log(`✔ | La collezione ${collections[key]} è presente.`);
    } catch (e){
        errors.push("\t× | Errore nella lettura o creazione delle collezioni");
    }


};

// Controllo Ollama

const checkOllama= async () => {
    try {
        const response = await axios.get('http://localhost:11434/api/tags');
        console.log("✔ | Ollama è in esecuzione.")
        if (Array.isArray(response.data.models)) {
            let installedModels = [];
            response.data.models.forEach( (model) =>{
                installedModels.push(model.name);
            });
            ollamaModels.forEach((model) =>{
                if(installedModels.includes(model)){
                    console.log(`\t✔ | Il modello ${model} è presente`);
                }else{
                    console.log(`× | Il modello ${model} non è presente`);
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
    await checkChroma();
    await checkOllama();
    //checkOpenAi();
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
