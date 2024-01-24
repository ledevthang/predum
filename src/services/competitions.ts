import { apiRoutesEnum } from './../enums/routes';
import { PaginationData } from './../enums/pagination';
import AXIOS from './axios';
import {
  ICompetition,
  CompetitionRequest,
  AddCompetitionBody,
} from 'types/competition';

const GetAllCompetitions = async (
  params: CompetitionRequest,
): Promise<PaginationData<ICompetition>> => {
  return AXIOS.get(apiRoutesEnum.COMPETITIONS, { params });
};

const CreateNewCompetition = async (
  body: AddCompetitionBody,
): Promise<ICompetition> => {
  const { data } = await AXIOS.post(apiRoutesEnum.COMPETITIONS, {
    ...body,
  });
  return data;
};

export default {
  GetAllCompetitions,
  CreateNewCompetition,
};
