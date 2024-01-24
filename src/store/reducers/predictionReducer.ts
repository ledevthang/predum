import { PredictionTypeEnum } from 'enums/actions';
import { PaginationData } from 'enums/pagination';
import { IPrediction, PredictionActionTypes } from 'types/prediction';

export const initialPredictionsState: PaginationData<IPrediction> = {
  pageNumber: 0,
  pageSize: 0,
  total: 0,
  data: [],
};

export const predictionReducer = (
  state = initialPredictionsState,
  action: PredictionActionTypes,
) => {
  switch (action.type) {
    case PredictionTypeEnum.GET_ALL_PREDICTIONS: {
      return {
        ...state,
        ...action.payload,
        data: [
          ...(action.payload.pageNumber === 1 ? [] : state.data),
          ...action.payload.data,
        ],
      };
    }
    case PredictionTypeEnum.UPDATE_PREDICTION: {
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
    case PredictionTypeEnum.GET_PREDICTION_PREVIEW: {
      return {
        ...state,
        ...action.payload,
        data: [
          ...(action.payload.pageNumber === 1 ? [] : state.data),
          ...action.payload.data,
        ],
      };
    }
    case PredictionTypeEnum.GET_ALL_PREDICTIONS_EACH_EVENT: {
      return { ...action.payload };
    }
    case PredictionTypeEnum.UPDATE_EVENT_REPORT_CONTENTS: {
      return {
        ...state,
        data: state.data.map((s) =>
          s.eventId == action.payload.eventId
            ? {
                ...s,
                reportContents: action.payload.reportContents,
              }
            : s,
        ),
      };
    }
    case PredictionTypeEnum.RESET_PREDICTION: {
      return {
        ...initialPredictionsState,
      };
    }
    default:
      return state;
  }
};
