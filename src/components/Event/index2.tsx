import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

import { LocalStorageEnum } from 'enums/auth';
import { hasMoreFn, isOverEndTime } from 'helpers';
import hostSvc from 'services/host';
import { getAllEventAction } from 'store/actions/eventActions';
import {
  getEvents,
  getFilterState,
  getHostState,
  getPaginationEvent,
} from 'store/selectors';
import { GetAllEventRequest } from 'types/event';
import localStorageUtils from 'utils/LocalStorage';

import NewEventItem from './NewEventItem';
import { useStyles } from './styles';

const NewEvent = ({ isLive }: { isLive?: boolean }) => {
  const classes = useStyles();
  const events = useSelector(getEvents);
  const eventPagination = useSelector(getPaginationEvent);
  const filter = useSelector(getFilterState);
  const dispatch = useDispatch();
  const hostState = useSelector(getHostState);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSreenXl = useMediaQuery(theme.breakpoints.up('xl'));
  const hasMore = useMemo(() => {
    return hasMoreFn(eventPagination);
  }, [eventPagination]);
  useEffect(() => {
    refreshEventList();
  }, [filter]);
  const getMoreData = useCallback(() => {
    const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
    let params: GetAllEventRequest = {
      pageNumber: eventPagination.pageNumber + 1,
      pageSize: eventPagination.pageSize,
      orderBy: filter.sort,
      isHot: filter.isHot,
      categoryId: filter.categoryId,
      subCategoryId: filter.subCategoryId,
      tokenIds: filter.tokenIds,
      // eventTypes: filter.eventTypes,
      // listingStatuses: filter.listingStatuses,
      search: filter.search,
      homeList: true,
      shouldGetUniqueFixture: false,
      orderProEvent: true,
    };
    if (!window.location.pathname.includes('host-info')) {
      params.outOfTime = filter.outOfTime;
      if (!filter.listingStatuses?.includes('All')) {
        params.outOfEndTime30day = true;
      }
      params.loginUserId = userId;
    }
    if (window.location.pathname != '/' && filter.userId != 0) {
      params.userId = filter.userId;
      params.isPin = true;
    }
    if (isLive) {
      delete params.isPin;
    }
    dispatch(getAllEventAction(params));
  }, [
    dispatch,
    eventPagination.pageNumber,
    eventPagination.pageSize,
    filter,
    events,
  ]);
  const refreshEventList = useCallback(() => {
    const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
    let params: GetAllEventRequest = {
      pageNumber: 1,
      pageSize: 20,
      orderBy: filter.sort,
      isHot: filter.isHot,
      categoryId: filter.categoryId,
      subCategoryId: filter.subCategoryId,
      search: filter.search,
      tokenIds: filter.tokenIds,
      // listingStatuses: filter.listingStatuses,
      // eventTypes: filter.eventTypes,
      shouldGetUniqueFixture: false,
      orderProEvent: true,
      homeList: true,
    };
    if (!window.location.pathname.includes('host-info')) {
      console.log('run in if');
      params.outOfTime = filter.outOfTime;
      if (!filter.listingStatuses?.includes('All')) {
        params.outOfEndTime30day = true;
      }
      params.loginUserId = userId;
    } else {
      if (filter.isHotInfo) params.outOfTime = filter.isHotInfo;
      else {
        delete params.outOfTime;
      }
    }
    if (window.location.pathname != '/' && filter.userId != 0) {
      params.userId = filter.userId;
      params.isPin = true;
    }
    if (isLive) {
      delete params.isPin;
    }
    setTimeout(() => {
      dispatch(getAllEventAction(params));
    }, 1000);
  }, [dispatch, filter, events]);

  const updatePinnedEvents = async (eventId: number) => {
    const listEventPinned = events.filter((e) => e.isPinned);
    const listId = listEventPinned.map((e) => e.id);
    let params: number[] = [];
    if (listId.includes(eventId)) {
      params = listId.filter((e) => e != eventId);
    } else {
      if (listId.length < 3) {
        params = [...listId];
        params.unshift(eventId);
      } else {
        params[0] = eventId;
        params[1] = listId[0];
        params[2] = listId[1];
      }
    }
    await hostSvc.UpdatePinnedEvents({
      userId: hostState.id || 0,
      pinnedEvents: params,
    });
    refreshEventList();
  };
  const getLiveEventsLength = useMemo(() => {
    let temp = events.filter(
      (e, i) => e.streamUrl && !isOverEndTime(e.endTime),
    );
    return temp.length;
  }, [events]);
  const renderListEvent = useCallback(() => {
    if (!isSreenXl && !isDesktop && !isMobile) {
      let length = events.filter((e, i) => e.isPinned).length;
      let temp = [...events];
      let tempEvent = events[7];
      if (length == 2) {
        return events.map((e, index) => {
          return (
            <Box key={index}>
              <NewEventItem event={e} updatePinnedEvents={updatePinnedEvents} />
            </Box>
          );
        });
      }
      if (length == 1) {
        temp.splice(1, 0, tempEvent);
      }
      if (length == 3) {
        temp.splice(3, 0, tempEvent);
      }
      return temp.map((e, index) => {
        return (
          <Box key={index}>
            <NewEventItem
              event={e}
              isInvisible={
                (length == 1 && index == 1) || (length == 3 && index == 3)
              }
              updatePinnedEvents={updatePinnedEvents}
            />
          </Box>
        );
      });
    }
    if (isSreenXl) {
      let length = events.filter((e, i) => e.isPinned).length;
      let temp = [...events];
      let tempEvent = events[7];
      if (length == 1) {
        temp.splice(1, 0, tempEvent);
        temp.splice(1, 0, tempEvent);
        temp.splice(1, 0, tempEvent);
      }
      if (length == 2) {
        temp.splice(2, 0, tempEvent);
        temp.splice(2, 0, tempEvent);
      }
      if (length == 3) {
        temp.splice(3, 0, tempEvent);
      }
      return temp.map((e, index) => {
        return (
          <Box key={index}>
            <NewEventItem
              event={e}
              isInvisible={
                (length == 2 && (index == 2 || index == 3)) ||
                (length == 1 && (index == 1 || index == 2 || index == 3)) ||
                (length == 3 && index == 3)
              }
              updatePinnedEvents={updatePinnedEvents}
            />
          </Box>
        );
      });
    }
    if (
      events.filter((e, i) => e.isPinned).length == 3 ||
      events.filter((e, i) => e.isPinned).length == 0 ||
      !isDesktop
    ) {
      return events.map((e, index) => {
        return (
          <Box key={index}>
            <NewEventItem event={e} updatePinnedEvents={updatePinnedEvents} />
          </Box>
        );
      });
    } else {
      let length = events.filter((e, i) => e.isPinned).length;
      let temp = [...events];
      let tempEvent = events[0];
      if (length == 2) {
        temp.splice(2, 0, tempEvent);
      }
      if (length == 1) {
        temp.splice(1, 0, tempEvent);
        temp.splice(1, 0, tempEvent);
      }
      return temp.map((e, index) => {
        return (
          <Box key={index}>
            <NewEventItem
              event={e}
              isInvisible={
                (length == 2 && index == 2) ||
                (length == 1 && (index == 1 || index == 2))
              }
              updatePinnedEvents={updatePinnedEvents}
            />
          </Box>
        );
      });
    }
  }, [events, isSreenXl, isDesktop, isMobile]);
  return (
    <Box className={classes.container}>
      <InfiniteScroll
        dataLength={isLive ? getLiveEventsLength : events.length}
        next={getMoreData}
        hasMore={hasMore}
        loader={<p></p>}
        className={classes.wrapperMatches}
      >
        <>
          {!isLive && renderListEvent()}
          {isLive &&
            events
              .filter((e, i) => e.streamUrl && !isOverEndTime(e.endTime))
              .map((e, index) => {
                return (
                  <Box key={index}>
                    <NewEventItem
                      event={e}
                      updatePinnedEvents={updatePinnedEvents}
                      isLive
                    />
                  </Box>
                );
              })}
        </>
      </InfiniteScroll>
    </Box>
  );
};
export default NewEvent;
