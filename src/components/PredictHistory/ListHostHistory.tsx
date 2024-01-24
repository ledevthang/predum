// @ts-nocheck
import { Box, useMediaQuery } from '@material-ui/core';
import { GUTTER_SIZE } from 'common';
import { LocalStorageEnum } from 'enums/auth';
import { hasMoreFn, isOver48hEndTime, isOverEndTime } from 'helpers';
import { debounce, isUndefined } from 'lodash';
import theme from 'material';
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
import {
  getAllEventAction,
  getEventDetailAfterAction,
  resetData,
} from 'store/actions/eventActions';
import {
  getAppState,
  getEventDetail,
  getEvents,
  getHostHistoryData,
  getPaginationEvent,
} from 'store/selectors';
import HostHistoryItem from './HostHistoryItem';
import localStorageUtils from 'utils/LocalStorage';
import { IEvent, SortState } from 'types/event';
import { useWeb3React } from '@web3-react/core';
import { AnswerType, MarketType, WhoTakeWith } from 'types/hostPrediction';
import { WindowScroller } from 'react-virtualized';

const ListHostHistory = () => {
  const eventPagination = useSelector(getPaginationEvent);
  const events = useSelector(getEvents);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { account } = useWeb3React();
  const { loginProcess } = useSelector(getAppState);

  const dispatch = useDispatch();
  const listRef = useRef<any>();
  const infiniteLoaderRef = useRef<any>();
  const event = useSelector(getEventDetail);
  const [isLoading, setIsLoading] = useState(true);
  const hostHistories = useSelector(getHostHistoryData);
  const getHistoryByUserId = useCallback(() => {
    const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
    dispatch(
      getAllEventAction(
        {
          pageNumber: 1,
          pageSize: 20,
          userId: Number(userId),
          orderBy: SortState.LATEST,
          loginUserId: userId,
        },
        () => {
          setIsLoading(false);
        },
      ),
    );
  }, [dispatch]);
  useEffect(() => {
    getHistoryByUserId();
  }, []);

  const reloadHostEventData = (id: number, callback?: () => void) => {
    const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
    dispatch(
      getEventDetailAfterAction(`${id}`, userId, () => {
        callback && callback();
      }),
    );
  };

  useEffect(() => {
    if (event) {
      let listEvent = itemData.listEvent;
      let index = listEvent.findIndex((obj: any) => obj.id == event.id);
      listEvent[index] = event;
      itemData.listEvent = listEvent;
    }
  }, [event]);
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
  }, [hasMore, events.length]);

  const loadMoreEvent = useCallback(() => {
    const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
    dispatch(
      getAllEventAction({
        pageNumber: eventPagination.pageNumber + 1,
        pageSize: eventPagination.pageSize,
        userId: Number(userId),
        orderBy: SortState.LATEST,
        loginUserId: userId,
      }),
    );
  }, [dispatch, eventPagination.pageNumber, eventPagination.pageSize]);

  const itemData = useMemo(
    () =>
      memoize((items) => ({
        listEvent: items,
      }))(events),
    [events],
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

  useEffect(() => {
    if (!account || loginProcess) return;
    const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
    dispatch(
      getAllEventAction({
        pageNumber: 1,
        pageSize: 20,
        userId: Number(userId),
        orderBy: SortState.LATEST,
        loginUserId: userId,
      }),
    );
  }, [
    account,
    loginProcess,
    localStorageUtils.getItem(LocalStorageEnum.USER_ID),
  ]);
  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  }, [events]);

  const Row = useCallback(
    ({ index, style, data, forwardRef }: any) => {
      const { listEvent } = data;
      if (listEvent.length == 0) {
        return (
          <div
            ref={forwardRef}
            style={{
              ...style,
              fontSize: 20,
              textAlign: 'center',
            }}
          >
            No result found
          </div>
        );
      }
      return (
        <div
          ref={forwardRef}
          style={{
            ...style,
          }}
        >
          {!isLoading && (
            <HostHistoryItem
              host={listEvent[index]}
              reloadHostEventData={reloadHostEventData}
            />
          )}
        </div>
      );
    },
    [isLoading],
  );

  const getEventStatus = useCallback(
    (event: IEvent) => {
      if (!event) return;
      let stringEndtime = `${event.endTime}`;
      let endTime = new Date(stringEndtime).getTime();
      let now = new Date().getTime();
      if (now < endTime) {
        return 'on going';
      } else {
        let difference = now - endTime;
        if (event.result || difference > 48 * 3600 * 1000) {
          return 'ended';
        } else return 'pending result';
      }
    },
    [event],
  );
  const getSize = useCallback(
    (index: number) => {
      const event = events[index];
      if (!event) return 0;
      const eventStatus = getEventStatus(event);
      const shouldShowExpand = !isUndefined(event.isExpand);
      const isExpand = event.isExpand;
      const { answerType, shouldAutoUpdate } = JSON.parse(
        event.metadata || '{}',
      ) as {
        answerType: AnswerType;
        shouldAutoUpdate: boolean;
      };
      const OUUU = event.marketType == MarketType.OVER_UNDER;
      const isOnlyText = OUUU || answerType != AnswerType.WITH_PHOTOS;
      const heightOfItem = isOnlyText ? 54 : 100;
      let extra = 0;
      const { eventType } = JSON.parse(event.metadata || '{}');
      if (shouldShowExpand) {
        if (isExpand) {
          extra = ((event.maxRow || 1) - 1) * (heightOfItem + 12) + 44;
        } else {
          extra = 44;
        }
      }
      let shouldShowInput = false;
      // header + marginTop
      const header = isMobile ? 52 : 37;
      const title = 38;
      const name = 16;
      const time = isMobile ? 54 : 30;
      const text = 24;
      let main = 0;
      let proof = 0;
      let bottom = 0;
      const padding = 32;
      const statistic = isMobile ? 178 : 262;
      const extraChainLink = shouldAutoUpdate ? 34 : 0;
      let autoUpdateText = 0;
      if (event.pro != 0 && isOverEndTime(event.endTime)) {
        if (!isOnlyText) autoUpdateText = 20;
        if (isOnlyText && isMobile) autoUpdateText = 25;
      }
      if (
        event.marketType == MarketType.MULTIPLE_CHOICES ||
        event.marketType == MarketType.TRUE_FALSE
      ) {
        main = isOnlyText ? 110 : 136;
      } else if (event.marketType == MarketType.HANDICAP) {
        shouldShowInput =
          isOverEndTime(event.endTime) &&
          (event.scoreOne != null || isOver48hEndTime(event) != 'ended');
        main = isOnlyText ? 90 : 136;
      } else if (event.marketType == MarketType.OVER_UNDER) {
        shouldShowInput =
          isOverEndTime(event.endTime) &&
          (event.totalScore != null || isOver48hEndTime(event) != 'ended');
        if (eventType != WhoTakeWith.USER_USER) {
          main = 96;
        } else {
          main = 90;
        }
      } else {
        const extraMobile = isMobile ? heightOfItem + 12 : 0;
        shouldShowInput =
          isOverEndTime(event.endTime) &&
          (event.scoreOne != null || isOver48hEndTime(event) != 'ended');
        main =
          (isOnlyText ? 90 : 136) +
          extraMobile +
          (shouldShowInput && isMobile ? 44 : 0);
      }

      let input = shouldShowInput ? 44 : 0;
      if (eventStatus != 'on going') {
        bottom = 68;
      }

      const shouldShowProof =
        (event.result == null &&
          event.pro == 0 &&
          isOverEndTime(event.endTime) &&
          isOver48hEndTime(event) != 'ended') ||
        (event.result != null &&
          event.pro == 0 &&
          isOverEndTime(event.endTime));
      if (shouldShowProof) {
        proof = isMobile ? 85 : 90;
      }
      const wrapperMain = Math.max(
        title + name + time + text + main + proof + extra + input + 8,
        statistic,
      );
      const totalDesktop =
        header +
        wrapperMain +
        bottom +
        padding +
        autoUpdateText +
        extraChainLink +
        GUTTER_SIZE;
      const totalMobile =
        header +
        title +
        name +
        time +
        text +
        main +
        proof +
        extra +
        autoUpdateText +
        statistic +
        bottom +
        padding +
        input +
        extraChainLink +
        GUTTER_SIZE;
      return isMobile ? totalMobile : totalDesktop;
    },
    [isMobile, events, GUTTER_SIZE],
  );

  useEffect(() => {
    listRef.current.resetAfterIndex(0);
  }, [isMobile]);

  const handleScroll = ({ scrollTop }) => {
    if (listRef.current) {
      listRef.current.scrollTo(scrollTop);
    }
  };

  return (
    <Box
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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
            itemData={itemData}
            onItemsRendered={onItemsRendered}
            width={'100%'}
            itemSize={getSize}
            style={{
              height: '100% !important',
              maxWidth: '1080px',
              overflow: 'unset',
            }}
          >
            {Row}
          </VariableSizeList>
        )}
      </InfiniteLoader>
    </Box>
  );
};

export default ListHostHistory;
