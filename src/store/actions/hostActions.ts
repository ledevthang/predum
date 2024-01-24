import { sendFileToIPFS } from 'helpers';
import hostService from 'services/host';
import { ApiError } from 'types/api';
import { HostData } from 'types/hostState';
import { DispatchType } from 'types/store';
import { HostActionTypeEnum } from './../../enums/actions';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getUserByAddressSuccessAction = (payload: Partial<HostData>) => ({
  type: HostActionTypeEnum.GET_USER_BY_ADDRESS,
  payload,
});

export const getUserByAddressAction = (params: { address: string }) => {
  const taskId = HostActionTypeEnum.GET_USER_BY_ADDRESS;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await hostService.GetUserByAddress(params);
      dispatch(getUserByAddressSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
export const updateAvatarUrlAction = (file: File, callback?: () => void) => {
  const taskId = HostActionTypeEnum.UPDATA_USER_AVATAR;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const avatarUrl = await sendFileToIPFS(file);
      await hostService.UpdateUserAvatarUrl({
        avatarUrl: avatarUrl,
      });
      callback && callback();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
export const resetUserByAddressAction = () => ({
  type: HostActionTypeEnum.RESET_USER_BY_ADDRESS,
});

export const updateUserDescriptionAction = (body: any) => {
  const taskId = HostActionTypeEnum.UPDATA_USER_DESCRIPTION;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await hostService.UpdateUserDescription(body);
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
export const updateUserBannerAction = (file: File, callback?: () => void) => {
  const taskId = HostActionTypeEnum.UPDATA_USER_BANNER;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const bannerUrl = await sendFileToIPFS(file);
      await hostService.UpdateUserBannerUrl({
        bannerUrl: bannerUrl,
      });
      callback && callback();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
export const updateUserNicknameAction = (
  nickname: string,
  callback?: () => void,
  callbackError?: () => void,
) => {
  const taskId = HostActionTypeEnum.UPDATA_USER_NICKNAME;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await hostService.UpdateUserNickname({
        nickname: nickname,
      });
      callback && callback();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
      callbackError && callbackError();
    }
  };
};
