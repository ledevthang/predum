import { Box, makeStyles } from '@material-ui/core';
import CommonSelectInput from 'components/common/CommonSelectInput';
import FilterIcon from 'icon/FilterIcon';
import React, { useCallback, useMemo } from 'react';
import { MyInvestmentFilter } from 'types/investment';

interface IProps {
  filterValue: MyInvestmentFilter;
  setFilter: (value: MyInvestmentFilter) => void;
}

const Filter = ({ filterValue, setFilter }: IProps) => {
  const classes = useStyles();

  const renderFilters = useMemo(() => {
    return Object.values(MyInvestmentFilter).map((c, i) => ({
      id: c,
      value: c,
    }));
  }, []);

  const handleChangeFilter = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(event.target.value as MyInvestmentFilter);
    },
    [],
  );

  return (
    <Box className={classes.container}>
      <CommonSelectInput
        values={renderFilters}
        onChange={handleChangeFilter}
        currentValue={filterValue}
        className={classes.filter}
      />
      <FilterIcon color="#BDBDBD" />
    </Box>
  );
};

export default Filter;

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    margin: '24px 0px',
  },
  filter: {
    width: 120,
    height: 40,
    marginRight: 16,
    '& p': {
      color: '#3FADD5',
    },
    '& svg': {
      stroke: '#3FADD5',
    },
  },
}));
