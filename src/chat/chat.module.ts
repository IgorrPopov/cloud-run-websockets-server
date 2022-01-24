import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'redis-14045.c250.eu-central-1-1.ec2.cloud.redislabs.com',
      port: 14045,
      auth_pass: '08nV38qyxdgzkm9CKr9hZ5hh2A3g71pE',
    }),
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
