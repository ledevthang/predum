import { ProEventPredictionActionTypeEnum } from 'enums/actions';
import { EUnit } from 'types/hostPrediction';

export enum EProEventIdentity {
  INFLUENCER = 'INFLUENCER',
  BOOK_MARKER = 'BOOK_MARKER',
  SPONSOR = 'SPONSOR',
}

export enum EKindOfEvent {
  AFFILIATE = 'Affiliate',
  P2P_PRIZE_POOL = 'Peer-to-Peer & Prize',
  USER_VS_POOL = 'User vs. Pool',
}

export enum EDataSource {
  SPORT_DATA_PROVIDER = 'SPORT_DATA_PROVIDER',
  MYSELF = 'MYSELF',
}

export interface IProEventState {
  step: number;
  identity?: EProEventIdentity;
  betting: {
    token: EUnit;
    liquidityPool: string;
  }[];
  dataSource?: EDataSource;
  categoryId: string;
  subcategoryId: string;
  competitionId: string;
}

export interface ProEventPredictionAction {
  type: typeof ProEventPredictionActionTypeEnum.UPDATE_PRO_EVENT_PREDICTION;
  payload: Partial<IProEventState>;
}

export interface ProEventPredictionResetAction {
  type: typeof ProEventPredictionActionTypeEnum.RESET_PRO_EVENT_PREDICTION;
}

export type ProEventPredictionActionTypes =
  | ProEventPredictionAction
  | ProEventPredictionResetAction;
