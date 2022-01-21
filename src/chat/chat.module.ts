import type { ClientOpts as RedisClientOpts } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  imports: [
    CacheModule.register<RedisClientOpts>({
      store: redisStore,
      // Store-specific configuration:
      host: '10.30.8.67',
      port: 6379,
    }),
  ],
  providers: [ChatGateway],
})
export class ChatModule {}
