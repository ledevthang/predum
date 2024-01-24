import { Box, Typography } from '@material-ui/core';
import React from 'react';
import ListPartner from './ListPartner';
import { useStyles } from './styles';

const Partner = () => {
  const classes = useStyles();

  return (
    <Box>
      <Typography className={classes.title}>
        {"World Cup with EFUN's partner"}
      </Typography>
      <ListPartner />
    </Box>
  );
};

export default Partner;
