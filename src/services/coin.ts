import { apiRoutesEnum } from './../enums/routes';
import AXIOS from './axios';
import { ICoin } from 'types/coin';

const GetAllCoins = async (params: any): Promise<ICoin[]> => {
  return AXIOS.get(apiRoutesEnum.COINS, { params });
};

export default {
  GetAllCoins,
};
