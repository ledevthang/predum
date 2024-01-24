// @ts-nocheck
import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { LocalStorageEnum } from 'enums/auth';
import { hasMoreFn } from 'helpers';
import { debounce, isUndefined } from 'lodash';
import memoize from 'memoize-one';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VariableSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { getAllEventAction, resetData } from 'store/actions/eventActions';
import {
  getEvents,
  getFilterState,
  getHostState,
  getPaginationEvent,
  getUserState,
} from 'store/selectors';
import { GetAllEventRequest, IEvent } from 'types/event';

import { AnswerType, MarketType, WhoTakeWith } from 'types/hostPrediction';
import EventItem from './EventItem';
import localStorageUtils from 'utils/LocalStorage';

import { WindowScroller } from 'react-virtualized';
import { useWeb3React } from '@web3-react/core';
import ProEventItem from 'components/ProEventItem';

const Event = () => {
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const dispatch = useDispatch();
  const listRef = useRef<any>();
  const infiniteLoaderRef = useRef<any>();
  const [isLoading, setIsLoading] = useState(false);
  const events = useSelector(getEvents);
  const eventPagination = useSelector(getPaginationEvent);
  const filter = useSelector(getFilterState);
  const { active } = useWeb3React();
  const hasMountedRef = useRef(false);
  const hostState = useSelector(getHostState);
  const [timerDispatch, setTimerDispatch] = useState<any>();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.up('md')) && !isDesktop;
  const user = useSelector(getUserState);

  const hasMore = useMemo(() => {
    return hasMoreFn(eventPagination);
  }, [eventPagination]);

  const isItemLoaded = useCallback(
    (index: number) => {
      return !hasMore || index < events.length;
    },
    [hasMore, events.length],
  );
  const itemCount = useMemo(() => {
    if (events.length == 0) return 1;
    return hasMore ? events.length + 1 : events.length;
  }, [hasMore, events.length, events]);

  const loadMoreEvent = useCallback(() => {
    const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
    let params: GetAllEventRequest = {
      pageNumber: eventPagination.pageNumber + 1,
      pageSize: eventPagination.pageSize,
      orderBy: filter.sort,
      isHot: filter.isHot,
      categoryId: filter.categoryId,
      // userId: filter.userId,
      subCategoryId: filter.subCategoryId,
      // competitionId: filter.competitionId,
      tokenIds: filter.tokenIds,
      eventTypes: filter.eventTypes,
      listingStatuses: filter.listingStatuses,
      search: filter.search,
      homeList: true,
      shouldGetUniqueFixture: true,
      orderProEvent: true,
      // homeListTime: filter.sort == SortState.BIGGEST_POOL ? false : true,
      // outOfTime: filter.outOfTime,
      // outOfEndTime7day: true,
    };
    if (!window.location.pathname.includes('host-info')) {
      params.outOfTime = filter.outOfTime;
      // params.outOfEndTime7day = true;
      if (!filter.listingStatuses?.includes('All')) {
        params.outOfEndTime30day = true;
        // params.outOfEndTime7day = true;
      }
      params.loginUserId = userId;
    }
    if (window.location.pathname != '/') {
      params.userId = filter.userId;
    }
    dispatch(getAllEventAction(params));
  }, [
    dispatch,
    eventPagination.pageNumber,
    eventPagination.pageSize,
    filter,
    events,
    active,
  ]);

  const resetListGroup = () => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  };
  const Row = useCallback(
    ({ index, style, data }: any) => {
      const { listEvent } = data;
      if (isLoading) {
        return (
          <div
            style={{
              ...style,
              fontSize: 20,
              textAlign: 'center',
            }}
          >
            Loading....
          </div>
        );
      }

      if (listEvent.length == 0) {
        return (
          <div
            style={{
              ...style,
            }}
          >
            <EventItem event={listEvent[index]} isHome />
          </div>
        );
      }
      if (!listEvent[index]) {
        return (
          <div
            style={{
              ...style,
            }}
          ></div>
        );
      }
      return (
        <div
          style={{
            ...style,
          }}
        >
          {isProUvP(listEvent[index]) ? (
            <ProEventItem
              event={listEvent[index]}
              resetListGroup={resetListGroup}
            />
          ) : (
            <EventItem event={listEvent[index]} isHome />
          )}
          {/* <EventItem event={listEvent[index]} isHome /> */}
        </div>
      );
    },
    [isLoading, resetListGroup],
  );
  const isProUvP = (event: IEvent) => {
    return event?.pro != 0 && JSON.parse(event?.metadata || '{}').fixtureMeta;
  };
  const getSize = useCallback(
    (index: number) => {
      const event = events[index];
      if (!event) return 0;
      const {
        eventType: type,
        answerType,
        shouldAutoUpdate,
      } = JSON.parse(event.metadata || '{}') as {
        eventType: WhoTakeWith;
        answerType: AnswerType;
        shouldAutoUpdate: boolean;
      };
      const OUUP =
        event.marketType == MarketType.OVER_UNDER &&
        type != WhoTakeWith.USER_USER;
      const OUUU = event.marketType == MarketType.OVER_UNDER;
      const HDC = event.marketType == MarketType.HANDICAP;
      const shouldShowExpand = !isUndefined(event.isExpand);
      const isExpand = event.isExpand;
      const numberOfToken = Object.values(event.poolTokenAmounts).filter(
        (p) => !!p,
      ).length;
      const isHomeDrawAway = event.marketType == MarketType.HOME_DRAW_AWAY;
      const isAffiliate = type == WhoTakeWith.AFFILIATE;
      const extraTokenMobile = numberOfToken > 1 ? (numberOfToken - 1) * 17 : 0;
      const isOnlyText = answerType != AnswerType.WITH_PHOTOS || OUUU;
      const heightOfItem = isOnlyText ? 54 : 100;
      const heightOfChainLink = shouldAutoUpdate ? 24 : 0;
      const isHasRelated =
        event?.relatedEvents &&
        event?.relatedEvents != 0 &&
        event?.relatedEvents != 1;
      if (isProUvP(event)) {
        let sumPool = 0;
        const countPoolToken = Object.keys(event.poolTokenAmounts).length;
        const countPredictToken = Object.keys(
          event.predictionTokenAmounts,
        ).length;
        if (countPoolToken > 2) sumPool += 24 * (countPoolToken - 2);
        if (countPredictToken > 2) sumPool += 24 * (countPredictToken - 2);
        if (!isMobile) {
          const mainBody = () => {
            if (OUUP) return 460;
            if (!isOnlyText) return 483;
            // if (HDC) return 455;
            return 456;
          };
          return isHasRelated
            ? mainBody() + 20 + sumPool
            : mainBody() - 64 + 20 + +sumPool;
        } else {
          const mainBody = () => {
            if (HDC) return 570;
            // if (isAffiliate) return 630;
            if (OUUP) return 575;
            if (!isOnlyText) return 733;
            return 560;
          };
          let sumPoolMobile = 0;
          if (countPoolToken > 1) sumPoolMobile += (countPoolToken - 1) * 24;
          if (countPredictToken > 1)
            sumPoolMobile += (countPredictToken - 1) * 24;
          return isHasRelated
            ? mainBody() + sumPoolMobile
            : mainBody() - 60 + sumPoolMobile;
        }
      }
      if (isDesktop) {
        const defaultValue = isOnlyText ? 362 : 408;
        // defaultValue = isProUvP(event) ? defaultValue - 20 : defaultValue;
        if (OUUP) {
          return 440 + heightOfChainLink;
        }
        if (shouldShowExpand) {
          if (isExpand) {
            return (
              defaultValue +
              44 +
              ((event.maxRow || 1) - 1) * (heightOfItem + 12) +
              heightOfChainLink
            );
          } else {
            return defaultValue + 44 + heightOfChainLink;
          }
        }
        return defaultValue + heightOfChainLink;
      } else if (isTablet) {
        const defaultValue = isOnlyText ? 347 : 393;
        if (OUUP) {
          return 425 + extraTokenMobile + heightOfChainLink;
        }
        if (shouldShowExpand) {
          if (isExpand) {
            return (
              defaultValue +
              44 +
              ((event.maxRow || 1) - 1) * ((isOnlyText ? 54 : 100) + 12) +
              extraTokenMobile +
              heightOfChainLink
            );
          } else {
            return defaultValue + 44 + extraTokenMobile + heightOfChainLink;
          }
        }
        return defaultValue + extraTokenMobile + heightOfChainLink;
      }
      const defaultValue = isOnlyText ? 394 : 440;
      if (OUUP) {
        return 470 + extraTokenMobile + heightOfChainLink;
      }
      if (shouldShowExpand) {
        if (isExpand) {
          return (
            defaultValue +
            44 +
            ((event.maxRow || 1) - 1) * ((isOnlyText ? 54 : 100) + 12) +
            extraTokenMobile +
            heightOfChainLink
          );
        } else {
          return defaultValue + 44 + extraTokenMobile + heightOfChainLink;
        }
      }
      if (isHomeDrawAway) {
        return (
          defaultValue +
          extraTokenMobile +
          (heightOfItem + 12) +
          heightOfChainLink -
          63
        );
      }
      return defaultValue + extraTokenMobile + heightOfChainLink;
    },
    [events, isDesktop, isTablet, isMobile],
  );

  const updateDimension = useCallback(() => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, []);

  useEffect(() => {
    updateDimension();
    const debouncedHandleResize = debounce(function handleResize() {
      updateDimension();
    }, 1000);
    window.scrollTo(0, 0);
    if (infiniteLoaderRef.current) {
      infiniteLoaderRef.current.resetloadMoreItemsCache();
    }
    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      dispatch(resetData());
    };
  }, []);

  const refreshEventList = useCallback(() => {
    setIsLoading(true);
    const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
    // window.scrollTo(0, 0);
    if (hasMountedRef.current) {
      if (infiniteLoaderRef.current) {
        infiniteLoaderRef.current.resetloadMoreItemsCache();
      }
    }
    hasMountedRef.current = true;
    let params: GetAllEventRequest = {
      pageNumber: 1,
      pageSize: 20,
      orderBy: filter.sort,
      isHot: filter.isHot,
      categoryId: filter.categoryId,
      subCategoryId: filter.subCategoryId,
      // userId: filter.userId,
      // competitionId: filter.competitionId,
      search: filter.search,
      tokenIds: filter.tokenIds,
      listingStatuses: filter.listingStatuses,
      eventTypes: filter.eventTypes,
      shouldGetUniqueFixture: true,
      orderProEvent: true,
      // outOfTime: filter.outOfTime,
      homeList: true,
      // homeListTime: filter.sort == SortState.BIGGEST_POOL ? false : true,
      // outOfEndTime7day: true,
    };
    if (!window.location.pathname.includes('host-info')) {
      params.outOfTime = filter.outOfTime;
      if (!filter.listingStatuses?.includes('All')) {
        params.outOfEndTime30day = true;
        // params.outOfEndTime7day = true;
      }
      params.loginUserId = userId;
    } else {
      if (filter.isHotInfo) params.outOfTime = filter.isHotInfo;
      else {
        delete params.outOfTime;
      }
    }
    if (window.location.pathname != '/' && hostState.id) {
      params.userId = hostState.id;
    }
    let timer = setTimeout(() => {
      dispatch(
        getAllEventAction(params, () => {
          setIsLoading(false);
        }),
      );
    }, 1000);
    setTimerDispatch(timer);
  }, [
    infiniteLoaderRef.current,
    timerDispatch,
    dispatch,
    filter,
    active,
    events,
    hostState.id,
  ]);
  useEffect(() => {
    clearTimeout(timerDispatch);
    refreshEventList();
    window.scrollTo({
      top: 0,
    });
  }, [filter, hostState.id, user.id, isDesktop]);

  const itemData = useMemo(
    () =>
      memoize((items) => ({
        listEvent: items,
      }))(events),
    [events],
  );

  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  }, [events]);

  const handleScroll = ({ scrollTop }) => {
    if (listRef.current) {
      listRef.current.scrollTo(scrollTop);
    }
  };

  if (events.length == 0) {
    return (
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '20px 0px',
          minHeight: '500px',
        }}
      >
        <Typography
          style={{
            fontSize: 18,
            fontWeight: 400,
            color: '#BDBDBD',
          }}
        >
          No result found
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {/* <ListingProEvent /> */}
      <WindowScroller onScroll={handleScroll}>{() => <div />}</WindowScroller>
      <InfiniteLoader
        ref={infiniteLoaderRef}
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreEvent}
      >
        {({ onItemsRendered, ref }) => (
          <VariableSizeList
            height={window.innerHeight}
            ref={(listRef1: any) => {
              ref(listRef1);
              listRef.current = listRef1;
            }}
            itemCount={itemCount}
            itemSize={getSize}
            itemData={itemData}
            onItemsRendered={onItemsRendered}
            width={'100%'}
            style={{
              height: '100% !important',
              overflow: 'unset',
            }}
          >
            {Row}
          </VariableSizeList>
        )}
      </InfiniteLoader>
    </>
  );
};

export default Event;
