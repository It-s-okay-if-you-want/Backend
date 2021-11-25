import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/lib/multer/multerOption';
import UploadService from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
  ) { }

  @UseInterceptors(FilesInterceptor('image', null, multerOptions))

  @Post('/')
  public uploadFiles(
    @UploadedFiles() file: File[],
  ) {
    const UploadedFile: string[] = this.uploadService.uploadFiles(file);

    return {
      status: 200,
      message: '파일 업로도를 성공하였습니다.',
      data: {
        file: UploadedFile,
      },
    };
  }
}
