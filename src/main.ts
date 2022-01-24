// eslint-disable-next-line @typescript-eslint/no-var-requires
// require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './redis.adapter';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(new RedisIoAdapter(app));

  await app.listen(port);
}
bootstrap();
