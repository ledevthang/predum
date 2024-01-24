import { Box, Button, CardMedia, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useStyles } from './WCHeaderStyles';

const WCHeader = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.wrapper}>
        <CardMedia image="/images/WCLogo.png" className={classes.image} />
        <Box className={classes.wrapperText}>
          <Typography>FIFA World Cup Qatar 2022</Typography>
          <Typography>Group Stage</Typography>
        </Box>
      </Box>
      <Box display="flex">
        {tabs.map((t) => (
          <Button
            disabled={t.disabled}
            key={t.name}
            className={clsx(classes.tab, 'center-root', {
              [classes.activeTab]: !t.disabled,
            })}
          >
            {t.name}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default WCHeader;

const tabs = [
  {
    name: 'Matches',
    disabled: false,
  },
  {
    name: 'News',
    disabled: true,
  },
  {
    name: 'Bracket',
    disabled: true,
  },
  {
    name: 'Players',
    disabled: true,
  },
  {
    name: 'Standings',
    disabled: true,
  },
];
