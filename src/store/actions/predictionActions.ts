import { PredictionTypeEnum } from 'enums/actions';
import { PaginationData } from 'enums/pagination';
import predictionService from 'services/predictions';
import { ApiError } from 'types/api';
import {
  GetAllPredictionRequest,
  IPrediction,
  PredictStatus,
} from 'types/prediction';
import { DispatchType } from 'types/store';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getPredictionsSuccessAction = (
  payload: PaginationData<IPrediction>,
) => ({
  type: PredictionTypeEnum.GET_ALL_PREDICTIONS,
  payload,
});
export const getPredictionsEachEventSuccessAction = (
  payload: PaginationData<IPrediction>,
) => ({
  type: PredictionTypeEnum.GET_ALL_PREDICTIONS_EACH_EVENT,
  payload,
});

export const updatePredictionsSuccessAction = (payload: IPrediction) => ({
  type: PredictionTypeEnum.UPDATE_PREDICTION,
  payload,
});

export const updateReportContent = (payload: {
  eventId: number;
  reportContents: string[];
}) => ({
  type: PredictionTypeEnum.UPDATE_EVENT_REPORT_CONTENTS,
  payload,
});

export const resetPrediction = () => ({
  type: PredictionTypeEnum.RESET_PREDICTION,
});

export const getAllPredictionAction = (params: GetAllPredictionRequest) => {
  const taskId = PredictionTypeEnum.GET_ALL_PREDICTIONS;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await predictionService.GetAllPrediction({
        ...params,
      });
      dispatch(getPredictionsSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const getAllPredictionEachEventAction = (
  params: GetAllPredictionRequest,
  callback?: (data: IPrediction) => void,
  callback2?: (totalPage: number) => void,
) => {
  const taskId = PredictionTypeEnum.GET_ALL_PREDICTIONS_EACH_EVENT;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await predictionService.GetAllPredictionEachEvent({
        ...params,
      });
      callback && callback(data.data[0]);
      callback2 && callback2(data.total);
      dispatch(getPredictionsEachEventSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
export const getPredictionPreviewSuccessAction = (
  payload: PaginationData<IPrediction>,
) => ({
  type: PredictionTypeEnum.GET_PREDICTION_PREVIEW,
  payload,
});
const setIntervalCallUpdatePredictionAPI = async (
  promise: () => Promise<any>,
  times: number,
) => {
  for (let count = 0; count < times; count++) {
    const res = await promise();
    if (
      res.status == PredictStatus.CLAIMED ||
      res.status == PredictStatus.CLAIMED_CASH_BACK
    ) {
      return res;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};
export const updatePredictionAfterClaimSuccess = (
  id: number,
  callback?: () => void,
) => {
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      const data = await setIntervalCallUpdatePredictionAPI(() => {
        return predictionService.GetPredictionDetail(id);
      }, 100);
      dispatch(updatePredictionsSuccessAction(data));
      callback && callback();
    } catch (e) {
      console.log(e);
    }
  };
};
export const getPreviewPrediction = (id: number, callback?: () => void) => {
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      let data = await predictionService.GetPredictionPreviewDetail(id);
      console.log('data', data);
      dispatch(getPredictionPreviewSuccessAction(data));
      callback && callback();
    } catch (e) {
      console.log(e);
    }
  };
};

export const updatePredictionAfterReport = (id: number) => {
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      const data = await predictionService.GetPredictionDetail(id);
      dispatch(updatePredictionsSuccessAction(data));
      dispatch(
        updateReportContent({
          eventId: data.eventId,
          reportContents: data.reportContents,
        }),
      );
    } catch (e) {
      console.log(e);
    }
  };
};
