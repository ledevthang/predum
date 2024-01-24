import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import DownIcon from 'icon/DownIcon';
import { IEvent } from 'types/event';

interface IProps {
  event: IEvent;
}

const EventDescription = ({ event }: IProps) => {
  const classes = useStyles();
  const [isHasShowMore, setIsHasShowMore] = useState(true);
  useEffect(() => {
    const temp = event.description ? event.description?.length > 450 : false;
    setIsHasShowMore(temp);
  }, [event]);
  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography>Game description</Typography>
      </Box>
      <Box className={!isHasShowMore ? classes.desFull : classes.desNoFull}>
        <Typography>{event.description}</Typography>
      </Box>
      {isHasShowMore && (
        <Box
          className={classes.showMore}
          onClick={() => setIsHasShowMore(false)}
        >
          <Typography>Show more</Typography>
          <DownIcon />
        </Box>
      )}
    </Box>
  );
};

export default EventDescription;
const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
  },
  showMore: {
    display: 'flex',
    width: '100%',
    padding: '12px 0px',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#1C1C1E',
    cursor: 'pointer',
    '& p': {
      fontSize: 14,
      color: '#029ADE',
    },
    '& svg': {
      color: '#029ADE',
      height: 14,
      width: 14,
    },
  },
  desNoFull: {
    width: '100%',
    background: '#1C1C1E',
    height: 93,
    padding: 16,
    overflow: 'hidden',
  },
  desFull: {
    width: '100%',
    background: '#1C1C1E',
    padding: 16,
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    background: 'linear-gradient(180deg, #0B0B0E 0%, #1C1C1E 100%)',
    padding: '21px 0px',
    '&>p': {
      fontSize: '28px',
      lineHeight: '34px',
      fontWeight: 600,
    },
  },
}));
