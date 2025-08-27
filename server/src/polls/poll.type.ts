import { Request } from 'express';
import { Nomination } from 'shared';
import { Socket } from 'socket.io';

export type CreatePollFields = {
  topic: string;
  votesPerVoter: number;
  name: string;
};

export type JoinPollFields = {
  pollID: string;
  name: string;
};

export type RejoinPollFields = {
  pollID: string;
  userID: string;
  name: string;
};

// repository types
export type CreatePollData = {
  pollID: string;
  topic: string;
  votesPerVoter: number;
  userID: string;
};

export type AddParticipantData = {
  pollID: string;
  userID: string;
  name: string;
};

// guard types
export type AuthPayload = {
  userID: string;
  pollID: string;
  name: string;
};

export interface AddParticipantFields {
  pollID: string;
  userID: string;
  name: string;
}
export type SubmitRankingsFields = {
  pollID: string;
  userID: string;
  rankings: string[];
};

export interface RemoveParticipantData {
  pollID: string;
  userID: string;
}

export type AddNominationFields = {
  pollID: string;
  userID: string;
  text: string;
};
export type AddNominationData = {
  pollID: string;
  nominationID: string;
  nomination: Nomination;
};
export type AddParticipantRankingsData = {
  pollID: string;
  userID: string;
  rankings: string[];
};
export type RequestWithAuth = Request & AuthPayload;
export type SocketWithAuth = Socket & AuthPayload;
