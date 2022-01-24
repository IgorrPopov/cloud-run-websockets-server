import { IoAdapter } from '@nestjs/platform-socket.io';
import { RedisClient } from 'redis';
import { ServerOptions } from 'socket.io';
import { createAdapter } from 'socket.io-redis';

const pubClient = new RedisClient({
  host: 'redis-14045.c250.eu-central-1-1.ec2.cloud.redislabs.com',
  port: 14045,
  auth_pass: '08nV38qyxdgzkm9CKr9hZ5hh2A3g71pE',
});
const subClient = pubClient.duplicate();
const redisAdapter = createAdapter({ pubClient, subClient });

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}
