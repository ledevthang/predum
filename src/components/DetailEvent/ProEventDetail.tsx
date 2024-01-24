import { Box } from '@material-ui/core';
import React from 'react';
import { useStyles } from './ProEventDetailStyles';
import ListPredictOption from '../ProEventPrediction/ListPredictOption';

const ProEventDetail = () => {
  const classes = useStyles();
  return (
    <Box>
      <ListPredictOption disabledSelect />
    </Box>
  );
};

export default ProEventDetail;
