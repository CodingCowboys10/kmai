import { S3 } from "aws-sdk";

import type {
  Document,
  IDocumentDataSource,
  IModel,
} from "@/lib/config/interfaces";
import { injectable, inject } from "tsyringe";
import { collections } from "@/lib/models";

@injectable()
class MinioDataSource implements IDocumentDataSource {
  private readonly _db: S3;
  constructor(@inject("s3") db: S3) {
    this._db = db;
  }

  async addOne({ doc, model }: { doc: Document; model: IModel }) {
    await this._db
      .putObject({
        Body: doc.content,
        Bucket: collections[model],
        Key: doc.name,
        Tagging: "visibility=visible",
      })
      .promise();
  }

  async deleteOne({ docName, model }: { docName: string; model: IModel }) {
    await this._db
      .deleteObject({
        Bucket: collections[model],
        Key: docName,
      })
      .promise();
  }

  async getAll(model: IModel): Promise<Document[]> {
    const objects = await this._db
      .listObjects({
        Bucket: collections[model],
      })
      .promise();
    const response = objects.Contents!;

    return response.map(async (doc) => {
      return {
        name: doc.Key!,
        date: doc.LastModified!,
        size: doc.Size!,
        tag: (
          await this._db
            .getObjectTagging({ Bucket: collections[model], Key: doc.Key! })
            .promise()
        ).TagSet,
      };
    });
  }

  async getContent({
    docName,
    model,
  }: {
    docName: string;
    model: IModel;
  }): Promise<string> {
    return await this._db.getSignedUrlPromise("getObject", {
      Bucket: collections[model],
      Key: docName,
      Expires: 36000,
    });
  }
}

export { MinioDataSource };
