import { Body, Controller, Post } from '@nestjs/common';
import { CreatePollDto, JoinPollDto } from './poll.dto';
import { PollService } from './poll.service';

@Controller('polls')
export class PollController {
  constructor(private pollService: PollService) {}

  @Post()
  async create(@Body() createPollDto: CreatePollDto) {
    const result = await this.pollService.create(createPollDto);

    return result;
  }

  @Post('/join')
  async join(@Body() joinPollDto: JoinPollDto) {
    const result = await this.pollService.join(joinPollDto);

    return result;
  }
  @Post('/rejoin')
  async rejoin() {
    const result = await this.pollService.rejoin({
      name: 'From token',
      pollID: 'UFQSDL',
      userID: 'Guess where this comes from?',
    });

    return result;
  }
}
