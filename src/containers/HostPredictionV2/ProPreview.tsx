import { Box, makeStyles } from '@material-ui/core';
import FeeReview from 'components/HostPredictionV2/FeeReview';
import ListPredictOption from 'components/ProEventPrediction/ListPredictOption';
import ReviewInfluencer from 'components/ProEventPrediction/ReviewInfluencer';
import React from 'react';
import { useSelector } from 'react-redux';
import { getDescription } from 'store/selectors';

const ProPreview = () => {
  const description = useSelector(getDescription);
  const classes = useStyles();
  return (
    <Box width="100%">
      <ReviewInfluencer shouldEditBanner={false} />
      <Box className={classes.description}>{description}</Box>
      <FeeReview />
      <ListPredictOption disabledSelect />
    </Box>
  );
};

export default ProPreview;

const useStyles = makeStyles((theme) => ({
  description: {
    backgroundColor: '#1C1C1E',
    marginTop: 24,
    padding: 24,
    [theme.breakpoints.down('sm')]: {
      marginTop: 20,
      padding: 16,
    },
  },
}));
