import { FixtureActionTypeEnum } from 'enums/actions';
import { PaginationData, PaginationRequest } from 'enums/pagination';
import { ILeague } from './league';

export interface IFixture {
  id: number;
  leagueId: number;
  meta: string;
  leagueMeta: string;
  teamsMeta: string;
  scoreMeta: string;
  goalsMeta: string;
  asianHandicapMeta?: string;
  eventRelated?: string;
  roundId: number;
  countryId: number;
  date: string;
  league: ILeague;
  oddMeta?: string;
  venueName: string;
  round: any;
  teamAway: any;
  teamHome: any;
}

export enum ETypeOdd {
  MATCH_WINNER = 'Match Winner',
  ASIAN_HANDICAP = 'Asian Handicap',
  OVER_UNDER = 'Goals Over/Under',
  OVER_UNDER_FIRST_HALF = 'Goals Over/Under First Half',
  FIRST_HALF = 'First Half Winner',
  ASIAN_HANDICAP_FIRST_HALF = 'Asian Handicap First Half',
}

export interface IBet {
  id: number;
  name: ETypeOdd;
  values: {
    value: string;
    odd: string;
    name?: string;
    handicap?: string;
  }[];
}

export interface GetAllFixtureRequest extends PaginationRequest {
  leagueId?: string;
  notFinised?: boolean;
  search?: string;
  nullOddMeta?: boolean;
}

export interface GetAllFixtureAction {
  type: FixtureActionTypeEnum.GET_ALL_FIXTURES;
  payload: PaginationData<IFixture>;
}

export interface GetAllFixtureActionInfinite {
  type: FixtureActionTypeEnum.GET_ALL_FIXTURES_INFINITE;
  payload: PaginationData<IFixture>;
}

export type FixtureActionTypes =
  | GetAllFixtureAction
  | GetAllFixtureActionInfinite;
