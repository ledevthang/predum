import { EDataSource } from './../../types/proEvent';
import { BNB_TOKEN } from 'common';
import {
  AnswerType,
  HostPredictionActionTypes,
  HostPredictionState,
  MarketPriceType,
  MarketType,
  WhoTakeWith,
} from 'types/hostPrediction';
import { EProEventIdentity } from 'types/proEvent';
import { HostPredictionActionTypeEnum } from './../../enums/actions';

export const initialHostPredictionState: HostPredictionState = {
  step: 0,
  deadline: null,
  endTime: null,
  eventName: '',
  thumbnailUrl: null,
  eventBanner: null,
  category: null,
  subcategory: null,
  description: '',
  competition: '',
  organizingMethod: {
    eventType: WhoTakeWith.USER_USER,
    betting: [
      {
        token: BNB_TOKEN,
        liquidityPool: '',
      },
    ],
  },
  groupPredict: {
    options: ['', ''],
  },
  shortDescription: '',
  review: {
    streamLink: '',
  },
  marketType: MarketType.MULTIPLE_CHOICES,
  multipleChoices: {
    options: [
      {
        name: '',
        odd: '',
      },
      {
        name: '',
        odd: '',
      },
    ],
  },
  handicap: [
    {
      name: '',
      odd: '',
      value: '',
    },
    {
      name: '',
      odd: '',
      value: '',
    },
  ],
  overUnder: {
    totalScore: '',
    totalScores: [''],
    over: [''],
    under: [''],
  },
  homeDrawAway: [
    {
      name: '',
      odd: '',
    },
    {
      name: 'Draw',
      odd: '',
    },
    {
      name: '',
      odd: '',
    },
  ],
  identity: EProEventIdentity.BOOK_MARKER,
  proEvent: {
    categoryId: '',
    subcategoryId: '',
    competitionId: '',
  },
  error: false,
  dataSource: EDataSource.SPORT_DATA_PROVIDER,
  showOtherEvent: 'category',
  feeForHost: 1,
  streamUrl: '',
  trueFalse: {
    options: [
      {
        name: 'Yes',
        odd: '',
      },
      {
        name: 'No',
        odd: '',
      },
    ],
  },
  shouldInitProMarket: true,
  answerType: AnswerType.ONLY_TEXT,
  lockEmbeddedLink: true,
  shouldInitFirstChoiceProMarket: true,
  marketPriceType: MarketPriceType.PRICE,
  priceRange: ['', ''],
};

export const hostPredictionReducer = (
  state = initialHostPredictionState,
  action: HostPredictionActionTypes,
) => {
  switch (action.type) {
    case HostPredictionActionTypeEnum.UPDATE_HOST_PREDICTION: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case HostPredictionActionTypeEnum.RESET_HOST_PREDICTION: {
      let temp = initialHostPredictionState;
      temp.organizingMethod = {
        eventType: WhoTakeWith.USER_USER,
        betting: [
          {
            token: BNB_TOKEN,
            liquidityPool: '0',
          },
        ],
      };
      temp.groupPredict.options = ['', ''];
      temp.handicap = [
        {
          name: '',
          odd: '',
          value: '',
          isNotInit: undefined,
        },
        {
          name: '',
          odd: '',
          value: '',
          isNotInit: undefined,
        },
      ];
      temp.homeDrawAway = [
        {
          name: '',
          odd: '',
          isNotInit: undefined,
        },
        {
          name: 'Draw',
          odd: '',
        },
        {
          name: '',
          odd: '',
          isNotInit: undefined,
        },
      ];
      temp.multipleChoices = {
        options: [
          {
            name: '',
            odd: '',
          },
          {
            name: '',
            odd: '',
          },
        ],
      };
      temp.overUnder = {
        totalScore: '',
        totalScores: [''],
        over: [''],
        under: [''],
      };
      temp.trueFalse = {
        options: [
          {
            name: 'Yes',
            odd: '',
          },
          {
            name: 'No',
            odd: '',
          },
        ],
      };
      temp.shouldInitProMarket = true;
      temp.shouldInitFirstChoiceProMarket = true;
      temp.marketPriceType = MarketPriceType.PRICE;
      temp.priceRange = ['', ''];
      return {
        ...temp,
      };
    }
    default:
      return state;
  }
};
