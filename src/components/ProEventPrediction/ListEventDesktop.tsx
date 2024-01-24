import React, { useRef } from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import {
  convertTime,
  hasMoreFn,
  isDisabledProEvent,
  renderLeagueName,
  renderMathName,
} from 'helpers';
import { useCallback, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { getAllFixturesAction } from 'store/actions/fixtureActions';
import {
  getEventType,
  getFixturePaginationState,
  getFixtureState,
  getSelectEventState,
} from 'store/selectors';
import { useStyles } from './SelectEventStyles';
import { WhoTakeWith } from 'types/hostPrediction';

interface IProps {}

const ListEventDesktop = () => {
  const classes = useStyles();

  const fixtures = useSelector(getFixtureState);
  const fixturePagination = useSelector(getFixturePaginationState);
  const selectEventState = useSelector(getSelectEventState);
  const shouldGetData = useRef<boolean>(true);
  const eventType = useSelector(getEventType);

  const dispatch = useDispatch();

  const hasMore = useMemo(() => {
    return hasMoreFn(fixturePagination);
  }, [fixturePagination]);

  const isUvP = useMemo(() => {
    return eventType != WhoTakeWith.USER_USER;
  }, [eventType]);

  const getMoreData = useCallback(() => {
    dispatch(
      getAllFixturesAction({
        pageNumber: fixturePagination.pageNumber + 1,
        pageSize: fixturePagination.pageSize,
        leagueId: selectEventState.leagueSelected || '',
        notFinised: true,
      }),
    );
  }, [fixturePagination, selectEventState.leagueSelected, isUvP]);

  const onSelectFixture = useCallback(
    (id: number) => {
      dispatch(
        updateHostPredictionStateAction({
          fixtureId: id,
        }),
      );
    },
    [dispatch],
  );

  useEffect(() => {
    if (
      (shouldGetData.current && fixtures.length > 0) ||
      !selectEventState.leagueSelected
    ) {
      shouldGetData.current = false;
      return;
    }
    dispatch(
      getAllFixturesAction({
        pageNumber: 1,
        pageSize: 20,
        leagueId: selectEventState.leagueSelected || '',
        notFinised: true,
      }),
    );
    dispatch(
      updateHostPredictionStateAction({
        fixtureId: undefined,
      }),
    );
    shouldGetData.current = false;
  }, [selectEventState.leagueSelected, isUvP]);

  return (
    <Box className={classes.table}>
      <Box className={classes.header}>
        <Typography className={classes.cell1}>Round</Typography>
        <Typography className={classes.cell2}>Match</Typography>
        <Typography className={classes.cell3}>Date</Typography>
        <Typography className={classes.cell4}>Number of market</Typography>
        <Typography className={classes.cell5}>Commission Rate</Typography>
      </Box>
      <Box className={classes.tableMain}>
        <InfiniteScroll
          dataLength={fixtures.length}
          next={getMoreData}
          hasMore={hasMore}
          loader={<p>Loading...</p>}
        >
          {fixtures.map((e) => (
            <Button
              key={e.id}
              className={clsx(classes.cell, {
                [classes.roundSelected]: selectEventState.fixtureId == e.id,
              })}
              disableRipple
              disabled={isDisabledProEvent(e.date)}
              onClick={() => onSelectFixture(e.id)}
            >
              <Typography className={classes.cell1}>
                {renderLeagueName(e.leagueMeta)}
              </Typography>
              <Typography className={classes.cell2}>
                {renderMathName(e.teamsMeta)}
              </Typography>
              <Typography className={classes.cell3}>
                {convertTime(e.date)}
              </Typography>
              <Typography className={classes.cell4}>3</Typography>
              <Typography className={classes.cell5}>0.5%</Typography>
            </Button>
          ))}
        </InfiniteScroll>
      </Box>
    </Box>
  );
};

export default ListEventDesktop;
