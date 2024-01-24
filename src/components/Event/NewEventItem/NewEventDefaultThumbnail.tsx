import { Box, CardMedia, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useCallback } from 'react';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { IEvent } from 'types/event';

const NewEventDefaultThumbnail = ({ event }: { event: IEvent }) => {
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
          className={clsx(classes.thumbnailUrl, 'center-root')}
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
          className={classes.img}
          onClick={() => onShowDetail(event)}
        />
      );
    } else {
      return (
        <CardMedia
          image={event.thumbnailUrl}
          className={classes.img}
          onClick={() => onShowDetail(event)}
        />
      );
    }
  };
  return <>{renderThumbnail(event)}</>;
};

export default NewEventDefaultThumbnail;

const useStyles = makeStyles((theme) => ({
  thumbnailUrl: {
    width: 88,
    height: 88,
  },
  teamLogo: {
    width: 56,
    height: 84,
    backgroundSize: 'contain',
  },
  vs: {
    fontSize: 12,
    color: '#BDBDBD',
    margin: '0px 4px',
  },
  img: {
    height: 88,
    width: 88,
  },
}));
