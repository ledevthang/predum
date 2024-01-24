import { Box } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

import EyeIcon from 'icon/EyeIcon';
import UserIcon from 'icon/UserIcon';
import { EEventStatus } from 'types/event';

import { useStyles } from './EventItemStyles';
import EventStatus from './EventStatus';

const Participants = ({
  participant,
  status,
  views,
  className,
  children,
}: {
  participant?: number;
  status?: EEventStatus;
  views?: number;
  className?: any;
  children?: any;
}) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.wrapperParticipantAndStatus, className)}>
      {views && (
        <Box className={classes.views}>
          <EyeIcon color="#BDBDBD" />
          {views}
        </Box>
      )}
      {(participant || participant == 0) && (
        <Box className={classes.participant}>
          <UserIcon />
          {participant}
        </Box>
      )}
      {children && children}
      <EventStatus status={status} />
    </Box>
  );
};

export default Participants;
