import { HostActionTypeEnum } from 'enums/actions';

export interface HostData {
  id: number;
  address: string;
  isAdmin?: boolean;
  isBlocked?: boolean;
  description?: string;
  isVerified?: boolean;
  numEvents: string;
  numReports: string;
  bannerUrl?: string;
  numBlock: string;
  numPool: any;
  numPredictions: string;
  numPredictors: string;
  createdAt: string;
  avatarUrl?: string;
  followersId?: any;
  followsId?: any;
  changedNickname?: boolean;
  nickname?: string;
  userLinks?: string[];
}

export interface GetUserByAddressAction {
  type: typeof HostActionTypeEnum.GET_USER_BY_ADDRESS;
  payload: HostData;
}

export interface ResetUserByAddressAction {
  type: typeof HostActionTypeEnum.RESET_USER_BY_ADDRESS;
}

export type HostActionTypes = GetUserByAddressAction | ResetUserByAddressAction;
