import { LoginResponse, LoginUserRequest, UserResponse } from 'types/userState';
import { apiRoutesEnum } from './../enums/routes';
import AXIOS from './axios';

async function LoginUser(body: LoginUserRequest): Promise<LoginResponse> {
  const { data } = await AXIOS.post(apiRoutesEnum.LOGIN, {
    ...body,
  });
  return data;
}

async function getUserByAddress(address: string): Promise<UserResponse> {
  return AXIOS.get(`${apiRoutesEnum.USERS}/${address}`);
}
async function getNumBlockByAddress(address: string): Promise<{
  numblock: string;
}> {
  return AXIOS.get(`${apiRoutesEnum.USERS}/numBlock/${address}`);
}

export default {
  LoginUser,
  getUserByAddress,
  getNumBlockByAddress,
};
