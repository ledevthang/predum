import { HostData } from 'types/hostState';

import { apiRoutesEnum } from './../enums/routes';
import AXIOS from './axios';

const GetUserByAddress = async (params: {
  address: string;
}): Promise<HostData> => {
  return AXIOS.get(`${apiRoutesEnum.USERS}/${params.address}`);
};
const UpdateUserAvatarUrl = async (body: any): Promise<HostData> => {
  return AXIOS.post(`${apiRoutesEnum.USERS}/avatar-url`, { ...body });
};
const UpdateUserDescription = async (body: any): Promise<HostData> => {
  return AXIOS.post(`${apiRoutesEnum.USERS}/description`, { ...body });
};
const UpdateUserBannerUrl = async (body: any): Promise<HostData> => {
  return AXIOS.post(`${apiRoutesEnum.USERS}/banner-url`, { ...body });
};
const UpdateUserNickname = async (body: any): Promise<HostData> => {
  return AXIOS.post(`${apiRoutesEnum.USERS}/nickname`, { ...body });
};
const GetCurrentUserInfo = async (): Promise<HostData> => {
  return AXIOS.get(`${apiRoutesEnum.USERS}`);
};
const UpdateUserFollow = async (body: any): Promise<HostData> => {
  return AXIOS.post(`${apiRoutesEnum.USERS}/follow`, { ...body });
};
const UpdateUserUnfollow = async (body: any): Promise<HostData> => {
  return AXIOS.post(`${apiRoutesEnum.USERS}/unfollow`, { ...body });
};
const UpdatePinnedEvents = async (body: any): Promise<any> => {
  return AXIOS.post(`${apiRoutesEnum.USERS}/pinned-events`, { ...body });
};
const UpdateUserLinks = async (body: any): Promise<any> => {
  return AXIOS.post(`${apiRoutesEnum.USERS}/user-links`, { ...body });
};
export default {
  GetUserByAddress,
  UpdateUserDescription,
  UpdateUserBannerUrl,
  UpdateUserNickname,
  GetCurrentUserInfo,
  UpdateUserFollow,
  UpdateUserAvatarUrl,
  UpdateUserUnfollow,
  UpdatePinnedEvents,
  UpdateUserLinks,
};
