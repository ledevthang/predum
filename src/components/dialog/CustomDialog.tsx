import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const CustomDialog = ({ content }: { content: string }) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.container, 'center-root')}>{content}</Box>
  );
};
export default CustomDialog;
const useStyles = makeStyles((theme) => ({
  container: {
    width: 300,
    height: 100,
    backgroundColor: '#5A5A5E',
  },
}));
