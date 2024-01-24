import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getFixtureSelected } from 'store/selectors';
import OverViewMatch from './OverViewMatch';
import { useStyles } from './ReviewInfluencerStyle';
import React from 'react';

interface IProps {
  shouldEditBanner: boolean;
}

const ReviewInfluencer = ({ shouldEditBanner }: IProps) => {
  const classes = useStyles();
  const fixture = useSelector(getFixtureSelected);

  return (
    <Box className={classes.container}>
      <OverViewMatch
        league={fixture?.league as any}
        selectedEvent={fixture}
        shouldEditBanner={shouldEditBanner}
      />
      <Box className={classes.overlay} id="overlay"></Box>
    </Box>
  );
};

export default ReviewInfluencer;
