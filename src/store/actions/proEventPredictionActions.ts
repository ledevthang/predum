import { ProEventPredictionActionTypeEnum } from './../../enums/actions';
import { IProEventState } from 'types/proEvent';

export const updateProEventPredictionStateAction = (
  payload: Partial<IProEventState>,
) => ({
  type: ProEventPredictionActionTypeEnum.UPDATE_PRO_EVENT_PREDICTION,
  payload,
});
export const resetProEventPredictionStateAction = () => ({
  type: ProEventPredictionActionTypeEnum.RESET_PRO_EVENT_PREDICTION,
});
