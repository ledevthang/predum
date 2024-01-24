import { IProEventState, ProEventPredictionActionTypes } from 'types/proEvent';
import { ProEventPredictionActionTypeEnum } from './../../enums/actions';

export const initialProEventPrediction: IProEventState = {
  step: 1,
  betting: [],
  categoryId: '',
  subcategoryId: '',
  competitionId: '',
};

export const proEventPredictionReducer = (
  state = initialProEventPrediction,
  action: ProEventPredictionActionTypes,
) => {
  switch (action.type) {
    case ProEventPredictionActionTypeEnum.UPDATE_PRO_EVENT_PREDICTION: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ProEventPredictionActionTypeEnum.RESET_PRO_EVENT_PREDICTION: {
      return {
        ...initialProEventPrediction,
      };
    }
    default:
      return state;
  }
};
