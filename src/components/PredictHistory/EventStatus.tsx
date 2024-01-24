import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';

interface IEventStatus {
  type: string;
}

const EventStatus = ({ type }: IEventStatus) => {
  const classes = useStyles();
  const renderStatus = (type: string) => {
    if (type == 'on going')
      return (
        <Box className={classes.statusGoing}>
          <Typography>On Going</Typography>
        </Box>
      );
    else if (type == 'pending result')
      return (
        <Box className={classes.statusPending}>
          <Typography>Pending Result</Typography>
        </Box>
      );
    else if (type == 'ended')
      return (
        <Box className={classes.statusEnded}>
          <Typography>Ended</Typography>
        </Box>
      );
  };
  return <>{renderStatus(type)}</>;
};

export default EventStatus;

const useStyles = makeStyles((theme) => ({
  statusGoing: {
    width: '94px',
    height: '24px',
    background: '#ADCEEF',
    marginLeft: 40,
    borderRadius: '20px',
    '& p': {
      textAlign: 'center',
      paddingTop: 4,
      textTransform: 'uppercase',
      color: '#1976D2',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '13px',
      lineHeight: '16px',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: 20,
    },
    [theme.breakpoints.down('sm')]: {
      width: 145,
    },
  },
  statusPending: {
    width: '94px',
    height: '24px',
    background: '#EFDCCA',
    marginLeft: 40,
    borderRadius: '20px',
    '& p': {
      textAlign: 'center',
      paddingTop: 4,
      textTransform: 'uppercase',
      color: '#F5841F',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '13px',
      lineHeight: '16px',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: 20,
    },
    [theme.breakpoints.down('sm')]: {
      width: 145,
    },
  },
  statusEnded: {
    width: '94px',
    height: '24px',
    background: '#BDBDBD',
    marginLeft: 40,
    borderRadius: '20px',
    '& p': {
      textAlign: 'center',
      paddingTop: 4,
      textTransform: 'uppercase',
      color: '#5A5A5E',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '13px',
      lineHeight: '16px',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: 20,
    },
  },
}));
