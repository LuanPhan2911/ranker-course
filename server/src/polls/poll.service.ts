import { Injectable } from '@nestjs/common';
import {
  CreatePollFields,
  JoinPollFields,
  RejoinPollFields,
} from './poll.type';
import { createPollID, createUserID } from 'src/utils';

@Injectable()
export class PollService {
  create(fields: CreatePollFields) {
    const pollID = createPollID();
    const userID = createUserID();

    return {
      ...fields,
      pollID,
      userID,
    };
  }

  join(fields: JoinPollFields) {
    const userID = createUserID();
    return {
      ...fields,
      userID,
    };
  }
  rejoin(fields: RejoinPollFields) {
    return {
      ...fields,
    };
  }
}
