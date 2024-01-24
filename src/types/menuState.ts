import { ReactElement } from 'react';
import { MenuActionTypeEnum } from '../enums/actions';

export interface MenuState {
  anchorEl?: HTMLElement;
  component?: ReactElement;
}

export interface UpdateMenuAction {
  type: typeof MenuActionTypeEnum.CHANGE_MENU_STATE;
  payload: MenuState;
}

export type MenuActionTypes = UpdateMenuAction;
