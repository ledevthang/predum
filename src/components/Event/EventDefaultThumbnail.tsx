import { Box, CardMedia, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import React from 'react';
import { IEvent } from 'types/event';

const EventDefaultThumbnail = ({ event }: { event: IEvent }) => {
  const classes = useStyles();
  const history = useHistory();
  const isDetail = location.pathname.includes('detail');

  const onShowDetail = useCallback(
    (event: IEvent) => {
      if (history.location.pathname == `/detail-event/${event.id}`) return;
      if (history.location.pathname.includes('host-info')) {
        history.push(`/detail-event/${event.id}`, {
          address: event.address,
        });
      } else history.push(`/detail-event/${event.id}`);
    },
    [history, event.id],
  );
  const renderThumbnail = (event: IEvent) => {
    if (
      !event.thumbnailUrl &&
      event?.metadata &&
      JSON.parse(event?.metadata) &&
      JSON.parse(event?.metadata).fixtureMeta
    ) {
      let fixtureMeta = JSON.parse(event?.metadata).fixtureMeta;
      let teamsMeta = JSON.parse(fixtureMeta).teams;

      return (
        <Box
          className={clsx(classes.thumbnailUrl, 'center-root', {
            [classes.thumbnailUrlDetail]: isDetail,
          })}
          bgcolor="#111111"
        >
          <CardMedia image={teamsMeta.home.logo} className={classes.teamLogo} />
          <Typography className={classes.vs}>VS</Typography>
          <CardMedia image={teamsMeta.away.logo} className={classes.teamLogo} />
        </Box>
      );
    } else if (
      !event.thumbnailUrl &&
      event?.metadata &&
      JSON.parse(event?.metadata).coinSelected
    ) {
      return (
        <CardMedia
          image={JSON.parse(event?.metadata).coinSelected.logo}
          className={clsx(classes.img, {
            [classes.imgDetail]: isDetail,
          })}
          onClick={() => onShowDetail(event)}
        />
      );
    } else {
      return (
        <CardMedia
          image={event.thumbnailUrl}
          className={clsx(classes.img, {
            [classes.imgDetail]: isDetail,
          })}
          onClick={() => onShowDetail(event)}
        />
      );
    }
  };
  return <>{renderThumbnail(event)}</>;
};

export default EventDefaultThumbnail;

const useStyles = makeStyles((theme) => ({
  thumbnailUrl: {
    width: 240,
    height: 240,
    [theme.breakpoints.down('sm')]: {
      width: 104,
      height: 104,
      marginRight: 0,
    },
  },
  thumbnailUrlDetail: {
    width: 240,
    height: 240,
    [theme.breakpoints.down('sm')]: {
      width: 300,
      height: 300,
      margin: 'auto',
    },
  },
  teamLogo: {
    width: 56,
    height: 84,
    backgroundSize: 'contain',
    [theme.breakpoints.down('sm')]: {
      margin: '0px 4px',
    },
  },
  vs: {
    fontSize: 14,
    color: '#BDBDBD',
    margin: '0px 24px',
    [theme.breakpoints.down('sm')]: {
      margin: '0px 4px',
    },
  },
  img: {
    height: 240,
    width: 240,
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      marginRight: 20,
    },
    [theme.breakpoints.down('sm')]: {
      width: 104,
      height: 104,
      marginRight: 0,
    },
  },
  imgDetail: {
    height: 240,
    width: 240,
    [theme.breakpoints.down('md')]: {
      marginRight: 20,
    },
    [theme.breakpoints.down('sm')]: {
      width: 300,
      height: 300,
      margin: 'auto',
    },
  },
}));
