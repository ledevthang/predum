import { Box, Button, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import CommonTooltip from 'components/common/CommonTooltip';
import CommonTooltipMobile from 'components/common/CommonTooltipMobile';
import Decimal from 'decimal.js';
import { convertThousandSeperator } from 'helpers';
import { useGetCapacity } from 'hooks/useGetCapacity';
import { useGetCurrentNav } from 'hooks/useGetCurrentNav';
import InfoIcon from 'icon/InfoIcon';
import theme from 'material';
import React, { useEffect, useMemo, useState } from 'react';
import { isProd } from 'services/wallet';

interface IProps {
  valueToday?: string;
  capacityToday?: string;
  setChartYpe: (value: 'NAV' | 'Pool') => void;
  chartType: 'NAV' | 'Pool';
}

const AdditionalInfo = ({
  valueToday,
  capacityToday,
  setChartYpe,
  chartType,
}: IProps) => {
  const classes = useStyles();
  const currentNav = useGetCurrentNav();
  const capacity = useGetCapacity();
  const [isSCFail, setIsSCFail] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const getNAVPercentage = useMemo(() => {
    if (!valueToday) return '0';
    if (currentNav == 0) return 0;
    const res = new Decimal(currentNav)
      .div(valueToday)
      .minus(1)
      .mul(100)
      .toNumber();
    if (res == 0) return '0';
    if (res > 0) return `+ ${res.toFixed(3)}`;
    return res.toFixed(3);
  }, [valueToday, currentNav]);

  const getPoolPercentage = useMemo(() => {
    if (!capacityToday) return '0';
    if (currentNav == 0) return 0;
    const res = new Decimal(capacity * currentNav)
      .div(capacityToday)
      .minus(1)
      .mul(100)
      .toNumber();
    if (res == 0) return '0';
    if (res > 0) return `+ ${res.toFixed(3)}`;
    return res.toFixed(3);
  }, [capacityToday, capacity, currentNav]);
  const switchNetwork = async () => {
    let currentChain = await window.ethereum.request({ method: 'eth_chainId' });
    if (isProd) {
      if (currentChain == '0xa4b1') {
        setIsSCFail(false);
        return;
      }
      setIsSCFail(true);
    } else {
      if (currentChain == '0x66eed') {
        setIsSCFail(false);
        return;
      }
      setIsSCFail(true);
    }
  };
  useEffect(() => {
    switchNetwork();
  }, []);

  return (
    <Box className={classes.container}>
      <Box className={classes.wrapper1}>
        <Box
          className={clsx(classes.wrapper2, {
            [classes.nWapper]: +getNAVPercentage < 0,
          })}
        >
          <Typography>NAV</Typography>
          {isDesktop ? (
            <CommonTooltip title="NAV is the value of one ELP token. This NAV value will change depending on how well the liquidity pool perform.">
              <InfoIcon width={14} height={14} />
            </CommonTooltip>
          ) : (
            <CommonTooltipMobile title="NAV is the value of one ELP token. This NAV value will change depending on how well the liquidity pool perform.">
              <InfoIcon width={14} height={14} />
            </CommonTooltipMobile>
          )}
          <Typography>
            :{'  '}
            {currentNav == 0
              ? currentNav
              : convertThousandSeperator(currentNav)}{' '}
            EFUN
          </Typography>
          {!isSCFail && <Typography>{getNAVPercentage}%</Typography>}
        </Box>
        <Button
          className={clsx(classes.button, {
            [classes.activeChart]: chartType == 'NAV',
          })}
          onClick={() => setChartYpe('NAV')}
        >
          View chart
        </Button>
      </Box>
      <Box className={classes.wrapper1}>
        <Box
          className={clsx(classes.wrapper, {
            [classes.nWapper]: +getPoolPercentage < 0,
          })}
        >
          <Typography>Pool Cap:</Typography>
          <Typography>
            {currentNav == 0
              ? currentNav
              : convertThousandSeperator(capacity * currentNav)}{' '}
            EFUN
          </Typography>
          {!isSCFail && <Typography>{getPoolPercentage}%</Typography>}
        </Box>
        <Button
          className={clsx(classes.button, {
            [classes.activeChart]: chartType == 'Pool',
          })}
          onClick={() => setChartYpe('Pool')}
        >
          View chart
        </Button>
      </Box>
      <Box className={classes.wrapper}>
        <Typography>ELP in circulation</Typography>
        {isDesktop ? (
          <CommonTooltip title="The total PLP tokens from all the iNFTs ever minted.">
            <InfoIcon width={14} height={14} />
          </CommonTooltip>
        ) : (
          <CommonTooltipMobile title="The total PLP tokens from all the iNFTs ever minted.">
            <InfoIcon width={14} height={14} />
          </CommonTooltipMobile>
        )}
        <Typography
          style={{
            color: '#3FADD5',
          }}
        >
          : {convertThousandSeperator(capacity)}
        </Typography>
      </Box>
    </Box>
  );
};

export default AdditionalInfo;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #5A5A5E',
    padding: '24px 0px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: 16,
    },
  },
  wrapper: {
    '& svg': {
      marginTop: 6,
      marginRight: 4,
    },
    display: 'flex',
    '&>p': {
      fontSize: 18,
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
    },
    '&>p:nth-child(1)': {
      color: '#BDBDBD',
      marginRight: 4,
    },
    '&>p:nth-child(2)': {
      color: '#3FADD5',
      fontWeight: '600',
      marginRight: 4,
    },
    '&>p:nth-child(3)': {
      color: '#17C7A7',
      fontWeight: '600',
    },
  },
  wrapper2: {
    display: 'flex',
    '&>p': {
      fontSize: 18,
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
    },
    '& svg': {
      marginTop: 6,
      marginRight: 4,
    },
    '&>p:nth-child(1)': {
      color: '#BDBDBD',
      marginRight: 4,
    },
    '&>p:nth-child(3)': {
      color: '#3FADD5',
      fontWeight: '600',
      marginRight: 4,
    },
    '&>p:nth-child(4)': {
      color: '#17C7A7',
      fontWeight: '600',
    },
  },
  nWapper: {
    '&>p:nth-child(3)': {
      color: '#c71d17',
    },
  },
  wrapper1: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },
  button: {
    color: '#29B6F6',
    fontSize: 14,
  },
  activeChart: {
    textDecoration: 'underline !important',
  },
}));
