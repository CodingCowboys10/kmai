import {ChromaClient} from "chromadb";

const errors = []

const collections  = {
    starling : "starling-mvp-collections",
    openAi : "openai-mvp-collections",
};

// avvio ChromaDb
const chromaStarter = async () => {
    try{
        const client = new ChromaClient({path: "http://chromadb:8000"});
        await client.version();
        console.log("✔ | ChromaDB è in esecuzione.")
        await checkChromaCollections(client);
    }catch (e) {
        errors.push("× | ChromaDB non è ancora in esecuzione.");
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

chromaStarter().then(() => {
    if (errors.length !== 0) {
        errors.forEach((error) => console.error(error));
        console.log("\n")
        process.exit(1);
    }
}).catch(() => {
    process.exit(1);
});