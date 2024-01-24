import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import NewEventItem from 'components/Event/NewEventItem';
import LeftArrowIcon from 'icon/LeftArrowIcon';
import RightArrowIcon from 'icon/RightArrowIcon';
import eventSvc from 'services/event';
import { getUserState } from 'store/selectors';
import { IEvent } from 'types/event';

import { useStyles } from './OtherEventStyles';

interface IProps {
  eventId: string;
}

const OtherEventsCategory = ({ eventId }: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const user = useSelector(getUserState);
  const [otherEvents, setOtherEvents] = useState<IEvent[]>([]);

  const loadMoreEvents = async () => {
    let data = await eventSvc.GetOtherEventsCategory({
      pageNumber: 1,
      pageSize: 3,
      eventId: +eventId,
      orderBy: 'Upcoming',
      loginUserId: user.id,
    });
    setOtherEvents(data.data);
  };
  useEffect(() => {
    loadMoreEvents();
  }, [isMobile, eventId]);
  const handleScroll = (type: string) => {
    const others = document.getElementById(OTHER_CATEGORY_ID);
    if (!others) return;
    const scrollLeft = others.scrollLeft;
    if (type == 'right') {
      others.scroll({
        top: 0,
        left: scrollLeft + 381,
        behavior: 'smooth',
      });
    }
    if (type == 'left') {
      others.scroll({
        top: 0,
        left: scrollLeft - 381,
        behavior: 'smooth',
      });
    }
  };
  return (
    <>
      {otherEvents.length > 0 && (
        <Box className={classes.others}>
          <Typography className={classes.header}>You may also like</Typography>
          <Box className={classes.container} id={OTHER_CATEGORY_ID}>
            {otherEvents.map((m) => (
              <Box key={m.id} mr={2}>
                <NewEventItem event={m} />
              </Box>
            ))}
          </Box>
          <Box className="center-root" mt={2}>
            <Box
              className={classes.arrow}
              mr={2}
              onClick={() => handleScroll('left')}
            >
              <LeftArrowIcon />
            </Box>
            <Box
              className={classes.arrow}
              onClick={() => handleScroll('right')}
            >
              <RightArrowIcon />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default OtherEventsCategory;
const OTHER_CATEGORY_ID = 'OTHER_CATEGORY_ID';
