import {
  filterAdminReducer,
  initialFilterAdminState,
} from './reducers/filterAdminReducer';
import { userReducer, initialUserState } from './reducers/userReducer';
import { LoginActionTypeEnum } from 'enums/actions';
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { RootStateType } from 'types/store';
import { initialAppState, appStateReducer } from './reducers/appReducer';
import {
  asyncTaskReducer,
  initialAsyncTaskState,
} from './reducers/asyncTaskReducer';
import {
  initialCategoryState,
  categoryReducer,
} from './reducers/categoryReducer';
import { initialDialogState, dialogReducer } from './reducers/dialogReducer';
import {
  initialEventDetailState,
  eventDetailReducer,
} from './reducers/eventDetailReducer';
import { initialEventsState, eventReducer } from './reducers/eventReducer';
import { initialFilterState, filterReducer } from './reducers/filterReducer';
import {
  initialHostPredictionState,
  hostPredictionReducer,
} from './reducers/hostPredictionReducer';
import { initialMenuState, menuReducer } from './reducers/menuReducer';
import { initialSideBarState, sideBarReducer } from './reducers/sideBarReducer';
import {
  initialOtherEventsState,
  otherEventReducer,
} from './reducers/otherEventsReducer';
import {
  initialPredictionsState,
  predictionReducer,
} from './reducers/predictionReducer';
import {
  initialHostHistoryState,
  hostHistoryReducer,
} from './reducers/hostHistoryReducer';
import {
  initialCompetitionState,
  competitionReducer,
} from './reducers/competitionReducer';
import {
  initialProEventPrediction,
  proEventPredictionReducer,
} from './reducers/proEventPrediction';
import { initialLeaguesState, leagueReducer } from './reducers/leagueReducer';
import { initialRoundState, roundReducer } from './reducers/roundReducer';
import { initialFixtureState, fixtureReducer } from './reducers/fixtureReducer';
import { initialReportsState, reportReducer } from './reducers/reportReducer';
import { initialTokensState, tokensReducer } from './reducers/tokensReducer';
import {
  initialNewTokensState,
  newTokensReducer,
} from './reducers/newTokensReducer';
import { initialHostState, hostReducer } from './reducers/hostReducer';
import { initialCoinState, coinReducer } from './reducers/coinReducer';
import {
  initialCurrentUserState,
  currentUserReducer,
} from './reducers/currentUserReducer';
import { nftReducer, initialNFtsState } from './reducers/nftReducer';
import {
  nftDetailReducer,
  initialNFtDetailState,
} from './reducers/nftDetailReducer';

export const initialRootState: RootStateType = {
  asyncTaskReducer: initialAsyncTaskState,
  menuReducer: initialMenuState,
  sideBarReducer: initialSideBarState,
  dialogReducer: initialDialogState,
  appStateReducer: initialAppState,
  eventReducer: initialEventsState,
  filterReducer: initialFilterState,
  eventDetailReducer: initialEventDetailState,
  nftDetailReducer: initialNFtDetailState,
  otherEventReducer: initialOtherEventsState,
  hostPredictionReducer: initialHostPredictionState,
  categoryReducer: initialCategoryState,
  predictionReducer: initialPredictionsState,
  hostHistoryReducer: initialHostHistoryState,
  competitionReducer: initialCompetitionState,
  userReducer: initialUserState,
  proEventPredictionReducer: initialProEventPrediction,
  leagueReducer: initialLeaguesState,
  roundReducer: initialRoundState,
  fixtureReducer: initialFixtureState,
  reportReducer: initialReportsState,
  tokensReducer: initialTokensState,
  newTokensReducer: initialNewTokensState,
  hostReducer: initialHostState,
  currentUserReducer: initialCurrentUserState,
  filterAdminReducer: initialFilterAdminState,
  coinReducer: initialCoinState,
  nftReducer: initialNFtsState,
};

export default function configureStore(
  preloadedState: RootStateType = initialRootState,
) {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers =
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools(...enhancers)
      : compose(...enhancers);

  const appReducer = combineReducers<RootStateType>({
    appStateReducer,
    asyncTaskReducer,
    menuReducer,
    dialogReducer,
    eventReducer,
    filterReducer,
    sideBarReducer,
    eventDetailReducer,
    nftDetailReducer,
    otherEventReducer,
    hostPredictionReducer,
    categoryReducer,
    predictionReducer,
    hostHistoryReducer,
    competitionReducer,
    userReducer,
    proEventPredictionReducer,
    leagueReducer,
    roundReducer,
    fixtureReducer,
    reportReducer,
    tokensReducer,
    newTokensReducer,
    hostReducer,
    currentUserReducer,
    filterAdminReducer,
    coinReducer,
    nftReducer,
  });

  // Reset state after logout
  const rootReducer = (state: RootStateType, action: AnyAction) => {
    return action.type === LoginActionTypeEnum.LOGOUT
      ? initialRootState
      : appReducer(state, action);
  };

  // @ts-ignore
  return createStore(rootReducer, preloadedState, composedEnhancers);
}
