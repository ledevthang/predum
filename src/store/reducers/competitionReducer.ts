import { CompetitionTypeEnum } from 'enums/actions';
import { CompetitionActionTypes, ICompetition } from 'types/competition';
import { PaginationData } from './../../enums/pagination';

export const initialCompetitionState: PaginationData<ICompetition> = {
  data: [],
  pageNumber: 0,
  pageSize: 0,
  total: 0,
};

export const competitionReducer = (
  state = initialCompetitionState,
  action: CompetitionActionTypes,
) => {
  switch (action.type) {
    case CompetitionTypeEnum.GET_ALL_COMPETITIONS: {
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
