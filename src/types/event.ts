import { PaginationData, PaginationRequest } from 'enums/pagination';

import { EventsActionTypeEnum } from './../enums/actions';

export interface IEvent {
  id: number;
  name: string;
  thumbnailUrl: string;
  bannerUrl: string;
  type: string;
  scoreData?: number;
  deadline: Date;
  endTime: Date;
  txId: string;
  options: string;
  finalResult?: string;
  marketType?: string;
  odds: '';
  streamUrl?: string;
  views: number;
  isPinned?: boolean;
  blockNumber: number;
  result?: string;
  resultProofUrl?: string;
  shortDescription?: string;
  category?: string;
  relatedEvents?: number;
  isUserVerified: boolean;
  address: string;
  transactionId?: number;
  fixtureId?: string;
  metadata?: string;
  goalsMeta?: string;
  totalAmount?: string;
  description?: string;
  competition?: string;
  totalScore?: number;
  scoreOne?: number;
  scoreTwo?: number;
  userFollowers?: string;
  token: string;
  participants?: Array<string>;
  createdAt: Date;
  updatedAt: Date;
  userNickname?: string;
  poolTokenAmounts: any;
  poolTokenClaimAmounts: any;
  predictionTokenAmounts: any;
  poolTokenEstimateClaimAmounts: any;
  subCategory: string;
  userId: number;
  pro?: number;
  tokens?: string[];
  reportContents: string[];
  isBlock: boolean;
  status: string;
  finalTime?: string;
  reportStatus: any[];
  claimTime?: string;
  hostFee: number;
  isExpand?: boolean;
  maxRow?: number;
  count?: number;
  userAvatar?: string;
  shouldShowProof?: boolean;
  predictionTokenOptionAmounts: any;
  numParticipants: number;
  listingStatus: EEventStatus;
  typeUpload?: string;
  reportTypeUploads: string[];
}

export interface CreateEventBody {
  name: string;
  thumbnailUrl: string;
  bannerUrl: string;
  categoryId: string;
  subCategoryId: string;
  competitionId: string;
  type: string;
  marketType: string;
  description: string;
  metadata: string;
  shortDescription: string;
  streamUrl: string;
  options?: string;
  fixtureId: string;
  leagueId: string;
}

export enum SortState {
  BIGGEST_POOL = 'Biggest EFUN Pool',
  UPCOMING = 'Upcoming',
  FOLLOWING = 'Following',
  LATEST = 'Latest',
}

export enum EEventStatus {
  ENDED = 'Ended',
  PENDING = 'Pending result',
  LOCKED = 'Locked',
  PREDICTED = 'Predicted',
  NO_STATUS = 'No status',
}

export interface GetAllEventRequest extends PaginationRequest {
  orderBy?: SortState;
  search?: string;
  isHot?: boolean;
  userId?: number;
  tokenIds?: string[];
  eventTypes?: string[];
  listingStatuses?: string[];
  categoryId?: number;
  subCategoryId?: number;
  competitionId?: number;
  status?: string;
  pro?: number[];
  outOfTime?: boolean;
  homeList?: boolean;
  isPin?: boolean;
  outOfEndTime?: boolean;
  outOfEndTime7day?: boolean;
  outOfEndTime30day?: boolean;
  homeListTime?: boolean;
  biggestToken?: string;
  haveReport?: boolean;
  loginUserId?: string | null;
  fixtureId?: string;
  shouldGetUniqueFixture?: boolean;
  orderProEvent?: boolean;
}

export interface GetOtherEventRequest {
  eventId: number;
  orderBy: string;
  loginUserId: number;
}

export interface GetAllEventAction {
  type: EventsActionTypeEnum.GET_ALL_EVENTS;
  payload: PaginationData<IEvent>;
}

export interface EventDetailGetAction {
  type: EventsActionTypeEnum.GET_DETAIL_EVENT;
  payload: IEvent | null;
}

export interface GetAllOtherEventAction {
  type: EventsActionTypeEnum.GET_OTHER_EVENTS;
  payload: PaginationData<IEvent>;
}

export interface UpdateEventAction {
  type: EventsActionTypeEnum.UPDATE_EVENT;
  payload: IEvent;
}

export interface UpdateEventByIndexAction {
  type: EventsActionTypeEnum.UPDATE_EVENT_BY_INDEX;
  payload: {
    event: IEvent;
    index: number;
  };
}

export interface UpdateExpandChoiceAction {
  type: EventsActionTypeEnum.UPDATE_EXPAND;
  payload: number;
}

export interface ResetAction {
  type: EventsActionTypeEnum.RESET;
}

export type EventActionTypes =
  | GetAllEventAction
  | UpdateEventAction
  | UpdateExpandChoiceAction
  | ResetAction
  | UpdateEventByIndexAction;

export type EventDetailActionTypes = EventDetailGetAction;

export type OtherEventActionTypes = GetAllOtherEventAction;
