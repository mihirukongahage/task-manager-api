import { s3 } from "../configs/aws-config";

export class S3Repository {
  private bucketName = process.env.DYNAMODB_TABLE_NAME;

  public async uploadFile(file: Express.Multer.File): Promise<string> {
    const { buffer, originalname, mimetype } = file;
    const s3Key = `uploads/${Date.now()}-${originalname}`;

    if (!this.bucketName) {
      throw new Error("No Dynamodb table name found");
    }

    const params = {
      Bucket: this.bucketName,
      Key: s3Key,
      Body: buffer,
      ContentType: mimetype,
    };

    try {
      const data = await s3.upload(params).promise();
      return data.Location;
    } catch (error) {
      throw new Error("Error uploading file to S3: " + error);
    }
  }
}
