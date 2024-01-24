import { PaginationData } from 'enums/pagination';
import leagueService from 'services/leagues';
import { ApiError } from 'types/api';
import { ILeague } from 'types/league';
import { DispatchType } from 'types/store';
import { LeagueActionTypeEnum } from './../../enums/actions';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getLeaguesSuccessAction = (payload: PaginationData<ILeague>) => ({
  type: LeagueActionTypeEnum.GET_ALL_LEAGUES,
  payload,
});

export const getAllLeaguesAction = (params: {
  subcategory?: number | null;
  name?: string;
  notFinised?: boolean;
  nullOddMeta?: boolean;
}) => {
  const taskId = LeagueActionTypeEnum.GET_ALL_LEAGUES;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const { name } = params;
      let data: any = {
        pageNumber: 1,
        pageSize: 100,
        total: 0,
        data: [],
      };
      if (name == 'Football') {
        data = await leagueService.GetAllLeagues({
          pageNumber: 1,
          pageSize: 100,
          notFinised: params.notFinised,
        });
        const indexNHA = data.data.findIndex((l: any) => l.remoteId == 39);
        if (indexNHA >= 0) {
          const temp = data.data[indexNHA];
          data.data.splice(indexNHA, 1);
          data.data.unshift(temp);
        }
        const index = data.data.findIndex((l: any) => l.remoteId == 1);
        if (index >= 0) {
          const temp = data.data[index];
          data.data.splice(index, 1);
          data.data.unshift(temp);
        }
      }
      dispatch(getLeaguesSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

const disabledCompetition = (meta: string) => {
  const metaObj = JSON.parse(meta);
  const endDate = new Date(metaObj.seasons[0].end).getTime();
  const startDate = new Date(metaObj.seasons[0].start).getTime();
  const oneDay = 24 * 60 * 60 * 1000;
  return startDate > Date.now() || endDate < Date.now() - oneDay;
};
