import { PaginationData } from 'enums/pagination';
import nftsService from 'services/nft';
import { ApiError } from 'types/api';
import { GetAllNFTsRequest, NFT } from 'types/nft';
import { DispatchType } from 'types/store';
import { NFTActionTypeEnum } from './../../enums/actions';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getNFTsSuccessAction = (payload: PaginationData<NFT>) => ({
  type: NFTActionTypeEnum.GET_ALL_NFTS,
  payload,
});
export const getDetailNFTSuccessAction = (payload: NFT) => ({
  type: NFTActionTypeEnum.GET_DETAIL_NFT,
  payload,
});

export const getAllNFTsAction = (request: GetAllNFTsRequest) => {
  const taskId = NFTActionTypeEnum.GET_ALL_NFTS;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await nftsService.GetAllNFTs(request);
      dispatch(getNFTsSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const getDetailNFTAction = (id: number, callback?: any) => {
  const taskId = NFTActionTypeEnum.GET_ALL_NFTS;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await nftsService.GetDetailNft(id);
      dispatch(getDetailNFTSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
      callback && callback(data);
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
