import { Box, Typography } from '@material-ui/core';
import EventItem from 'components/Event/EventItem';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IEvent } from 'types/event';
import { PartnerResponse } from 'types/partner';
import { useStyles } from './styles';
import eventService from 'services/event';
import userService from 'services/users';
import clsx from 'clsx';
import { getEventDetail } from 'store/selectors';
import { useSelector } from 'react-redux';

interface IProps {
  partner: PartnerResponse;
}

const PartnerPrediction = ({ partner }: IProps) => {
  const classes = useStyles();
  const [predictions, setPredictions] = useState<IEvent[]>([]);
  const updateEvent = useSelector(getEventDetail);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      if (!partner.address) return;
      const user = await userService.getUserByAddress(partner.address);
      if (!user) return;
      const data = await eventService.GetAllEvents({
        pageNumber: 1,
        pageSize: 5,
        listingStatuses: ['Predicted', 'No status', 'Locked'],
        eventTypes: ['user vs user', 'user vs pool', 'affiliate'],
        homeList: true,
        userId: user.id,
      });
      setPredictions(data.data);
    })();
  }, [partner.address]);
  useEffect(() => {
    if (!updateEvent) return;
    (async () => {
      if (!partner.address) return;
      const user = await userService.getUserByAddress(partner.address);
      if (!user) return;
      const data = await eventService.GetAllEvents({
        pageNumber: 1,
        pageSize: 5,
        listingStatuses: ['Predicted', 'No status', 'Locked'],
        eventTypes: ['user vs user', 'user vs pool', 'affiliate'],
        homeList: true,
        userId: user.id,
      });
      setPredictions(data.data);
    })();
  }, [updateEvent]);

  const onRedirectToPartnerProfile = useCallback(() => {
    history.push(`/host-info/${partner.address}`);
  }, [partner.address]);

  return (
    <Box mt={2} id={partner.address}>
      <Typography
        className={clsx(classes.title, classes.cursorPointer)}
        onClick={onRedirectToPartnerProfile}
      >
        {predictions.length > 0 && partner.name}
      </Typography>
      {predictions.map((p) => (
        <Box key={p.id} marginBottom={2}>
          <EventItem isHome event={p} />
        </Box>
      ))}
    </Box>
  );
};

export default PartnerPrediction;
