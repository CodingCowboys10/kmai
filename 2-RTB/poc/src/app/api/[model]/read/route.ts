import {collections} from "@/utils/chat_utils";
import {NextRequest, NextResponse} from "next/server";
import AWS from "aws-sdk";

export const runtime = 'nodejs';

interface RisultatoQuery{
    name: string;
    date: string;
    size : number;
}



export async function GET(req: NextRequest, { params }: { params: { model: string } }) {
    const model = params.model;

    try {
        const s3 = new AWS.S3({
            endpoint: 'http://172.17.0.2:9000',
            accessKeyId: "mh4FLEcxIO5m1HaAZdA4" ,
            secretAccessKey : "hU5zNnQquAMOB0UCK19NodZUkKUOMQmEy6Uqb5Xs",
            s3ForcePathStyle: true,
        });

        const bucket = await s3.listObjects({
            Bucket: collections[model],
        }).promise()

        const response = bucket.Contents!

        const result: RisultatoQuery[] = response.map((doc: any) => ({
            name: doc.Key,
            date: doc.LastModified.toISOString(),
            size: doc.Size,
        }));

        return NextResponse.json(result, {status: 200});
    }
    catch (e){
        console.log(e)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

}
