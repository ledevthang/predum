import { Box, makeStyles } from '@material-ui/core';
import React, { useMemo } from 'react';

import CommonStepper from 'components/common/CommonStepper';

const StepHomePage = () => {
  const classes = useStyles();
  const steps = useMemo(() => {
    return [
      {
        id: 1,
        label: 'Connect Wallet',
      },
      {
        id: 2,
        label: 'Find Prediction games',
      },
      {
        id: 3,
        label: 'Place predict',
      },
      {
        id: 4,
        label: 'Claim winning',
      },
    ];
  }, []);
  return (
    <Box
      width="100%"
      className="center-root"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 2,
      }}
    >
      <CommonStepper
        steps={steps}
        isShowAll
        activeStep={1}
        isHome
        className={classes.steps}
      />
    </Box>
  );
};
export default StepHomePage;
const useStyles = makeStyles((theme) => ({
  steps: {
    maxWidth: 400,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 340,
    },
  },
}));
