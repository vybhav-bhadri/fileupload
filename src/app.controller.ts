import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { multerOptions } from './upload';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


//   @Post()
//   @UseInterceptors(
// 	FileInterceptor('pdf'),
// )
// async uploadedFile(@UploadedFile() file) {
//     const response = {
//     	originalname: file.originalname,
//     	filename: file.originalname,
//     };
//     return response;
// }

@Get(':pdfpath')
seeUploadedFile(@Param('pdfpath') pdf, @Res() res) {
  return res.sendFile(pdf, { root: './copied' });
}

// @Post('upload')
// @UseInterceptors(FileInterceptor('file'))
// uploadFile(@UploadedFile() file: Express.Multer.File) {
//   console.log(file);
// }

// @Post('/test')
// @UseInterceptors(FileInterceptor('file',{dest:'./uploads'}))
// uploadFiletest(@UploadedFile() file){
//   const path = "d:\\vybhav" +  file.originalname;
//   let fileStream = createWriteStream(path);
//   fileStream.write(file.buffer);
//   fileStream.end()
//   const response = {
//     originalname: file.originalname,
//     filename: file.originalname,
//   };
//   return response;
// }

@Post('/action/upload')
@UseInterceptors(FileInterceptor('file', multerOptions))
async upload( @UploadedFile() file) {
  this.appService.copyFileTest(file)
  console.log(file)
}

}
