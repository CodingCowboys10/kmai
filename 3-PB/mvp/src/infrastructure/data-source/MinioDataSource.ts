import {S3} from "aws-sdk";
import {collections} from "@/lib/site-config";
import type {Document, IDocumentDataSource} from "@/lib/config/interfaces";
import {injectable, inject} from "tsyringe";

@injectable()
class MinioDataSource implements IDocumentDataSource{

    private readonly _db : S3;
    constructor( @inject("s3") db: S3) {
        this._db = db;
    }

    async addOne({doc, model } : {doc:Document, model:string}) {

        await this._db.putObject({
            Body:  doc.content,
            Bucket: collections[model],
            Key: doc.name,
            Tagging: "visibility=visible"
        }).promise()
    }

    async deleteOne({docName, model } : {docName:string, model:string}) {
        await this._db.deleteObject({
            Bucket: collections[model],
            Key: docName
        }).promise()
    }

    async getAll(model: string): Promise<Document[]> {
        const objects = await this._db.listObjects({
            Bucket: collections[model]
        }).promise();
        const response = objects.Contents!
        return response.map((doc) => {
            return {
                name: doc.Key!,
                date: doc.LastModified!,
                size: doc.Size!,
            }
        });
    }

   async getContent({docName, model}: {docName: string, model: string}): Promise<string> {
        return  await this._db.getSignedUrlPromise('getObject',{
           Bucket: collections[model],
           Key: docName,
           Expires: 36000
       })

    }

}

export {MinioDataSource}