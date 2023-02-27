import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Scope,
} from '@nestjs/common';
import * as fs from 'fs';
import * as uuid from 'uuid';
import path, { extname } from 'path';
import { Request } from 'express';
import { mkdirSync, existsSync } from 'fs';
import { v4 } from 'uuid';
import util from 'util';
import rimraf from 'rimraf';
import startsWith from 'path-starts-with';
import colors from 'ansi-colors';
const readdir = util.promisify(fs.readdir);
const GARBAGE_REGEX = /(?:Thumbs\.db|\.DS_Store)$/i;
// tslint:disable-next-line: class-name
interface fileCreated {
  readonly fileName: string;
  readonly filePath: string;
}

@Injectable({ scope: Scope.DEFAULT })
export class FilesService {
  private readonly Logger = new Logger(FilesService.name);

  async deleteEmpty(cwd: string, options?: any, cb?: any) {
    try {
      if (typeof cwd !== 'string') {
        return Promise.reject(
          new TypeError('expected the first argument to be a string'),
        );
      }

      if (typeof options === 'function') {
        cb = options;
        options = null;
      }

      if (typeof cb === 'function') {
        return this.deleteEmpty(cwd, options, cb)
          .then((res: any) => cb(null, res))
          .catch(cb);
      }

      const opts = options || {};
      const dirname = path.resolve(cwd);
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      const onDirectory = opts.onDirectory || (() => {});
      const empty: string[] = [];

      const remove = async (filepath: string) => {
        const dir = path.resolve(filepath);

        if (!this.isValidDir(cwd, dir, empty)) {
          return;
        }
        onDirectory(dir);

        const files = await readdir(dir);

        if (this.isEmpty(dir, files, empty, opts)) {
          empty.push(dir);

          await this.deleteDir(dir, opts);

          if (opts.verbose === true) {
            console.log(colors.red('Deleted:'), path.relative(cwd, dir));
          }

          if (typeof opts.onDelete === 'function') {
            await opts.onDelete(dir);
          }

          return remove(path.dirname(dir));
        }

        for (const file of files) {
          await remove(path.join(dir, file));
        }

        return empty;
      };

      return remove(dirname);
    } catch (err) {
      this.Logger.log(err);
    }
  }

  deleteEmptySync(cwd: string, options?: any) {
    if (typeof cwd !== 'string') {
      throw new TypeError('expected the first argument to be a string');
    }

    const opts = options || {};
    const dirname = path.resolve(cwd);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const deleted = [];
    const empty = [];

    const remove = (filepath: string) => {
      const dir = path.resolve(filepath);

      if (!this.isValidDir(cwd, dir, empty)) {
        return empty;
      }

      const files = fs.readdirSync(dir);

      if (this.isEmpty(dir, files, empty, opts)) {
        empty.push(dir);

        this.deleteDirSync(dir, opts);

        if (opts.verbose === true) {
          this.Logger.log(colors.red('Deleted:'), path.relative(cwd, dir));
        }

        if (typeof opts.onDelete === 'function') {
          opts.onDelete(dir);
        }

        return remove(path.dirname(dir));
      }

      for (const filepath of files) {
        remove(path.join(dir, filepath));
      }
      return empty;
    };

    remove(dirname);
    return empty;
  }

  isEmpty(dir: string, files: string[], empty: string[], options: any = {}) {
    const filter = options.filter || this.filterGarbage;
    const regex = options.junkRegex;

    for (const basename of files) {
      const filepath = path.join(dir, basename);

      if (
        !(options.dryRun && empty.includes(filepath)) &&
        filter(filepath, regex) === true
      ) {
        return false;
      }
    }
    return true;
  }

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

  private deleteDirSync(dirname: string, options: any = {}) {
    if (options.dryRun !== true) {
      return rimraf.sync(dirname, { ...options, glob: false });
    }
  }

  private isGarbageFile(file: string, regex: RegExp = GARBAGE_REGEX) {
    return regex.test(file);
  }

  private filterGarbage(file: string, regex: RegExp) {
    return !this.isGarbageFile(file, regex);
  }

  private isValidDir(cwd: string, dir: string, empty: string[]) {
    return (
      !empty.includes(dir) && startsWith(dir, cwd) && this.isDirectory(dir)
    );
  }

  private async deleteDir(dirname: string, options: any = {}) {
    if (options.dryRun !== true) {
      return new Promise<void>((resolve, reject) => {
        try {
          rimraf(dirname, { ...options, glob: false });
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    }
  }

  private isDirectory(dir: string) {
    try {
      return fs.statSync(dir).isDirectory();
    } catch (err) {
      this.Logger.error(err);
    }
    return false;
  }
}
