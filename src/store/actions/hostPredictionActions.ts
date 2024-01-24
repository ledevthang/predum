import { HostPredictionActionTypeEnum } from './../../enums/actions';
import { HostPredictionState } from 'types/hostPrediction';

export const updateHostPredictionStateAction = (
  payload: Partial<HostPredictionState>,
) => ({
  type: HostPredictionActionTypeEnum.UPDATE_HOST_PREDICTION,
  payload,
});
export const resetHostPredictionStateAction = () => ({
  type: HostPredictionActionTypeEnum.RESET_HOST_PREDICTION,
});
