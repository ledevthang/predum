import { PredictionTypeEnum } from 'enums/actions';
import { PaginationData } from 'enums/pagination';
import { IEvent } from 'types/event';
import { HostHistoryActionTypes } from 'types/hostHistory';

export const initialHostHistoryState: PaginationData<IEvent> = {
  pageNumber: 0,
  pageSize: 0,
  total: 0,
  data: [],
};

export const hostHistoryReducer = (
  state = initialHostHistoryState,
  action: HostHistoryActionTypes,
) => {
  switch (action.type) {
    case PredictionTypeEnum.GET_ALL_HOST_HISTORY: {
      return {
        ...state,
        ...action.payload,
        data: [
          ...(action.payload.pageNumber === 1 ? [] : state.data),
          ...action.payload.data,
        ],
      };
    }
    case PredictionTypeEnum.UPDATE_SINGLE_HOST_HISTORY: {
      return {
        ...state,
        data: state.data.map((s) =>
          s.id == action.payload.id
            ? {
                ...action.payload,
              }
            : s,
        ),
      };
    }
    default:
      return state;
  }
};
