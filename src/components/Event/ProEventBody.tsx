import {
  Box,
  Button,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import { betSlipItem } from 'components/BetSlip/betSlipItem';
import RenderIConByCategory from 'components/common/RenderIConByCategory';
import dayjs from 'dayjs';
import Decimal from 'decimal.js';
import {
  convertThousandSeperator,
  convertWeiToToken,
  getNameToken,
} from 'helpers';
import { usePlatformFee } from 'hooks/usePlatformFee';
import ArrowDownIcon from 'icon/ArrowDownIcon';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateSideBarStateAction } from 'store/actions/sideBarActions';
import { getSideBarState } from 'store/selectors';
import { IEvent } from 'types/event';
import { WhoTakeWith } from 'types/hostPrediction';
import { useStyles } from './ProEventItemStyles';
import EventStatus from './EventStatus';
import VerifyInfo from './VerifyInfo';
import ClockIcon from 'icon/ClockIcon';
import Countdown from 'react-countdown';
import TooltipTypography from 'components/common/TooltipTypography';

interface IProps {
  type: string;
  renderLabel: any;
  isSameListing?: boolean;
  fixture?: any;
  isHasScore: boolean;
  event?: IEvent;
}

const ProEventBody = ({
  type,
  renderLabel,
  isSameListing,
  isHasScore,
  event,
  fixture,
}: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { uvpPlatformFee: UVP_PLATFORM_FEE } = usePlatformFee();
  const [isEventOverDeadline, setIsEventOverDeadline] = useState(false);
  const history = useHistory();
  const sideBarState = useSelector(getSideBarState);
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const dispatch = useDispatch();
  const [activeChoiced, setActiveChoiced] = useState('');
  const renderStatus = useMemo(() => {
    // return <Box className={classes.live}>LIVE</Box>;
    let time =
      new Date(fixture?.fixture.date || '').getTime() - new Date().getTime();
    let isShowCountDown = 0 < time && time < 24 * 60 * 60 * 1000;
    if (isShowCountDown) {
      return (
        <Box className="center-root" flexDirection="column">
          <Countdown
            date={Date.now() + time}
            renderer={({ hours, minutes, seconds }: any) => {
              if (Number(hours) < 10) hours = `0${hours}`;
              if (Number(minutes) < 10) minutes = `0${minutes}`;
              if (Number(seconds) < 10) seconds = `0${seconds}`;
              return (
                <>
                  <ClockIcon />
                  <Typography>Start in</Typography>
                  <span>
                    {hours}:{minutes}:{seconds}
                  </span>
                </>
              );
            }}
          />
        </Box>
      );
    }
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography>
          {dayjs(fixture?.fixture.date || '').format('DD MMM')}
        </Typography>
        <Typography>
          {dayjs(fixture?.fixture.date || '').format('HH:mm')}
        </Typography>
      </Box>
    );
  }, [fixture]);
  const renderEventStatus = useMemo(() => {
    return event?.listingStatus ? (
      <EventStatus status={event?.listingStatus} isPro={true} />
    ) : (
      <></>
    );
  }, [event]);
  const renderPoolValues = useCallback(
    (amount: any, isUvP?: boolean) => {
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
        })
        .join(' & ');
      return result || '0';
    },
    [UVP_PLATFORM_FEE],
  );
  const isOverTime = (a: string) => {
    let time = new Date(a);
    return new Date() > time;
  };

  useEffect(() => {
    setIsEventOverDeadline(isOverTime(`${event?.deadline}`));
  }, [event?.deadline]);
  useEffect(() => {
    if (!sideBarState.isHighlightInEventItem && !event?.result) {
      setActiveChoiced('');
    }
  }, [sideBarState.isHighlightInEventItem]);
  useEffect(() => {
    if (event?.id != sideBarState.betSlipData?.id && !event?.result) {
      setActiveChoiced('');
    }
  }, [sideBarState.betSlipData?.id]);
  const onShowDetail = useCallback(() => {
    if (!event?.id) return;
    if (history.location.pathname.includes('host-info')) {
      history.push(`/detail-event/${event?.id}`, {
        address: event?.address,
      });
    } else history.push(`/detail-event/${event?.id}`);
  }, [history, event?.id, event?.address]);

  const handleClickPredictOptionItem = (
    option: string,
    index: number,
    odds?: string,
  ) => {
    if (!event) return;
    const { handicap } = JSON.parse(event.metadata || '{}') as {
      handicap: string[];
    };
    let betSlipData: betSlipItem = {
      id: event.id,
      title: event.name,
      icon: (
        <RenderIConByCategory category={event.subCategory} color="#BDBDBD" />
      ),
      subCategory: event.subCategory,
      typeBet: event.marketType,
      nameOdds: option,
      eventTotalPool: event.predictionTokenAmounts,
      address: event.address,
      marketType: event.marketType,
      chains: JSON.parse(event.metadata || '{}').tokens,
      index,
      type: event.type,
      eventType: JSON.parse(event.metadata || '{}').eventType,
      hostFee: event.hostFee,
    };
    if (odds) {
      betSlipData.odds = +odds;
    }
    if (handicap) {
      betSlipData.handicap =
        index == 0
          ? handicap[0] == '0'
            ? `-${handicap[1]}`
            : handicap[0]
          : handicap[1] == '0'
          ? `-${handicap[0]}`
          : handicap[1];
    }
    if (!isEventOverDeadline) {
      setActiveChoiced(option);
      dispatch(
        updateSideBarStateAction({
          ...sideBarState,
          betSlipData: betSlipData,
          isOpen:
            !window.location.pathname.includes('detail-event') &&
            window.innerWidth < 1326,
          isHighlightInEventItem: true,
        }),
      );
    }
  };
  const renderOdd = useMemo(() => {
    const odds = (JSON.parse(event?.odds || '') as number[]).map((o) =>
      new Decimal(o).div(10000).toString(),
    );
    const { handicap } = JSON.parse(event?.metadata || '{}') as {
      handicap: string[];
    };
    const options = JSON.parse(event?.options || '') as string[];
    switch (type) {
      case 'Home/Draw/Away':
        return (
          <Box className={classes.odd}>
            <Box
              className={clsx(classes.oddBox, {
                [classes.disabledOption]: isEventOverDeadline,
                [classes.actived]: activeChoiced == options[0],
              })}
              onClick={() =>
                handleClickPredictOptionItem(options[0], 0, odds[0])
              }
            >
              {odds[0]}
            </Box>
            <Box
              className={clsx(classes.oddBox, {
                [classes.disabledOption]: isEventOverDeadline,
                [classes.actived]: activeChoiced == options[1],
              })}
              onClick={() =>
                handleClickPredictOptionItem(options[1], 1, odds[1])
              }
            >
              {odds[1]}
            </Box>
            <Box
              className={clsx(classes.oddBox, {
                [classes.disabledOption]: isEventOverDeadline,
                [classes.actived]: activeChoiced == options[2],
              })}
              onClick={() =>
                handleClickPredictOptionItem(options[2], 2, odds[2])
              }
            >
              {odds[2]}
            </Box>
          </Box>
        );
      case 'Handicap':
        return (
          <Box className={classes.odd}>
            <Box
              className={clsx(classes.oddBox, {
                [classes.disabledOption]: isEventOverDeadline,
                [classes.actived]: activeChoiced == options[0],
              })}
              onClick={() =>
                handleClickPredictOptionItem(options[0], 0, odds[0])
              }
            >
              {odds[0]}
            </Box>
            <Typography className={classes.handicap}>
              {handicap[0]} : {handicap[1]}
            </Typography>
            <Box
              className={clsx(classes.oddBox, {
                [classes.disabledOption]: isEventOverDeadline,
                [classes.actived]: activeChoiced == options[4],
              })}
              onClick={() =>
                handleClickPredictOptionItem(options[4], 4, odds[4])
              }
            >
              {odds[4]}
            </Box>
          </Box>
        );
      case 'Over/Under':
        return (
          <Box className={classes.odd} flexDirection="column">
            <Box className={classes.wrapperOverUnder}>
              <Typography>Total</Typography>
              <Typography>Over</Typography>
              <Typography>Under</Typography>
            </Box>
            <Box className={clsx(classes.odd, classes.oddOverUnder)}>
              <Box className={clsx(classes.oddBox, classes.totalBox)}>
                {options[0].replace('<', '')}
              </Box>
              <Box
                className={clsx(classes.oddBox, {
                  [classes.disabledOption]: isEventOverDeadline,
                  [classes.actived]:
                    activeChoiced == options[1].replace('>', 'Score Over '),
                })}
                onClick={() =>
                  handleClickPredictOptionItem(
                    options[1].replace('>', 'Score Over '),
                    1,
                    odds[0],
                  )
                }
              >
                {odds[1]}
              </Box>
              <Box
                className={clsx(classes.oddBox, {
                  [classes.disabledOption]: isEventOverDeadline,
                  [classes.actived]:
                    activeChoiced == options[0].replace('<', 'Score Under '),
                })}
                onClick={() =>
                  handleClickPredictOptionItem(
                    options[0].replace('<', 'Score Under '),
                    0,
                    odds[0],
                  )
                }
              >
                {odds[0]}
              </Box>
            </Box>
          </Box>
        );
    }
  }, [type, event, isEventOverDeadline, activeChoiced]);

  const render2Teams = useMemo(() => {
    return (
      <Box className={classes.wrapperTeams} onClick={onShowDetail}>
        <Box>
          {renderStatus}
          {renderEventStatus}
        </Box>
        <Box>
          <Box className={classes.wrapperTeam}>
            <CardMedia
              image={fixture?.teams.home.logo || ''}
              className={classes.teamLogo}
            />
            <TooltipTypography text={fixture?.teams.home.name || ''} />
          </Box>
          <Typography>X</Typography>
          <Box className={classes.wrapperTeam}>
            <CardMedia
              image={fixture?.teams.away.logo || ''}
              className={classes.teamLogo}
            />
            <TooltipTypography text={fixture?.teams.away.name || ''} />
          </Box>
        </Box>
      </Box>
    );
  }, [renderStatus, fixture]);
  const isUserVsPool = useMemo(() => {
    const { eventType } = JSON.parse(event?.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return eventType != WhoTakeWith.USER_USER;
  }, [event?.metadata]);
  const CustomFooterInfo = ({
    text,
    value,
  }: {
    text: string;
    value: string;
  }) => {
    return (
      <Box className={classes.customFooter}>
        <Typography>{text}</Typography>
        <Typography>{value}</Typography>
      </Box>
    );
  };

  const renderScore = useMemo(() => {
    let goalsMeta = JSON.parse(event?.goalsMeta || '');
    // if (isSameListing) return '';
    if (goalsMeta.home == null) return '';
    return (
      <Box className={classes.score}>
        <Typography>{goalsMeta.home}</Typography>
        <Typography>-</Typography>
        <Typography>{goalsMeta.away}</Typography>
      </Box>
    );
  }, [isSameListing, event, event?.goalsMeta]);

  return (
    <Box>
      <Box className={classes.main}>
        {isSameListing ? <VerifyInfo event={event} /> : render2Teams}
        {isMobile && renderLabel}
        <Box className={classes.wrapperMain}>
          {isHasScore && renderScore}
          {renderOdd}
        </Box>
        <Button className={classes.btn} onClick={onShowDetail}>
          <ArrowDownIcon />
        </Button>
      </Box>
      <Box className={classes.footer}>
        <Box className={classes.wrapperFooter1}>
          <CustomFooterInfo
            text="Total predict pool"
            value={renderPoolValues(event?.predictionTokenAmounts || {}, true)}
          />
          <CustomFooterInfo
            text={isUserVsPool ? 'Liquidity pool' : 'Prize pool'}
            value={renderPoolValues(event?.poolTokenAmounts || {})}
          />
          <CustomFooterInfo
            text="Number of paticipants"
            value={event?.participants?.length.toString() || '0'}
          />
          <CustomFooterInfo
            text="Event views"
            value={event?.views.toString() || '0'}
          />
        </Box>
        {!isSameListing && <VerifyInfo event={event} />}
      </Box>
    </Box>
  );
};

export default ProEventBody;
