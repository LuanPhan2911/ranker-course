import { Injectable, Logger } from '@nestjs/common';
import {
  CreatePollFields,
  JoinPollFields,
  RejoinPollFields,
} from './poll.type';
import { createPollID, createUserID } from 'src/utils';
import { PollRepository } from './poll.repository';

@Injectable()
export class PollService {
  private readonly logger = new Logger(PollService.name);
  constructor(private readonly pollRepository: PollRepository) {}
  async create(fields: CreatePollFields) {
    const pollID = createPollID();
    const userID = createUserID();

    const createdPoll = await this.pollRepository.createPoll({
      ...fields,
      pollID,
      userID,
    });

    // TODO - create an accessToken based off of pollID and userID
    return {
      poll: createdPoll,
      // accessToken
    };
  }

  async join(fields: JoinPollFields) {
    const userID = createUserID();

    this.logger.debug(
      `Fetching poll with ID: ${fields.pollID} for user with ID: ${userID}`,
    );

    const joinedPoll = await this.pollRepository.getPoll(fields.pollID);
    return {
      poll: joinedPoll,
      // accessToken: signedString,
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
