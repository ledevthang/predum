import { betSlipItem } from 'components/BetSlip/betSlipItem';
import { SideBarActionTypeEnum } from '../enums/actions';
import { WhoTakeWith } from './hostPrediction';

export interface SideBarState {
  isHighlightInEventItem?: boolean;
  isOpen?: boolean;
  isSaveData?: boolean;
  isLoading?: boolean;
  highlightItem?: string;
  betSlipData?: betSlipItem;
  organizingMethod: {
    eventType: WhoTakeWith;
    betting: {
      token: string;
      liquidityPool: string;
    }[];
  };
}

export interface UpdateSideBarAction {
  type: typeof SideBarActionTypeEnum.CHANGE_SIDE_BAR_STATE;
  payload: SideBarState;
}

export interface ResetSideBarAction {
  type: typeof SideBarActionTypeEnum.RESET_SIDE_BAR_DATA_STATE;
}

export type SideBarActionTypes = UpdateSideBarAction | ResetSideBarAction;
