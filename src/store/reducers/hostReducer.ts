import { HostActionTypeEnum } from 'enums/actions';
import { HostActionTypes, HostData } from 'types/hostState';

export const initialHostState: HostData = {
  id: 0,
  address: '',
  createdAt: '',
  isVerified: false,
  numEvents: '0',
  numReports: '0',
  numBlock: '0',
  numPredictions: '0',
  numPredictors: '0',
  numPool: {},
};

export const hostReducer = (
  state = initialHostState,
  action: HostActionTypes,
) => {
  switch (action.type) {
    case HostActionTypeEnum.GET_USER_BY_ADDRESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case HostActionTypeEnum.RESET_USER_BY_ADDRESS: {
      return initialHostState;
    }
    default:
      return state;
  }
};
