import { CoinActionTypeEnum } from '../enums/actions';

export interface ICoin {
  id: number;
  name: string;
  symbol: string;
  rate: string;
  logo: string;
  volume: string;
  originalLogo?: string;
}

export interface GetAllCoinRequest {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  symbol?: string;
}

export interface GetAllCoinAction {
  type: CoinActionTypeEnum.GET_ALL_COINS;
  payload: ICoin[];
}

export type CoinActionTypes = GetAllCoinAction;
