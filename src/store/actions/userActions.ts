import { SALT_VALUE } from 'common';
import { UserActionTypeEnum } from 'enums/actions';
import { LocalStorageEnum } from 'enums/auth';
import * as jwt from 'jsonwebtoken';
import { erc20abi } from 'services/contract';
import userSvc from 'services/users';
import tokenSvc from 'services/tokens';
import { ApiError } from 'types/api';
import { DispatchType } from 'types/store';
import { LoginUserRequest, UserData } from 'types/userState';
import Web3 from 'web3';
import { convertWeiToToken } from './../../helpers/index';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getUserSuccessAction = (payload: Partial<UserData>) => {
  return {
    type: UserActionTypeEnum.GET_USER,
    payload,
  };
};

export const updateUserSuccessAction = (payload: Partial<UserData>) => {
  return {
    type: UserActionTypeEnum.UPDATE_USER,
    payload,
  };
};

export const getBalance = async (
  provider: any,
  walletAddress: string,
  tokenAddress: string,
) => {
  try {
    const web3 = new Web3(provider || window.ethereum);
    const contract = new web3.eth.Contract(erc20abi as any, tokenAddress);
    const res = await contract.methods.balanceOf(walletAddress).call();
    return convertWeiToToken(res);
  } catch (e) {
    return '0';
  }
};

export const getMainTokenBalance = async (
  provider: any,
  walletAddress: string,
) => {
  try {
    const web3 = new Web3(provider || window.ethereum);
    const res = await web3.eth.getBalance(walletAddress);
    return convertWeiToToken(res);
  } catch (e) {
    return '0';
  }
};

export const loginUserAction = (
  params: { username: string },
  loginSuccess?: () => void,
) => {
  const taskId = UserActionTypeEnum.LOGIN;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const password = jwt.sign(
        {
          username: params.username,
        },
        SALT_VALUE,
      );
      const data = await userSvc.LoginUser({
        username: params.username,
        password,
      });
      localStorage.setItem(LocalStorageEnum.ACCESS_TOKEN, data.accessToken);
      localStorage.setItem(LocalStorageEnum.REFRESH_TOKEN, data.refreshToken);
      localStorage.setItem(LocalStorageEnum.ACCOUNT, data.user.address);
      localStorage.setItem(LocalStorageEnum.USER_ID, `${data.user.id}`);
      dispatch(
        getUserSuccessAction({
          id: data.user.id,
          address: data.user.address,
        }),
      );
      loginSuccess && loginSuccess();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const logoutUserAction = () => {
  const taskId = UserActionTypeEnum.LOGOUT;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      localStorage.removeItem(LocalStorageEnum.CONNECTOR);
      localStorage.removeItem(LocalStorageEnum.REFRESH_TOKEN);
      localStorage.removeItem(LocalStorageEnum.ACCESS_TOKEN);
      localStorage.removeItem(LocalStorageEnum.ACCOUNT);
      localStorage.removeItem(LocalStorageEnum.USER_ID);
      localStorage.removeItem(LocalStorageEnum.IS_ADMIN);
      localStorage.removeItem(LocalStorageEnum.WALLET_CONNECT);
      dispatch(
        updateUserSuccessAction({
          efunBalance: '0',
          mainTokenBalance: '0',
          linkBalance: '0',
          xmetaBalance: '0',
          userBalance: [],
          id: 0,
        }),
      );
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const getUserBalance = (
  provider: any,
  address: string,
  callback?: () => void,
) => {
  const taskId = UserActionTypeEnum.UPDATE_USER;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));

      const mainTokenBalance = await getMainTokenBalance(provider, address);
      const efunBalance = await getBalance(
        provider,
        address,
        process.env.REACT_APP_EFUN_TOKEN || '',
      );
      const linkBalance = await getBalance(
        provider,
        address,
        process.env.REACT_APP_LINK_TOKEN || '',
      );
      const xmetaBalance = await getBalance(
        provider,
        address,
        process.env.REACT_APP_XMETA_TOKEN || '',
      );
      const tokens = await tokenSvc.GetAllTokensByJSON();
      const userBalance = [];
      for (let i = 0; i < tokens.length; i++) {
        const balance = await getBalance(provider, address, tokens[i].address);
        userBalance.push({
          token: tokens[i].address,
          balance: tokens[i].name == 'ETH' ? mainTokenBalance : balance,
        });
      }
      console.log('userBalance', userBalance);
      await timeout(1000);
      dispatch(
        updateUserSuccessAction({
          efunBalance,
          mainTokenBalance,
          linkBalance,
          xmetaBalance,
          userBalance,
        }),
      );
      callback?.();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      callback?.();
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const adminLogin = (
  body: LoginUserRequest,
  callback: (status: boolean) => void,
) => {
  const taskId = UserActionTypeEnum.LOGIN;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await userSvc.LoginUser(body);
      localStorage.setItem(LocalStorageEnum.ACCESS_TOKEN, data.accessToken);
      localStorage.setItem(LocalStorageEnum.REFRESH_TOKEN, data.refreshToken);
      localStorage.setItem(LocalStorageEnum.IS_ADMIN, 'true');
      callback(true);
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
      callback(false);
    }
  };
};
