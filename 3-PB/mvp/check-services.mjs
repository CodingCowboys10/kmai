//avviare npm run check-services per fare la prova dei servizi
import axios from "axios";
import {ChromaClient} from "chromadb";
import AWS from "aws-sdk";
import pg from "pg";

const s3 = new AWS.S3({
    endpoint: 'http://minio:9000',
    accessKeyId: "ROOTUSER" ,
    secretAccessKey : "CHANGEME123",
    s3ForcePathStyle: true,
});


const ollamaModels = [
    "starling-lm:latest"
];

const errors = []

const collections  = {
    starling : "starling-poc-collections",
    openAi : "openai-poc-collections",
};

// Funzione per controllare la connessione a PostgreSQL
const checkPostgres = async () => {
    const config = {
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        password: 'postgres',
        port: '5432',
    };

    const client = new pg.Client(config);

    try {
        await client.connect();
        console.log("✔ | PostgreSQL è connesso.");
    } catch (e) {
        errors.push("× | Impossibile connettersi a PostgreSQL.");
    } finally {
        await client.end();
    }
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
        const response = await axios.get('http://ollama:11434/api/tags');
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
    await checkPostgres();
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
