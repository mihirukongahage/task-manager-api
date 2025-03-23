import * as AWS from "aws-sdk";
import * as dotenv from "dotenv";

dotenv.config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Dynamodb instance
export const dynamoDB = new AWS.DynamoDB.DocumentClient();

// S3 instance
export const s3 = new AWS.S3();
