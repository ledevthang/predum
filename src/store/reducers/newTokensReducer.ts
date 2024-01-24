import { TokensActionTypeEnum } from 'enums/actions';
import { TokenResponse, TokensActionTypes } from 'types/tokens';

export const initialNewTokensState: TokenResponse[] = [];

export const newTokensReducer = (
  state: TokenResponse[] = initialNewTokensState,
  action: TokensActionTypes,
) => {
  switch (action.type) {
    case TokensActionTypeEnum.GET_ALL_TOKENS_BY_JSON: {
      return [...action.payload];
    }
    default:
      return state;
  }
};
