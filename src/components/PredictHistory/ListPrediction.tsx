// @ts-nocheck
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { debounce } from 'lodash';
// @ts-nocheck
import React, { memo } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WindowScroller } from 'react-virtualized';
// import { VariableSizeList } from 'react-virtualized';
import { VariableSizeList } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import { GUTTER_SIZE } from 'common';
import { hasMoreFn } from 'helpers';
import {
  getAllPredictionAction,
  resetPrediction,
} from 'store/actions/predictionActions';
import {
  getAppState,
  getCurrentUserState,
  getPredictionPagination,
  getPredictionsData,
} from 'store/selectors';
import { AnswerType } from 'types/hostPrediction';

import PredictionItem from './PredictionItem';

const ListPrediction = () => {
  const { ReactWindowScroller } = require('react-window-scroller');
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const dispatch = useDispatch();
  const listRef = useRef<any>();
  const infiniteLoaderRef = useRef<any>();
  const predictions = useSelector(getPredictionsData);
  const predictionPagination = useSelector(getPredictionPagination);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { account } = useWeb3React();
  const { loginProcess } = useSelector(getAppState);
  const user = useSelector(getCurrentUserState);

  const hasMore = useMemo(() => {
    return hasMoreFn(predictionPagination);
  }, [predictionPagination]);

  const isItemLoaded = useCallback(
    (index: number) => {
      return !hasMore || index < predictions.length;
    },
    [hasMore, predictions.length],
  );

  const itemCount = useMemo(() => {
    if (predictions.length == 0) return 1;
    return hasMore ? predictions.length + 2 : predictions.length;
  }, [hasMore, predictions.length]);

  const loadMoreEvent = useCallback(() => {
    dispatch(
      getAllPredictionAction({
        pageNumber: predictionPagination.pageNumber + 1,
        pageSize: predictionPagination.pageSize,
        orderBy: 'latest',
        userId: user.id,
      }),
    );
  }, [
    dispatch,
    predictionPagination.pageNumber,
    predictionPagination.pageSize,
    user,
  ]);

  const itemData = useMemo(
    () => ({
      listPrediction: predictions.map((p) => p.id),
    }),
    [predictions],
  );

  const updateDimension = useCallback(() => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, []);

  useEffect(() => {
    updateDimension();
    window.scrollTo(0, 0);
    const debouncedHandleResize = debounce(function handleResize() {
      updateDimension();
    }, 1000);
    if (infiniteLoaderRef.current) {
      infiniteLoaderRef.current.resetloadMoreItemsCache();
    }
    window.addEventListener('resize', debouncedHandleResize);

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      dispatch(resetPrediction());
    };
  }, []);

  useEffect(() => {
    if (!account || loginProcess) return;
    dispatch(
      getAllPredictionAction({
        pageNumber: 1,
        pageSize: 20,
        orderBy: 'latest',
        userId: user.id,
      }),
    );
  }, [account, loginProcess, user]);

  const Row = useCallback(({ index, style, data }: any) => {
    const { listPrediction } = data;
    if (listPrediction.length == 0) {
      return (
        <div
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
        style={{
          ...style,
        }}
      >
        {listPrediction[index] && (
          <PredictionItem predictionId={listPrediction[index]} />
        )}
      </div>
    );
  }, []);

  const itemSize = useCallback(
    (index: number) => {
      const p = predictions[index];
      if (!p) return 0;
      const metadata = JSON.parse(p.metadata || '{}');
      const extra = metadata.answerType != AnswerType.WITH_PHOTOS ? 0 : 46;
      const name = 24;
      const extraChainLink = metadata.shouldAutoUpdate ? 24 : 0;
      if (!isMobile) return 284 + extra + GUTTER_SIZE + name;
      return 282 + extra + GUTTER_SIZE + name;
    },
    [isMobile, predictions],
  );

  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0);
    }
  }, [predictions]);

  const handleScroll = ({ scrollTop }: any) => {
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

export default memo(ListPrediction);
