import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import CommonLineChart from 'components/Investment/CommonLineChart';
const ChartDecentralized = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      {/* <Typography>Decentralized Liquidity Pool</Typography> */}
      <Box className={classes.chart}>
        <CommonLineChart
          data={[200, 400, 900, 1000, 700]}
          labels={['MAY', 'JUN', 'JUL', 'AUG', 'SEP']}
          title="Decentralized Liquidity Pool"
          yText="NAV"
        />
      </Box>
    </Box>
  );
};
export default ChartDecentralized;
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // '&>p': {
    //   paddingBottom: 20,
    //   fontSize: 24,
    //   fontWeight: 500,
    //   [theme.breakpoints.down('sm')]: {
    //     fontSize: 20,
    //   },
    // },
  },
  chart: {
    height: 400,
    width: '100%',
  },
}));
