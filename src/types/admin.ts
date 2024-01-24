import { WhoTakeWith } from './hostPrediction';

export interface IAdminStatisticRequest {
  from?: Date | null;
  to?: Date | null;
  token?: string;
  playType?: WhoTakeWith;
}

export interface IPredictionP2PResponse {
  metric1Res: {
    cnt: string;
    pro: number;
  }[];
  metric2Res: {
    totalPredictions: string;
    totalPredictors: string;
    totalVolume: [
      {
        totalPredictedPool: string;
        pro: number;
      },
    ];
    avgPredictAmount: string;
    avgPredictNum: string;
    avgPredictPerUser: string;
  };
  metric3Res: {
    category: string;
    pro: number;
    totalPredictions: string;
  }[];
}

export interface IPredictionP2PSummary {
  totalPredictions: string;
  totalVolume: {
    selfData: string;
    dataPro: string;
    total: string;
  };
  avgPredictAmount: string;
  avgPredictNum: string;
  avgPredictPerUser: string;
}

export interface IEventP2PResponse {
  metric1Res: {
    cnt: string;
    pro: number;
  }[];
  metric2Res: {
    totalEvents: string;
    totalHosts: string;
    totalPoolAmount: string;
    avgPoolAmount: string;
  };
  metric3Res: {
    category: string;
    pro: number;
    totalEvents: string;
  }[];
}

export interface IPredictionP2PState {
  dataSource: number[];
  summary: IPredictionP2PSummary;
  selfData: number[];
  dataPro: number[];
}

export interface IEventP2PSummary {
  totalEvents: string;
  totalHosts: string;
  totalPoolAmount: string;
  avgPoolAmount: string;
}

export interface IEventP2PState {
  dataSource: number[];
  summary: IEventP2PSummary;
  selfData: number[];
  dataPro: number[];
}

export interface IPlatformIncome {
  eventCreateFee: {
    total?: string;
  }[];
  uvuTotalAmount: {
    token: string;
    total: string;
  }[];
  uvpTotalAmount: {
    token: string;
    total: string;
  }[];
}
