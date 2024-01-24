import { PredictionTypeEnum } from 'enums/actions';
import { PaginationRequest } from 'enums/pagination';
import { PaginationData } from './../enums/pagination';

export enum EventStatus {
  PENDING = 'PENDING',
  AVAILABLE = 'AVAILABLE',
  FINISH = 'FINISH',
  INVALID = 'INVALID',
}
export enum HostHistoryStatus {
  ENDED = 'ENDED',
  PENDING_RESULT = 'PENDING_RESULT',
  ON_GOING = 'ON_GOING',
}

export enum PredictStatus {
  CLAIM = 'Claim',
  PREDICTED = 'Predicted',
  CLAIMED = 'Claimed',
  LOST = 'Lost',
  CLAIM_CASH_BACK = 'Claim Cashback',
  CLAIMED_CASH_BACK = 'Claimed Cashback',
}

export interface IPrediction {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  eventId: number;
  userId: number;
  option: string;
  pro: number;
  token: string;
  amount: string;
  eventThumbnailUrl: string;
  previewPredictUrl?: string;
  transactionId: number;
  predictNum: number;
  rewardAmount?: string;
  rewardTransactionId?: number;
  name: string;
  odds?: string;
  options: string;
  type: string;
  marketType: string;
  eventStatus: EventStatus;
  eventResult: string;
  category: string;
  isUserVerified: boolean;
  address: string;
  transactionNumber: string;
  optionIndex: number;
  userAddress: string;
  metadata: string;
  subCategory: string;
  blockNumber: string;
  status: PredictStatus;
  estimateReward?: string;
  sponsor: string;
  eventFinalTime?: string;
  eventIsBlock: boolean;
  reportContents: string[];
  reportContent?: string;
  eventClaimTime?: string;
  hostFee: number;
}

export enum EPredictHistoryFilter {
  PREDICTION_HISTORY = 'Prediction history',
  HOST_HISTORY = 'Host history',
}

export interface GetAllPredictionRequest extends PaginationRequest {
  orderBy?: string;
  eventId?: number;
  token?: string;
}

export interface GetAllPredictionAction {
  type: PredictionTypeEnum.GET_ALL_PREDICTIONS;
  payload: PaginationData<IPrediction>;
}

export interface UpdatePredictionAction {
  type: PredictionTypeEnum.UPDATE_PREDICTION;
  payload: IPrediction;
}
export interface GetPredictionPreviewAction {
  type: PredictionTypeEnum.GET_PREDICTION_PREVIEW;
  payload: PaginationData<IPrediction>;
}

export interface UpdateEventClaimTime {
  type: PredictionTypeEnum.UPDATE_EVENT_REPORT_CONTENTS;
  payload: {
    eventId: number;
    reportContents: string[];
  };
}
export interface GetAllPredictionEachEventAction {
  type: PredictionTypeEnum.GET_ALL_PREDICTIONS_EACH_EVENT;
  payload: PaginationData<IPrediction>;
}

export interface ResetPredictionAction {
  type: PredictionTypeEnum.RESET_PREDICTION;
}

export type PredictionActionTypes =
  | GetAllPredictionAction
  | UpdatePredictionAction
  | UpdateEventClaimTime
  | GetAllPredictionEachEventAction
  | ResetPredictionAction
  | GetPredictionPreviewAction;
