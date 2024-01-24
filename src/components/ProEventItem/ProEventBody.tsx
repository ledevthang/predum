import {
  Box,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import EventStatus from 'components/Event/EventStatus';
import ListOption from 'components/Event/ListOption';
import Participants from 'components/Event/Participant';
import Decimal from 'decimal.js';
import {
  convertThousandSeperator,
  convertTime,
  convertWeiToToken,
  getNameToken,
} from 'helpers';

import { usePlatformFee } from 'hooks/usePlatformFee';
import ArrowLeftIcon from 'icon/ArrowLeftIcon';
import ArrowRightIcon from 'icon/ArrowRightIcon';
import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { EEventStatus, IEvent } from 'types/event';
import { MarketType, WhoTakeWith } from 'types/hostPrediction';
import { useStyles } from './styles';

const ProEventBody = ({
  event,
  getNewEvent,
  countEvent,
  maxEvent,
}: {
  event: IEvent;
  getNewEvent?: (type: number) => void;
  countEvent?: number;
  maxEvent?: number | undefined;
}) => {
  const classes = useStyles();
  const history = useHistory();
  const isHome =
    location.pathname == '/' || location.pathname.includes('host-info');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { uvpPlatformFee: UVP_PLATFORM_FEE } = usePlatformFee();
  const isOverDeadline = () => {
    if (!event) return false;
    const deadline = new Date(event.deadline);
    return deadline.getTime() < new Date().getTime();
  };
  const goalsMeta = useMemo(() => {
    return JSON.parse(event.goalsMeta || '');
  }, [event.goalsMeta]);
  const renderLogo = useMemo(() => {
    const metadata = JSON.parse(event.metadata || '');
    const fixture = JSON.parse(metadata.fixtureMeta || '');
    return (
      <Box className={classes.wapperLogo}>
        <Box
          className={classes.icon}
          style={{
            background: isHome && countEvent != 1 ? '#111111' : '#2C2C2F',
            pointerEvents: countEvent != 1 ? 'unset' : 'none',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (!getNewEvent) return;
            getNewEvent(-1);
          }}
        >
          {isHome && countEvent != 1 && <ArrowLeftIcon />}
        </Box>
        <Box className="center-root" flexDirection="column">
          <CardMedia image={fixture.teams.home.logo} className={classes.logo} />
          <Typography
            className={classes.boldText}
            style={{
              marginTop: 8,
            }}
          >
            {fixture.teams.home.name}
          </Typography>
        </Box>
        <Box className="center-root" flexDirection="column">
          <EventStatus status={event.listingStatus} isPro />
          {!isOverDeadline() ? (
            <>
              <Typography>Deadline</Typography>
              <Typography className={classes.boldText}>
                {convertTime(event.deadline, 'DD MMM, YYYY HH:mm')}
              </Typography>
            </>
          ) : (
            <>
              {goalsMeta.home != null && goalsMeta.away != null && (
                <Box className={classes.wapperScoreGroup}>
                  <Typography>{goalsMeta.home}</Typography>
                  <Typography>:</Typography>
                  <Typography>{goalsMeta.away}</Typography>
                </Box>
              )}
            </>
          )}
        </Box>
        <Box className="center-root" flexDirection="column">
          <CardMedia image={fixture.teams.away.logo} className={classes.logo} />
          <Typography
            className={classes.boldText}
            style={{
              marginTop: 8,
            }}
          >
            {fixture.teams.away.name}
          </Typography>
        </Box>
        <Box
          className={classes.icon}
          style={{
            background:
              isHome && countEvent != maxEvent ? '#111111' : '#2C2C2F',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (!getNewEvent) return;
            if (countEvent == maxEvent) return;
            getNewEvent(1);
          }}
        >
          {isHome && countEvent != maxEvent && <ArrowRightIcon />}
        </Box>
      </Box>
    );
  }, [
    event.subCategory,
    isHome,
    countEvent,
    isOverDeadline,
    event.goalsMeta,
    event.listingStatus,
  ]);
  const isUserVsPool = useMemo(() => {
    const { eventType } = JSON.parse(event.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return eventType != WhoTakeWith.USER_USER;
  }, [event.metadata]);
  const isAffiliate = useMemo(() => {
    const { eventType } = JSON.parse(event.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return eventType == WhoTakeWith.AFFILIATE;
  }, [event.metadata]);
  const renderMarketType = useMemo(() => {
    const { eventType: type } = JSON.parse(event.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    const options = JSON.parse(event.options) as string[];
    if (
      event.marketType == MarketType.OVER_UNDER &&
      type == WhoTakeWith.USER_USER
    )
      return ` - Total ${options[0].replace('<', '')}`;
    return '';
  }, [event.marketType, event.metadata, event.options]);
  const renderPoolValues = (amount: any, isUvP?: boolean) => {
    const result = Object.keys(amount)
      .filter((a) => !!Number(amount[a] || '0'))
      .map((p, i) => {
        return `${convertThousandSeperator(
          convertWeiToToken(
            isUvP
              ? new Decimal(amount[p])
                  .div(1 - UVP_PLATFORM_FEE)
                  .toNumber()
                  .toLocaleString('fullwide', { useGrouping: false })
              : amount[p],
          ),
        )} ${getNameToken(p)} `;
      });
    if (result.length == 0)
      return <Typography className={classes.priceText}>0</Typography>;
    return result.map((t, i) => {
      return (
        <Box
          key={i}
          display="flex"
          flexDirection="column"
          alignItems={isMobile ? 'flex-start' : 'flex-end'}
        >
          <Typography className={classes.priceText}>{t}</Typography>
        </Box>
      );
    });
    // return result.join(' & ') || '0';
  };
  const renderPool = () => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={isMobile ? 'space-between' : 'flex-end'}
        width={isMobile ? '100%' : 'unset'}
        alignItems={isMobile ? 'unset' : 'flex-end'}
      >
        <Box
          display="flex"
          mt={isMobile ? 1 : 0}
          minWidth={isMobile ? '170px' : 'unset'}
        >
          <Typography>Predicted pool:</Typography>
          <Typography className={classes.priceText}>
            {renderPoolValues(event.predictionTokenAmounts, isUserVsPool)}
          </Typography>
        </Box>
        <Box display="flex" mt={1} mb={isMobile ? 1 : 0}>
          {isAffiliate ? (
            <Typography
              style={{
                textAlign: 'right',
                color: '#BDBDBD',
              }}
            >
              Decentralized liquidity pool provides liquidity for this event
            </Typography>
          ) : (
            <>
              <Typography>
                {isUserVsPool ? 'Liquidity' : 'Prize'} pool:
              </Typography>
              <Typography className={classes.priceText}>
                {renderPoolValues(event.poolTokenAmounts)}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    );
  };
  const renderPredictZone = useMemo(() => {
    return (
      <Box
        className={classes.wapperPredict}
        style={{
          paddingTop: isHome ? 12 : 24,
        }}
      >
        <Box className={classes.wapper}>
          {/* <Typography className={classes.boldText}>{event.name}</Typography> */}
          <Box display="flex" alignItems="center">
            <Typography style={{ marginRight: 16 }}>{`${
              event?.marketType == MarketType.TRUE_FALSE
                ? 'Yes / No'
                : event?.marketType
            } ${renderMarketType} `}</Typography>
            {!isHome && event.listingStatus == EEventStatus.PREDICTED && (
              <EventStatus
                className={classes.status}
                status={event.listingStatus}
                isPro
              />
            )}
          </Box>

          <Box
            display={event?.marketType == MarketType.OVER_UNDER ? '' : 'flex'}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <ListOption event={event} />
          </Box>
        </Box>
        <Box className={classes.wapper1}>
          {!isMobile ? (
            renderPool()
          ) : (
            <Box display="flex" justifyContent="space-between" width="100%">
              {renderPool()}
            </Box>
          )}
          <Participants
            participant={event.numParticipants}
            views={event.views}
          />
        </Box>
      </Box>
    );
  }, [event, isMobile, isHome, isAffiliate, UVP_PLATFORM_FEE]);
  return (
    <Box
      className={clsx(classes.wapperBody)}
      onClick={() => {
        history.push(`/detail-event/${event.id}`);
      }}
    >
      {isHome && renderLogo}
      {renderPredictZone}
    </Box>
  );
};

export default ProEventBody;
