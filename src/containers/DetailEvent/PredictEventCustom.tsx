import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import Decimal from 'decimal.js';
import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import CommonInput from 'components/common/CommonInput';
import ShareEventDialog from 'components/DetailEvent/ShareEventDialog';
import ListOption from 'components/Event/ListOption';
import Participants from 'components/Event/Participant';
import { convertTime, timeSince } from 'helpers';
import { convertThousandSeperator } from 'helpers';
import DollarIcon from 'icon/DollarCircleIcon';
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
import { AnswerType, MarketType, WhoTakeWith } from 'types/hostPrediction';

import EventStatus from './EventStatus';
import { useStyles } from './PredictEventCustomStyles';

interface IProps {
  event: IEvent | null;
}

const PredictEventCustom = ({ event }: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isWidget = location.pathname.includes('widget');
  const { themeWidget } = useParams<{ themeWidget: string }>();
  const getTokenName = (metadata: string | undefined) => {
    if (metadata == undefined) return '';
    let meta = JSON.parse(metadata);
    return meta.coinSelected.symbol;
  };
  const isOverTime = (a: string | undefined) => {
    if (a == undefined) return false;
    let time = new Date(a);
    return new Date() > time;
  };
  const getPrice = (e: IEvent) => {
    if (e.finalResult == null) return 0;
    else {
      if (event?.pro == 5)
        return new Decimal(e.finalResult).div(100000000).toString();
      else return e.finalResult;
    }
  };
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
  return (
    <Box
      className={clsx(classes.wapper, {
        [classes.wapperWidget]: isWidget,
      })}
      style={{
        background: themeWidget == 'light' ? 'white' : '#1C1C1E',
      }}
    >
      {!isWidget && (
        <Box className={classes.wrapperHeader}>
          {renderCategory}
          <Box display="flex">
            {event && (
              <>
                <Participants
                  participant={event.numParticipants}
                  status={event.listingStatus}
                  // views={event.views}
                >
                  {!isMobile && (
                    <Button
                      className={classes.shareButton}
                      onClick={handleClickShare}
                    >
                      <FlyIcon />
                      <Typography>Share</Typography>
                    </Button>
                  )}
                </Participants>
                {isMobile && (
                  <Button
                    className={classes.shareButton}
                    onClick={handleClickShare}
                  >
                    <FlyIcon />
                  </Button>
                )}
              </>
            )}
          </Box>
        </Box>
      )}
      <Typography
        className={classes.description}
        style={{
          color: themeWidget == 'light' ? '#1C1C1E' : '#FFFFFF',
        }}
      >
        {event?.shortDescription}
      </Typography>
      <Box className={classes.wrapperChoice}>
        <Box display="flex" alignItems="center">
          <Typography
            style={{
              fontSize: 14,
              color: themeWidget == 'light' ? '#1C1C1E' : '#FFFFFF',
            }}
          >
            <DollarIcon />
            {`${
              event?.marketType == MarketType.TRUE_FALSE
                ? 'Yes / No'
                : event?.marketType
            } ${renderMarketType}`}
          </Typography>
          {event?.deadline && !isOverTime(`${event?.deadline}`) && (
            <>
              <Typography
                style={{
                  color: themeWidget == 'light' ? '#1C1C1E' : '#FFFFFF',
                  margin: '0px 4px',
                }}
              >
                -
              </Typography>
              <Typography
                style={{
                  color: '#E53935',
                  fontSize: 14,
                }}
              >
                Close prediction in{' '}
                {timeSince(
                  event?.deadline
                    ? new Date(event?.deadline)
                    : (new Date() as any),
                  true,
                )}
              </Typography>
            </>
          )}
        </Box>
        <Box
          className={clsx(classes.wapperOptions, {
            [classes.overUnderOption]:
              event?.marketType == MarketType.OVER_UNDER &&
              JSON.parse(event?.metadata || '{}').eventType != 'user vs user',
            [classes.overUnderOptionP2P]:
              event?.marketType == MarketType.OVER_UNDER &&
              JSON.parse(event?.metadata || '{}').eventType == 'user vs user',
          })}
        >
          {event && <ListOption event={event} disabledShowMore />}
        </Box>
        {event?.scoreOne != null &&
          event?.scoreTwo != null &&
          event.pro == 0 &&
          event?.marketType != MarketType.OVER_UNDER &&
          event?.marketType != MarketType.MULTIPLE_CHOICES && (
            <Box display="flex">
              <CommonInput
                value={event?.scoreOne}
                disabled={true}
                className={clsx(classes.commonInput, classes.inputOne, {
                  [classes.inputOneHandicap]:
                    event?.marketType == MarketType.HANDICAP,
                  [classes.inputImage]:
                    JSON.parse(event?.metadata || '{}').answerType ==
                    AnswerType.WITH_PHOTOS,
                })}
              />
              <CommonInput
                value={event?.scoreTwo}
                disabled={true}
                className={clsx(classes.commonInput, {
                  [classes.inputImage]:
                    JSON.parse(event?.metadata || '{}').answerType ==
                    AnswerType.WITH_PHOTOS,
                })}
              />
            </Box>
          )}
        {event?.totalScore != null &&
          event.pro == 0 &&
          event?.marketType == MarketType.OVER_UNDER && (
            <Box display="flex" alignItems="center">
              <Typography className={classes.totalScore}>
                Total Score
              </Typography>
              <CommonInput
                value={event?.totalScore}
                disabled={true}
                className={classes.commonInput}
              />
            </Box>
          )}
        {isOverTime(`${event?.endTime}`) &&
          (event?.pro == 5 || event?.pro == 6) && (
            <Box className={classes.price}>
              <Typography>
                <>
                  {getTokenName(event?.metadata)}{' '}
                  {event?.pro == 5 ? 'price' : 'volume'} on{' '}
                  {convertTime(event.endTime)} is{' $'}
                  {convertThousandSeperator(getPrice(event))}
                </>
              </Typography>
            </Box>
          )}
      </Box>

      {event && <EventStatus event={event} />}
    </Box>
  );
};

export default PredictEventCustom;
