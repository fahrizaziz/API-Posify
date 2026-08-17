import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
export declare class CloudinaryService {
    uploadFile(file: Express.Multer.File, folder?: string): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
