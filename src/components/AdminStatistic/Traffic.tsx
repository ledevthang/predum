import React from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './TrafficStyles';

const Traffic = () => {
  const classes = useStyles();
  return <Box className={classes.container}></Box>;
};

export default Traffic;
