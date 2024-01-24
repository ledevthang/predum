import { RoundActionTypeEnum } from 'enums/actions';
import { PaginationData } from 'enums/pagination';
import { IRound, RoundActionTypes } from 'types/round';

export const initialRoundState: PaginationData<IRound> = {
  pageNumber: 0,
  pageSize: 0,
  total: 0,
  data: [],
};

export const roundReducer = (
  state: PaginationData<IRound> = initialRoundState,
  action: RoundActionTypes,
) => {
  switch (action.type) {
    case RoundActionTypeEnum.GET_ALL_ROUNDS: {
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
