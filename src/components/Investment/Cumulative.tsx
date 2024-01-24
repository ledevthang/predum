import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import Decimal from 'decimal.js';
import { convertThousandSeperator } from 'helpers';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import nftsService from 'services/nft';
import { getUserState } from 'store/selectors';

const Cumulative = () => {
  const classes = useStyles();
  const [totalAsset, setTotalAsset] = useState(0);
  const [elpOwned, setElpOwned] = useState(0);
  const userState = useSelector(getUserState);
  const { account } = useWeb3React();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const data = await nftsService.GetAllNFTs({
        pageNumber: 1,
        pageSize: 6,
        userId: `${userState.id}`,
      });
      setTotalAsset(new Decimal(data.totalAsset).div(10 ** 18).toNumber());
      setElpOwned(new Decimal(data.totalELPsOwned).div(10 ** 18).toNumber());
    })();
  }, [account, userState]);

  return (
    <Box className={clsx(classes.container, 'center-root')}>
      {/* <Box className={classes.wrapperCumulative}>
        <Box className={classes.wrapper1}>
          <Typography>{'Today’s PNL(%): '}</Typography>
          <Typography>+ 10%</Typography>
        </Box>
        <Box className={classes.wrapper1}>
          <Typography>{'7 days PNL(%): '}</Typography>
          <Typography>+ 10%</Typography>
        </Box>
        <Box className={classes.wrapper1}>
          <Typography>{'30 days PNL(%): '}</Typography>
          <Typography>+ 10%</Typography>
        </Box>
      </Box> */}
      <Box className={classes.wrapperTotal}>
        <Box className={classes.wrapper2}>
          <Typography>Total asset:</Typography>
          <Typography>
            {totalAsset == 0
              ? totalAsset
              : convertThousandSeperator(totalAsset)}{' '}
            EFUN
          </Typography>
        </Box>
        <Box className={clsx(classes.wrapper2, classes.marginLeft)}>
          <Typography>Total PLPs owned:</Typography>
          <Typography>
            {elpOwned == 0 ? elpOwned : convertThousandSeperator(elpOwned)}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.wrapperButton}>
        <Button
          className={classes.mint}
          onClick={() => {
            history.push('/nft-collection');
          }}
        >
          MINT NFT & INVEST
        </Button>
        {/* <Button className={classes.goToMarketPlace} disabled>
          GO TO MARKETPLACE
        </Button> */}
      </Box>
    </Box>
  );
};

export default Cumulative;

const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: 'column',
    marginTop: 24,
    [theme.breakpoints.down('sm')]: {
      alignItems: 'start',
      padding: 16,
    },
  },
  wrapper1: {
    display: 'flex',
    '&>p': {
      fontSize: 20,
      fontWeight: 600,
    },
    '&>p:last-child': {
      color: '#17C7A7',
      marginLeft: 12,
    },
  },
  wrapperTotal: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  wrapper2: {
    display: 'flex',
    marginTop: 12,
    '&>p:first-child': {
      fontSize: 18,
      color: '#BDBDBD',
    },
    '&>p:last-child': {
      color: '#3FADD5',
      fontSize: 18,
      marginLeft: 4,
      fontWeight: 600,
    },
  },
  marginLeft: {
    marginLeft: 40,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  wrapperButton: {
    display: 'flex',
    marginTop: 40,
  },
  mint: {
    background:
      'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
    borderRadius: 22,
    fontSize: 16,
    color: '#0B0B0E',
    fontWeight: 600,
    padding: '0px 32px !important',
    height: 44,
    [theme.breakpoints.down('sm')]: {
      height: 36,
      fontSize: 14,
      padding: '0px 28px !important',
    },
  },
  goToMarketPlace: {
    borderRadius: 22,
    fontSize: 16,
    background:
      'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    fontWeight: 600,
    border: '1px solid #3FADD5',
    marginLeft: 24,
    padding: '0px 32px !important',
    height: 44,
    [theme.breakpoints.down('sm')]: {
      height: 36,
      fontSize: 14,
    },
  },
  wrapperCumulative: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}));
