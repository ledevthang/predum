import { Box, Typography } from '@material-ui/core';
import EventDefaultThumbnail from 'components/Event/EventDefaultThumbnail';
import { convertTime } from 'helpers';
import BasketballIcon from 'icon/sidebar/BasketballIcon';
import CourthouseIcon from 'icon/sidebar/CourthouseIcon';
import DiagramIcon from 'icon/sidebar/DiagramIcon';
import Element4Icon from 'icon/sidebar/Element4Icon';
import FootballIcon from 'icon/sidebar/FoorballIcon';
import FormulaIcon from 'icon/sidebar/FormulaIcon';
import MMAIcon from 'icon/sidebar/MMAIcon';
import TennisBallIcon from 'icon/sidebar/TennisBallIcon';
import React, { useMemo } from 'react';
import { IEvent } from 'types/event';
import { useStyles } from './EventCardCustomStyles';

interface IProps {
  event: IEvent | null;
}

const EventCardCustom = ({ event }: IProps) => {
  const classes = useStyles();

  const renderIcon = useMemo(() => {
    switch (event?.subCategory) {
      case 'Football':
        return <FootballIcon color="#BDBDBD" />;
      case 'Baseball':
        return <BasketballIcon color="#BDBDBD" />;
      case 'Tennis':
        return <TennisBallIcon color="#BDBDBD" />;
      case 'Formula 1':
        return <FormulaIcon color="#BDBDBD" />;
      case 'MMA':
        return <MMAIcon color="#BDBDBD" />;
      case 'Coin Price':
        return <DiagramIcon color="#BDBDBD" />;
      case 'Politics':
        return <CourthouseIcon color="#BDBDBD" />;
      default:
        return <Element4Icon color="#BDBDBD" />;
    }
  }, [event?.subCategory]);
  const renderCategory = useMemo(() => {
    return (
      event?.subCategory && (
        <Box className={classes.icon}>
          {renderIcon}
          <Typography>{event.subCategory}</Typography>
        </Box>
      )
    );
  }, [renderIcon, event?.subCategory]);

  return (
    <Box className={classes.wapperCard}>
      <Box className={classes.banner}>
        {/* <CardMedia image={event?.thumbnailUrl} className={classes.thumbnail} />
         */}
        {event && <EventDefaultThumbnail event={event} />}
      </Box>
      <Box className={classes.info}>
        {renderCategory}
        <Box className={classes.short}>
          <Typography>{event?.name}</Typography>
        </Box>
        <Box className={classes.timeWapper}>
          <Box className={classes.timeline}>
            <Typography>{'Deadline:' + ' '} </Typography>
            <Typography>{`${convertTime(event?.deadline)}`}</Typography>
          </Box>
          <Box className={classes.timeline}>
            <Typography>End time: </Typography>
            <Typography>{`${convertTime(event?.endTime)}`}</Typography>
          </Box>
        </Box>
        <Box>{event?.description}</Box>
      </Box>
    </Box>
  );
};

export default EventCardCustom;
