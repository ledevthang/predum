import { EventsActionTypeEnum } from 'enums/actions';
import { PaginationData, PaginationRequest } from 'enums/pagination';

export interface IReport {
  id: number;
  status: string;
}

export interface GetAllReportRequest extends PaginationRequest {}

export interface CreateReportBody {
  status: string;
  content: string;
  typeUpload: string;
  predictionId: number;
}

export interface GetAllReportAction {
  type: EventsActionTypeEnum.GET_ALL_REPORTS;
  payload: PaginationData<IReport>;
}

export type ReportActionTypes = GetAllReportAction;
