import { UserActionTypeEnum } from 'enums/actions';
import { UserActionTypes, UserData } from 'types/userState';

export const initialUserState: UserData = {
  id: 0,
  address: '',
  mainTokenBalance: '0',
  linkBalance: '0',
  xmetaBalance: '0',
  efunBalance: '0',
  userBalance: [],
};

export const userReducer = (
  state = initialUserState,
  action: UserActionTypes,
) => {
  switch (action.type) {
    case UserActionTypeEnum.GET_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UserActionTypeEnum.UPDATE_USER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
