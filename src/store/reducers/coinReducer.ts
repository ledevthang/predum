import { CoinActionTypeEnum } from 'enums/actions';
import { CoinActionTypes, ICoin } from 'types/coin';

export const initialCoinState: ICoin[] = [];

export const coinReducer = (
  state: ICoin[] = initialCoinState,
  action: CoinActionTypes,
) => {
  switch (action.type) {
    case CoinActionTypeEnum.GET_ALL_COINS: {
      return [...action.payload];
    }
    default:
      return state;
  }
};
