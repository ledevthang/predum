import { Box, CardMedia } from '@material-ui/core';
import EfunPrediction from 'components/EfunPrediction';
import WCMatch from 'components/WCMatch';
import React from 'react';
import { useStyles } from './styles';

const WorldCupLandingPage = () => {
  const classes = useStyles();
  return (
    <Box>
      <CardMedia image="/images/WCBanner.png" className={classes.banner} />
      <WCMatch />
      <EfunPrediction />
      {/* <Partner /> */}
    </Box>
  );
};

export default WorldCupLandingPage;
