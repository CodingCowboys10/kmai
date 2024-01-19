import { ChromaClient } from 'chromadb'
import {AWSParams, collections} from "@/utils/chat_utils"
import {NextRequest, NextResponse} from "next/server";
import AWS from "aws-sdk";


export async function POST(req: NextRequest) {
    const body = await req.json();
    const model = body.name;

    try{
        // MinIO
        const s3 = new AWS.S3(AWSParams);
        const objects = await s3.listObjects({ Bucket: collections[model] }).promise();
        const objectsToDelete = objects.Contents!.map(obj => ({
            Key: obj.Key || ''
        }));

        s3.deleteObjects({
            Bucket: collections[model],
            Delete: { Objects: objectsToDelete }
        }, (err) => {
            if (err) {
                throw err
            }
        });

    }catch (err){
        console.error(err);
        return NextResponse.json({ error:  err }, { status: 500 })
    }

    try {
        // ChromaDb
        const client = new ChromaClient()
        const collection = await client.getCollection({name : collections[model]})
        const responseId = (await collection.get()).ids
        await collection.delete({ids : responseId})
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err }, { status: 500 })
    }
    return NextResponse.json({ success: true, message: 'Documento Eliminato' }, { status: 200 })
  }