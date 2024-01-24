import { TokensActionTypeEnum } from 'enums/actions';
import { PaginationData, PaginationRequest } from 'enums/pagination';

export interface ITokens {
  id: number;
  name: string;
  url: string;
}
export interface TokenResponse {
  id: number;
  min: number;
  logo: string;
  linkBuy: string;
  name: string;
  address: string;
}

export interface GetAllTokensRequest extends PaginationRequest {}
export interface GetAllTokensAction {
  type: TokensActionTypeEnum.GET_ALL_TOKENS;
  payload: PaginationData<ITokens>;
}
export interface GetAllTokensByJSON {
  type: TokensActionTypeEnum.GET_ALL_TOKENS_BY_JSON;
  payload: TokenResponse[];
}
export type TokensActionTypes = GetAllTokensAction | GetAllTokensByJSON;
