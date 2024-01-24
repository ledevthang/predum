import axios from 'axios';

import { ITokens, TokenResponse } from 'types/tokens';

import { PaginationData, PaginationRequest } from './../enums/pagination';
import { apiRoutesEnum } from './../enums/routes';
import AXIOS from './axios';
import { isProd } from './wallet';

const GetAllTokens = async (
  params: PaginationRequest,
): Promise<PaginationData<ITokens>> => {
  return AXIOS.get(apiRoutesEnum.TOKENS, { params });
};
const GetAllTokensByJSON = async (): Promise<TokenResponse[]> => {
  const url = isProd
    ? `https://efun-public.s3.ap-southeast-1.amazonaws.com/tokens/tokens-prod.json`
    : `https://efun-public.s3.ap-southeast-1.amazonaws.com/tokens/tokens.json`;
  const data = await axios.get(url);
  return data.data;
};

export default {
  GetAllTokens,
  GetAllTokensByJSON,
};
