import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      auth_pass: process.env.REDIS_PASSWORD,
    }),
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
