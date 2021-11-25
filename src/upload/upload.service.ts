import { Injectable } from "@nestjs/common";
import { createImageURL } from "../lib/multer/multerOption";

@Injectable()
export default class UploadService {
  public uploadFiles(file: File[]): string[] {
    const generatedFiles: string[] = [];

    generatedFiles.push(createImageURL(file));
    // http://localhost:8080/public/파일이름 형식으로 저장이 됩니다.

    return generatedFiles;
  }
}