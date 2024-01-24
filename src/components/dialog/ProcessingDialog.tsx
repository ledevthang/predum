import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const ProcessingDialog = () => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.container, 'center-root')}>Processing...</Box>
  );
};

export default ProcessingDialog;
const useStyles = makeStyles((theme) => ({
  container: {
    width: 200,
    height: 100,
    backgroundColor: '#5A5A5E',
  },
}));
