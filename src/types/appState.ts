import { AppStateEnum } from 'enums/actions';

export interface AppState {
  connector?: string;
  loginProcess?: boolean;
}

export interface UpdateAppStateAction {
  type: typeof AppStateEnum.UPDATE_APP_STATE;
  payload: Partial<AppState>;
}

export type AppActionTypes = UpdateAppStateAction;
