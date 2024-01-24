import { Box, Button } from '@material-ui/core';
import clsx from 'clsx';
import { LocalStorageEnum } from 'enums/auth';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GetAllEventRequest, IEvent } from 'types/event';
import eventService from 'services/event';
import ProEventBody from './ProEventBody';
import ProEventFooter from './ProEventFooter';
import ProEventHeader from './ProEventHeader';
import { useStyles } from './styles';
import localStorageUtils from 'utils/LocalStorage';
import { useDispatch, useSelector } from 'react-redux';
import { getEvents, getFilterState } from 'store/selectors';
import { useWeb3React } from '@web3-react/core';
import { updateEventByIndexAction } from 'store/actions/eventActions';

const ProEventItem = ({
  event,
  resetListGroup,
}: {
  event: IEvent;
  resetListGroup: () => void;
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [countEvent, setCountEvent] = useState(1);
  const { active } = useWeb3React();
  const [isChanged, setIsChanged] = useState(false);
  const dispatch = useDispatch();
  const listEvents = useSelector(getEvents);
  const [maxEvent, setMaxEvent] = useState(1);
  const filter = useSelector(getFilterState);
  useEffect(() => {
    (async () => {
      let index = 0;
      listEvents.forEach((e, i) => {
        if (e.id == event.id) index = i;
      });
      if (countEvent == listEvents[index].count) return;
      if (countEvent == 1 && !isChanged) return;
      const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
      let params: GetAllEventRequest = {
        pageNumber: countEvent,
        pageSize: 1,
        orderBy: filter.sort,
        isHot: filter.isHot,
        categoryId: filter.categoryId,
        subCategoryId: filter.subCategoryId,
        tokenIds: filter.tokenIds,
        listingStatuses: filter.listingStatuses,
        pro: [1, 2, 3],
        search: filter.search,
        homeList: true,
        userId: filter.userId,
        outOfTime: filter.outOfTime,
        fixtureId: event.fixtureId,
        loginUserId: userId,
      };
      if (!filter.listingStatuses?.includes('All')) {
        params.outOfEndTime30day = true;
      }
      const result = await eventService.GetAllEvents({
        ...params,
      });
      result.data[0].count = countEvent;
      result.data[0].relatedEvents = maxEvent;
      dispatch(updateEventByIndexAction(result.data[0], index));
    })();
  }, [countEvent, active]);
  useEffect(() => {
    let index = 0;
    listEvents.forEach((e, i) => {
      if (e.id == event.id) index = i;
    });
    setCountEvent(listEvents[index].count || 1);
  }, [listEvents]);
  useEffect(() => {
    if (event.relatedEvents && event.relatedEvents != 1 && !isChanged) {
      resetListGroup();
      setMaxEvent(event.relatedEvents);
    }
  }, [event]);

  return (
    <Box className={classes.container}>
      <ProEventHeader event={event} />
      <ProEventBody
        event={event}
        getNewEvent={(type) => {
          setCountEvent(countEvent + type);
          setIsChanged(true);
        }}
        countEvent={countEvent}
        maxEvent={maxEvent}
      />
      <ProEventFooter event={event} />
      {event?.relatedEvents != 0 && event?.relatedEvents != 1 && (
        <Box className={clsx(classes.wapperButton, 'center-root')} width="100%">
          <Button
            onClick={() => {
              history.push(`/groups/${event.fixtureId}`);
              window.scrollTo(0, 0);
            }}
          >
            View {maxEvent} related events
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProEventItem;
