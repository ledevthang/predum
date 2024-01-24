import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NewEventItem from 'components/Event/NewEventItem';
import LeftArrowIcon from 'icon/LeftArrowIcon';
import RightArrowIcon from 'icon/RightArrowIcon';
import { getOtherEventAction } from 'store/actions/otherEventActions';
import { getOtherEvent, getUserState } from 'store/selectors';

import { useStyles } from './OtherEventStyles';

interface IProps {
  eventId: string;
}

const OtherEvents = ({ eventId }: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const otherEvents = useSelector(getOtherEvent);
  const [isHasOtherEvent, setIsHasOtherEvent] = useState(true);
  const user = useSelector(getUserState);
  const [isLoaded, setLoaded] = useState(false);

  const loadMoreEvents = useCallback(
    (isFirst: boolean) => {
      dispatch(
        getOtherEventAction(
          {
            eventId: +eventId,
            orderBy: 'Upcoming',
            loginUserId: user.id,
          },
          {
            isFirst,
            callback: () => {
              if (isFirst) {
                setLoaded(true);
              }
              window.isLoadedMore = false;
            },
          },
        ),
      );
    },
    [dispatch, eventId],
  );
  useEffect(() => {
    setIsHasOtherEvent(otherEvents.length > 0);
  }, [otherEvents]);

  const onScroll = useCallback(
    (e: any) => {
      const scrollWidth = e.srcElement.scrollWidth;
      const scrollLeft = e.srcElement.scrollLeft;
      if (scrollWidth - scrollLeft < 1150 && !window.isLoadedMore) {
        window.isLoadedMore = true;
        loadMoreEvents(false);
      }
    },
    [loadMoreEvents, window],
  );
  const handleScroll = (type: string) => {
    const others = document.getElementById(OTHER_EVENTS_ID);
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

  useEffect(() => {
    const others = document.getElementById(OTHER_EVENTS_ID);
    if (!others) return;
    loadMoreEvents(true);
    window.isLoadedMore = true;
    setLoaded(false);
    others.addEventListener('scroll', onScroll);
    return () => {
      others.removeEventListener('scroll', onScroll);
    };
  }, [isMobile, eventId]);

  return (
    <>
      {
        <Box className={classes.others}>
          <Typography className={classes.header}>
            Other games from host
          </Typography>
          <Box className={classes.container} id={OTHER_EVENTS_ID}>
            {isLoaded &&
              otherEvents.map((m) => (
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
      }
    </>
  );
};

export default OtherEvents;

const OTHER_EVENTS_ID = 'OTHER_EVENTS_ID';
