import { MenuActionTypeEnum } from '../../enums/actions';
import { MenuState } from './../../types/menuState';

export const updateMenuStateAction = (payload: MenuState) => ({
  type: MenuActionTypeEnum.CHANGE_MENU_STATE,
  payload,
});
