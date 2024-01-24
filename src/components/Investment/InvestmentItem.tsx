import {
  Box,
  Button,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import dayjs from 'dayjs';
import Decimal from 'decimal.js';
import { convertThousandSeperator, getELPOwn, getNFTThumbnail } from 'helpers';
import { useGetCurrentNav } from 'hooks/useGetCurrentNav';
import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { NFT } from 'types/nft';

interface IProps {
  data: NFT;
}

const InvestmentItem = ({ data }: IProps) => {
  const classes = useStyles();
  const history = useHistory();
  const currentNav = useGetCurrentNav();

  const getProfit = useMemo(() => {
    if (!currentNav) return 0;
    return new Decimal(currentNav)
      .div(data.buyNav)
      .minus(1)
      .mul(100)
      .toString();
  }, [currentNav, data.buyNav]);

  const onRedirect = (id: number) => {
    history.push(`/nft-detail/${id}`);
  };

  return (
    <Box className={classes.container}>
      <Box>
        <Box className={classes.header}>
          {/* <Typography>For sale</Typography>
          <Typography>/ 1 Offer</Typography> */}
        </Box>
        <Box className={classes.body} onClick={() => onRedirect(data.id)}>
          <Box className={classes.wrapperImage}>
            <CardMedia
              image={getNFTThumbnail(data.buyAmount)}
              className={classes.img}
            >
              <Typography
                style={{ fontSize: 10, fontWeight: 500, marginBottom: 8 }}
              >{`#${data.id}`}</Typography>
            </CardMedia>
          </Box>
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
                  new Decimal(currentNav)
                    .mul(getELPOwn(data.buyAmount))
                    .toString(),
                )} EFUN`}
              </Typography>
            </Box>
            <Box className={classes.wrapper2}>
              <Typography>NAV at min date:</Typography>
              <Typography>{`${convertThousandSeperator(
                data.buyNav,
              )} EFUN`}</Typography>
            </Box>
            <Box className={classes.wrapper2}>
              <Typography>Mint date</Typography>
              <Typography>
                {dayjs(new Date(+data.buyTimestamp * 1000)).format(
                  'DD/MM/YYYY',
                )}
              </Typography>
            </Box>
            <Button
              className={classes.viewDetailBtn}
              onClick={() => onRedirect(data.id)}
            >
              View Details
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InvestmentItem;

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'center',
      '&>div': {
        width: 572,
      },
    },
    [theme.breakpoints.down('sm')]: {
      '&>div': {
        width: '100%',
      },
    },
  },
  header: {
    display: 'flex',
    backgroundColor: '#2C2C2F',
    padding: '4px 8px',
    minHeight: '25px',
    '&>p:first-child': {
      fontSize: 14,
      color: '#17C7A7',
      fontWeight: 600,
    },
    '&>p:last-child': {
      fontSize: 14,
      fontWeight: 600,
    },
  },
  body: {
    display: 'flex',
    padding: '16px 8px',
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {
      padding: '16px 24px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '16px 8px',
    },
  },
  img: {
    width: 195,
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      width: 300,
      height: 180,
    },
    [theme.breakpoints.down('md')]: {
      width: 160,
      height: 100,
    },
  },
  wrapperImage: {},
  wrapperInfo: {
    display: 'flex',
    marginBottom: 16,
    zIndex: 2,
    width: 156,
    justifyContent: 'space-between',
    '&>p': {
      fontSize: 14,
      fontWeight: 600,
    },
    [theme.breakpoints.down('sm')]: {
      width: 120,
      '&>p': {
        fontSize: 12,
        fontWeight: 600,
      },
    },
  },
  wrapperDetail: {
    marginLeft: 8,
    [theme.breakpoints.down('md')]: {
      marginLeft: 24,
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
  viewDetailBtn: {
    color: '#29B6F6',
    fontSize: 14,
  },
  headerInfo: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    width: '100%',
    justifyContent: 'space-between',
    padding: 16,
    alignContent: 'center',
  },
  logo: {
    height: 12,
    width: 60,
    backgroundSize: 'contain',
    [theme.breakpoints.down('sm')]: {
      height: 10,
      width: 52,
    },
  },
  liquidityTxt: {
    fontSize: 10,
    [theme.breakpoints.down('sm')]: {
      fontSize: 8,
    },
  },
}));
