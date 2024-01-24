import React, { useCallback, useState } from 'react';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { getFilterState } from 'store/selectors';

const fakeData = ['All', 'Football', 'Basketball', 'CSGO', 'Dota'];

const SortProEvent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { sort } = useSelector(getFilterState);
  const [choosedOption, setChoosedOption] = useState('All');

  const updateSortState = useCallback(
    (value: string) => {
      setChoosedOption(value);
      // dispatch(
      //   updateFilterAction({
      //     sort: value,
      //   }),
      // );
    },
    [dispatch],
  );

  return (
    <Box className={classes.wrapperSort}>
      <Box className={classes.sort}>
        {fakeData.map((item, index) => {
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

export default SortProEvent;

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
    marginRight: 36,
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
