import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import * as fs from 'fs';
import * as uuid from 'uuid';
import path, { extname } from 'path';
import { Request } from 'express';
import { mkdirSync, existsSync } from 'fs';
import { v4 } from 'uuid';

// tslint:disable-next-line: class-name
interface fileCreated {
  readonly fileName: string;
  readonly filePath: string;
}

@Injectable({ scope: Scope.DEFAULT })
export class FilesService {
  async createFile(file: {
    buffer: string | NodeJS.ArrayBufferView;
  }): Promise<fileCreated> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return { fileName: fileName, filePath: filePath };
    } catch (e) {
      throw new HttpException(
        'Error occured while writing file.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async unlinkFile(filePath: string) {
    filePath = path.join(__dirname, 'static', filePath);
    fs.unlink(filePath, (err) => {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }

  createfileName(req: Request, file: Express.Multer.File, callback: any) {
    const name = file.originalname.split('.')[0];
    const ext = extname(file.originalname);
    const randomName = v4();
    callback(null, `${randomName}--${req.body.title}--${name}${ext}`);
  }

  fileFilter(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error, acceptFile: boolean) => void,
  ) {
    const filetypes = /\.(jpg|jpeg|png|gif)$/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase(),
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return callback(null, true);
    }
    return callback(new Error('Only image files are allowed!'), false);
  }

  destination(
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error, destination: string) => void,
  ) {
    const destination = path.join(
      __dirname,
      'static',
      'products',
      `${req?.body?.title}`,
    );
    const imagesPath = path.join(
      __dirname,
      'static',
      'products',
      `${req?.body?.title}`,
      file.fieldname,
    );
    if (!existsSync(destination)) {
      mkdirSync(destination, { recursive: true });
    }
    if (!existsSync(imagesPath)) {
      mkdirSync(imagesPath, { recursive: true });
    }
    callback(null, imagesPath);
  }
}
