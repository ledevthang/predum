import { createSelector } from 'reselect';

import { RootStateType as IStore } from '../../types/store';

// AppReducer
export const sTaskStatus = (key: string) => (store: IStore) =>
  store.asyncTaskReducer.status[key];

export const getAppState = (store: IStore) => store.appStateReducer;
export const getMenuState = (store: IStore) => store.menuReducer;
export const getSideBarState = (store: IStore) => store.sideBarReducer;
export const getDialogState = (store: IStore) => store.dialogReducer;
export const getEvents = (store: IStore) => store.eventReducer.data;
export const getPaginationEvent = (store: IStore) => ({
  pageNumber: store.eventReducer.pageNumber,
  pageSize: store.eventReducer.pageSize,
  total: store.eventReducer.total,
});
export const getFilterState = (store: IStore) => store.filterReducer;
export const getEventDetail = (store: IStore) => store.eventDetailReducer;
export const getOtherEvent = (store: IStore) => store.otherEventReducer.data;
export const getHostPrediction = (store: IStore) => store.hostPredictionReducer;
export const getEventDetailState = (store: IStore) => ({
  ...store.hostPredictionReducer,
  error: undefined,
});
export const getGroupPredictState = (store: IStore) =>
  store.hostPredictionReducer.groupPredict;
export const getMultipleChoiceState = (store: IStore) =>
  store.hostPredictionReducer.multipleChoices;
export const getHandicapState = (store: IStore) =>
  store.hostPredictionReducer.handicap;
export const getOverUnderState = (store: IStore) =>
  store.hostPredictionReducer.overUnder;
export const getHomeDrawAwayState = (store: IStore) =>
  store.hostPredictionReducer.homeDrawAway;
export const getReviewState = (store: IStore) =>
  store.hostPredictionReducer.review;
export const getAllCategories = (store: IStore) => store.categoryReducer.data;
export const getPredictionsData = (store: IStore) =>
  store.predictionReducer.data;
export const getPredictionPagination = (store: IStore) => ({
  pageNumber: store.predictionReducer.pageNumber,
  pageSize: store.predictionReducer.pageSize,
  total: store.predictionReducer.total,
});
export const getHostHistoryData = (store: IStore) =>
  store.hostHistoryReducer.data;
export const getHostHistoryPagination = (store: IStore) => ({
  pageNumber: store.hostHistoryReducer.pageNumber,
  pageSize: store.hostHistoryReducer.pageSize,
  total: store.hostHistoryReducer.total,
});
export const getOrganizingMethod = (store: IStore) =>
  store.hostPredictionReducer.organizingMethod;
export const getOptionalDetailState = (store: IStore) =>
  store.hostPredictionReducer.marketType;
export const getEventType = (store: IStore) =>
  store.hostPredictionReducer.organizingMethod.eventType;
export const getCompetitionsState = (store: IStore) =>
  store.competitionReducer.data;
export const getUserState = (store: IStore) => store.userReducer;
export const getProEventPredictionState = (store: IStore) =>
  store.proEventPredictionReducer;
export const getHostEventError = (store: IStore) =>
  store.hostPredictionReducer.error || store.hostPredictionReducer.errorPool;
export const getEventIdentity = (store: IStore) =>
  store.hostPredictionReducer.identity;
export const getEventDataSource = (store: IStore) =>
  store.hostPredictionReducer.dataSource;
export const getCategoryState = (store: IStore) => ({
  category: store.hostPredictionReducer.category,
  subcategory: store.hostPredictionReducer.subcategory,
  categoryName: store.hostPredictionReducer.categoryName,
  subcategoryName: store.hostPredictionReducer.subcategoryName,
});

export const getPredictionById = createSelector(
  [
    (state) => state.predictionReducer.data,
    (state, id: number) => id,
    (state) => state,
  ],
  (ps, id, store) => {
    return ps.find((p: any) => p.id === id);
  },
);

export const getLeagueState = (store: IStore) => store.leagueReducer.data;
export const getRoundState = (store: IStore) => store.roundReducer.data;
export const getTokensState = (store: IStore) => store.tokensReducer.data;
export const getNewTokenState = (store: IStore) => store.newTokensReducer;
export const getHostState = (store: IStore) => store.hostReducer;
export const getActivedCategory = (store: IStore) => store.categoryReducer;
export const getCurrentUserState = (store: IStore) => store.currentUserReducer;
export const getTokensPaginationState = (store: IStore) => ({
  pageNumber: store.tokensReducer.pageNumber,
  pageSize: store.tokensReducer.pageSize,
  total: store.tokensReducer.total,
});
export const getRoundPaginationState = (store: IStore) => ({
  pageNumber: store.roundReducer.pageNumber,
  pageSize: store.roundReducer.pageSize,
  total: store.roundReducer.total,
});

export const getFixtureState = (store: IStore) => store.fixtureReducer.data;
export const getFixturePaginationState = (store: IStore) => ({
  pageNumber: store.fixtureReducer.pageNumber,
  pageSize: store.fixtureReducer.pageSize,
  total: store.fixtureReducer.total,
});

export const getSelectEventState = (store: IStore) => ({
  leagueSelected: store.hostPredictionReducer.leagueSelected,
  fixtureId: store.hostPredictionReducer.fixtureId,
  search: store.hostPredictionReducer.search,
  category: store.hostPredictionReducer.category,
  subcategory: store.hostPredictionReducer.subcategory,
  isBrowseOtherEvent: store.hostPredictionReducer.isBrowseOtherEvent,
  categoryName: store.hostPredictionReducer.categoryName,
  dataSource: store.hostPredictionReducer.dataSource,
  subcategoryName: store.hostPredictionReducer.subcategoryName,
  showOtherEvent: store.hostPredictionReducer.showOtherEvent,
  selectedType: store.hostPredictionReducer.selectedType,
  eventName: store.hostPredictionReducer.eventName,
  deadline: store.hostPredictionReducer.deadline,
  endTime: store.hostPredictionReducer.endTime,
  description: store.hostPredictionReducer.description,
  thumbnailUrl: store.hostPredictionReducer.thumbnailUrl,
  preShowOtherEvent: store.hostPredictionReducer.preShowOtherEvent,
  coinSelected: store.hostPredictionReducer.coinSelected,
  kindOfEvent: store.hostPredictionReducer.kindOfEvent,
});

export const getLeagueById = createSelector(
  [(state) => state.leagueReducer.data, (state, id: number) => id],
  (ps, id) => {
    return ps.find((p: any) => p.id === id);
  },
);

export const getFixtureById = createSelector(
  [(state) => state.fixtureReducer.data, (state, id: number) => id],
  (ps, id) => {
    return ps.find((p: any) => p.id === id);
  },
);

export const getReportState = (store: IStore) => store.reportReducer.data;
export const getReportPaginationState = (store: IStore) => ({
  pageNumber: store.reportReducer.pageNumber,
  pageSize: store.reportReducer.pageSize,
  total: store.reportReducer.total,
});
export const getMarketInfo = (store: IStore) => ({
  eventName: store.hostPredictionReducer.eventName,
  deadline: store.hostPredictionReducer.deadline,
  endTime: store.hostPredictionReducer.endTime,
  description: store.hostPredictionReducer.description,
  thumbnailUrl: store.hostPredictionReducer.thumbnailUrl,
  subcategoryName: store.hostPredictionReducer.subcategoryName,
});

export const getQuestion = (store: IStore) =>
  store.hostPredictionReducer.shortDescription;
export const getFeeForHost = (store: IStore) =>
  store.hostPredictionReducer.feeForHost;
export const getEventBanner = (store: IStore) =>
  store.hostPredictionReducer.eventBanner;
export const getKindOfEvent = (store: IStore) =>
  store.hostPredictionReducer.kindOfEvent;
export const getTrueFalse = (store: IStore) =>
  store.hostPredictionReducer.trueFalse;
export const getAnswerType = (store: IStore) =>
  store.hostPredictionReducer.answerType;
export const getLockEmbeddedLink = (store: IStore) =>
  store.hostPredictionReducer.lockEmbeddedLink;
export const getStreamUrl = (store: IStore) =>
  store.hostPredictionReducer.streamUrl;
export const getFixtureSelected = (store: IStore) =>
  store.hostPredictionReducer.fixture;
export const getCoinSelected = (store: IStore) =>
  store.hostPredictionReducer.coinSelected;
export const getMarketType = (store: IStore) =>
  store.hostPredictionReducer.marketType;
export const getShouldInitProMarket = (store: IStore) =>
  store.hostPredictionReducer.shouldInitProMarket;
export const getDescription = (store: IStore) =>
  store.hostPredictionReducer.description;
export const getThumbnail = (store: IStore) =>
  store.hostPredictionReducer.thumbnailUrl;
export const getShouldInitFirstChoiceProMarket = (store: IStore) =>
  store.hostPredictionReducer.shouldInitFirstChoiceProMarket;
export const getFilerAdminState = (store: IStore) => store.filterAdminReducer;
export const getCoinState = (store: IStore) => store.coinReducer;
export const getMarketPriceType = (store: IStore) =>
  store.hostPredictionReducer.marketPriceType;
export const getPriceRange = (store: IStore) =>
  store.hostPredictionReducer.priceRange;
export const getNFTData = (store: IStore) => store.nftReducer.data;
export const getNFTDetailState = (store: IStore) => store.nftDetailReducer;
export const getNFTPagination = (store: IStore) => ({
  pageNumber: store.nftReducer.pageNumber,
  pageSize: store.nftReducer.pageSize,
  total: store.nftReducer.total,
});
