import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { Response } from 'express';
import favicon from 'serve-favicon';
import { AppClusterService } from './core/services/cluster.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './core/filters/all-exceptions.filter';
import { ApiErrorExceptionFilter } from './common/filters/error-handler.filter';
import { ApiExceptionFilter } from './common/filters/api-exception.filter';
import { extname, join } from 'path';
import bodyParser from 'body-parser';

const PORT: number = Number(process.env.PORT) || 2222;
declare const module: any;
async function startServer(): Promise<INestApplication> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: true,
    bufferLogs: true,
    autoFlushLogs: true,
    forceCloseConnections: true,
  });
  const httpAdapter = app.get(HttpAdapterHost);
  app.enableShutdownHooks();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapter),
    new ApiErrorExceptionFilter(),
    new ApiExceptionFilter(),
  );
  app.set('trust proxy', true);
  app.use(favicon(join(__dirname, 'static', 'favicon', 'favicon.ico')));
  app.useStaticAssets(join(__dirname, 'static'), {
    prefix: '/public',
    lastModified: true,
    immutable: true,
    etag: true,
    redirect: true,
    fallthrough: true,
    maxAge: 30 * 24 * 60,
    setHeaders(res: Response, path, stat) {
      res.setHeader(
        'Access-Control-Allow-Origin',
        `${process.env.CLIENT_URL.toString().trim()}`,
      );
      res.setHeader('Content-size', `${stat.size}`);
      res.setHeader('Content-Type', `image/${extname(path).replace('.', '')}`);
      res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE',
      );
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'imageType, Authorization, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
      );
      res.setHeader(
        'Content-Security-Policy',
        `default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'`,
      );
    },
  });
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
  app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
  app.use(cookieParser(process.env.SECRET_KEY.toString().trim()));
  app.enableCors({
    origin: `${process.env.CLIENT_URL.toString().trim()}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'imageType'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
  });
  app.use(
    compression({
      level: 1,
      threshold: 1,
      windowBits: 15,
      memLevel: 9,
      chunkSize: 16384,
    }),
  );
  const config = new DocumentBuilder()
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .addApiKey({
      type: 'http',
    })
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .setTitle('Kazi.spos-API')
    .setDescription('Kazi.spos-API Docs')
    .setVersion('1.1.2')
    .addTag('nest.js')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  process.on('unhandledRejection', (reason: Error) => {
    console.log(reason.name, reason.message);
    console.log(reason);
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    return process.exit(1), reason;
  });
  process.on('uncaughtException', (err: Error) => {
    console.log(err.name, err.message);
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    return process.exit(1);
  });
  try {
    await app.listen(PORT, async (): Promise<string> => {
      console.log(
        `Directory: ${process.cwd()}, Process: ${
          process.pid
        }, URL: ${await app.getUrl()}, Server is being listened on port: ${PORT}`,
      );
      return app.getUrl();
    });
    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }
    return app;
  } catch (error: any) {
    console.error(`Error occured: ${error.message}`);
  }
}
if (process.env?.NODE_ENV === 'development') {
  try {
    startServer();
  } catch (err) {
    console.log(err);
  }
}
if (process.env?.NODE_ENV === 'production') {
  try {
    //startServer();
    AppClusterService.clusterize(startServer);
  } catch (err) {
    console.log(err);
  }
}
