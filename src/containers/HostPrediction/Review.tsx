import React, { useCallback } from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './GroupPredictDetailStyles';
import LabelInput from 'components/HostPrediction/LabelInput';
import CommonInput from 'components/common/CommonInput';
import { getReviewState } from 'store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';

const Review = () => {
  const classes = useStyles();
  const review = useSelector(getReviewState);
  const dispatch = useDispatch();

  const handleChangeStreamLink = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      dispatch(
        updateHostPredictionStateAction({
          review: {
            streamLink: newValue,
          },
        }),
      );
    },
    [dispatch],
  );

  return (
    <Box className={classes.containerReview}>
      <LabelInput
        label="Embed live stream link"
        component={
          <Box className={classes.mainReview}>
            <CommonInput
              value={review.streamLink}
              onChange={handleChangeStreamLink}
              className={classes.reviewText}
            />
          </Box>
        }
      />
    </Box>
  );
};

export default Review;
