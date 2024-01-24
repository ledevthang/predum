import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import RenderIConByCategory from 'components/common/RenderIConByCategory';
import ShareEventDialog from 'components/DetailEvent/ShareEventDialog';
import Decimal from 'decimal.js';
import {
  convertThousandSeperator,
  convertTime,
  convertWeiToToken,
  getNameToken,
  renderShortAddress,
} from 'helpers';
import { usePlatformFee } from 'hooks/usePlatformFee';
import ShiedTickIcon from 'icon/SheildTickIcon';
import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { IEvent } from 'types/event';
import { MarketType, WhoTakeWith } from 'types/hostPrediction';
import { useStyles } from './EventItemStyles';
import ListOption from './ListOption';
import eventService from 'services/event';
import Participant from './Participant';
import React from 'react';
import TooltipTypography from 'components/common/TooltipTypography';
import ResultByChainLink from './ResultByChainLink';
import Countdown from 'react-countdown';
import EventDefaultThumbnail from './EventDefaultThumbnail';
import { updateEventSuccessAction } from 'store/actions/eventActions';
import { getSideBarState } from 'store/selectors';

interface IProps {
  event: IEvent;
  isHome?: boolean;
}

const EventItem = ({ event, isHome }: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [time, setTime] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const history = useHistory();
  const sideBarState = useSelector(getSideBarState);
  const dispatch = useDispatch();
  const { uvpPlatformFee: UVP_PLATFORM_FEE } = usePlatformFee();
  const onShowDetail = useCallback(() => {
    if (history.location.pathname == `/detail-event/${event.id}`) return;
    if (history.location.pathname.includes('host-info')) {
      history.push(`/detail-event/${event.id}`, {
        address: event.address,
        nickname: event.userNickname,
      });
    } else history.push(`/detail-event/${event.id}`);
  }, [history, event.id]);

  const isShowCountDown = useMemo(() => {
    let time = new Date(event.deadline).getTime() - new Date().getTime();
    if (0 < time && time < 24 * 60 * 60 * 1000) {
      setIsShow(true);
      setTime(time);
      return true;
    }
    setIsShow(false);
    return false;
  }, [event]);

  const renderCategory = useMemo(() => {
    return (
      event.subCategory && (
        <Box className={clsx(classes.category, { 'center-root': isHome })}>
          <RenderIConByCategory category={event.subCategory} color="#BDBDBD" />
          <Typography>{event.subCategory}</Typography>
        </Box>
      )
    );
  }, [event.subCategory, classes.category, isHome]);

  const onShowShareDialog = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: true,
        component: <ShareEventDialog />,
      }),
    );
  }, [dispatch]);

  const renderFollowAndShareButton = useMemo(() => {
    return (
      <Box className={classes.wrapperButton}>
        {/* <Button>Follow</Button> */}
        <Button onClick={onShowShareDialog}>Share</Button>
      </Box>
    );
  }, [classes.wrapperButton, onShowShareDialog]);

  const isWrapperOverUnder = useMemo(() => {
    const { eventType: type } = JSON.parse(event.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return (
      event.marketType == MarketType.OVER_UNDER && type != WhoTakeWith.USER_USER
    );
  }, [event]);

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

  const handleClickHostAddress = (address: string) => {
    history.push(`/host-info/${address}`);
  };
  const renderDeadlineAndEndTime = useMemo(() => {
    return (
      <Box className={classes.wrapperDateTime}>
        <Box className={classes.deadlineItem}>
          <Typography>Deadline:</Typography>
          <Typography>{`${convertTime(event.deadline)}`}</Typography>
        </Box>
        <Box className={classes.deadlineItem}>
          <Typography>EndTime:</Typography>
          <Typography>{`${convertTime(event.endTime)}`}</Typography>
        </Box>
      </Box>
    );
  }, [event.deadline, event.endTime]);

  const isUserVsUser = useMemo(() => {
    const { eventType } = JSON.parse(event.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return eventType == WhoTakeWith.USER_USER;
  }, [event.metadata]);

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
  const isProUvP = (event: IEvent) => {
    const { eventType } = JSON.parse(event?.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return (
      eventType != WhoTakeWith.USER_USER &&
      event?.pro != 0 &&
      JSON.parse(event?.metadata || '{}').fixtureMeta
    );
  };

  const renderPoolValuesMobile = useCallback(
    (amount: any, isUvP?: boolean) => {
      const result = Object.keys(amount)
        .filter((a) => !!Number(amount[a] || '0'))
        .map((b, i) => (
          <Typography key={i}>
            {`${convertThousandSeperator(
              convertWeiToToken(
                isUvP
                  ? new Decimal(amount[b])
                      .div(1 - UVP_PLATFORM_FEE)
                      .toNumber()
                      .toLocaleString('fullwide', { useGrouping: false })
                  : amount[b],
              ),
            )} ${getNameToken(b)} `}
          </Typography>
        ));
      return Object.keys(amount).length != 0 ? (
        result
      ) : (
        <Typography>0</Typography>
      );
    },
    [UVP_PLATFORM_FEE],
  );
  const onCompleteCountDown = async () => {
    setIsShow(false);
    const newEvent = await eventService.GetEventDetail(`${event.id}`);
    dispatch(updateEventSuccessAction(newEvent));
  };
  const renderAddressAndStatus = () => {
    return (
      <Box className={classes.wrapper3}>
        <Box className={clsx(classes.wrapperAddressAndStatus)}>
          <Typography
            className="center-root"
            style={{
              fontSize: 14,
            }}
          >
            {event.isUserVerified && <ShiedTickIcon />} Hosted by{' '}
          </Typography>
          <Typography
            className={clsx('center-root', {
              [classes.underline]: history.location.pathname == '/',
            })}
            onClick={() => handleClickHostAddress(event.address)}
            style={{
              fontSize: 14,
            }}
          >
            {event?.userNickname
              ? event.userNickname
              : event.address && renderShortAddress(event.address, 4, 4)}
          </Typography>
          <Participant
            participant={event.numParticipants}
            status={event.listingStatus}
            views={event.views}
          />
        </Box>
        {event.pro != 0 && <ResultByChainLink metadata={event.metadata} />}
      </Box>
    );
  };

  return (
    <>
      <Box className={classes.headerEvent}>
        <Typography>{event.category}</Typography>
        {renderCategory}
      </Box>
      <Box
        className={clsx(classes.container, { [classes.containerHome]: isHome })}
      >
        {!isMobile && isHome && (
          <Box className={classes.wapperCountDown}>
            {event && <EventDefaultThumbnail event={event} />}
            {isShowCountDown && isShow && (
              <Box className={classes.countDown}>
                <Typography>
                  {
                    <Countdown
                      date={Date.now() + time}
                      renderer={({ hours, minutes, seconds }: any) => {
                        if (Number(hours) < 10) hours = `0${hours}`;
                        if (Number(minutes) < 10) minutes = `0${minutes}`;
                        if (Number(seconds) < 10) seconds = `0${seconds}`;
                        return (
                          <span>
                            {hours}:{minutes}:{seconds}
                          </span>
                        );
                      }}
                      onComplete={() => {
                        onCompleteCountDown();
                      }}
                    />
                  }
                </Typography>
                <Typography>Till deadline</Typography>
              </Box>
            )}
          </Box>
        )}
        <Box className={classes.wrapper}>
          {isMobile && renderAddressAndStatus()}
          <Box className={classes.wrapperMobile}>
            {isMobile && isHome && (
              <Box onClick={onShowDetail}>
                {/* <CardMedia image={event.thumbnailUrl} className={classes.img} />
                 */}
                {event && <EventDefaultThumbnail event={event} />}
                {isShowCountDown && isShow && (
                  <Box
                    className={clsx(classes.countDown, {
                      [classes.countDownPro]: event.pro == 0,
                    })}
                  >
                    <Typography>
                      {
                        <Countdown
                          date={Date.now() + time}
                          renderer={({ hours, minutes, seconds }: any) => {
                            if (Number(hours) < 10) hours = `0${hours}`;
                            if (Number(minutes) < 10) minutes = `0${minutes}`;
                            if (Number(seconds) < 10) seconds = `0${seconds}`;
                            return (
                              <span>
                                {hours}:{minutes}:{seconds}
                              </span>
                            );
                          }}
                          onComplete={() => {
                            onCompleteCountDown();
                          }}
                        />
                      }
                    </Typography>
                    <Typography>Till deadline</Typography>
                  </Box>
                )}
              </Box>
            )}
            <Box
              className={clsx({
                [classes.wrapper2]: isHome,
                [classes.wrapper2NotHome]: !isHome,
              })}
            >
              <Box
                className={clsx(classes.header, {
                  [classes.headerHome]: isHome,
                })}
              >
                {!isMobile && renderAddressAndStatus()}
                {/* {isHome && renderCategory} */}
                {!isHome && renderFollowAndShareButton}
              </Box>
              <Box className={classes.description}>
                {/* {!isHome && renderCategory} */}
                <TooltipTypography
                  onClick={onShowDetail}
                  text={
                    isProUvP(event) ? event.name : event.shortDescription || ''
                  }
                />
                <TooltipTypography
                  onClick={onShowDetail}
                  className={classes.description2}
                  text={
                    isProUvP(event) ? event.shortDescription || '' : event.name
                  }
                />
              </Box>
              <Box>{!isMobile && renderDeadlineAndEndTime}</Box>
            </Box>
          </Box>
          {isMobile && renderDeadlineAndEndTime}
          <Box className={classes.multipleChoices}>
            <Typography>{`${
              event?.marketType == MarketType.TRUE_FALSE
                ? 'Yes / No'
                : event?.marketType
            } ${renderMarketType} `}</Typography>
            <Box
              className={clsx(classes.wrapperChoice, {
                [classes.wrapperOverUnder]: isWrapperOverUnder,
                [classes.wrapperChoiceHome]: isHome,
                [classes.wrapperChoiceDetail]: !isHome,
              })}
            >
              <ListOption event={event} isCountDownEnd={isShow} />
            </Box>
          </Box>
          <Box className={classes.deadline}>
            {renderPoolValues(event.poolTokenAmounts) != '0' && (
              <Box className={classes.totalPool}>
                <Typography>
                  Total {isUserVsUser ? 'prize' : 'liquidity'} pool:
                </Typography>
                <Typography className={classes.priceText}>
                  {renderPoolValues(event.poolTokenAmounts)}
                </Typography>
                <Box className={classes.wrapperLiquidityMobile}>
                  {renderPoolValuesMobile(event.poolTokenAmounts)}
                </Box>
              </Box>
            )}
            <Box className={classes.totalPool}>
              <Typography>Total predict pool:</Typography>
              <Typography className={classes.priceText}>
                {renderPoolValues(event.predictionTokenAmounts, !isUserVsUser)}
              </Typography>
              <Box className={classes.wrapperLiquidityMobile}>
                {renderPoolValuesMobile(
                  event.predictionTokenAmounts,
                  !isUserVsUser,
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default memo(EventItem);
