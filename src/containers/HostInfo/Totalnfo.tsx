import { Box, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { convertThousandSeperator, getNameToken } from 'helpers';
import MoneyBagIcon from 'icon/hostClub/MoneyBagIcon';
import TeamIcon from 'icon/hostClub/TeamIcon';
import TicketIcon from 'icon/hostClub/TicketIcon';
import TwoSport from 'icon/hostClub/TwoSport';
import { HostData } from 'types/hostState';

const TotalInfo = ({ hostState }: { hostState: HostData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [hostInfo, setHostInfo] = useState<any>([]);
  useEffect(() => {
    let totalEvent = hostState.numEvents;
    let temp = [
      {
        name: 'Total games',
        value: totalEvent,
        icon: <TwoSport />,
      },
      {
        name: 'Total pool',
        value: hostState.numPool,
        icon: <MoneyBagIcon />,
      },
      {
        name: 'Total Predictors',
        value: convertThousandSeperator(hostState.numPredictors),
        icon: <TeamIcon />,
      },
      {
        name: 'Total Predictions',
        value: convertThousandSeperator(hostState.numPredictions),
        icon: <TicketIcon />,
      },
    ];
    setHostInfo(temp);
  }, [hostState]);
  const elm = document.getElementById('pool');
  useEffect(() => {
    if (!elm) return;
    const scrollWidth = elm.scrollWidth;
    let isScrollLeft = true;
    let interval = setInterval(() => {
      if (!elm) return;
      if (isScrollLeft && scrollWidth !== elm?.scrollLeft) {
        elm.scrollTo(elm.scrollLeft + 1, 0);
      }
      if (elm.scrollLeft > 90) {
        elm.scrollTo(0, 0);
      }
    }, 60);
    return () => {
      clearInterval(interval);
    };
  }, [elm]);
  const renderTotalPool = () => {
    let poolArray: any = [];
    const pools = hostState.numPool;
    Object.keys(pools).forEach(function (key, i) {
      if (key != '0x0000000000000000000000000000000000000000') return;
      poolArray.push({
        name: getNameToken(key),
        value: convertThousandSeperator(
          `${pools[key]}`.length > 10 ? pools[key].toFixed(4) : pools[key],
        ),
        icon: '/images/ethCoin.png',
      });
    });
    return (
      <Box className={classes.wrapperPool} id="pool">
        {poolArray.map((o: any, i: number) => {
          return (
            <Box key={i} display="flex" alignItems="center">
              <CardMedia
                image={o.icon}
                style={{
                  width: 24,
                  height: 24,
                  marginLeft: 4,
                }}
              />
              <Typography
                className={classes.highlight}
                style={{
                  marginLeft: 4,
                  marginRight: 12,
                }}
              >
                {o.value}
              </Typography>
            </Box>
          );
        })}
      </Box>
    );
  };
  return (
    <Box display="flex">
      {hostInfo.map((o: any, i: number) => {
        return (
          <Box
            className={classes.wrapper}
            key={i}
            style={{
              marginRight: i != 3 ? 24 : 0,
            }}
          >
            <Typography
              style={{
                color: '#ABABAB',
              }}
            >
              {o.name}
            </Typography>
            {typeof o.value == 'string' && (
              <Typography className={classes.highlight}>{o.value}</Typography>
            )}
            {typeof o.value == 'object' && renderTotalPool()}
            {o.icon}
          </Box>
        );
      })}
    </Box>
  );
};

export default TotalInfo;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: 170,
    height: 125,
    background: '#1C1C1E',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flexDirection: 'column',
    '& svg': {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: 68,
      height: 60,
    },
  },
  highlight: {
    fontSize: 24,
    fontWeight: 600,
    color: '#FBC02D',
  },
  wrapperPool: {
    width: '100%',
    height: 40,
    zIndex: 2,
    display: 'flex',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));
