import axios from "axios";
import {ChromaClient} from "chromadb";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
    endpoint: 'http://172.17.0.2:9000',
    accessKeyId: "mh4FLEcxIO5m1HaAZdA4" ,
    secretAccessKey : "hU5zNnQquAMOB0UCK19NodZUkKUOMQmEy6Uqb5Xs",
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
    s3.listBuckets( async (err) => {
        if (err) {
            throw "× | MinIO non è in esecuzione."
        } else {
            console.log("✔ | MinIO è in esecuzione.")
            for (const collectionKey in collections) {
                const params = {
                    Bucket: collections[collectionKey],
                }
                try{
                    await s3.createBucket(params).promise();
                }catch(e){
                    console.log(`\t✔ | Il bucket ${collections[collectionKey]} è presente`);
                }
            }
            console.log("-----------------------\n")
        }

    })

}
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

const checkServices = async () => {
    console.log("-----------------------\n")
    await checkChroma();
    await checkOllama();
    try{
        await checkMinIO();
    }catch (e){
        errors.push(e)
    }

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
