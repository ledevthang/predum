/* eslint-disable prettier/prettier */
import Decimal from 'decimal.js';
import Web3 from 'web3';

import {
  BNB_TOKEN,
  MAP_TOKEN_USD_MAINNET,
  MAP_TOKEN_USD_TESTNET,
} from 'common';
import { LocalStorageEnum } from 'enums/auth';
import { PaginationData } from 'enums/pagination';
import { sendFileToIPFS, sendJsonToIPFS } from 'helpers';
import { checkApproveTx, setIntervalCallAPI } from 'helpers';
import { predictionABI } from 'services/contract';
import eventService from 'services/event';
import { isProd } from 'services/wallet';
import { ApiError } from 'types/api';
import {
  CreateEventBody,
  GetAllEventRequest,
  IEvent,
  SortState,
} from 'types/event';
import { ETypeOdd } from 'types/fixture';
import {
  AnswerType,
  EventType,
  HostPredictionState,
  MarketPriceType,
  MarketType,
  WhoTakeWith,
} from 'types/hostPrediction';
import { EDataSource } from 'types/proEvent';
import { DispatchType } from 'types/store';
import localStorageUtils from 'utils/LocalStorage';

import { RootStateType as IStore } from '../../types/store';
import { EventsActionTypeEnum } from './../../enums/actions';
import { EKindOfEvent } from './../../types/proEvent';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';
import { getUserBalance } from './userActions';

export const getEventsSuccessAction = (payload: PaginationData<IEvent>) => ({
  type: EventsActionTypeEnum.GET_ALL_EVENTS,
  payload,
});

export const getEventDetailSuccessAction = (payload: IEvent) => ({
  type: EventsActionTypeEnum.GET_DETAIL_EVENT,
  payload,
});

export const updateEventSuccessAction = (payload: IEvent) => ({
  type: EventsActionTypeEnum.UPDATE_EVENT,
  payload,
});
export const updateEventByIndexSuccessAction = (payload: {
  event: IEvent;
  index: number;
}) => ({
  type: EventsActionTypeEnum.UPDATE_EVENT_BY_INDEX,
  payload,
});

export const updateMultipleChoiceExpandSuccessAction = (payload: number) => ({
  type: EventsActionTypeEnum.UPDATE_EXPAND,
  payload,
});

export const resetData = () => ({
  type: EventsActionTypeEnum.RESET,
});

export const getAllEventAction = (
  params: GetAllEventRequest,
  callback?: () => void,
) => {
  const taskId = EventsActionTypeEnum.GET_ALL_EVENTS;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      if (params.isHot) {
        params.categoryId = undefined;
      } else if (params.categoryId) {
        params.isHot = undefined;
      } else {
        params.isHot = undefined;
        params.categoryId = undefined;
      }
      if (params.orderBy == SortState.BIGGEST_POOL) {
        params.biggestToken = process.env.REACT_APP_EFUN_TOKEN;
      }
      if (!params.loginUserId) {
        params.loginUserId = undefined;
      }
      const data = await eventService.GetAllEvents({
        ...params,
      });
      callback?.();
      dispatch(getEventsSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

const setIntervalCallUpdateStatusEventAPI = async (
  promise: () => Promise<any>,
  times: number,
) => {
  for (let count = 0; count < times; count++) {
    const res = await promise();
    if (
      res.poolTokenClaimAmounts[Object.keys(res.poolTokenClaimAmounts)[0]] !=
        null ||
      res.status == 'FINISH'
    ) {
      return res;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};
export const getEventDetailAfterAction = (
  id: string,
  loginUserId?: string | null,
  callback?: () => void,
) => {
  const taskId = EventsActionTypeEnum.GET_DETAIL_EVENT;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await setIntervalCallUpdateStatusEventAPI(() => {
        return eventService.GetEventDetail(id, loginUserId);
      }, 100);
      dispatch(getEventDetailSuccessAction(data));
      callback && callback();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
export const getEventDetailAction = (
  id: string,
  loginUserId?: string | null,
  callback?: () => void,
) => {
  const taskId = EventsActionTypeEnum.GET_DETAIL_EVENT;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await eventService.GetEventDetail(id, loginUserId);
      dispatch(getEventDetailSuccessAction(data));
      callback && callback();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
export const updateEventViewAction = (id: string, callback?: () => void) => {
  const taskId = EventsActionTypeEnum.UPDATE_EVENT_VIEW;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await eventService.UpdateEventView(id);
      callback && callback();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
export const updateEventByIndexAction = (event: IEvent, index: number) => {
  const taskId = EventsActionTypeEnum.UPDATE_EVENT_BY_INDEX;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      dispatch(
        updateEventByIndexSuccessAction({
          event,
          index,
        }),
      );
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
export const updateEventScoreAction = (
  id: number,
  body: any,
  callback?: () => void,
) => {
  const taskId = EventsActionTypeEnum.UPDATE_EVENT_SCORE;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await eventService.UpdateEventScore(id, body);
      callback && callback();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
export const updateEventStreamUrlAction = (
  id: number,
  streamUrl: string,
  callback?: () => void,
) => {
  const taskId = EventsActionTypeEnum.UPDATE_EVENT_STREAM_URL;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      await eventService.UpdateEventStreamUrl(id, streamUrl);
      callback && callback();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

const generateOptions = (event: HostPredictionState) => {
  switch (event.marketType) {
    case MarketType.MULTIPLE_CHOICES:
      return event.multipleChoices.options.map((o) => o.name);
    case MarketType.TRUE_FALSE:
      return event.trueFalse.options.map((o) => o.name);
    case MarketType.HANDICAP:
      return [
        event.handicap[0].name,
        'Half Win - Half Lose',
        'Draw - Draw',
        'Half Lose - Half Win',
        event.handicap[1].name,
      ];
    case MarketType.HOME_DRAW_AWAY:
      return event.homeDrawAway.map((h) => h.name);
    case MarketType.OVER_UNDER:
      if (event.organizingMethod.eventType == WhoTakeWith.USER_USER) {
        return [
          `<${event.overUnder.totalScore}`,
          `>${event.overUnder.totalScore}`,
        ];
      } else {
        return event.overUnder.totalScores.flatMap((t) => [`<${t}`, `>${t}`]);
      }
  }
};

const generateOdds = (event: HostPredictionState) => {
  const isUserVsUser =
    event.organizingMethod.eventType == WhoTakeWith.USER_USER;
  if (
    event.dataSource === EDataSource.SPORT_DATA_PROVIDER &&
    event.subcategoryName == 'Coin Price'
  ) {
    const rangeCore = [
      ...event.priceRange.map((e) =>
        new Decimal(e)
          .mul(event.marketPriceType == MarketPriceType.PRICE ? 10 ** 8 : 1)
          .toString(),
      ),
    ];
    const range = rangeCore.concat(rangeCore[rangeCore.length - 1]);
    if (event.marketType == MarketType.MULTIPLE_CHOICES) {
      if (isUserVsUser)
        return event.multipleChoices.options.map((_) => '10000').concat(range);
      return event.multipleChoices.options
        .map((o) => new Decimal(o.odd).mul(10000).toString())
        .concat(range);
    }
  }
  switch (event.marketType) {
    case MarketType.MULTIPLE_CHOICES:
      if (isUserVsUser)
        return event.multipleChoices.options.map((_) => '10000');
      return event.multipleChoices.options.map((o) =>
        new Decimal(o.odd).mul(10000).toString(),
      );
    case MarketType.TRUE_FALSE:
      if (isUserVsUser) return event.trueFalse.options.map((_) => '10000');
      return event.trueFalse.options.map((o) =>
        new Decimal(o.odd).mul(10000).toString(),
      );
    case MarketType.HANDICAP:
      if (isUserVsUser) return ['10000', '10000', '10000', '10000', '10000'];
      return [
        new Decimal(+event.handicap[0].odd).mul(10000).toString(),
        new Decimal(+event.handicap[0].odd).mul(10000).toString(),
        '10000',
        new Decimal(+event.handicap[1].odd).mul(10000).toString(),
        new Decimal(+event.handicap[1].odd).mul(10000).toString(),
      ];
    case MarketType.HOME_DRAW_AWAY:
      if (isUserVsUser) return ['10000', '10000', '10000'];
      return event.homeDrawAway.map((h) =>
        new Decimal(+h.odd).mul(10000).toString(),
      );
    case MarketType.OVER_UNDER:
      if (isUserVsUser) {
        return ['10000', '10000'];
      } else {
        return event.overUnder.totalScores.flatMap((_, i) => [
          new Decimal(+event.overUnder.under[i]).mul(10000).toString(),
          new Decimal(+event.overUnder.over[i]).mul(10000).toString(),
        ]);
      }
  }
};

const shouldAutoUpdate = (
  dataSource: EDataSource,
  eventType: WhoTakeWith,
  type: MarketType,
  aggregator: string,
  marketPriceType?: MarketPriceType,
) => {
  if (dataSource == EDataSource.SPORT_DATA_PROVIDER) {
    // market prediction
    if (aggregator != '0x0000000000000000000000000000000000000000') {
      if (marketPriceType == MarketPriceType.PRICE) {
        return 5;
      }
      return 6;
    }
    if (type == MarketType.OVER_UNDER && eventType != WhoTakeWith.USER_USER) {
      return 1;
    }
    if (type == MarketType.HANDICAP) {
      return 2;
    }
    if (type == MarketType.HOME_DRAW_AWAY) {
      return 3;
    }
  }
  return 0;
};

const createEventOnSC = async (
  url: string,
  type: EventType,
  marketType: MarketType,
  odds: string,
  provider: any,
  account: string,
  deadline: Date | null,
  endTime: Date | null,
  betting: {
    token: string;
    liquidityPool: string;
  }[],
  eventType: WhoTakeWith,
  dataSource: EDataSource,
  feeForHost: number,
  aggregator: string,
  isAffiliate: boolean,
  isSport: boolean,
  marketPriceType?: MarketPriceType,
  getState?: () => IStore,
) => {
  if (!getState) return;
  let userBalance = getState().userReducer.userBalance;
  // console.log('userBalance', userBalance);
  const web3 = new Web3(provider || window.ethereum);
  const contract = new web3.eth.Contract(
    predictionABI as any,
    process.env.REACT_APP_PREDICTION,
  );
  let helperAddress: any = '';
  if (type == EventType.GROUP_PREDICT) {
    if (marketType == MarketType.HANDICAP) {
      helperAddress = process.env.REACT_APP_HANDICAP_UVU;
    } else helperAddress = process.env.REACT_APP_GROUP_PREDICT;
  } else if (type == EventType.MULTIPLE_CHOICES) {
    helperAddress = process.env.REACT_APP_MULTIPLE_CHOICES;
  } else {
    if (marketType == MarketType.HANDICAP) {
      helperAddress = process.env.REACT_APP_HANDICAP;
    } else if (marketType == MarketType.OVER_UNDER) {
      helperAddress = process.env.REACT_APP_OVER_UNDER;
    } else {
      helperAddress = process.env.REACT_APP_MULTIPLE_CHOICES;
    }
  }
  let prtToken = process.env.REACT_APP_PRT_TOKEN;
  const bnbIndex = betting.findIndex(
    (b) => b.token == BNB_TOKEN && Number(b.liquidityPool || '0') != 0,
  );
  const prtIndex = betting.findIndex(
    (b) => b.token == prtToken && Number(b.liquidityPool || '0') != 0,
  );
  if (prtIndex >= 0) {
    await checkApproveTx(
      web3,
      account,
      `${20 + (Number(betting[prtIndex]?.liquidityPool) || 0)}`,
      prtToken,
    );
  }
  // const efunIndex = betting.findIndex(
  //   (b) => b.token == efunToken && Number(b.liquidityPool || '0') != 0,
  // );
  // const linkIndex = betting.findIndex(
  //   (b) => b.token == linkToken && Number(b.liquidityPool || '0') != 0,
  // );
  // const xmetaIndex = betting.findIndex(
  //   (b) => b.token == xmetaToken && Number(b.liquidityPool || '0') != 0,
  // );
  // await checkApproveTx(
  //   web3,
  //   account,
  //   `${10000 + (Number(betting[efunIndex]?.liquidityPool) || 0)}`,
  //   efunToken,
  // );
  // if (linkIndex >= 0) {
  //   await checkApproveTx(
  //     web3,
  //     account,
  //     betting[linkIndex].liquidityPool,
  //     linkToken,
  //   );
  // }
  // if (xmetaIndex >= 0) {
  //   await checkApproveTx(
  //     web3,
  //     account,
  //     betting[xmetaIndex].liquidityPool,
  //     xmetaToken,
  //   );
  // }
  console.log(
    'token',
    betting.map((b) => web3.utils.toWei(`${b.liquidityPool || '0'}`, 'ether')),
  );
  const res = await contract.methods
    .createSingleEvent(
      [
        Math.floor(Date.now() / 1000) + 20,
        Math.floor((deadline?.getTime() || 0) / 1000),
        Math.floor((endTime?.getTime() || 0) / 1000),
        shouldAutoUpdate(
          dataSource,
          eventType,
          marketType,
          aggregator,
          marketPriceType,
        ),
        eventType == WhoTakeWith.USER_USER ? feeForHost * 100 : 0,
      ],
      [helperAddress, aggregator, '0x0000000000000000000000000000000000000000'],
      JSON.parse(odds),
      url,
      betting.map((b) => b.token),
      betting.map((b) =>
        web3.utils.toWei(`${b.liquidityPool || '0'}`, 'ether'),
      ),
      isAffiliate,
      isAffiliate && isSport ? 0 : 1,
    )
    .send({
      from: account,
      value: web3.utils.toWei(betting[bnbIndex]?.liquidityPool || '0'),
      gasPrice: web3.utils.toWei('0.1', 'gwei'),
    });
  console.log('res', res);
  return res;
};

export const getImage = async (event: HostPredictionState) => {
  if (event.answerType != AnswerType.WITH_PHOTOS) return;
  let imageFiles: any = {};
  if (event.marketType == MarketType.HANDICAP) {
    let newImageFiles = event.handicap.map((h, i) => h.image);
    imageFiles = {
      0: newImageFiles[0],
      4: newImageFiles[1],
    };
  } else if (event.marketType == MarketType.HOME_DRAW_AWAY) {
    imageFiles = event.homeDrawAway.map((h) => h.image);
    imageFiles = { ...imageFiles };
  } else if (event.marketType == MarketType.MULTIPLE_CHOICES) {
    imageFiles = event.multipleChoices.options.map((h) => h.image);
    imageFiles = { ...imageFiles };
  } else if (event.marketType == MarketType.TRUE_FALSE) {
    imageFiles = event.trueFalse.options.map((h) => h.image);
    imageFiles = { ...imageFiles };
  }
  const response: any = {};
  await Promise.all(
    Object.keys(imageFiles).map(async (i: string) => {
      const image = imageFiles[i];
      if (!image) {
        response[i] = '';
        return;
      }
      const name = image.name;
      const res = await sendFileToIPFS(image);
      response[i] = res;
    }),
  );
  return response;
};

const checkOddChanged = (event: HostPredictionState): boolean => {
  const bets = JSON.parse(event.fixture?.oddMeta || '{}').response?.[0]
    ?.bookmakers[0].bets;
  if (!bets) return false;
  if (event.marketType == MarketType.HOME_DRAW_AWAY) {
    const matchWinner = bets.find((b: any) => b.name == ETypeOdd.MATCH_WINNER);
    const odds = matchWinner.values.map((v: any) => `${v.odd}`);
    const oddsEvent = event.homeDrawAway.map((o) => o.odd);
    return JSON.stringify(odds) != JSON.stringify(oddsEvent);
  } else if (event.marketType == MarketType.HANDICAP) {
    const handicap = bets.find((b: any) => b.name == ETypeOdd.ASIAN_HANDICAP);
    const odds = [`${handicap.values[0].odd}`, `${handicap.values[1].odd}`];
    const oddsEvent = event.handicap.map((o) => o.odd);
    return JSON.stringify(odds) != JSON.stringify(oddsEvent);
  } else if (event.marketType == MarketType.OVER_UNDER) {
    const overUnder = bets.find((b: any) => b.name == ETypeOdd.OVER_UNDER);
    const over = overUnder.values
      .filter((o: string, i: number) => i % 2 == 0)
      .map((o: any) => `${o.odd}`);
    const under = overUnder.values
      .filter((o: string, i: number) => i % 2 == 1)
      .map((o: any) => `${o.odd}`);
    return (
      JSON.stringify(over) != JSON.stringify(event.overUnder.over) ||
      JSON.stringify(under) != JSON.stringify(event.overUnder.under)
    );
  }
  return false;
};
export const publishEvent = (
  account: string,
  provider: any,
  callbackSuccess: (id: string) => void,
  callbackError: () => void,
  callbackWaitForBE?: () => void,
) => {
  const taskId = EventsActionTypeEnum.PUBLISH_NEW_EVENT;
  return async (
    dispatch: DispatchType,
    getState: () => IStore,
  ): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const event = getState().hostPredictionReducer;
      let aggregator = '0x0000000000000000000000000000000000000000';
      if (
        event.dataSource === EDataSource.SPORT_DATA_PROVIDER &&
        event.subcategoryName == 'Coin Price'
      ) {
        const coinName = event.coinSelected?.name || '';
        aggregator = isProd
          ? (MAP_TOKEN_USD_MAINNET as any)[coinName]
          : (MAP_TOKEN_USD_TESTNET as any)[coinName];
      }
      let thumbnailUrl: string | undefined = undefined;
      if (event.thumbnailUrl) {
        thumbnailUrl = await sendFileToIPFS(event.thumbnailUrl);
      }
      let bannerUrl: string | undefined = undefined;
      if (event.eventBanner) {
        bannerUrl = await sendFileToIPFS(event.eventBanner);
      }
      const metadata: any = {
        eventType: event.organizingMethod.eventType,
        tokens:
          event.kindOfEvent == EKindOfEvent.AFFILIATE
            ? [process.env.REACT_APP_EFUN_TOKEN]
            : event.organizingMethod.betting.map((b) => b.token),
        answerType: event.answerType,
        dataSource: event.dataSource,
        shouldAutoUpdate: shouldAutoUpdate(
          event.dataSource,
          event.organizingMethod.eventType,
          event.marketType,
          aggregator,
          event.marketPriceType,
        ),
        fixtureMeta: event.fixture?.meta,
        coinSelected: event.coinSelected,
      };
      const images = await getImage(event);
      metadata.images = images;
      const isUserVsUser =
        event.organizingMethod.eventType == WhoTakeWith.USER_USER;
      if (
        !isUserVsUser &&
        event.dataSource == EDataSource.SPORT_DATA_PROVIDER &&
        event.categoryName == 'Sport'
      ) {
        const hasChanged = checkOddChanged(event);
        metadata.hasChanged = hasChanged;
      }
      const type = isUserVsUser
        ? EventType.GROUP_PREDICT
        : event.marketType == MarketType.MULTIPLE_CHOICES ||
          event.marketType == MarketType.TRUE_FALSE
        ? EventType.MULTIPLE_CHOICES
        : EventType.TEAM_SCORE;
      const options = JSON.stringify(generateOptions(event));
      const odds = JSON.stringify(generateOdds(event));
      if (event.marketType == MarketType.HANDICAP) {
        metadata.handicap = event.handicap.map((h) => h.value);
      }
      const postData: CreateEventBody = {
        name: event.eventName || '',
        thumbnailUrl: thumbnailUrl || '',
        bannerUrl: bannerUrl || '',
        categoryId: event.category?.toString() || '',
        subCategoryId: event.subcategory?.toString() || '',
        competitionId: event.competition || '',
        type,
        marketType: event.marketType,
        description: event.description || 'description',
        metadata: JSON.stringify(metadata),
        shortDescription: event.shortDescription || '',
        streamUrl: event.lockEmbeddedLink ? '' : event.review.streamLink,
        options,
        fixtureId: event.fixtureId ? `${event.fixtureId}` : '',
        leagueId: event.league || '',
      };
      const resultUrl = await sendJsonToIPFS(
        new Blob([JSON.stringify(postData)]),
      );
      const newEvent = await createEventOnSC(
        resultUrl,
        type,
        event.marketType,
        odds,
        provider,
        account,
        event.deadline,
        event.endTime,
        event.organizingMethod.betting,
        event.organizingMethod.eventType,
        event.dataSource,
        event.feeForHost || 0,
        aggregator,
        event.kindOfEvent == EKindOfEvent.AFFILIATE,
        event.categoryName == 'Sport',
        event.marketPriceType,
        getState,
      );
      callbackWaitForBE?.();
      const eventId = newEvent.events.EventCreated.returnValues[0];
      await setIntervalCallAPI(() => {
        return eventService.GetEventDetail(eventId);
      }, 100);
      if (event.streamUrl)
        await eventService.UpdateEventStreamUrl(eventId, event.streamUrl);
      dispatch(getUserBalance(provider, account));
      callbackSuccess(eventId);
      dispatch(asyncTaskStopAction(taskId));
    } catch (error: any) {
      console.log(error);
      callbackError();
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

const setIntervalCallUpdateResultEventAPI = async (
  promise: () => Promise<any>,
  times: number,
) => {
  for (let count = 0; count < times; count++) {
    const res = await promise();
    if (res.resultProofUrl != null && res.result != null) {
      return res;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};
export const updateEventProof = (
  id: number,
  proof: File,
  callback?: () => void,
) => {
  const taskId = EventsActionTypeEnum.UPDATE_EVENT_PROOF;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const proofUrl = await sendFileToIPFS(proof);
      const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
      await eventService.UpdateProofEvent(id, proofUrl, 'file');
      await setIntervalCallUpdateResultEventAPI(() => {
        return eventService.GetEventDetail(`${id}`, userId);
      }, 100);
      callback && callback();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const updateEventProofWithLink = (
  id: number,
  proof: string,
  callback?: () => void,
) => {
  const taskId = EventsActionTypeEnum.UPDATE_EVENT_PROOF;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
      await eventService.UpdateProofEvent(id, proof, 'link');
      await setIntervalCallUpdateResultEventAPI(() => {
        return eventService.GetEventDetail(`${id}`, userId);
      }, 100);
      callback && callback();
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
const setIntervalCallUpdateEventAPI = async (
  promise: () => Promise<any>,
  times: number,
  condition?: string,
) => {
  for (let count = 0; count < times; count++) {
    const res = await promise();
    if (JSON.stringify(res.predictionTokenAmounts) != condition) {
      return res;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};

export const updateEventAfterPredictSuccess = (
  id: number,
  loginUserId: string,
  condition?: string,
  callback?: () => void,
) => {
  return async (
    dispatch: DispatchType,
    getState: () => IStore,
  ): Promise<void> => {
    try {
      let data = await setIntervalCallUpdateEventAPI(
        () => {
          return eventService.GetEventDetail(`${id}`, loginUserId);
        },
        100,
        condition,
      );
      const pathname = location.pathname;
      if (
        (pathname.startsWith('/detail-event') &&
          pathname.replace('/detail-event/', '') == `${id}`) ||
        pathname.includes('widget') ||
        pathname.includes('/world-cup') ||
        pathname.includes('/groups')
      ) {
        dispatch(getEventDetailSuccessAction(data));
      }
      dispatch(updateEventSuccessAction(data));
      callback && callback();
    } catch (e) {
      console.log(e);
    }
  };
};
export const blockEvent = (id: number, callback?: () => void) => {
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      await eventService.BlockEvent(id);
      const data = await eventService.GetEventDetail(`${id}`);
      dispatch(updateEventSuccessAction(data));
      callback?.();
    } catch (e) {
      callback?.();
    }
  };
};

export const unlockEvent = (id: number, callback?: () => void) => {
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      await eventService.UnLockEvent(id);
      const data = await eventService.GetEventDetail(`${id}`);
      dispatch(updateEventSuccessAction(data));
      callback?.();
    } catch (e) {
      callback?.();
    }
  };
};

export const updateSingleEvent = (data: IEvent) => {
  return async (dispatch: DispatchType): Promise<void> => {
    dispatch(updateEventSuccessAction(data));
  };
};

export const updateMultipleChoiceExpand = (data: number) => {
  return async (dispatch: DispatchType): Promise<void> => {
    dispatch(updateMultipleChoiceExpandSuccessAction(data));
  };
};
