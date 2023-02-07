import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

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
    filePath = path.join(__dirname, '..', filePath);
    fs.unlink(filePath, (err) => {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    });
  }
}
