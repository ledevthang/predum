import { PaginationData } from 'enums/pagination';
import roundService from 'services/round';
import { ApiError } from 'types/api';
import { GetAllRoundRequest, IRound } from 'types/round';
import { DispatchType } from 'types/store';
import { RoundActionTypeEnum } from './../../enums/actions';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getRoundSuccessAction = (payload: PaginationData<IRound>) => ({
  type: RoundActionTypeEnum.GET_ALL_ROUNDS,
  payload,
});

export const getAllRoundsAction = (request: GetAllRoundRequest) => {
  const taskId = RoundActionTypeEnum.GET_ALL_ROUNDS;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await roundService.GetAllRounds(request);
      dispatch(getRoundSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
