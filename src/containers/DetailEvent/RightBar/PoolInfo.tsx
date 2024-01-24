import {
  Box,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CommonTooltip from 'components/common/CommonTooltip';
import CommonTooltipMobile from 'components/common/CommonTooltipMobile';
import {
  convertThousandSeperator,
  convertWeiToToken,
  getNameToken,
} from 'helpers';
import { useGetCapacity } from 'hooks/useGetCapacity';
import { useGetCurrentNav } from 'hooks/useGetCurrentNav';
import InfoIcon from 'icon/InfoIcon';
import {
  getAllTokensAction,
  getAllTokensActionByJSON,
} from 'store/actions/tokensActions';
import { getEventDetail, getNewTokenState } from 'store/selectors';
import { WhoTakeWith } from 'types/hostPrediction';

import { useStyles } from './styles';

const PoolInfo = () => {
  const classes = useStyles();
  const history = useHistory();
  const event = useSelector(getEventDetail);
  const theme = useTheme();
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const currentNav = useGetCurrentNav();
  const capacity = useGetCapacity();
  const tokens = useSelector(getNewTokenState);
  const isAffiliate = useMemo(() => {
    const { eventType } = JSON.parse(event?.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return eventType == WhoTakeWith.AFFILIATE;
  }, [event?.metadata]);
  const isUserVsPool = useMemo(() => {
    const { eventType } = JSON.parse(event?.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return eventType != WhoTakeWith.USER_USER;
  }, [event?.metadata]);
  useEffect(() => {
    dispatch(getAllTokensActionByJSON());
  }, []);
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
          name: getNameToken(p) as any,
          wei: convertWeiToToken(amount[p]),
        });
      });
    let result = token.map((t: any, i: number) => {
      return (
        <Box key={i} className={classes.infoItem}>
          <Typography className={classes.highlightText}>
            {convertThousandSeperator(t.wei)}
          </Typography>
          {chains.length > 0 &&
            chains.filter((c, i) => c.value == t.name)[0].Icon}
          <Typography className={classes.highlightText}> {t.name}</Typography>
          {/* <Button onClick={() => handleBuyToken(t.name)}>BUY {t.name}</Button> */}
        </Box>
      );
    });
    if (isAffiliate) {
      result = (
        <Box className={classes.infoItem}>
          <Typography className={classes.highlightText}>
            {convertThousandSeperator(currentNav * capacity)}
          </Typography>
          <CardMedia image="/images/EfunCoin.png" className={classes.coin} />
          <Typography className={classes.highlightText}>EFUN</Typography>
          {/* <Button onClick={() => handleBuyToken(t.name)}>BUY {t.name}</Button> */}
        </Box>
      );
    }
    return result;
  };
  useEffect(() => {
    dispatch(
      getAllTokensAction({
        pageNumber: 1,
        pageSize: 20,
      }),
    );
    dispatch(getAllTokensActionByJSON());
  }, []);
  const chains = useMemo(() => {
    return tokens.map((token) => {
      return {
        value: token.name,
        id: token.address,
        Icon: <CardMedia image={token.logo} className={classes.coin} />,
      };
    });
  }, [classes.coin, tokens]);
  return (
    <Box className={classes.wrapperPool}>
      <Box className={classes.poolHeader}>
        <Typography>
          {isAffiliate
            ? 'EFUN Liquidity pool'
            : !isUserVsPool
            ? 'Prize Pool'
            : 'Liquidity pool'}
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
      <Box className={classes.poolContent}>
        {!isUserVsPool && (
          <Typography className={classes.infoText}>
            Prize pool of your selected option
          </Typography>
        )}
        {event && renderPoolValues(event?.poolTokenAmounts)}
        {!isUserVsPool && (
          <>
            <Typography className={classes.infoText}>
              The prize pool may change in the future
            </Typography>
            {/* <Typography
              className={classes.infoText}
              style={{
                color: '#029ADE',
                cursor: 'pointer',
              }}
            >
              Learn more
            </Typography> */}
          </>
        )}
      </Box>
    </Box>
  );
};
export default PoolInfo;
