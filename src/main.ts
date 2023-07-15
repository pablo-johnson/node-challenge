import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

async function bootstrap() {
  config()
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.LISTENING_PORT);
}
bootstrap();
