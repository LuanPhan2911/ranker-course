import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PollModule } from './polls/poll.module';
import { RegisterRedisModule } from './redis.module';

@Module({
  imports: [ConfigModule.forRoot(), PollModule, RegisterRedisModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
