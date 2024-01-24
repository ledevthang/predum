import { apiRoutesEnum } from './../enums/routes';
import { PaginationData } from './../enums/pagination';
import AXIOS from './axios';
import { ILeague } from 'types/league';

const GetAllLeagues = async (params: any): Promise<PaginationData<ILeague>> => {
  return AXIOS.get(apiRoutesEnum.LEAGUES, { params });
};

export default {
  GetAllLeagues,
};
