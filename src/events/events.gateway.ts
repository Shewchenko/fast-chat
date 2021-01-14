import {
  MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
const moment = require('moment');

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('Chat');

  // @SubscribeMessage('events')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  // }
  //
  // @SubscribeMessage('identity')
  // async identity(@MessageBody() data: number): Promise<number> {
  //   return data;
  // }

  @SubscribeMessage('msgToServer')
  async handleMessage(@MessageBody() data: any): Promise<void> {
    data.time = moment().format('h:mm a')
    this.server.emit("msgToClient", data)
  }

  afterInit(server: any): any {
    this.logger.log('Init');
  }

  handleConnection(client: any, ...args: any[]): any {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.server.emit("msgToClient", {
      name: 'User',
      msg: "joined",
      time : moment().format('h:mm a')
    })
  }

  handleDisconnect(client: any): any {
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit("msgToClient", {
      name: 'User',
      msg: "left",
      time : moment().format('h:mm a')
    })
  }
}
