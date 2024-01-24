import { AppStateEnum } from 'enums/actions';
import { AppActionTypes, AppState } from './../../types/appState';

export const initialAppState: AppState = {};

export const appStateReducer = (
  state = initialAppState,
  action: AppActionTypes,
) => {
  switch (action.type) {
    case AppStateEnum.UPDATE_APP_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
