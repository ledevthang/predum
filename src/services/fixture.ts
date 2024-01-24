import { GetAllFixtureRequest, IFixture } from 'types/fixture';
import { PaginationData } from './../enums/pagination';
import { apiRoutesEnum } from './../enums/routes';
import AXIOS from './axios';

const GetAllFixtures = async (
  params: GetAllFixtureRequest,
): Promise<PaginationData<IFixture>> => {
  return AXIOS.get(apiRoutesEnum.FIXTURES, { params });
};

const GetFixtureDetail = async (fixtureId: string): Promise<IFixture> => {
  return AXIOS.get(`${apiRoutesEnum.FIXTURES}/${fixtureId}`);
};

export default {
  GetAllFixtures,
  GetFixtureDetail,
};
