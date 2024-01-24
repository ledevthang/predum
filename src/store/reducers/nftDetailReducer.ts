import { NFTActionTypeEnum } from 'enums/actions';
import { NFT, NFTActionTypes } from 'types/nft';

export const initialNFtDetailState: NFT = {
  id: 0,
  userId: 0,
  classId: '',
  buyNav: '',
  buyAmount: '0',
  buyTimestamp: '',
  buyFee: '',
  buyTransactionId: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const nftDetailReducer = (
  state = initialNFtDetailState,
  action: NFTActionTypes,
) => {
  switch (action.type) {
    case NFTActionTypeEnum.GET_DETAIL_NFT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
