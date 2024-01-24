import { EventsActionTypeEnum } from 'enums/actions';
import { PaginationData } from 'enums/pagination';
import { IEvent, OtherEventActionTypes } from 'types/event';

export const initialOtherEventsState: PaginationData<IEvent> = {
  pageNumber: 0,
  pageSize: 0,
  total: 0,
  data: [],
};

export const otherEventReducer = (
  state: PaginationData<IEvent> = initialOtherEventsState,
  action: OtherEventActionTypes,
) => {
  switch (action.type) {
    case EventsActionTypeEnum.GET_OTHER_EVENTS: {
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
