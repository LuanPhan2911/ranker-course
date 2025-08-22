import { Injectable, Logger } from '@nestjs/common';
import {
  CreatePollFields,
  JoinPollFields,
  RejoinPollFields,
} from './poll.type';
import { createPollID, createUserID } from 'src/utils';
import { PollRepository } from './poll.repository';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class PollService {
  private readonly logger = new Logger(PollService.name);
  constructor(
    private readonly pollRepository: PollRepository,
    private readonly jwtService: JwtService,
  ) {}
  async create(fields: CreatePollFields) {
    const pollID = createPollID();
    const userID = createUserID();

    const createdPoll = await this.pollRepository.createPoll({
      ...fields,
      pollID,
      userID,
    });

    const signedString = this.jwtService.sign(
      {
        pollID: createdPoll.id,
        name: fields.name,
      },
      {
        subject: userID,
      },
    );

    return {
      poll: createdPoll,
      accessToken: signedString,
    };
  }

  async join(fields: JoinPollFields) {
    const userID = createUserID();

    this.logger.debug(
      `Fetching poll with ID: ${fields.pollID} for user with ID: ${userID}`,
    );

    const joinedPoll = await this.pollRepository.getPoll(fields.pollID);
    const signedString = this.jwtService.sign(
      {
        pollID: joinedPoll.id,
        name: fields.name,
      },
      {
        subject: userID,
      },
    );

    return {
      poll: joinedPoll,
      accessToken: signedString,
    };
  }
  async rejoin(fields: RejoinPollFields) {
    this.logger.debug(
      `Rejoining poll with ID: ${fields.pollID} for user with ID: ${fields.userID} with name: ${fields.name}`,
    );

    const joinedPoll = await this.pollRepository.addParticipant(fields);
    return joinedPoll;
  }
}
