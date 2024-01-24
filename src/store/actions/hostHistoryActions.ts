import { PredictionTypeEnum } from 'enums/actions';
import { PaginationData } from 'enums/pagination';
import { ApiError } from 'types/api';
import { IEvent } from 'types/event';
import { GetAllHostHistoryRequest, IHostHistory } from 'types/hostHistory';
import { DispatchType } from 'types/store';
import { asyncTaskStopAction } from './asyncTaskActions';

export const getHostHistorySuccessAction = (
  payload: PaginationData<IHostHistory>,
) => ({
  type: PredictionTypeEnum.GET_ALL_HOST_HISTORY,
  payload,
});

export const getAllHostHistoryAction = (params: GetAllHostHistoryRequest) => {
  const taskId = PredictionTypeEnum.GET_ALL_HOST_HISTORY;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const updateSingleHostSuccessAction = (payload: IEvent) => ({
  type: PredictionTypeEnum.UPDATE_SINGLE_HOST_HISTORY,
  payload,
});

export const updateSingleHostAction = (data: IEvent) => {
  return async (dispatch: DispatchType): Promise<void> => {
    dispatch(updateSingleHostSuccessAction(data));
  };
};
