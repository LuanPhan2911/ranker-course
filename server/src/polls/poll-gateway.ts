import { Logger } from '@nestjs/common';
import { OnGatewayInit, WebSocketGateway } from '@nestjs/websockets';
import { PollService } from './poll.service';

@WebSocketGateway({
  namespace: 'polls',
})
export class PollGateway implements OnGatewayInit {
  private readonly logger = new Logger(PollGateway.name);
  constructor(private readonly pollService: PollService) {}

  // Gateway initialized (provided in module and instantiated)
  afterInit(): void {
    this.logger.log(`Websocket Gateway initialized.`);
  }
}
