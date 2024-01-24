import { Box } from '@material-ui/core';
import ProEventBody from 'components/ProEventItem/ProEventBody';
import ProEventFooter from 'components/ProEventItem/ProEventFooter';
import React from 'react';
import { IEvent } from 'types/event';
import { useStyles } from './styles';

interface IProps {
  event: IEvent;
}

const DetailProEvent = ({ event }: IProps) => {
  const classes = useStyles();
  return (
    <Box mb={3} mt={3}>
      <ProEventBody event={event} />
      <ProEventFooter event={event} />
    </Box>
  );
};

export default DetailProEvent;
