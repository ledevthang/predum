import React, { useCallback } from 'react';
import {
  Box,
  makeStyles,
  Tooltip,
  TooltipProps,
  Typography,
} from '@material-ui/core';
import { IEvent } from 'types/event';
import { convertTime, renderShortAddress } from 'helpers';
import EventStatus from './EventStatus';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

interface IEventTitle {
  host: IEvent;
  statusType: string;
  className?: string;
}

const EventTitle = ({ host, statusType, className }: IEventTitle) => {
  const classes = useStyles();
  const history = useHistory();
  const onShowDetail = useCallback(() => {
    if (history.location.pathname == `/host-prediction-detail/${host.id}`)
      return;
    history.push(`/host-prediction-detail/${host.id}`);
  }, [history, host.id]);
  const CustomTooltip = (props: TooltipProps) => {
    return <Tooltip arrow classes={{ tooltip: classes.tooltip }} {...props} />;
  };
  return (
    <>
      <Box className={clsx(classes.wapperTitle, className)}>
        <Box className={classes.namePredictionWapper}>
          {host.shortDescription && host.shortDescription.length > 60 ? (
            <CustomTooltip title={host.shortDescription} placement="top">
              <Typography onClick={onShowDetail}>
                {renderShortAddress(host.shortDescription, 60, 0)}
              </Typography>
            </CustomTooltip>
          ) : (
            <Typography onClick={onShowDetail}>
              {host.shortDescription ? host.shortDescription : host.name}
            </Typography>
          )}
        </Box>
        <EventStatus type={statusType} />
      </Box>
      <Box className={classes.wapperName}>
        <Typography>
          {host.shortDescription ? host.name : host.shortDescription}
        </Typography>
      </Box>
      <Box className={classes.timeWapper}>
        <Box className={classes.timeline}>
          <Typography>{'Deadline:' + ' '} </Typography>
          <Typography>{`${convertTime(host.deadline)}`}</Typography>
        </Box>
        <Box className={classes.timeline}>
          <Typography>End time: </Typography>
          <Typography>{`${convertTime(host.endTime)}`}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default EventTitle;

const useStyles = makeStyles((theme) => ({
  wapperTitle: {
    display: 'flex',
  },
  namePredictionWapper: {
    '& p': {
      cursor: 'pointer',
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '22px',
      color: '#FFFFFF',
    },
  },
  wapperName: {
    '& p': {
      color: '#BDBDBD',
    },
    marginBottom: 8,
  },
  tooltip: {
    fontSize: '14px',
    backgroundColor: '#111111',
    width: '500px',
  },
  timeWapper: {
    display: 'flex',
    height: 30,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      height: 54,
    },
    '& div': {
      marginBottom: 12,
    },
  },
  timeline: {
    display: 'flex',
    marginRight: 24,
    '& p': {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '17px',
      color: '#FFFFFF',
    },
    '& p:first-child': {
      color: '#BDBDBD',
      marginRight: 4,
    },
  },
}));
