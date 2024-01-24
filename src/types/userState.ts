import { UserActionTypeEnum } from '../enums/actions';

export interface UserData {
  id: number;
  address: string;
  mainTokenBalance: string;
  efunBalance: string;
  linkBalance: string;
  xmetaBalance: string;
  userBalance: {
    token: string;
    balance: string;
  }[];
}

export interface UserResponse {
  id: number;
  address: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
}

export interface GetUserRequest {
  username: string;
}

export interface LoginUserRequest {
  username: string;
  password: string;
  isAdmin?: boolean;
}

export interface UpdateUserRequest {
  logoUrl?: string;
  email?: string;
  settings?: string;
}

export interface GetUserAction {
  type: typeof UserActionTypeEnum.GET_USER;
  payload: UserData;
}

export interface UserLoginAction {
  type: typeof UserActionTypeEnum.LOGIN;
  payload: UserData;
}

export interface UserLogoutAction {
  type: typeof UserActionTypeEnum.LOGOUT;
  payload: UserData;
}

export interface UpdateUserAction {
  type: typeof UserActionTypeEnum.UPDATE_USER;
  payload: Partial<UserData>;
}

export type UserActionTypes =
  | GetUserAction
  | UserLoginAction
  | UserLogoutAction
  | UpdateUserAction;
