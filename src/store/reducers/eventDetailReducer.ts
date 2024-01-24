import { EventsActionTypeEnum } from 'enums/actions';
import { IEvent } from 'types/event';
import { EventDetailActionTypes } from '../../types/event';

export const initialEventDetailState: IEvent | null = null;

export const eventDetailReducer = (
  state: IEvent | null = initialEventDetailState,
  action: EventDetailActionTypes,
) => {
  switch (action.type) {
    case EventsActionTypeEnum.GET_DETAIL_EVENT: {
      if (!action.payload) return null;
      return {
        ...(state || {}),
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
