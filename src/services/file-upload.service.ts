import { S3Repository } from '../repositories/s3.repository';

const s3Repository = new S3Repository();

export class FileUploadService {
  private s3Repository = s3Repository;

  public async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const fileUrl = await this.s3Repository.uploadFile(file);
      return fileUrl;
    } catch (error) {
      throw new Error('Error in file upload service: ' + error);
    }
  }
}
