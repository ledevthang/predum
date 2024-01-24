import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './WalletStyles';
import { convertThousandSeperator } from 'helpers';

interface IProps {
  viewCount: number;
}

const Wallet = ({ viewCount }: IProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Typography className={classes.name}>Wallet</Typography>
      <Box className={classes.wrapperCount}>
        <Typography>New wallet</Typography>
        <Typography>{convertThousandSeperator(viewCount)}</Typography>
      </Box>
    </Box>
  );
};

export default Wallet;
