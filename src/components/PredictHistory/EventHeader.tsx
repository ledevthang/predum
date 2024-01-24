import React from 'react';
import { Box, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { IEvent } from 'types/event';
import ShiedTickIcon from 'icon/SheildTickIcon';
import { convertTime, renderShortAddress } from 'helpers';
import RenderIConByCategory from 'components/common/RenderIConByCategory';
import theme from 'material';
import WarningIcon from 'icon/WariningIcon';
import ResultByChainLink from 'components/Event/ResultByChainLink';

interface IEventHeader {
  host: IEvent;
  isHaveReport?: boolean;
}

const EventHeader = ({ host, isHaveReport }: IEventHeader) => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const classes = useStyles();
  return (
    <>
      <Box className={classes.header}>
        <Box className={classes.wrapper}>
          <Box display="flex">
            <Box className={classes.hostBy}>
              {host.isUserVerified ? <ShiedTickIcon /> : <WarningIcon />}
              <Typography>
                Hosted by{' '}
                {host?.userNickname
                  ? host.userNickname
                  : host && renderShortAddress(host.address, 4, 4)}
              </Typography>
            </Box>
            <Box className={classes.time}>
              <Typography>Time:</Typography>
              <Typography>
                {host && `${convertTime(host.createdAt)}`}
              </Typography>
            </Box>
          </Box>
          <Box display="flex">
            {host?.transactionId && (
              <Box
                className={classes.transaction}
                onClick={() => {
                  window.open(`https://arbiscan.io/tx/${host.txId}`, '_blank');
                }}
              >
                <Typography>Transaction:</Typography>
                <Typography>
                  {host.blockNumber || host.transactionId}
                </Typography>
              </Box>
            )}
            {host?.subCategory && (
              <Box className={classes.category}>
                <RenderIConByCategory
                  category={host.subCategory}
                  color="#BDBDBD"
                />
                <Typography>{host.subCategory}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {host.pro != 0 && <ResultByChainLink metadata={host.metadata} />}
    </>
  );
};

export default EventHeader;

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    '& p': {
      lineHeight: '17px',
      fontSize: 14,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
        lineHeight: '14px',
      },
    },
    '& div > button': {
      marginBottom: 10,
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  wrapper: {
    display: 'flex',
    '&>div': {
      marginBottom: 10,
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  hostBy: {
    display: 'flex',
    marginRight: 48,
    alignItems: 'center',
    '&>svg': {
      height: 16,
      width: 16,
      marginRight: 4,
    },
    '&>p': {
      color: '#BDBDBD',
    },
    '&>p:first-child': {
      cursor: 'pointer',
    },
    [theme.breakpoints.down('md')]: {
      marginRight: 24,
    },
  },
  time: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 48,
    '&>p:first-child': {
      color: '#BDBDBD',
      marginRight: 4,
    },
    [theme.breakpoints.down('md')]: {
      marginRight: 24,
    },
  },
  transaction: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: 48,
    '&>p:first-child': {
      color: '#BDBDBD',
      marginRight: 4,
    },
    '&>p:last-child': {
      color: '#3FADD5',
    },
    '&>a': {
      background: 'linear-gradient(90deg, #FBC02D 0%, #FACF66 100%)',
      textDecoration: 'underline',
      backgroundClip: 'text',
      textFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    [theme.breakpoints.down('md')]: {
      marginRight: 24,
    },
  },
  category: {
    display: 'flex',
    alignItems: 'center',
    '&>svg': {
      width: 16,
      height: 16,
      marginRight: 8,
    },
    '&>p': {
      color: '#BDBDBD',
    },
  },
}));
