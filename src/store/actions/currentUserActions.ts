import hostService from 'services/host';
import { ApiError } from 'types/api';
import { HostData } from 'types/hostState';
import { DispatchType } from 'types/store';
import { CurrentUserActionTypeEnum } from './../../enums/actions';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getCurrentUserInfoSuccessAction = (
  payload: Partial<HostData>,
) => ({
  type: CurrentUserActionTypeEnum.GET_CURRENT_USER_INFO,
  payload,
});

export const getCurrentUserInfoAction = (callback?: () => void) => {
  const taskId = CurrentUserActionTypeEnum.GET_CURRENT_USER_INFO;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await hostService.GetCurrentUserInfo();
      dispatch(getCurrentUserInfoSuccessAction(data));
      callback && callback();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
export const updateUserFollowAction = (
  userId: number,
  callback?: () => void,
) => {
  const taskId = CurrentUserActionTypeEnum.UPDATE_USER_FOLLOW;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await hostService.UpdateUserFollow({ followUserId: userId });
      callback && callback();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
export const updateUserUnfollowAction = (
  userId: number,
  callback?: () => void,
) => {
  const taskId = CurrentUserActionTypeEnum.UPDATE_USER_FOLLOW;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await hostService.UpdateUserUnfollow({ followUserId: userId });
      callback && callback();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
