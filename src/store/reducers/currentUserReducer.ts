import { CurrentUserActionTypeEnum } from 'enums/actions';
import { CurrentUserActionTypes } from 'types/currentUserState';
import { HostData } from 'types/hostState';

export const initialCurrentUserState: HostData = {
  id: 0,
  address: '',
  createdAt: '',
  isVerified: false,
  followsId: [],
  followersId: [],
  numEvents: '0',
  numReports: '0',
  numBlock: '0',
  numPredictions: '0',
  numPredictors: '0',
  numPool: {},
};

export const currentUserReducer = (
  state = initialCurrentUserState,
  action: CurrentUserActionTypes,
) => {
  switch (action.type) {
    case CurrentUserActionTypeEnum.GET_CURRENT_USER_INFO: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
