import { Body, Controller, Post } from '@nestjs/common';
import { CreatePollDto, JoinPollDto } from './poll.dto';
import { PollService } from './poll.service';

@Controller('polls')
export class PollController {
  constructor(private pollService: PollService) {}

  @Post()
  create(@Body() createPollDto: CreatePollDto) {
    const result = this.pollService.create(createPollDto);

    return result;
  }

  @Post('/join')
  join(@Body() joinPollDto: JoinPollDto) {
    const result = this.pollService.join(joinPollDto);

    return result;
  }
  @Post('/rejoin')
  rejoin() {
    const result = this.pollService.rejoin({
      name: 'From token',
      pollID: 'Also from token',
      userID: 'Guess where this comes from?',
    });

    return result;
  }
}
