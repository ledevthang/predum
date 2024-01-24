import React, { useCallback } from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

interface ISortHistory {
  sortHistory: string[];
  choosedOption: string;
  setChoosedOption: (value: string) => void;
}

const SortHistory = ({
  sortHistory,
  choosedOption,
  setChoosedOption,
}: ISortHistory) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const updateSortState = useCallback((value: string) => {
    setChoosedOption(value);
  }, []);

  return (
    <Box className={classes.wrapperSort}>
      <Box className={classes.sort}>
        {sortHistory.map((item, index) => {
          return (
            <Box
              key={index}
              className={clsx(classes.wapperOption, {
                [classes.lastOption]: item.length == index,
              })}
            >
              <Button
                onClick={() => updateSortState(item)}
                disableRipple={true}
              >
                <Typography
                  className={clsx(classes.option, {
                    [classes.activeSort]: choosedOption == item,
                  })}
                >
                  {item}
                </Typography>
              </Button>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SortHistory;

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
  wapperOption: {
    marginRight: 18,
    marginLeft: 18,
  },
  sort: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.black2,
  },
  option: {
    color: '#BDBDBD',
    fontSize: '16px',
    textTransform: 'none',
  },
  lastOption: {
    marginRight: 0,
  },
  activeSort: {
    fontWeight: 600,
    color: '#3FADD5 !important',
    borderBottom: '1px solid',
  },
}));
