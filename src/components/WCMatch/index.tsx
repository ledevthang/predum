import { Box } from '@material-ui/core';
import { hasMoreFn } from 'helpers';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { isProd } from 'services/wallet';
import { getAllFixturesInfiniteAction } from 'store/actions/fixtureActions';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import {
  getFixturePaginationState,
  getFixtureState,
  getOrganizingMethod,
} from 'store/selectors';
import { IFixture } from 'types/fixture';
import { WhoTakeWith } from 'types/hostPrediction';
import { EKindOfEvent } from 'types/proEvent';
import { useStyles } from './styles';
import WCHeader from './WCHeader';
import WCMatchItem from './WCMatchItem';

const WCMatch = () => {
  const classes = useStyles();
  const fixtures = useSelector(getFixtureState);
  const fixturePagination = useSelector(getFixturePaginationState);
  const dispatch = useDispatch();
  const [listMatchOdd, setListMatchOdd] = useState<IFixture[]>([]);
  const organizingMethod = useSelector(getOrganizingMethod);
  const hasMore = useMemo(() => {
    return hasMoreFn(fixturePagination);
  }, [fixturePagination]);
  useEffect(() => {
    if (!fixtures) return;
    let tmp = fixtures.filter((p) => {
      if (p == undefined) return false;
      if (p.oddMeta == undefined) return false;
      return JSON.parse(p.oddMeta).results > 0;
    });
    setListMatchOdd(tmp);
  }, [JSON.stringify(fixtures)]);
  useEffect(() => {
    dispatch(
      updateHostPredictionStateAction({
        kindOfEvent: EKindOfEvent.AFFILIATE,
        organizingMethod: {
          ...organizingMethod,
          eventType: WhoTakeWith.AFFILIATE,
        },
      }),
    );
  }, []);
  const getMoreData = useCallback(() => {
    setTimeout(() => {
      dispatch(
        getAllFixturesInfiniteAction({
          pageNumber: fixturePagination.pageNumber + 1,
          pageSize: fixturePagination.pageSize,
          leagueId: isProd ? '18' : '17',
          notFinised: true,
        }),
      );
    }, 500);
  }, [fixturePagination]);
  useEffect(() => {
    dispatch(
      getAllFixturesInfiniteAction({
        pageNumber: 1,
        pageSize: 8,
        leagueId: isProd ? '18' : '17',
        notFinised: true,
      }),
    );
  }, []);

  return (
    <Box className={classes.container}>
      <WCHeader />
      <InfiniteScroll
        dataLength={listMatchOdd.length}
        next={getMoreData}
        hasMore={hasMore}
        height={520}
        loader={<p></p>}
        className={classes.wrapperMatches}
      >
        {listMatchOdd.map((e) => (
          <WCMatchItem key={Math.random()} item={e} list={listMatchOdd} />
        ))}
      </InfiniteScroll>
    </Box>
  );
};
export default WCMatch;
