import {
  CreateReportBody,
  GetAllReportRequest,
  IReport,
} from './../types/report';
import { apiRoutesEnum } from './../enums/routes';
import AXIOS from './axios';
import { PaginationData } from 'enums/pagination';

const CreateNewReport = async (body: CreateReportBody) => {
  return AXIOS.post(apiRoutesEnum.REPORTS, { ...body });
};

const GetAllReport = async (
  params: GetAllReportRequest,
): Promise<PaginationData<IReport>> => {
  return AXIOS.get(apiRoutesEnum.REPORTS, { params });
};

export default {
  CreateNewReport,
  GetAllReport,
};
