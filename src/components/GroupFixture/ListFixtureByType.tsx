import { Box, Typography } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import {
  EEventStatus,
  GetAllEventRequest,
  IEvent,
  SortState,
} from 'types/event';
import DetailProEvent from './DetailProEvent';
import { useStyles } from './styles';
import eventService from 'services/event';
import { useSelector } from 'react-redux';
import { getEventDetail, getFilterState } from 'store/selectors';
import { useWeb3React } from '@web3-react/core';
import { useParams } from 'react-router-dom';
import { LocalStorageEnum } from 'enums/auth';
import localStorageUtils from 'utils/LocalStorage';

interface IProps {
  type: 'user vs user' | 'user vs pool' | 'affiliate';
  setStatus: (v: EEventStatus) => void;
}

const ListFixtureByType = ({ type, setStatus }: IProps) => {
  const classes = useStyles();
  const filter = useSelector(getFilterState);
  const { groupId } = useParams<{ groupId: string }>();
  const updateEvent = useSelector(getEventDetail);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [total, setTotal] = useState(0);
  const { active } = useWeb3React();

  const convertType = useMemo(() => {
    switch (type) {
      case 'affiliate':
        return 'Affiliate';
      case 'user vs user':
        return 'Peer-to-peer & Prize';
      case 'user vs pool':
        return 'User vs Pool';
    }
  }, [type]);

  useEffect(() => {
    (async () => {
      const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
      let params: GetAllEventRequest = {
        pageNumber: 1,
        pageSize: 2,
        orderBy: filter.sort,
        isHot: filter.isHot,
        categoryId: filter.categoryId,
        subCategoryId: filter.subCategoryId,
        tokenIds: filter.tokenIds,
        listingStatuses: filter.listingStatuses,
        search: filter.search,
        pro: [1, 2, 3],
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
      const s = result.data.filter(
        (d) => d.listingStatus != EEventStatus.PREDICTED,
      );
      if (s.length > 0) {
        setStatus(s[0].listingStatus);
      }
      setEvents(result.data);
      setTotal(result.total);
    })();
  }, [
    type,
    groupId,
    filter,
    active,
    updateEvent,
    localStorageUtils.getItem(LocalStorageEnum.USER_ID),
  ]);

  return (
    <>
      {total > 0 && (
        <Box mt={3}>
          <Typography className={classes.title}>
            {convertType}{' '}
            {`(Top ${total >= 2 ? 2 : total} from a total of ${total} events)`}
          </Typography>
          {events.map((e) => (
            <DetailProEvent key={e.id} event={e} />
          ))}
        </Box>
      )}
    </>
  );
};

export default ListFixtureByType;
