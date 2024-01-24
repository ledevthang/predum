import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { PaginationData } from 'enums/pagination';
import { FilterAdminState, FilterState } from 'types/filterState';
import { HostPredictionState } from 'types/hostPrediction';

import { AppState } from './appState';
import { AsyncTaskReducerState } from './asyncTaskState';
import { ICategory } from './category';
import { ICoin } from './coin';
import { ICompetition } from './competition';
import { DialogState } from './dialogState';
import { IEvent } from './event';
import { IFixture } from './fixture';
import { HostData } from './hostState';
import { ILeague } from './league';
import { MenuState } from './menuState';
import { NFT } from './nft';
import { IPrediction } from './prediction';
import { IProEventState } from './proEvent';
import { IReport } from './report';
import { IRound } from './round';
import { SideBarState } from './sideBarState';
import { ITokens, TokenResponse } from './tokens';
import { UserData } from './userState';

export type DispatchType = ThunkDispatch<any, any, AnyAction>;
interface CategoryState extends PaginationData<ICategory> {
  activedCategory?: string;
  activedType?: string;
}
export type RootStateType = {
  appStateReducer: AppState;
  asyncTaskReducer: AsyncTaskReducerState;
  menuReducer: MenuState;
  sideBarReducer: SideBarState;
  dialogReducer: DialogState;
  eventReducer: PaginationData<IEvent>;
  filterReducer: FilterState;
  eventDetailReducer: IEvent | null;
  nftDetailReducer: NFT;
  otherEventReducer: PaginationData<IEvent>;
  hostPredictionReducer: HostPredictionState;
  categoryReducer: CategoryState;
  predictionReducer: PaginationData<IPrediction>;
  hostHistoryReducer: PaginationData<IEvent>;
  competitionReducer: PaginationData<ICompetition>;
  userReducer: UserData;
  currentUserReducer: HostData;
  hostReducer: HostData;
  proEventPredictionReducer: IProEventState;
  leagueReducer: PaginationData<ILeague>;
  roundReducer: PaginationData<IRound>;
  fixtureReducer: PaginationData<IFixture>;
  reportReducer: PaginationData<IReport>;
  tokensReducer: PaginationData<ITokens>;
  newTokensReducer: TokenResponse[];
  filterAdminReducer: FilterAdminState;
  coinReducer: ICoin[];
  nftReducer: PaginationData<NFT>;
};

export type ThunkActionType = ThunkAction<
  Promise<void>,
  RootStateType,
  Record<string, unknown>,
  AnyAction
>;
