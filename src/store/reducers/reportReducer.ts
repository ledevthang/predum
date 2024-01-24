import { EventsActionTypeEnum } from 'enums/actions';
import { PaginationData } from 'enums/pagination';
import { ReportActionTypes } from 'types/report';
import { IReport } from 'types/report';

export const initialReportsState: PaginationData<IReport> = {
  pageNumber: 0,
  pageSize: 0,
  total: 0,
  data: [],
};

export const reportReducer = (
  state = initialReportsState,
  action: ReportActionTypes,
) => {
  switch (action.type) {
    case EventsActionTypeEnum.GET_ALL_REPORTS: {
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
