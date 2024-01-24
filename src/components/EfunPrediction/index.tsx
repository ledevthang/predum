import { Box, Button, Typography } from '@material-ui/core';
import EventItem from 'components/Event/EventItem';
import React, { useCallback, useEffect, useState } from 'react';
import { IEvent } from 'types/event';
import { useStyles } from './style';
import eventService from 'services/event';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import userService from 'services/users';
import { useDispatch, useSelector } from 'react-redux';
import { getEventDetail, getEvents } from 'store/selectors';
import { getEventsSuccessAction } from 'store/actions/eventActions';

const EfunPrediction = () => {
  const classes = useStyles();
  const [predictions, setPredictions] = useState<IEvent[]>([]);
  const updateEvent = useSelector(getEventDetail);
  const history = useHistory();
  const listEvent = useSelector(getEvents);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await userService.getUserByAddress(
        process.env.REACT_APP_EFUN_WALLET as string,
      );
      const data = await eventService.GetAllEvents({
        pageNumber: 1,
        pageSize: 4,
        listingStatuses: ['Predicted', 'No status'],
        eventTypes: ['user vs user', 'user vs pool', 'affiliate'],
        homeList: true,
        userId: user.id,
      });
      setPredictions(data.data);
      dispatch(
        getEventsSuccessAction({
          pageNumber: 1,
          pageSize: 4,
          total: 4,
          data: data.data,
        }),
      );
    })();
  }, []);
  useEffect(() => {
    if (!updateEvent) return;
    (async () => {
      const user = await userService.getUserByAddress(
        process.env.REACT_APP_EFUN_WALLET as string,
      );
      const data = await eventService.GetAllEvents({
        pageNumber: 1,
        pageSize: 4,
        listingStatuses: ['Predicted', 'No status'],
        eventTypes: ['user vs user', 'user vs pool', 'affiliate'],
        homeList: true,
        userId: user.id,
      });
      setPredictions(data.data);
      dispatch(
        getEventsSuccessAction({
          pageNumber: 1,
          pageSize: 4,
          total: 4,
          data: data.data,
        }),
      );
    })();
  }, [updateEvent]);

  const onRedirectToEfunProfile = useCallback(() => {
    history.push(`/host-info/${process.env.REACT_APP_EFUN_WALLET}`);
  }, []);

  return (
    <Box className={classes.container} pb={5}>
      <Typography className={classes.title}>
        Join a prediction with Predum
      </Typography>
      {listEvent.map((p) => (
        <Box key={p.id} marginBottom={2}>
          <EventItem isHome event={p} />
        </Box>
      ))}
      <Box className={clsx(classes.wrapperViewMore, 'center-root')}>
        <Button className={classes.viewMore} onClick={onRedirectToEfunProfile}>
          VIEW MORE
        </Button>
      </Box>
    </Box>
  );
};

export default EfunPrediction;
