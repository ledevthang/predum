import { Box, CardMedia, makeStyles, Typography } from '@material-ui/core';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { BNB_TOKEN } from 'common';
import CommonSelectInput from 'components/common/CommonSelectInput';
import { SortState } from 'types/event';
import { EUnit } from 'types/hostPrediction';

const CategoryProEvent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentTokenValue, setCurrentTokenValue] = useState('');
  const [currentfilterState, setCurrentFilterState] = useState<string>(
    SortState.UPCOMING,
  );
  const handleChangeUnit = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;
      setCurrentTokenValue(newValue);
    },
    [],
  );
  const handleChangeFilterState = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;
      setCurrentFilterState(newValue);
    },
    [],
  );

  const filterState = useMemo(() => {
    return [
      {
        value: SortState.UPCOMING,
        id: SortState.UPCOMING,
      },
      {
        value: SortState.BIGGEST_POOL,
        id: SortState.BIGGEST_POOL,
      },
      {
        value: SortState.FOLLOWING,
        id: SortState.FOLLOWING,
      },
    ];
  }, []);
  const chains = useMemo(() => {
    return [
      {
        value: 'All Tokens',
        id: '',
      },
      {
        value: EUnit.EFUN,
        id: process.env.REACT_APP_EFUN_TOKEN || '',
        Icon: (
          <CardMedia image="/images/EfunCoin.png" className={classes.coin} />
        ),
      },
      {
        value: EUnit.BNB,
        id: BNB_TOKEN,
        Icon: (
          <CardMedia image="/images/BNBCoin.png" className={classes.coin} />
        ),
      },
      {
        value: EUnit.LINK,
        id: process.env.REACT_APP_LINK_TOKEN || '',
        Icon: (
          <CardMedia image="/images/LinkCoin.png" className={classes.coin} />
        ),
      },
      {
        value: EUnit.XMETA,
        id: process.env.REACT_APP_XMETA_TOKEN || '',
        Icon: <CardMedia image="/images/XMETA.png" className={classes.coin} />,
      },
    ];
  }, [classes.coin]);

  return (
    <Box className={classes.wapperCategoryFilter}>
      <Box>
        <Typography className={classes.category}>Football</Typography>
      </Box>
      <Box className={classes.wapperSelect}>
        <Box>
          <CommonSelectInput
            values={filterState}
            onChange={handleChangeFilterState}
            currentValue={currentfilterState}
            className={classes.selectCoin}
          />
        </Box>
        <Box>
          <CommonSelectInput
            values={chains}
            onChange={handleChangeUnit}
            currentValue={currentTokenValue}
            className={classes.selectCoin}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryProEvent;

const useStyles = makeStyles((theme) => ({
  wapperCategoryFilter: {
    width: '100%',
    zIndex: 4,
    margin: '36px 0px 24px 0px',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      paddingLeft: 24,
      paddingRight: 20,
      margin: '0px 0px 24px 0px',
    },
  },
  category: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '24px',
  },
  wapperSelect: {
    display: 'flex',
  },
  coin: {
    height: 16,
    width: 16,
    marginRight: 4,
  },
  selectCoin: {
    backgroundColor: '#616161',
    width: 120,
    marginLeft: 10,
    '& p': {
      color: '#3FADD5',
      fontWeight: 600,
      marginRight: 4,
      fontSize: 14,
      lineHeight: '17px',
    },
    '& svg': {
      height: 12,
      width: 12,
    },
    '&>div:first-child': {
      height: 40,
    },
  },
}));
