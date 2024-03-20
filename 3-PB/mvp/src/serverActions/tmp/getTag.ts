"use server";

import AWS from "aws-sdk";

const AWSParams = {
  endpoint: "http://127.0.0.1:9000", //ristabilito
  accessKeyId: "ROOTUSER",
  secretAccessKey: "CHANGEME123",
  s3ForcePathStyle: true,
};

export async function getTag(data: FormData) {
  const s3 = new AWS.S3(AWSParams);
}
