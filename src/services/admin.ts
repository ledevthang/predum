import { Decimal } from 'decimal.js';
import {
  IEventP2PResponse,
  IEventP2PState,
  IPlatformIncome,
  IPredictionP2PState,
} from './../types/admin';
import dayjs from 'dayjs';
import { IAdminStatisticRequest, IPredictionP2PResponse } from 'types/admin';
import { AnalyticsEvent } from 'types/analytics';
import { WhoTakeWith } from 'types/hostPrediction';
import { apiRoutesEnum } from './../enums/routes';
import AXIOS from './axios';
import { convertFloatWeiToToken } from 'helpers';

const convertDateToString = (params: IAdminStatisticRequest) => {
  return {
    startTime: params.from || '1990-01-01',
    endTime: params.to || dayjs(new Date()).endOf('day').toDate(),
  };
};
const GetWalletCount = async (
  params: IAdminStatisticRequest,
): Promise<number> => {
  return AXIOS.get(`${apiRoutesEnum.ANALYTICS}/count-new-wallet`, {
    params: convertDateToString(params),
  });
};

const GetEventCount = async (
  params: IAdminStatisticRequest,
): Promise<AnalyticsEvent[]> => {
  const data: AnalyticsEvent[] = await AXIOS.get(
    `${apiRoutesEnum.ANALYTICS}/count-new-event`,
    {
      params: {
        ...convertDateToString(params),
        ...(params.token && {
          token: params.token,
        }),
        playType: params.playType,
      },
    },
  );
  return [
    {
      cnt: Number(
        data.find((f) => f.playType == WhoTakeWith.USER_USER)?.cnt || '0',
      ),
      playType: WhoTakeWith.USER_USER,
    },
    {
      cnt: Number(
        data.find((f) => f.playType == WhoTakeWith.USER_POOL)?.cnt || '0',
      ),
      playType: WhoTakeWith.USER_POOL,
    },
    {
      cnt: Number(data.find((f) => f.playType == 'affiliate')?.cnt || '0'),
      playType: 'affiliate',
    },
  ];
};

const GetPredictionCount = async (
  params: IAdminStatisticRequest,
): Promise<AnalyticsEvent[]> => {
  const data: AnalyticsEvent[] = await AXIOS.get(
    `${apiRoutesEnum.ANALYTICS}/count-new-prediction`,
    {
      params: {
        ...convertDateToString(params),
        ...(params.token && {
          token: params.token,
        }),
        playType: params.playType,
      },
    },
  );
  return [
    {
      cnt: Number(
        data.find((f) => f.playType == WhoTakeWith.USER_USER)?.cnt || '0',
      ),
      playType: WhoTakeWith.USER_USER,
    },
    {
      cnt: Number(
        data.find((f) => f.playType == WhoTakeWith.USER_POOL)?.cnt || '0',
      ),
      playType: WhoTakeWith.USER_POOL,
    },
    {
      cnt: Number(data.find((f) => f.playType == 'affiliate')?.cnt || '0'),
      playType: 'affiliate',
    },
  ];
};

const GetNewUserEvent = async (
  params: IAdminStatisticRequest,
): Promise<number> => {
  const data: [{ cnt: string }] = await AXIOS.get(
    `${apiRoutesEnum.ANALYTICS}/count-new-user-event`,
    {
      params: {
        ...convertDateToString(params),
        ...(params.token && {
          token: params.token,
        }),
        playType: params.playType,
      },
    },
  );
  return Number(data?.[0]?.cnt || '0');
};

const GetNewUserPrediction = async (
  params: IAdminStatisticRequest,
): Promise<number> => {
  const data: [{ cnt: string }] = await AXIOS.get(
    `${apiRoutesEnum.ANALYTICS}/count-new-user-prediction`,
    {
      params: {
        ...convertDateToString(params),
        ...(params.token && {
          token: params.token,
        }),
        playType: params.playType,
      },
    },
  );
  return Number(data?.[0]?.cnt || '0');
};

const GetPredictionP2PStatistic = async (
  params: IAdminStatisticRequest,
  platformFee: number,
): Promise<IPredictionP2PState> => {
  const divided =
    params.playType == WhoTakeWith.USER_POOL ? 1 - platformFee : 1;
  const data: IPredictionP2PResponse = await AXIOS.get(
    `${apiRoutesEnum.ANALYTICS}/dashboard-prediction`,
    {
      params: {
        ...convertDateToString(params),
        ...(params.token && {
          token: params.token,
        }),
        playType: params.playType,
      },
    },
  );
  const dataSource = [
    Number(data.metric1Res.find((m) => m.pro != 0)?.cnt || '0'),
    Number(data.metric1Res.find((m) => m.pro == 0)?.cnt || '0'),
  ];
  const selfDataVolume = convertFloatWeiToToken(
    data.metric2Res.totalVolume
      .find((t) => t.pro == 0)
      ?.totalPredictedPool.split('.')[0] || '',
    4,
  );
  const dataProVolume = convertFloatWeiToToken(
    data.metric2Res.totalVolume
      .find((t) => t.pro != 0)
      ?.totalPredictedPool.split('.')[0] || '',
    4,
  );
  const _predictAmountPerUser = convertFloatWeiToToken(
    data.metric2Res.avgPredictPerUser.split('.')[0],
    4,
  );
  const _avgPredictAmount = convertFloatWeiToToken(
    data.metric2Res.avgPredictAmount.split('.')[0],
    4,
  );

  const predictAmountPerUser = new Decimal(_predictAmountPerUser)
    .div(divided)
    .toFixed(4)
    .toString();
  const avgPredictAmount = new Decimal(_avgPredictAmount)
    .div(divided)
    .toFixed(4)
    .toString();
  const selfDataV = new Decimal(selfDataVolume)
    .div(divided)
    .toFixed(4)
    .toString();
  const dataProV = new Decimal(dataProVolume)
    .div(divided)
    .toFixed(4)
    .toString();
  const summary = {
    totalPredictions: data.metric2Res.totalPredictions,
    totalVolume: {
      selfData: selfDataV,
      dataPro: dataProV,
      total: new Decimal(selfDataV).add(dataProV).toString(),
    },
    avgPredictAmount,
    avgPredictNum: Number(data.metric2Res.avgPredictNum).toFixed(2),
    avgPredictPerUser: predictAmountPerUser,
  };
  const selfData = [
    'eSport',
    'Sport',
    'Market Prediction',
    'GameFi',
    'Politics',
    'Others',
  ].map((m) =>
    Number(
      data.metric3Res.find((m1) => m1.category == m && m1.pro == 0)
        ?.totalPredictions || '0',
    ),
  );
  const dataPro = [
    'eSport',
    'Sport',
    'Market Prediction',
    'GameFi',
    'Politics',
    'Others',
  ].map((m) =>
    Number(
      data.metric3Res.find((m1) => m1.category == m && m1.pro != 0)
        ?.totalPredictions || '0',
    ),
  );
  return {
    dataSource,
    summary,
    selfData,
    dataPro,
  };
};

const GetEventP2PStatistic = async (
  params: IAdminStatisticRequest,
): Promise<IEventP2PState> => {
  const data: IEventP2PResponse = await AXIOS.get(
    `${apiRoutesEnum.ANALYTICS}/dashboard-event`,
    {
      params: {
        ...convertDateToString(params),
        ...(params.token && {
          token: params.token,
        }),
        playType: params.playType,
      },
    },
  );
  const dataSource = [
    Number(data.metric1Res.find((m) => m.pro != 0)?.cnt || '0'),
    Number(data.metric1Res.find((m) => m.pro == 0)?.cnt || '0'),
  ];
  const summary = {
    totalEvents: data.metric2Res.totalEvents,
    totalHosts: data.metric2Res.totalHosts,
    totalPoolAmount: convertFloatWeiToToken(
      data.metric2Res.totalPoolAmount.split('.')[0],
      4,
    ),
    avgPoolAmount: convertFloatWeiToToken(
      data.metric2Res.avgPoolAmount.split('.')[0],
      4,
    ),
  };
  const selfData = [
    'eSport',
    'Sport',
    'Market Prediction',
    'GameFi',
    'Politics',
    'Others',
  ].map((m) =>
    Number(
      data.metric3Res.find((m1) => m1.category == m && m1.pro == 0)
        ?.totalEvents || '0',
    ),
  );
  const dataPro = [
    'eSport',
    'Sport',
    'Market Prediction',
    'GameFi',
    'Politics',
    'Others',
  ].map((m) =>
    Number(
      data.metric3Res.find((m1) => m1.category == m && m1.pro != 0)
        ?.totalEvents || '0',
    ),
  );
  return {
    dataSource,
    summary,
    selfData,
    dataPro,
  };
};

const GetPlatformIncome = async (
  params: IAdminStatisticRequest,
): Promise<IPlatformIncome> => {
  const res: IPlatformIncome = await AXIOS.get(
    `${apiRoutesEnum.ANALYTICS}/dashboard-income`,
    {
      params: {
        ...convertDateToString(params),
        ...(params.token && {
          token: params.token,
        }),
      },
    },
  );
  return {
    eventCreateFee: res.eventCreateFee.map((u) => ({
      total: convertFloatWeiToToken(u.total || '0'),
    })),
    uvuTotalAmount: res.uvuTotalAmount.map((u) => ({
      token: u.token,
      total: convertFloatWeiToToken(u.total),
    })),
    uvpTotalAmount: res.uvpTotalAmount.map((u) => ({
      token: u.token,
      total: convertFloatWeiToToken(u.total),
    })),
  };
};

export default {
  GetWalletCount,
  GetEventCount,
  GetPredictionCount,
  GetNewUserEvent,
  GetNewUserPrediction,
  GetPredictionP2PStatistic,
  GetEventP2PStatistic,
  GetPlatformIncome,
};
