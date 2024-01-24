import { SideBarState } from 'types/sideBarState';
import { SideBarActionTypeEnum } from '../../enums/actions';

export const updateSideBarStateAction = (payload: Partial<SideBarState>) => ({
  type: SideBarActionTypeEnum.CHANGE_SIDE_BAR_STATE,
  payload,
});

export const changeIsLoadingSideBarStateAction = (
  payload: Partial<SideBarState>,
) => ({
  type: SideBarActionTypeEnum.CHANGE_IS_LOADING_SIDE_BAR_STATE,
  payload,
});

export const resetSideBarStateAction = () => ({
  type: SideBarActionTypeEnum.RESET_SIDE_BAR_DATA_STATE,
});
