import { Module } from '@nestjs/common';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';
import { PollRepository } from './poll.repository';
import { RegisterRedisModule } from 'src/redis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, RegisterRedisModule],
  controllers: [PollController],
  providers: [PollService, PollRepository],
})
export class PollModule {}
