import { EventsActionTypeEnum } from 'enums/actions';
import { PaginationData } from 'enums/pagination';
import { EventActionTypes, IEvent } from 'types/event';

export const initialEventsState: PaginationData<IEvent> = {
  pageNumber: 0,
  pageSize: 0,
  total: 0,
  data: [],
};

export const eventReducer = (
  state: PaginationData<IEvent> = initialEventsState,
  action: EventActionTypes,
) => {
  switch (action.type) {
    case EventsActionTypeEnum.GET_ALL_EVENTS: {
      return {
        ...state,
        ...action.payload,
        data: [
          ...(action.payload.pageNumber === 1 ? [] : state.data),
          ...action.payload.data,
        ],
      };
    }
    case EventsActionTypeEnum.UPDATE_EVENT: {
      return {
        ...state,
        data: state.data.map((s) =>
          s.id == action.payload.id ? { ...s, ...action.payload } : s,
        ),
      };
    }
    case EventsActionTypeEnum.UPDATE_EVENT_BY_INDEX: {
      let temp = state;
      temp.data[action.payload.index] = action.payload.event;
      return {
        ...state,
        ...temp,
      };
    }
    case EventsActionTypeEnum.UPDATE_EXPAND: {
      return {
        ...state,
        data: state.data.map((s) =>
          s.id == action.payload
            ? {
                ...s,
                isExpand: !s.isExpand,
              }
            : s.isExpand
            ? {
                ...s,
                isExpand: false,
              }
            : s,
        ),
      };
    }
    case EventsActionTypeEnum.RESET: {
      return {
        pageNumber: 0,
        pageSize: 0,
        total: 0,
        data: [],
      };
    }
    default:
      return state;
  }
};
