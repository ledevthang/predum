import { CurrentUserActionTypeEnum } from 'enums/actions';
import { HostData } from './hostState';

export interface getCurrentUserInfoAction {
  type: typeof CurrentUserActionTypeEnum.GET_CURRENT_USER_INFO;
  payload: HostData;
}

export type CurrentUserActionTypes = getCurrentUserInfoAction;
