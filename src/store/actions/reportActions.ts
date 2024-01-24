import { sendFileToIPFS } from './../../helpers/index';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';
import { EventsActionTypeEnum, ReportActionTypeEnum } from 'enums/actions';
import { DispatchType } from 'types/store';
import { ApiError } from 'types/api';
import reportService from 'services/report';
import { GetAllReportRequest, IReport } from 'types/report';
import { PaginationData } from 'enums/pagination';

export const getReportsSuccessAction = (payload: PaginationData<IReport>) => ({
  type: EventsActionTypeEnum.GET_ALL_REPORTS,
  payload,
});

export const createNewReport = (
  predictionId: number,
  proof: File,
  typeUpload: string,
  callback?: () => void,
) => {
  const taskId = ReportActionTypeEnum.CREATE_NEW_REPORT;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const name = proof.name;
      const content = await sendFileToIPFS(proof);
      await reportService.CreateNewReport({
        predictionId,
        status: '',
        content,
        typeUpload,
      });
      callback?.();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      callback?.();
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
export const createNewReportWithLink = (
  predictionId: number,
  proofUrl: string,
  typeUpload: string,
  callback?: () => void,
) => {
  const taskId = ReportActionTypeEnum.CREATE_NEW_REPORT;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await reportService.CreateNewReport({
        predictionId,
        status: '',
        content: proofUrl,
        typeUpload,
      });
      callback?.();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      callback?.();
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const getAllReportAction = (
  params: GetAllReportRequest,
  callback?: () => void,
) => {
  const taskId = EventsActionTypeEnum.GET_ALL_REPORTS;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await reportService.GetAllReport({
        ...params,
      });
      callback?.();
      dispatch(getReportsSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
