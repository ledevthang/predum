import React, { useCallback, useEffect, useState } from 'react';
import {
  EEventStatus,
  GetAllEventRequest,
  IEvent,
  SortState,
} from 'types/event';
import { WhoTakeWith } from 'types/hostPrediction';
import eventService from 'services/event';
import { Box, Typography, Button } from '@material-ui/core';
import DetailProEvent from './DetailProEvent';
import { useStyles } from './styles';
import { useSelector } from 'react-redux';
import { getEventDetail, getFilterState } from 'store/selectors';
import { useWeb3React } from '@web3-react/core';
import { useParams } from 'react-router-dom';
import { LocalStorageEnum } from 'enums/auth';
import localStorageUtils from 'utils/LocalStorage';

const ListFixtureByTypeNoLimit = ({
  type,
  setStatus,
}: {
  type: WhoTakeWith;
  setStatus: any;
}) => {
  const classes = useStyles();
  const filter = useSelector(getFilterState);
  const [events, setEvents] = useState<IEvent[]>([]);
  const updateEvent = useSelector(getEventDetail);
  const { groupId } = useParams<{ groupId: string }>();
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
    total: 0,
  });
  const { active } = useWeb3React();

  const loadMore = useCallback(
    async (pagination: { pageNumber: number; pageSize: number }) => {
      const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
      let params: GetAllEventRequest = {
        pageNumber: pagination.pageNumber,
        pageSize: pagination.pageSize,
        orderBy: filter.sort,
        isHot: filter.isHot,
        categoryId: filter.categoryId,
        subCategoryId: filter.subCategoryId,
        pro: [1, 2, 3],
        tokenIds: filter.tokenIds,
        listingStatuses: filter.listingStatuses,
        search: filter.search,
        homeList: true,
        userId: filter.userId,
        outOfTime: filter.outOfTime,
        fixtureId: groupId,
        loginUserId: userId,
      };
      if (!filter.listingStatuses?.includes('All')) {
        params.outOfEndTime30day = true;
      }
      if (params.orderBy == SortState.BIGGEST_POOL) {
        params.biggestToken = process.env.REACT_APP_PRT_TOKEN;
      }
      const result = await eventService.GetAllEvents({
        ...params,
        eventTypes: [type],
      });
      setEvents(
        result.pageNumber == 1 ? result.data : events.concat(result.data),
      );
      const s = result.data.filter(
        (d) => d.listingStatus != EEventStatus.PREDICTED,
      );
      if (s.length > 0) {
        setStatus(s[0].listingStatus);
      }
      setPagination({
        ...pagination,
        total: result.total,
      });
    },
    [
      events,
      pagination,
      type,
      filter,
      groupId,
      active,
      localStorageUtils.getItem(LocalStorageEnum.USER_ID),
    ],
  );

  useEffect(() => {
    loadMore({
      pageNumber: 1,
      pageSize: 10,
    });
  }, [type, updateEvent]);

  const onLoadMore = useCallback(() => {
    loadMore({
      pageNumber: pagination.pageNumber + 1,
      pageSize: pagination.pageSize,
    });
  }, [pagination]);

  return (
    <>
      {pagination.total > 0 ? (
        <Box>
          {events.map((e) => (
            <DetailProEvent key={e.id} event={e} />
          ))}
          {pagination.total != events.length && (
            <Box width="100%" className="center-root">
              <Button onClick={onLoadMore} className={classes.loadMore}>
                Load more
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <Typography
          style={{
            fontSize: 16,
            color: '#BBDBDBD',
            fontWeight: 600,
            textAlign: 'center',
            margin: '30px 0px',
          }}
        >
          No result was found
        </Typography>
      )}
    </>
  );
};

export default ListFixtureByTypeNoLimit;
