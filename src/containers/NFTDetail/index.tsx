import { Box, makeStyles, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import CommonCardNFT from 'components/common/CommonCardNFT';
import Decimal from 'decimal.js';
import localStorageUtils from 'utils/LocalStorage';
import { LocalStorageEnum } from 'enums/auth';
import { convertThousandSeperator, convertTime, getNFTIndex } from 'helpers';
import { useGetCurrentNav } from 'hooks/useGetCurrentNav';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { elpTokenABI } from 'services/contract';
import { getDetailNFTAction } from 'store/actions/nftActions';
import { getNFTDetailState } from 'store/selectors';
import Web3 from 'web3';
import ChartNFTDetail from './ChartNFTDetail';
import dayjs from 'dayjs';
const NFTDetail = () => {
  const classes = useStyles();
  const { nftId } = useParams<{ nftId: string }>();
  const currentNav = useGetCurrentNav();
  const history = useHistory();
  const nftDetail = useSelector(getNFTDetailState);
  const dispatch = useDispatch();
  const { library } = useWeb3React();
  const [elp, setElp] = useState(0);
  const getProfit = useMemo(() => {
    if (+nftDetail.buyNav == 0 || !currentNav) return 0;
    return new Decimal(currentNav)
      .div(nftDetail.buyNav)
      .minus(1)
      .mul(100)
      .toString();
  }, [currentNav, nftDetail.buyNav]);
  useEffect(() => {
    dispatch(getDetailNFTAction(+nftId, callback));
  }, [nftId]);
  const callback = (detail: any) => {
    if (
      detail.userId != 0 &&
      localStorageUtils.getItem(LocalStorageEnum.USER_ID) &&
      detail.userId.toString() !=
        (localStorageUtils.getItem(LocalStorageEnum.USER_ID) || '')
    ) {
      history.push('/');
    }
  };

  useEffect(() => {
    (async () => {
      if (!library?.provider && !window.ethereum) return;
      if (nftDetail.buyAmount == '0') return;
      const web3 = new Web3(library?.provider || window.ethereum);
      const contract = new web3.eth.Contract(
        elpTokenABI as any,
        process.env.REACT_APP_ELP,
      );
      let index = getNFTIndex(`${+nftDetail.buyAmount}`);
      const elpAmtClassMint = await contract.methods
        .elpAmtOfClass(index)
        .call();
      setElp(new Decimal(elpAmtClassMint).div(10 ** 18).toNumber());
    })();
  }, [library?.provider, getNFTIndex(`${+nftDetail.buyAmount}`), nftDetail]);
  return (
    <Box className={classes.container}>
      <Box className={classes.sellZone}>
        <ChartNFTDetail
          current={new Decimal(currentNav).toString()}
          mintPrice={new Decimal(+nftDetail.buyNav).toString()}
          startTime={dayjs(nftDetail.createdAt).add(-1, 'd').toDate()}
        />
        <Box display="flex" alignItems="center" className={classes.wapperInfo}>
          <CommonCardNFT
            index={getNFTIndex(`${+nftDetail.buyAmount}`) || 0}
            id={nftId}
          />
          <Box className={classes.wrapperDetail}>
            <Box className={classes.wrapper1}>
              <Typography>Profit / Loss</Typography>
              <Typography
                style={{
                  color: Number(getProfit) < 0 ? '#E53935' : '#17C7A7',
                }}
              >
                {`${Number(getProfit).toFixed(2)}%`}
              </Typography>
            </Box>
            <Box className={classes.wrapper2}>
              <Typography>Current asset:</Typography>
              <Typography>
                {`${convertThousandSeperator(
                  new Decimal(currentNav).mul(elp).toString(),
                )} EFUN`}
              </Typography>
            </Box>
            <Box className={classes.wrapper2}>
              <Typography>NAV at min date:</Typography>
              <Typography>{`${convertThousandSeperator(
                nftDetail.buyNav,
              )} EFUN`}</Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.detailInfo}>
          <Box className={classes.wrapper2}>
            <Typography>Mint price:</Typography>
            <Typography>
              {`${convertThousandSeperator(
                new Decimal(+nftDetail.buyNav).mul(elp).toString(),
              )} EFUN`}
            </Typography>
          </Box>
          <Box className={classes.wrapper2}>
            <Typography>Mint date:</Typography>
            <Typography>
              {convertTime(
                new Date(+nftDetail.buyTimestamp * 1000),
                'DD/MM/YYYY',
                true,
              )}
            </Typography>
          </Box>
          <Box className={classes.wrapper2}>
            <Typography>ELP owned:</Typography>
            <Typography>{convertThousandSeperator(elp)}</Typography>
          </Box>
        </Box>
        {/* <Box className={classes.wapperButton}>
          <Button
            onClick={() => {
              history.push(`/sell-nft/${nftDetail.id}`);
            }}
          >
            Sell nft
          </Button>
          <Box
            onClick={() => {
              history.push(`/cash-out/${nftDetail.id}`);
            }}
          >
            <Typography>Cash out</Typography>
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
};
export default NFTDetail;
const useStyles = makeStyles((theme) => ({
  container: {},
  sellZone: {
    padding: 20,
    backgroundColor: '#1C1C1E',
    '&>p:first-child': {
      fontSize: 28,
      lineHeight: '36px',
      fontWeight: 600,
      marginBottom: 20,
    },
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
    marginBottom: 24,
  },
  image: {
    height: 180,
    width: 300,
  },
  detailInfo: {
    width: '100%',
    borderTop: '1px solid #BDBDBD',
    marginTop: 24,
    paddingTop: 20,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
    },
  },
  wrapperDetail: {
    marginLeft: 30,
    [theme.breakpoints.down('md')]: {
      marginLeft: 24,
      [theme.breakpoints.down('sm')]: {
        marginLeft: 0,
        marginTop: 16,
      },
    },
  },
  wapperInfo: {
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
      flexDirection: 'column',
      alignItems: 'unset',
    },
  },
  wapperButton: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '&>button': {
      width: 171,
      height: 44,
      marginBottom: 16,
      border: '1px solid #3FADD5',
      borderRadius: '22px',
      marginTop: 8,
      background:
        'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
      color: '#1C1C1E',
      '& span': {
        textTransform: 'uppercase',
        fontWeight: 600,
        fontSize: 16,
      },
    },
    '&>div>p': {
      textTransform: 'uppercase',
      fontSize: 16,
      color: '#BDBDBD',
      cursor: 'pointer',
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingBottom: '20px',
    },
  },
  wrapper1: {
    display: 'flex',
    '&>p': {
      fontSize: 18,
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
    },
    '&>p:first-child': {
      fontWeight: 600,
    },
    '&>p:last-child': {
      fontWeight: 600,
      marginLeft: 12,
    },
  },
  wrapper2: {
    display: 'flex',
    '&>p': {
      fontSize: 16,
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
    '&>p:first-child': {
      color: '#BDBDBD',
    },
    '&>p:last-child': {
      fontWeight: 600,
      color: '#3FADD5',
      marginLeft: 4,
    },
  },
}));
