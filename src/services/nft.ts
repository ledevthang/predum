import { GetAllNavsRequest } from './../types/nft';
import { apiRoutesEnum } from './../enums/routes';
import AXIOS from './axios';
import { GetAllNFTsRequest, NFT } from 'types/nft';

interface PaginationDataCustom<T> {
  pageNumber: number;
  pageSize: number;
  total: number;
  totalAsset: string;
  totalELPsOwned: string;
  data: T[];
}

const GetAllNFTs = async (
  params: GetAllNFTsRequest,
): Promise<PaginationDataCustom<NFT>> => {
  return AXIOS.get(apiRoutesEnum.NFTS, { params });
};

const GetDetailNft = async (id: number): Promise<NFT> => {
  return AXIOS.get(`${apiRoutesEnum.NFTS}/${id}`);
};
const GetNavs = async (params: GetAllNavsRequest) => {
  return AXIOS.get(apiRoutesEnum.NAVS, { params });
};

export default {
  GetAllNFTs,
  GetDetailNft,
  GetNavs,
};
