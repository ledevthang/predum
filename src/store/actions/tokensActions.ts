import { PaginationData } from 'enums/pagination';
import tokensService from 'services/tokens';
import { ApiError } from 'types/api';
import { DispatchType } from 'types/store';
import { GetAllTokensRequest, ITokens, TokenResponse } from 'types/tokens';
import { TokensActionTypeEnum } from './../../enums/actions';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getTokensSuccessAction = (payload: PaginationData<ITokens>) => ({
  type: TokensActionTypeEnum.GET_ALL_TOKENS,
  payload,
});
export const getTokenSuccessActionByJSON = (payload: TokenResponse[]) => {
  return {
    type: TokensActionTypeEnum.GET_ALL_TOKENS_BY_JSON,
    payload,
  };
};

export const getAllTokensAction = (request: GetAllTokensRequest) => {
  const taskId = TokensActionTypeEnum.GET_ALL_TOKENS;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await tokensService.GetAllTokens(request);
      dispatch(getTokensSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
export const getAllTokensActionByJSON = () => {
  const taskId = TokensActionTypeEnum.GET_ALL_TOKENS_BY_JSON;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await tokensService.GetAllTokensByJSON();
      dispatch(getTokenSuccessActionByJSON(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
