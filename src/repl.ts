import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function replStart() {
  await repl(AppModule);
}

replStart();
