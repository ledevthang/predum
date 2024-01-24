import React from 'react';
import { Box } from '@material-ui/core';
import ProEventItem from './ProEventItem';
import { useStyles } from './styles';

const ListingProEvent = () => {
  const classes = useStyles();
  return (
    <Box className={classes.listProEvent}>
      {[
        'Home Draw Away',
        'Handicap',
        'Over Under',
        'Handicap',
        'Over Under',
      ].map((i, index) => (
        <ProEventItem key={index} type={i} />
      ))}
    </Box>
  );
};

export default ListingProEvent;
