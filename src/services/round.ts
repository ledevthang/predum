import { IRound } from 'types/round';
import { PaginationData, PaginationRequest } from './../enums/pagination';
import { apiRoutesEnum } from './../enums/routes';
import AXIOS from './axios';

const GetAllRounds = async (
  params: PaginationRequest,
): Promise<PaginationData<IRound>> => {
  return AXIOS.get(apiRoutesEnum.ROUNDS, { params });
};

export default {
  GetAllRounds,
};
