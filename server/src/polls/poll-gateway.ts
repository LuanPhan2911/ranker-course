import {
  BadRequestException,
  Logger,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { PollService } from './poll.service';
import { Namespace } from 'socket.io';
import { SocketWithAuth } from './poll.type';

import { WsCatchAllFilter } from 'src/exceptions/ws-catch-all-filter';

@WebSocketGateway({
  namespace: 'polls',
})
@UsePipes(new ValidationPipe())
@UseFilters(new WsCatchAllFilter())
export class PollGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(PollGateway.name);
  @WebSocketServer() io: Namespace;
  constructor(private readonly pollService: PollService) {}

  // Gateway initialized (provided in module and instantiated)
  afterInit(): void {
    this.logger.log(`Websocket Gateway initialized.`);
  }
  handleConnection(client: SocketWithAuth, ...args: any[]) {
    const sockets = this.io.sockets;
    this.logger.debug(
      `Socket connected with userID: ${client.userID}, pollID: ${client.pollID}, and name: "${client.name}"`,
    );
    this.logger.log(`WS Client with id: ${client.id} connected!`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);

    this.io.emit('hello', `hello socket ${client.id}`);
  }
  handleDisconnect(client: SocketWithAuth) {
    const sockets = this.io.sockets;
    this.logger.debug(
      `Socket connected with userID: ${client.userID}, pollID: ${client.pollID}, and name: "${client.name}"`,
    );
    this.logger.log(`Disconnected socket id: ${client.id}`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
  }

  @SubscribeMessage('run')
  test() {
    throw new BadRequestException('Bad');
  }
}
