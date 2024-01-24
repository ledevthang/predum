import { MenuActionTypeEnum } from './../../enums/actions';
import { MenuState, MenuActionTypes } from './../../types/menuState';

export const initialMenuState: MenuState = {};

export const menuReducer = (
  state = initialMenuState,
  action: MenuActionTypes,
) => {
  switch (action.type) {
    case MenuActionTypeEnum.CHANGE_MENU_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
