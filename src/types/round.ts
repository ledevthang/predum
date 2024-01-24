import { RoundActionTypeEnum } from 'enums/actions';
import { PaginationData, PaginationRequest } from 'enums/pagination';

export interface IRound {
  id: number;
  leagueId: number;
  seasonId: number;
  name: string;
  current: boolean;
  createdAt: Date;
}

export interface GetAllRoundRequest extends PaginationRequest {}

export interface GetAllRoundAction {
  type: RoundActionTypeEnum.GET_ALL_ROUNDS;
  payload: PaginationData<IRound>;
}

export type RoundActionTypes = GetAllRoundAction;
