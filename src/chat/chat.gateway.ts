import { CACHE_MANAGER, Inject } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Cache } from 'cache-manager';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async handleConnection(client: any) {
    const userId: string = client.handshake.query.userId;
    const socketId: string = client.id;

    await this.cacheManager.set(userId, socketId, { ttl: 86400 }); // 86400 24 hours
    await this.cacheManager.set(socketId, userId, { ttl: 86400 }); // 86400 24 hours
  }

  async handleDisconnect(client: any) {
    const socketId: string = client.id;
    const userId: string = await this.cacheManager.get(socketId);

    console.error(`userId: $${userId}`);

    if (userId) {
      await this.cacheManager.del(userId);
      await this.cacheManager.del(client.id);
    }

    this.server.emit('userLeft', userId);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, userId: string): void {
    this.server.emit('newMessage', userId);
  }
}
