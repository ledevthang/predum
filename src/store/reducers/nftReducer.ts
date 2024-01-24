import { NFTActionTypeEnum } from 'enums/actions';
import { PaginationData } from 'enums/pagination';
import { NFT, NFTActionTypes } from 'types/nft';

export const initialNFtsState: PaginationData<NFT> = {
  pageNumber: 0,
  pageSize: 0,
  total: 0,
  data: [],
};

export const nftReducer = (
  state = initialNFtsState,
  action: NFTActionTypes,
) => {
  switch (action.type) {
    case NFTActionTypeEnum.GET_ALL_NFTS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
