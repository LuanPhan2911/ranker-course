import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreatePollDto, JoinPollDto } from './poll.dto';

@Controller('polls')
export class PollController {
  @Post()
  create(@Body() createPollDto: CreatePollDto) {
    Logger.log('created');
    return createPollDto;
  }

  @Post('/join')
  join(@Body() joinPollDto: JoinPollDto) {
    Logger.log('Join');
    return joinPollDto;
  }
  @Post('/rejoin')
  rejoin() {
    Logger.log('rejoin');
  }
}
