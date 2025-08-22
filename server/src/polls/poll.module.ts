import { Module } from '@nestjs/common';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';
import { PollRepository } from './poll.repository';
import { RegisterRedisModule } from 'src/redis.module';
import { ConfigModule } from '@nestjs/config';
import { RegisterJwtModule } from 'src/jwt.module';

@Module({
  imports: [ConfigModule, RegisterRedisModule, RegisterJwtModule],
  controllers: [PollController],
  providers: [PollService, PollRepository],
})
export class PollModule {}
