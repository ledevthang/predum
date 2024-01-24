import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import FilterToken from 'components/Event/FilterToken';

import FilterIcon from 'icon/FilterIcon';
import React, { useState } from 'react';

const FilterNFT = () => {
  const classes = useStyles();
  const [filterBy, setFilterBy] = useState('highest');

  return (
    <Box className={classes.container}>
      <Box className={clsx(classes.wapperFilterBy, 'center-root')}>
        <Typography
          className={clsx(classes.pointer, {
            [classes.bold]: filterBy == 'highest',
          })}
          onClick={() => {
            setFilterBy('highest');
          }}
        >
          Highest price
        </Typography>
        <Typography className={classes.filterPrice}>|</Typography>
        <Typography
          className={clsx(classes.pointer, {
            [classes.bold]: filterBy == 'lowest',
          })}
          onClick={() => {
            setFilterBy('lowest');
          }}
        >
          Lowest price
        </Typography>
      </Box>
      <Box className="center-root">
        <FilterToken />
        <Box ml={2}>
          <FilterIcon />
        </Box>
      </Box>
    </Box>
  );
};
export default FilterNFT;
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  filterPrice: {
    margin: '0px 20px',
  },
  pointer: {
    cursor: 'pointer',
  },
  bold: {
    fontWeight: 600,
  },

  wapperFilterBy: {
    '&>p': {
      fontSize: 16,
      lineHeight: '19px',
    },
  },
}));
