export interface Participants {
  [participantID: string]: string;
}

export type Nomination = {
  userID: string;
  text: string;
};
type NominationID = string;
export type Rankings = {
  [userID: string]: NominationID[];
};

export type Nominations = {
  [nominationID: string]: Nomination;
};
export type Results = Array<{
  nominationID: NominationID;
  nominationText: string;
  score: number;
}>;
export interface Poll {
  id: string;
  topic: string;
  votesPerVoter: number;
  participants: Participants;
  adminID: string;
  nominations: Nominations;
  rankings: Rankings;
  results: Results;
  hasStarted: boolean;
}
