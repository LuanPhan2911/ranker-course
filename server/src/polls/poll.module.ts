import { Module } from '@nestjs/common';
import { PollController } from './poll.controller';

@Module({
  controllers: [PollController],
})
export class PollModule {}
