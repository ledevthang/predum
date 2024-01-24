import { HostPredictionActionTypeEnum } from './../enums/actions';
import { ICoin } from './coin';
import { IFixture } from './fixture';
import { EDataSource, EKindOfEvent, EProEventIdentity } from './proEvent';
export enum ECategory {
  FOOTBALL = 'Football',
  BASEBALL = 'Baseball',
  TENNIS = 'Tennis',
  FORMULA1 = 'Formula 1',
  MMA = 'MMA',
  COIN_PRICE = 'Coin Price',
  POLITICS = 'Politics',
  OTHERS = 'Others',
}

export enum EProEventMarket {
  X12 = '1x2',
  CORRECT_SCORE = 'Correct Score',
  OVER_UNDER = 'Over / Under',
  ASIAN_HANDICAP = 'Asian Handicap',
}

export enum EventType {
  GROUP_PREDICT = 'Group Predict',
  MULTIPLE_CHOICES = 'Multiple Choices',
  TEAM_SCORE = 'Team Score',
}

export enum WhoTakeWith {
  USER_USER = 'user vs user',
  USER_POOL = 'user vs pool',
  AFFILIATE = 'affiliate',
}

export enum EUnit {
  EFUN = 'EFUN',
  BNB = 'BNB',
  LINK = 'Link',
  XMETA = 'XMETA',
}

export enum MarketType {
  MULTIPLE_CHOICES = 'Multiple choices',
  HANDICAP = 'Handicap',
  OVER_UNDER = 'Over/Under',
  HOME_DRAW_AWAY = 'Home/Draw/Away',
  TRUE_FALSE = 'True / False',
}
export interface GroupPredict {
  options: string[];
}

export enum AnswerType {
  ONLY_TEXT = 'ONLY_TEXT',
  WITH_PHOTOS = 'WITH_PHOTOS',
}
export interface MultipleChoice {
  options: {
    name: string;
    odd: string;
    image?: File;
  }[];
}

export interface IReview {
  streamLink: string;
}

export interface DataProviderMarketSelect {
  is1x2: boolean;
  isOverUnder: boolean;
  isHandicap: boolean;
}

export interface HostPredictionState {
  step: number;
  eventName?: string;
  thumbnailUrl?: File | null;
  marketType: MarketType;
  eventBanner?: File | null;
  category?: number | null;
  subcategory?: number | null;
  categoryName?: string;
  subcategoryName?: string;
  addCompetition?: string;
  isAddCompetition?: boolean;
  competition?: string;
  description?: string;
  shortDescription?: string;
  deadline: Date | null;
  endTime: Date | null;
  groupPredict: GroupPredict;
  review: IReview;
  organizingMethod: {
    eventType: WhoTakeWith;
    preEventType?: WhoTakeWith;
    betting: {
      token: string;
      liquidityPool: string;
    }[];
  };
  handicap: {
    name: string;
    value: string;
    odd: string;
    image?: File;
    isNotInit?: boolean;
  }[];
  overUnder: {
    totalScore: string;
    totalScores: string[];
    over: string[];
    under: string[];
  };
  homeDrawAway: {
    name: string;
    odd: string;
    image?: File;
    isNotInit?: boolean;
  }[];
  multipleChoices: MultipleChoice;
  trueFalse: MultipleChoice;
  identity: EProEventIdentity;
  proEvent: {
    dataSource?: EDataSource;
    categoryId: string;
    subcategoryId: string;
    competitionId: string;
  };
  error: boolean;
  errorPool?: boolean;
  dataSource: EDataSource;
  preDataSource?: EDataSource;
  fixtureId?: number;
  kindOfEvent?: EKindOfEvent;
  search?: string;
  isBrowseOtherEvent?: boolean;
  showOtherEvent: 'category' | 'subcategory' | 'league' | 'event' | 'detail';
  preShowOtherEvent?:
    | 'category'
    | 'subcategory'
    | 'league'
    | 'event'
    | 'detail';
  selectedType?: 'hot' | 'other';
  feeForHost?: number;
  streamUrl?: string;
  answerType: AnswerType;
  lockEmbeddedLink?: boolean;
  fixture?: IFixture;
  shouldInitProMarket?: boolean;
  league?: string;
  leagueSelected?: string;
  shouldInitFirstChoiceProMarket: boolean;
  coinSelected?: ICoin;
  marketPriceType: MarketPriceType;
  priceRange: string[];
}

export enum MarketPriceType {
  PRICE = 'PRICE',
  VOLUME = 'VOLUME',
}

export interface HostPredictionAction {
  type: typeof HostPredictionActionTypeEnum.UPDATE_HOST_PREDICTION;
  payload: HostPredictionState;
}

export interface HostPredictionResetAction {
  type: typeof HostPredictionActionTypeEnum.RESET_HOST_PREDICTION;
}
export type HostPredictionActionTypes =
  | HostPredictionAction
  | HostPredictionResetAction;
