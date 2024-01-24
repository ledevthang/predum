import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CommonSelectInput from 'components/common/CommonSelectInput';
import { updateFilterAction } from 'store/actions/filterActions';
import { getNewTokenState } from 'store/selectors';

const FilterToken = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tokens = useSelector(getNewTokenState);
  const [filterBy, setFilterBy] = useState('');
  const updateTokenSortState = useCallback(
    (value: string[]) => {
      dispatch(
        updateFilterAction({
          tokenIds: value,
        }),
      );
    },
    [dispatch],
  );
  const handelChangeFilterToken = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let newValue = event.target.value;
    if (newValue) {
      let address = tokens.filter((o, i) => o.name == newValue)[0].address;
      updateTokenSortState([address]);
    } else updateTokenSortState([]);
    setFilterBy(newValue);
  };
  return (
    <Box>
      <CommonSelectInput
        values={token}
        currentValue={filterBy}
        onChange={handelChangeFilterToken}
        className={clsx(classes.select, {
          [classes.token]: filterBy != '',
        })}
        label="All Tokens"
      />
    </Box>
  );
};

export default FilterToken;

const token = [
  {
    id: 'ETH',
    value: 'ETH',
  },
  {
    id: 'ARB',
    value: 'ARB',
  },
];
const useStyles = makeStyles((theme) => ({
  select: {
    '&>div:first-child': {
      background: 'transparent',
      borderRadius: '2px',
    },
    '&>div>div>p': {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '19px',
      color: '#BDBDBD',
    },
    '&>svg': {
      color: '#3FADD5',
    },
    height: 40,
  },
  token: {
    '&>div>div>p': {
      color: '#3FADD5',
    },
  },
}));
