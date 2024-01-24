import { ReactElement } from 'react';
import { DialogActionTypeEnum } from '../enums/actions';

export interface DialogState {
  open: boolean;
  component?: ReactElement;
  callback?: () => void;
}

export interface UpdateDialogAction {
  type: typeof DialogActionTypeEnum.CHANGE_DIALOG_STATE;
  payload: DialogState;
}

export type DialogActionTypes = UpdateDialogAction;
