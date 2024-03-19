import axios from "axios";
import {ChromaClient} from "chromadb";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
    endpoint: 'http://127.0.0.1:9000',
    accessKeyId: "ROOTUSER" ,
    secretAccessKey : "CHANGEME123",
    s3ForcePathStyle: true,
});


const ollamaModels = [
   "llama2:latest",
    "openchat:latest",
    "mistral:latest",
    "mixtral:latest",
    "starling-lm:latest"
];

const errors = []

const collections  = {
    llama2 : "llama2-poc-collections",
    openChat : "openchat-poc-collections",
    mistral : "mistral-poc-collections",
    mixtral : "mixtral-poc-collections",
    starling : "starling-poc-collections",
    openAi : "openai-poc-collections",
};

// Controllo MinIo
const checkMinIO = async () => {
    await new Promise((resolve, reject) => {
        s3.listBuckets((err) => {
            if (err) {
                errors.push("× | MinIO non è in esecuzione.");
                reject(err);
            } else {
                console.log("✔ | MinIO è in esecuzione.");
                resolve();
            }
        });
    });

    for (const collectionKey in collections) {
        const params = {
            Bucket: collections[collectionKey],
        };

        try {
            await s3.createBucket(params).promise();
            console.log(`\t✔ | Il bucket ${collections[collectionKey]} è stato creato`);
        } catch (e) {

        }
    }
    console.log("-----------------------\n");

};
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
                    console.log(`\t× | Il modello ${model} non è presente`);
                }
            });
        }
    }catch (e){
        errors.push("× | Ollama non e' in esecuzione")
    }
}

const checkServices = async () => {
    console.log("-----------------------\n")
    await checkChroma();
    await checkOllama();
    await checkMinIO();
};

checkServices().then(() => {
    if (errors.length !== 0) {
        errors.forEach((error) => console.error(error));
        console.log("\n")
        process.exit(1);
    }

}).catch(() => {
    process.exit(1);
});
