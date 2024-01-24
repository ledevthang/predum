import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import DangerIcon from 'icon/DangerIcon';
import React from 'react';

interface IProps {
  reason?: string;
}

const FailedDialog = ({ reason }: IProps) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.container, 'center-root')}>
      <DangerIcon color="#cc1104" />
      <Typography>Failed!</Typography>
      {reason && <Typography>{reason}</Typography>}
    </Box>
  );
};

export default FailedDialog;
const useStyles = makeStyles((theme) => ({
  container: {
    // width: 280,
    height: 140,
    backgroundColor: '#5A5A5E',
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    '& svg': {
      height: 40,
      width: 40,
    },
  },
}));
