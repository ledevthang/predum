import { Box, Button, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import ShareEventDialog from 'components/DetailEvent/ShareEventDialog';
import ListOption from 'components/Event/ListOption';
import Participants from 'components/Event/Participant';
import OverViewMatchDetailEvent from 'components/ProEventPrediction/OverViewMatchDetailEvent';
import FlyIcon from 'icon/FlyIcon';
import BasketballIcon from 'icon/sidebar/BasketballIcon';
import CourthouseIcon from 'icon/sidebar/CourthouseIcon';
import DiagramIcon from 'icon/sidebar/DiagramIcon';
import Element4Icon from 'icon/sidebar/Element4Icon';
import FootballIcon from 'icon/sidebar/FoorballIcon';
import FormulaIcon from 'icon/sidebar/FormulaIcon';
import MMAIcon from 'icon/sidebar/MMAIcon';
import TennisBallIcon from 'icon/sidebar/TennisBallIcon';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { IEvent } from 'types/event';
import { MarketType, WhoTakeWith } from 'types/hostPrediction';

import EventStatus from './EventStatus';
import { useStyles } from './PredictEventProCustomStyles';

interface IProps {
  event: IEvent | null;
}

const PredictEventProCustom = ({ event }: IProps) => {
  const classes = useStyles();
  const isWidget = location.pathname.includes('widget');
  const { themeWidget } = useParams<{ themeWidget: string }>();
  const dispatch = useDispatch();
  const renderBannerProUvPEvent = () => {
    let metadata = JSON.parse(event?.metadata || '{}');
    let fixture = JSON.parse(metadata.fixtureMeta);
    let selectedEvent = {
      teamsMeta: JSON.stringify(fixture.teams),
      leagueMeta: JSON.stringify(fixture.league),
      goalsMeta: event?.goalsMeta,
      date: fixture.fixture.date,
    };
    let league = fixture.league;
    return (
      <Box mb={3} width="100%">
        <OverViewMatchDetailEvent
          selectedEvent={selectedEvent}
          league={league}
          shouldEditBanner={false}
          isShowShareIcon={true}
          isOverlay
        />
      </Box>
    );
  };
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
    return event?.subCategory ? (
      <Box className={classes.icon}>
        {renderIcon}
        <Typography>{event.subCategory}</Typography>
      </Box>
    ) : (
      <Box></Box>
    );
  }, [renderIcon, event?.subCategory]);
  const handleClickShare = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: true,
        component: <ShareEventDialog />,
      }),
    );
  }, [dispatch]);
  const renderMarketType = useMemo(() => {
    if (!event) return '';
    const { eventType: type } = JSON.parse(event?.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    const options = JSON.parse(event?.options) as string[];
    if (
      event?.marketType == MarketType.OVER_UNDER &&
      type == WhoTakeWith.USER_USER
    )
      return ` - Total ${options[0].replace('<', '')}`;
    return '';
  }, [event?.marketType, event?.metadata, event?.options]);
  return (
    <Box
      className={themeWidget == 'light' ? classes.wapperLight : classes.wapper}
    >
      <Box className={classes.wrapperChoice}>
        {!isWidget && (
          <Box className={classes.wrapperHeader}>
            {renderCategory}
            <Box display="flex">
              {event && (
                <Participants
                  participant={event.numParticipants}
                  status={event.listingStatus}
                  views={event.views}
                  className={classes.centerItem}
                />
              )}
              <Button
                className={classes.shareButton}
                onClick={handleClickShare}
              >
                <FlyIcon />
                <Typography>Share</Typography>
              </Button>
            </Box>
          </Box>
        )}
        {renderBannerProUvPEvent()}
        <Box className={classes.wapperHeader}>
          <Typography>{`${
            event?.marketType == MarketType.TRUE_FALSE
              ? 'Yes / No'
              : event?.marketType
          } ${renderMarketType}`}</Typography>
        </Box>
        <Box
          className={clsx(classes.wapperOptions, {
            [classes.overUnderOption]:
              event?.marketType == MarketType.OVER_UNDER,
            [classes.haveScoreTeam]:
              event?.scoreOne && event?.scoreTwo && event.pro == 0,
            [classes.homeDrawAwayWrapper]:
              event?.marketType == MarketType.HOME_DRAW_AWAY,
            [classes.overUnderOptionLight]:
              isWidget &&
              themeWidget == 'light' &&
              event?.marketType == MarketType.OVER_UNDER,
          })}
        >
          {event && <ListOption event={event} disabledShowMore />}
        </Box>
      </Box>
      {event && <EventStatus event={event} />}
    </Box>
  );
};

export default PredictEventProCustom;
