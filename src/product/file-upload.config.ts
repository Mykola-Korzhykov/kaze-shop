import path, { extname } from 'path';
import { Request } from 'express';
import { mkdirSync, existsSync } from 'fs';
import { v4 } from 'uuid';

export const fileName = (req: Request, file: Express.Multer.File, callback) => {
  const name = file.originalname.split('.')[0];
  const ext = extname(file.originalname);
  const randomName = v4();
  callback(null, `${randomName}--${req.body.title}--${name}${ext}`);
};

export const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  const filetypes = /\.(jpg|jpeg|png|gif)$/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return callback(null, true);
  }
  return callback(new Error('Only image files are allowed!'), false);
};

export const destination = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error, destination: string) => void,
) => {
  try {
    const destination = path.join(
      __dirname,
      'static',
      'products',
      `${req.body.title}`,
    );
    const imagesPath = path.join(
      __dirname,
      'static',
      'products',
      `${req.body.title}`,
      file.fieldname,
    );
    if (!existsSync(destination)) {
      mkdirSync(destination);
    }
    if (!existsSync(imagesPath)) {
      mkdirSync(imagesPath);
    }
    callback(null, imagesPath);
  } catch (err) {
    throw err;
  }
};
