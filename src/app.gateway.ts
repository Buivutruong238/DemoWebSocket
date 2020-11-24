import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;
  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
  
  // @SubscribeMessage('msgToServer')
  // handleMessage(client: Socket, text: string): WsResponse<string> {
  //   return { event:'msgToClient', data: 'reply from server:' + text};
  // }

  //broadcast
  @SubscribeMessage('msgToServer')
  handleMessage2(client: Socket, text: string): void {
    this.wss.emit('msgToClient', 'reply-broadcast fr Server:'+text);
  }

}
