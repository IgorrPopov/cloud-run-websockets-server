import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: 'http://localhost:4200' },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log('handleConnection:', client.id);
    console.log('handleConnection:', client.handshake.query.userId);
  }

  handleDisconnect(client: any) {
    console.log('handleDisconnect:', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, userId: string): void {
    console.log('handleMessage:', client.id, userId);

    this.server.emit('newMessage', userId);
  }
}
