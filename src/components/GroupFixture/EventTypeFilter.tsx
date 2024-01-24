import {
  Box,
  Divider,
  makeStyles,
  Typography,
  Button,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { WhoTakeWith } from 'types/hostPrediction';

interface IProps {
  type: WhoTakeWith | 'All';
  setType: (type: WhoTakeWith | 'All') => void;
}

const EventTypeFilter = ({ type, setType }: IProps) => {
  const classes = useStyles();
  const updateFilter = useCallback((type: WhoTakeWith | 'All') => {
    setType(type);
  }, []);

  return (
    <Box className={classes.wrapperSort}>
      <Box className={classes.sort}>
        <Button onClick={() => updateFilter('All')} disableRipple>
          <Typography
            className={clsx(classes.allBtn, {
              [classes.activeSort]: type == 'All',
            })}
          >
            {'All'}
          </Typography>
        </Button>
        <Divider />
        <Button
          onClick={() => updateFilter(WhoTakeWith.AFFILIATE)}
          disableRipple
        >
          <Typography
            className={clsx(classes.firstBtn, {
              [classes.activeSort]: type == WhoTakeWith.AFFILIATE,
            })}
          >
            Affiliate
          </Typography>
        </Button>
        <Divider />
        <Button
          onClick={() => updateFilter(WhoTakeWith.USER_USER)}
          disableRipple
        >
          <Typography
            className={clsx(classes.secondBtn, {
              [classes.activeSort]: type == WhoTakeWith.USER_USER,
            })}
          >
            P2P
          </Typography>
        </Button>
        <Divider />
        <Button
          onClick={() => updateFilter(WhoTakeWith.USER_POOL)}
          disableRipple
        >
          <Typography
            className={clsx(classes.thirdBtn, {
              [classes.activeSort]: type == WhoTakeWith.USER_POOL,
            })}
          >
            UvP
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default EventTypeFilter;

const useStyles = makeStyles((theme) => ({
  wrapperSort: {
    position: 'relative',
    width: '100%',
    marginTop: 32,
    '& p': {
      fontSize: 14,
      fontWeight: 600,
    },
    '& hr': {
      width: 1,
      height: 14,
      backgroundColor: '#BDBDBD',
    },
  },
  sort: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black2,
  },
  firstBtn: {
    color: '#BDBDBD',
    fontSize: '16px',
    width: 103,
    textTransform: 'none',
  },
  secondBtn: {
    color: '#BDBDBD',
    fontSize: '16px',
    width: 80,
    textTransform: 'none',
  },
  thirdBtn: {
    color: '#BDBDBD',
    fontSize: '16px',
    width: 80,
    textTransform: 'none',
  },
  activeSort: {
    fontWeight: 600,
    color: '#FFFFFF !important',
  },
  allBtn: {
    color: '#BDBDBD',
    fontSize: '16px',
    width: 80,
    textTransform: 'none',
  },
}));
