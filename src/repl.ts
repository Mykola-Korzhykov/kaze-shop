import { repl } from '@nestjs/core';
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function replStart() {
  await CommandFactory.run(AppModule);
  await repl(AppModule);
}

replStart();
