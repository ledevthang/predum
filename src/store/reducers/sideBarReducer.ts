import { BNB_TOKEN } from 'common';
import { WhoTakeWith } from 'types/hostPrediction';
import { SideBarActionTypes, SideBarState } from 'types/sideBarState';
import { SideBarActionTypeEnum } from './../../enums/actions';

export const initialSideBarState: SideBarState = {
  isOpen: false,
  isHighlightInEventItem: false,
  isSaveData: false,
  isLoading: false,
  organizingMethod: {
    eventType: WhoTakeWith.USER_USER,
    betting: [
      {
        token: BNB_TOKEN || '',
        liquidityPool: '',
      },
    ],
  },
};

export const sideBarReducer = (
  state = initialSideBarState,
  action: SideBarActionTypes,
) => {
  switch (action.type) {
    case SideBarActionTypeEnum.CHANGE_SIDE_BAR_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SideBarActionTypeEnum.RESET_SIDE_BAR_DATA_STATE: {
      let temp = initialSideBarState;
      temp.organizingMethod.betting[0].liquidityPool = '';
      return {
        ...temp,
      };
    }
    default:
      return state;
  }
};
