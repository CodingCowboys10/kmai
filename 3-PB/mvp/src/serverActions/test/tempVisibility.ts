"use server";

import { IModel } from "@/lib/config/interfaces";
import { ChromaClient } from "chromadb";
import { collections } from "@/lib/models";
import AWS from "aws-sdk";

async function changeVisibility(
  name: string,
  model: IModel,
  visibility: boolean,
) {
  console.log(name);
  const client = new ChromaClient();
  const collection = await client.getCollection({ name: collections[model] });
  const ids = (
    await collection.get({
      where: { name: { $eq: name } },
      include: [],
    })
  ).ids;

  const metadatas = ids.map(() => ({ visibility: visibility }));

  await collection.update({
    ids: ids,
    metadatas: metadatas,
  });

  /*-----------*/

  const s3 = new AWS.S3({
    endpoint: "http://127.0.0.1:9000", //ristabilito
    accessKeyId: "ROOTUSER",
    secretAccessKey: "CHANGEME123",
    s3ForcePathStyle: true,
  });

  s3.putObjectTagging(
    {
      Bucket: collections[model],
      Key: name,
      Tagging: {
        TagSet: [
          { Key: "visibility", Value: visibility ? "visible" : "invisible" },
        ],
      },
    },
    function (err, data) {
      if (err) {
        console.error("Errore durante il settaggio dei tag:", err);
      } else {
        console.log("I tag sono stati impostati con successo:", data);
      }
    },
  );
}

export default changeVisibility;
