import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Sse,
  StreamableFile,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createReadStream, readFileSync } from 'fs';
import path from 'path';
import { Observable, map, timeout } from 'rxjs';
import { NextFunction, Request, Response } from 'express';
@ApiTags('/')
@Controller('/:path')
export class AppController {
  @Get('')
  serveStatic(@Res() response: Response) {
    const directoryPath = path.join(__dirname, 'static');
    
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return timeout(1000).apply(
      map((_) => ({ data: { hello: 'world' } } as MessageEvent)),
    );
  }
}
