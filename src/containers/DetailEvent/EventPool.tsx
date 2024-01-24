import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import CommonTooltip from 'components/common/CommonTooltip';
import CommonTooltipMobile from 'components/common/CommonTooltipMobile';
import Decimal from 'decimal.js';
import {
  convertThousandSeperator,
  convertWeiToToken,
  getNameToken,
} from 'helpers';
import { usePlatformFee } from 'hooks/usePlatformFee';
import CrytalBallIcon from 'icon/CrytalBallIcon';
import InfoIcon from 'icon/InfoIcon';
import MoneyBagIcon from 'icon/MoneyBagIcon';
import { useMemo } from 'react';
import { IEvent } from 'types/event';
import { WhoTakeWith } from 'types/hostPrediction';
import { useStyles } from './styles';

interface IProps {
  event: IEvent;
}

const EventPool = ({ event }: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { uvpPlatformFee: UVP_PLATFORM_FEE, uvuPlatformFee: P2P_PLATFORM_FEE } =
    usePlatformFee();
  const isUserVsPool = useMemo(() => {
    const { eventType } = JSON.parse(event?.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return eventType != WhoTakeWith.USER_USER;
  }, [event.metadata]);

  const eventType = useMemo(() => {
    const { eventType } = JSON.parse(event?.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return eventType;
  }, [event.metadata]);

  const renderAnnotatePrizePool = () => {
    return (
      <Box>
        <Typography>The prize that host offered to reward winners.</Typography>
        <Typography>
          The portion of prize pool winners can claim is equal to the portion of
          their predicted token amount among the total predicted token amount of
          all the users who predicted correctly.
        </Typography>
        <Typography>
          What tokens user uses to predict, he will be rewarded with the same
          tokens from the corresponding prize pool.
        </Typography>
        <Typography>
          Besides, the winners of the event can claim the prize which is the
          amount of token predicted by the losers (the users who predicted the
          wrong answers).
        </Typography>
      </Box>
    );
  };
  const renderAnnotateLiquidityPool = () => {
    return (
      <Box>
        <Typography>
          The amount of liquidity the host use to pay for winners.
        </Typography>
        <Typography>
          What tokens user uses to predict, he will be paid with the same tokens
          from the corresponding liquidity pool.
        </Typography>
      </Box>
    );
  };
  const renderPoolValues = (amount: any) => {
    let token: any = [];
    Object.keys(amount)
      .filter((a) => !!Number(amount[a] || '0'))
      .map((p, i) => {
        token.push({
          name: getNameToken(p),
          wei: convertWeiToToken(amount[p]),
        });
      });
    const result = token.map((t: any, i: number) => {
      return (
        <Box key={i} className={classes.infoItem}>
          <Typography className={classes.highlightText}>
            {convertThousandSeperator(t.wei)} {t.name}
          </Typography>
          {/* <Button onClick={() => handleBuyToken(t.name)}>BUY {t.name}</Button> */}
        </Box>
      );
    });
    return result;
  };
  const renderPredictedPoolValues = (amount: any, isUvP?: boolean) => {
    let token: any = [];
    Object.keys(amount)
      .filter((a) => !!Number(amount[a] || '0'))
      .map((p, i) => {
        token.push({
          name: getNameToken(p),
          wei: convertWeiToToken(
            isUvP
              ? new Decimal(amount[p])
                  .div(1 - UVP_PLATFORM_FEE)
                  .toNumber()
                  .toLocaleString('fullwide', { useGrouping: false })
              : amount[p],
          ),
        });
      });
    let eventToken: string[] = [];
    Object.keys(event?.poolTokenAmounts)
      .filter((a) => !!Number(event?.poolTokenAmounts[a] || '0'))
      .map((p, i) => {
        eventToken.push(getNameToken(p));
      });
    const result = token.map((t: any, i: number) => {
      return (
        <Box key={i} className={classes.infoItem}>
          <Typography className={classes.highlightText}>
            {convertThousandSeperator(t.wei)} {t.name}
          </Typography>
          {/* <Button onClick={() => handleBuyToken(t.name)}>BUY {t.name}</Button> */}
        </Box>
      );
    });
    const resultNonePredicted = eventToken.map((t: any, i: number) => {
      return (
        <Box key={i} className={classes.infoItem}>
          <Typography>0 {eventToken[i]}</Typography>
          {/* <Button onClick={() => handleBuyToken(t)}>BUY {t}</Button> */}
        </Box>
      );
    });
    if (Object.keys(event?.predictionTokenAmounts).length != 0) return result;
    else return resultNonePredicted;
  };
  return (
    <>
      <Box
        className={
          eventType != WhoTakeWith.AFFILIATE
            ? classes.wapperPool
            : classes.wapperPoolAff
        }
      >
        <Box className={classes.pool}>
          {eventType != WhoTakeWith.AFFILIATE && (
            <Box display="flex" className={classes.poolPrize}>
              <Box
                className={clsx(classes.poolItem, {
                  [classes.column]: isMobile,
                })}
              >
                <MoneyBagIcon />
                <Box>
                  <Typography>
                    {!isUserVsPool ? 'Prize Pool' : 'Liquidity pool'}
                  </Typography>
                  {isDesktop ? (
                    <CommonTooltip
                      title={
                        !isUserVsPool
                          ? renderAnnotatePrizePool()
                          : renderAnnotateLiquidityPool()
                      }
                    >
                      <InfoIcon />
                    </CommonTooltip>
                  ) : (
                    <CommonTooltipMobile
                      title={
                        !isUserVsPool
                          ? renderAnnotatePrizePool()
                          : renderAnnotateLiquidityPool()
                      }
                    >
                      <InfoIcon />
                    </CommonTooltipMobile>
                  )}
                </Box>
              </Box>
              <Box
                className={clsx(
                  classes.poolAmounts,
                  classes.column,
                  classes.spaceEvenly,
                )}
              >
                {renderPoolValues(event.poolTokenAmounts)}
              </Box>
            </Box>
          )}
          <Box display="flex">
            <Box
              className={clsx(classes.poolItem, {
                [classes.column]: isMobile,
              })}
            >
              <CrytalBallIcon />
              <Box>
                <Typography>Predicted Pool</Typography>

                {isDesktop ? (
                  <CommonTooltip title="Total amount of tokens that users have predicted in this event">
                    <InfoIcon />
                  </CommonTooltip>
                ) : (
                  <CommonTooltipMobile title="Total amount of tokens that users have predicted in this event">
                    <InfoIcon />
                  </CommonTooltipMobile>
                )}
              </Box>
            </Box>
            <Box
              className={clsx(
                classes.poolAmounts,
                classes.column,
                classes.spaceEvenly,
              )}
            >
              {renderPredictedPoolValues(
                event.predictionTokenAmounts,
                isUserVsPool,
              )}
              <Typography className={classes.note}>
                *
                {event.hostFee / 100 +
                  (isUserVsPool
                    ? UVP_PLATFORM_FEE * 100
                    : P2P_PLATFORM_FEE * 100)}
                {!isUserVsPool
                  ? `% of winner's profit will be deducted as fee`
                  : `% of total predicted amount will be deducted as fee`}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EventPool;
