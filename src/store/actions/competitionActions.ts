import { PaginationData } from 'enums/pagination';
import competitionService from 'services/competitions';
import { ApiError } from 'types/api';
import { ICompetition } from 'types/competition';
import { DispatchType } from 'types/store';
import { CompetitionTypeEnum } from './../../enums/actions';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getCompetitionsSuccessAction = (
  payload: PaginationData<ICompetition>,
) => ({
  type: CompetitionTypeEnum.GET_ALL_COMPETITIONS,
  payload,
});

export const getAllCompetitionsAction = (categoryId: number) => {
  const taskId = CompetitionTypeEnum.GET_ALL_COMPETITIONS;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      let data;
      if (categoryId != -1) {
        data = await competitionService.GetAllCompetitions({
          categoryId,
          pageNumber: 1,
          pageSize: 9999,
        });
      } else {
        data = await competitionService.GetAllCompetitions({
          pageNumber: 1,
          pageSize: 9999,
        });
      }
      dispatch(getCompetitionsSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
