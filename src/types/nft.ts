import { NFTActionTypeEnum } from 'enums/actions';
import { PaginationData, PaginationRequest } from 'enums/pagination';
import { MyInvestmentFilter } from './investment';

export interface GetAllNFTsRequest extends PaginationRequest {
  name?: string;
  orderBy?: MyInvestmentFilter;
  userId?: string;
}

export interface GetAllNavsRequest extends PaginationRequest {
  startTime: Date;
  endTime: Date;
}

export interface NFT {
  id: number;
  userId: number;
  classId: string;
  buyNav: string;
  buyAmount: string;
  buyTimestamp: string;
  buyFee: string;
  buyTransactionId: number;
  cashBackNav?: string;
  cashBackAmount?: string;
  cashBackTimestamp?: string;
  cashBackFee?: string;
  cashBackTransactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllNFTAction {
  type: NFTActionTypeEnum.GET_ALL_NFTS;
  payload: PaginationData<NFT>;
}
export interface GetDetailNFTAction {
  type: NFTActionTypeEnum.GET_DETAIL_NFT;
  payload: NFT;
}

export type NFTActionTypes = GetAllNFTAction | GetDetailNFTAction;
