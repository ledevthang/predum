import {
  Box,
  Button,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateFilterAction } from 'store/actions/filterActions';
import { getFilterState } from 'store/selectors';
import { SortState } from 'types/event';

const Sort = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { sort } = useSelector(getFilterState);
  const { active } = useWeb3React();

  const updateSortState = useCallback(
    (value: SortState) => {
      dispatch(
        updateFilterAction({
          sort: value,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Box className={classes.wrapperSort}>
      <Box className={classes.sort}>
        <Button onClick={() => updateSortState(SortState.UPCOMING)}>
          <Typography
            className={clsx(classes.firstBtn, {
              [classes.activeSort]: sort == SortState.UPCOMING,
            })}
          >
            {SortState.UPCOMING}
          </Typography>
        </Button>
        <Divider />
        <Button onClick={() => updateSortState(SortState.BIGGEST_POOL)}>
          <Typography
            className={clsx(classes.secondBtn, {
              [classes.activeSort]: sort == SortState.BIGGEST_POOL,
            })}
          >
            Biggest Pool
          </Typography>
        </Button>
        {active && !location.pathname.includes('host-info') && (
          <>
            <Divider />
            <Button onClick={() => updateSortState(SortState.FOLLOWING)}>
              <Typography
                className={clsx(classes.thirdBtn, {
                  [classes.activeSort]: sort == SortState.FOLLOWING,
                })}
              >
                {SortState.FOLLOWING}
              </Typography>
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Sort;

const useStyles = makeStyles((theme) => ({
  wrapperSort: {
    zIndex: 2,
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
  sort: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.black2,
    '& hr': {
      height: 18,
      width: 1,
      margin: '0px 30px',
      backgroundColor: '#FFFFFF',
      [theme.breakpoints.down('sm')]: {
        margin: '0px 15px',
      },
    },
  },
  firstBtn: {
    color: '#BDBDBD',
    fontSize: '16px',
    width: 58,
    textTransform: 'none',
  },
  secondBtn: {
    color: '#BDBDBD',
    fontSize: '16px',
    width: 103,
    textTransform: 'none',
    [theme.breakpoints.down('sm')]: {
      width: 78,
    },
  },
  thirdBtn: {
    color: '#BDBDBD',
    fontSize: '16px',
    width: 40,
    textTransform: 'none',
  },
  activeSort: {
    fontWeight: 600,
    color: '#FFFFFF !important',
  },
}));
