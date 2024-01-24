import { Box, Typography } from '@material-ui/core';
import DangerWithColor from 'icon/DangerWithColor';
import React from 'react';
import { useStyles } from './styles';

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <DangerWithColor />
      <Typography className={classes.text}>
        All visitors must confirm the wagering and/or gambling regulations that
        are applicable in their local jurisdiction (as gambling laws may vary in
        different states, countries and provinces). Predum does not promote or
        endorse any form of wagering or gambling to users under the age of 18.
      </Typography>
    </Box>
  );
};

export default Footer;
