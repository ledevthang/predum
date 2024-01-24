import {
  Box,
  Button,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { EPredictHistoryFilter } from 'types/prediction';

interface IProps {
  filter: EPredictHistoryFilter;
  setFilter: (value: EPredictHistoryFilter) => void;
}

const PredictHistoryFilter = ({ filter, setFilter }: IProps) => {
  const classes = useStyles();

  const updateFilterState = useCallback((value: EPredictHistoryFilter) => {
    setFilter(value);
  }, []);

  return (
    <Box className={classes.wrapperSort}>
      <Box className={classes.sort}>
        <Button
          disableRipple
          onClick={() =>
            updateFilterState(EPredictHistoryFilter.PREDICTION_HISTORY)
          }
        >
          <Typography
            className={clsx(classes.firstBtn, {
              [classes.activeSort]:
                filter == EPredictHistoryFilter.PREDICTION_HISTORY,
            })}
          >
            {EPredictHistoryFilter.PREDICTION_HISTORY}
          </Typography>
        </Button>
        <Divider />
        <Button
          disableRipple
          onClick={() => updateFilterState(EPredictHistoryFilter.HOST_HISTORY)}
        >
          <Typography
            className={clsx(classes.secondBtn, {
              [classes.activeSort]:
                filter == EPredictHistoryFilter.HOST_HISTORY,
            })}
          >
            {EPredictHistoryFilter.HOST_HISTORY}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default PredictHistoryFilter;

const useStyles = makeStyles((theme) => ({
  wrapperSort: {
    width: '100%',
    zIndex: 4,
    margin: '36px 0px 24px 0px',
    [theme.breakpoints.down('md')]: {
      padding: 0,
      margin: '0px 0px 24px 0px',
    },
  },
  sort: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black2,
    '& hr': {
      height: 18,
      width: 1,
      margin: '0px 30px',
      backgroundColor: '#FFFFFF',
    },
  },
  firstBtn: {
    color: '#BDBDBD',
    fontSize: '16px',
    width: 103,
  },
  secondBtn: {
    color: '#BDBDBD',
    fontSize: '16px',
    width: 70,
    textAlign: 'start',
  },
  activeSort: {
    fontWeight: 600,
    color: '#FFFFFF !important',
  },
}));
