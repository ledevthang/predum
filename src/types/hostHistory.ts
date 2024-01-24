import { PredictionTypeEnum } from 'enums/actions';
import { PaginationRequest } from 'enums/pagination';
import { PaginationData } from './../enums/pagination';
import { IEvent } from './event';

export interface IHostHistory {}

export interface GetAllHostHistoryRequest extends PaginationRequest {}

export interface GetAllHostHistoryAction {
  type: PredictionTypeEnum.GET_ALL_HOST_HISTORY;
  payload: PaginationData<IEvent>;
}

export interface UpdateSingleHostHistoryAction {
  type: PredictionTypeEnum.UPDATE_SINGLE_HOST_HISTORY;
  payload: IEvent;
}

export type HostHistoryActionTypes =
  | GetAllHostHistoryAction
  | UpdateSingleHostHistoryAction;
