// @ts-nocheck
import { useMediaQuery } from '@material-ui/core';
import { GUTTER_SIZE } from 'common';
import { LocalStorageEnum } from 'enums/auth';
import { hasMoreFn } from 'helpers';
import { debounce } from 'lodash';
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
  getEventDetailAction,
  resetData,
} from 'store/actions/eventActions';
import {
  getAppState,
  getEventDetail,
  getEvents,
  getHostHistoryData,
  getPaginationEvent,
} from 'store/selectors';
import localStorageUtils from 'utils/LocalStorage';
import { SortState } from 'types/event';
import { useWeb3React } from '@web3-react/core';
import { ProHostHistoryItem } from './ProHostHistoryItem';
import { WindowScroller } from 'react-virtualized';

const ListProHostHistory = () => {
  const { ReactWindowScroller } = require('react-window-scroller');
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
  const hostHistories = useSelector(getHostHistoryData);
  const getHistoryByUserId = useCallback(() => {
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
  }, [dispatch]);
  useEffect(() => {
    getHistoryByUserId();
  }, []);
  const reloadHostEventData = (id: number) => {
    const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
    dispatch(getEventDetailAction(`${id}`, userId, () => {}));
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
    return hasMore ? events.length + 2 : events.length;
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
  }, [account, loginProcess]);

  const Row = useCallback(({ index, style, data, forwardRef }: any) => {
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
        <ProHostHistoryItem
          host={listEvent[index]}
          reloadHostEventData={reloadHostEventData}
        />
      </div>
    );
  }, []);

  const itemSize = useCallback(() => {
    return isMobile ? 320 + GUTTER_SIZE : 220 + GUTTER_SIZE;
  }, [isMobile]);

  useEffect(() => {
    listRef.current.resetAfterIndex(0);
  }, [isMobile]);

  const handleScroll = ({ scrollTop }) => {
    if (listRef.current) {
      listRef.current.scrollTo(scrollTop);
    }
  };

  return (
    <>
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
            itemSize={itemSize}
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

export default ListProHostHistory;
