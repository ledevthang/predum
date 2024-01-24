import { PaginationData } from 'enums/pagination';
import eventService from 'services/event';
import { ApiError } from 'types/api';
import { GetOtherEventRequest, IEvent } from 'types/event';
import { DispatchType } from 'types/store';

import { EventsActionTypeEnum } from './../../enums/actions';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getOtherEventsSuccessAction = (
  payload: PaginationData<IEvent>,
) => ({
  type: EventsActionTypeEnum.GET_OTHER_EVENTS,
  payload,
});

export const getOtherEventAction = (
  params: GetOtherEventRequest,
  options: { isFirst?: boolean; callback?: () => void },
) => {
  const taskId = EventsActionTypeEnum.GET_OTHER_EVENTS;
  return async (dispatch: DispatchType, getState: () => any): Promise<void> => {
    const { isFirst, callback } = options;
    try {
      dispatch(asyncTaskStartAction(taskId));
      const otherEventReducer = getState().otherEventReducer;
      const pageNumber = otherEventReducer.pageNumber;
      const pageSize = otherEventReducer.pageSize;
      const data = await eventService.GetOtherEvents({
        ...params,
        pageNumber: isFirst ? 1 : pageNumber + 1,
        pageSize: pageSize || 3,
      });
      dispatch(getOtherEventsSuccessAction(data));
      callback && callback();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      callback && callback();
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
