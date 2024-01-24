import { SUPPORTED_COIN, SUPPORTED_COIN_LOGO } from './../../common/index';
import coinService from 'services/coin';
import { ApiError } from 'types/api';
import { GetAllCoinRequest, ICoin } from 'types/coin';
import { DispatchType } from 'types/store';
import { CoinActionTypeEnum } from './../../enums/actions';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';
import { isProd } from 'services/wallet';

export const getCoinsSuccessAction = (payload: ICoin[]) => ({
  type: CoinActionTypeEnum.GET_ALL_COINS,
  payload,
});

export const getAllCoinsAction = (params: GetAllCoinRequest) => {
  const taskId = CoinActionTypeEnum.GET_ALL_COINS;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await coinService.GetAllCoins({
        ...params,
        pageNumber: 1,
        pageSize: 101,
      });
      const SUPPORTED_COIN_FINAL = isProd
        ? SUPPORTED_COIN
        : SUPPORTED_COIN.filter(
            (s) =>
              ![
                'Avalanche',
                'Axie Infinity',
                'Cosmos',
                'NEAR Protocol',
                'Fantom',
                'Shiba Inu',
                'Solana',
                'Uniswap',
                'Stellar',
              ].includes(s),
          );

      let dataStrict = data.filter((d) =>
        SUPPORTED_COIN_FINAL.includes(d.name),
      );
      dataStrict = dataStrict.map((d) => {
        let logo = (SUPPORTED_COIN_LOGO as any)[d.name];
        return {
          ...d,
          originalLogo: d.logo,
          ...(logo && { logo }),
        };
      });
      dispatch(getCoinsSuccessAction(dataStrict));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
