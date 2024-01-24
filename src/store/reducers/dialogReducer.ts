import { DialogActionTypeEnum } from './../../enums/actions';
import { DialogState, DialogActionTypes } from './../../types/dialogState';

export const initialDialogState: DialogState = {
  open: false,
};

export const dialogReducer = (
  state = initialDialogState,
  action: DialogActionTypes,
) => {
  switch (action.type) {
    case DialogActionTypeEnum.CHANGE_DIALOG_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
