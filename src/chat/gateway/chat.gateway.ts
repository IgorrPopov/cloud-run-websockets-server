import { CACHE_MANAGER, Inject } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: any) {}

  async handleConnection(client: any) {
    await this.cacheManager.set(client.handshake.query.userId, client.id, {
      ttl: 0,
    });

    await this.cacheManager.set(client.id, client.handshake.query.userId, {
      ttl: 0,
    });
  }

  async handleDisconnect(client: any) {
    const userId: string = await this.cacheManager.get(client.id);
    await this.cacheManager.del(client.id);
    await this.cacheManager.del(userId);

    this.server.emit('userLeft', userId);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, userId: string): void {
    console.log('handleMessage:', client.id, userId);

    this.server.emit('newMessage', userId);
  }
}
