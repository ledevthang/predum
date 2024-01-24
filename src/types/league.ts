import { LeagueActionTypeEnum } from './../enums/actions';
import { PaginationData, PaginationRequest } from 'enums/pagination';

export interface ILeague {
  id: number;
  countryId: number;
  remoteId: number;
  name: string;
  type: string;
  logo: string;
  order: number;
  meta: string;
}

export interface GetAllLeagueRequest extends PaginationRequest {}

export interface GetAllLeagueAction {
  type: LeagueActionTypeEnum.GET_ALL_LEAGUES;
  payload: PaginationData<ILeague>;
}

export type LeagueActionTypes = GetAllLeagueAction;
