import { repl } from '@nestjs/core';
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';

async function commanderStart() {
    await CommandFactory.run(AppModule);
    await CommandFactory.run(AppModule, ['warn', 'error']);
}

commanderStart();
