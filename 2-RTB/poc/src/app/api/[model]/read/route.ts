import {collections, AWSParams} from "@/utils/chat_utils";
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
        const s3 = new AWS.S3(AWSParams);

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
