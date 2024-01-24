import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { usePlatformFee } from 'hooks/usePlatformFee';

const StatisticCommission = () => {
  const classes = useStyles();
  const { uvpPlatformFee: UVP_PLATFORM_FEE } = usePlatformFee();

  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>Statistic</Typography>
      <Box className={classes.commission}>
        <Typography>Potential commission:</Typography>
        <Typography>{UVP_PLATFORM_FEE * 100}%</Typography>
      </Box>
    </Box>
  );
};

export default StatisticCommission;

const useStyles = makeStyles((theme) => ({
  container: {
    background: '#1C1C1E',
    padding: '24px 20px',
    margin: '12px 0px',
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 8,
  },
  commission: {
    display: 'flex',
    '&>p:first-child': {
      color: '#BDBDBD',
    },
    '&>p:last-child': {
      fontWeight: 600,
      marginLeft: 4,
    },
  },
}));
