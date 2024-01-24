import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import clsx from 'clsx';

interface IProps {
  bets: any[];
}

const RecentBetItem = ({ bets }: IProps) => {
  const classes = useStyles();

  return (
    <Box>
      {bets.map((b, i) => (
        <Box
          className={clsx(classes.itemBet, {
            [classes.betWithBorder]: i % 2 == 0,
          })}
          key={b}
        >
          <Box className={classes.wrapper1}>
            <Box className={classes.address}>0xaa...abcd</Box>
            <Box className={classes.time}>
              <Typography>30/05/2022</Typography>
              <Typography>14:05</Typography>
            </Box>
          </Box>
          <Typography className={classes.recentName}>
            Liverpool vs Benfica
          </Typography>
          <Typography className={classes.yourPrediction}>
            Your Prediction
          </Typography>
          <Box className={classes.wrapperMain}>
            <Box className={classes.recentOdd}>1.3</Box>
            <Box className={classes.recentOption}>
              <Typography>Arsenal</Typography>
              <Typography>1x2</Typography>
            </Box>
            <Typography className={classes.recentTotal}>1000 EFUN</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default RecentBetItem;
