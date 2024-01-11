import {ChromaClient, IncludeEnum} from "chromadb";
import {collections} from "@/utils/chat_utils";
import {Metadata} from "next";

interface RisultatoQuery{
    name: string;
    path: string;
    date: string;
    size : number;
}

interface Metadata {
    name: string;
    source: string;
    date: string;
    size: number;
    page: number; // Assuming there's a 'page' property in the Metadata interface
}


export async function GET(req: Request, { params }: { params: { model: string } }) {                                       //chiamato per prendere dal database le info sui documenti
    const model = params.model;
    let result :  RisultatoQuery[] = [];

    try {
        const client = new ChromaClient()
        const collection = await client.getCollection({name: collections[model]})
        const response = await collection.get(
            {
                include: [IncludeEnum.Metadatas]
            }
        )

        result = response.metadatas.filter((obj : any)  => obj.page === 1) // Filter out entries where page is not equal to 1
            .map((obj : any) => ({
                name: obj.name,
                path: obj.source,
                date: obj.date,
                size: obj.size,
            }));

    }
    catch (e){
        console.log(e)
    }


    return Response.json(result);
}