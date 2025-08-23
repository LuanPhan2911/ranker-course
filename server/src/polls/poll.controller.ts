import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePollDto, JoinPollDto } from './poll.dto';
import { PollService } from './poll.service';
import { AuthGuard } from './auth-guard';
import { RequestWithAuth } from './poll.type';

@Controller('polls')
@UsePipes(new ValidationPipe())
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
  @UseGuards(AuthGuard)
  @Post('/rejoin')
  async rejoin(@Req() request: RequestWithAuth) {
    const { userID, pollID, name } = request;
    const result = await this.pollService.rejoin({
      name,
      pollID,
      userID,
    });

    return result;
  }
}
