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

const ListEventMobile = () => {
  const classes = useStyles();
  const fixtures = useSelector(getFixtureState);
  const fixturePagination = useSelector(getFixturePaginationState);
  const selectEventState = useSelector(getSelectEventState);
  const dispatch = useDispatch();
  const shouldGetData = useRef<boolean>(true);
  const eventType = useSelector(getEventType);

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
            className={clsx(classes.wrapperCellMobile, {
              [classes.roundSelectedMobile]: selectEventState.fixtureId == e.id,
            })}
            disabled={isDisabledProEvent(e.date)}
            onClick={() => onSelectFixture(e.id)}
            disableRipple
          >
            <Typography>{renderLeagueName(e.leagueMeta)}</Typography>
            <Box className={classes.body}>
              <Box className={classes.wrapperText}>
                <Typography className={classes.textMobile}>Match</Typography>
                <Typography className={classes.textMobile2}>
                  {renderMathName(e.teamsMeta)}
                </Typography>
              </Box>
              <Box className={classes.wrapperText}>
                <Typography className={classes.textMobile}>Date</Typography>
                <Typography className={classes.textMobile2}>
                  {convertTime(e.date)}
                </Typography>
              </Box>
              <Box className={classes.wrapperText}>
                <Typography className={classes.textMobile}>
                  Number of market
                </Typography>
                <Typography className={classes.textMobile2}>3</Typography>
              </Box>
              <Box className={classes.wrapperText}>
                <Typography className={classes.textMobile}>
                  Commission Rate
                </Typography>
                <Typography className={classes.textMobile2}>5%</Typography>
              </Box>
            </Box>
          </Button>
        ))}
      </InfiniteScroll>
    </Box>
  );
};

export default ListEventMobile;
