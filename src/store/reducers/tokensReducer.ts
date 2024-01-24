import { TokensActionTypeEnum } from 'enums/actions';
import { PaginationData } from 'enums/pagination';
import { ITokens, TokensActionTypes } from 'types/tokens';

export const initialTokensState: PaginationData<ITokens> = {
  pageNumber: 0,
  pageSize: 0,
  total: 0,
  data: [],
};

export const tokensReducer = (
  state: PaginationData<ITokens> = initialTokensState,
  action: TokensActionTypes,
) => {
  switch (action.type) {
    case TokensActionTypeEnum.GET_ALL_TOKENS: {
      return {
        ...state,
        ...action.payload,
        data: [
          ...(action.payload.pageNumber === 1 ? [] : state.data),
          ...action.payload.data,
        ],
      };
    }
    default:
      return state;
  }
};
