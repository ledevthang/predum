import { LeagueActionTypeEnum } from 'enums/actions';
import { PaginationData } from 'enums/pagination';
import { ILeague, LeagueActionTypes } from 'types/league';

export const initialLeaguesState: PaginationData<ILeague> = {
  pageNumber: 0,
  pageSize: 0,
  total: 0,
  data: [],
};

export const leagueReducer = (
  state: PaginationData<ILeague> = initialLeaguesState,
  action: LeagueActionTypes,
) => {
  switch (action.type) {
    case LeagueActionTypeEnum.GET_ALL_LEAGUES: {
      return {
        ...state,
        ...action.payload,
        data: [
          ...(action.payload.pageNumber === 1 ? [] : state.data),
          ...action.payload.data,
        ],
      };
    }
    default:
      return state;
  }
};
