import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CommonInput from 'components/common/CommonInput';
import SearchIcon from 'icon/SearchIcon';
import { updateFilterAction } from 'store/actions/filterActions';
import { getFilterState } from 'store/selectors';

const SearchProEvent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const history = useHistory();
  const filter = useSelector(getFilterState);
  const isHostInfo = location.pathname.includes('host-info');

  // useEffect(() => {
  //   if (!filter.search) return;
  //   setSearch(filter.search);
  // }, [filter.search]);
  useEffect(() => {
    if (!filter.search) return;
    setSearch(filter.search);
  }, []);

  const handleChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setSearch(newValue);
    },
    [],
  );
  const handleKeyDown = (e: any) => {
    e.key === 'Enter' && onSearch();
  };
  const onSearch = useCallback(() => {
    if (
      history.location.pathname != '/' &&
      !history.location.pathname.includes('host-info')
    ) {
      history.push('/');
    }
    dispatch(
      updateFilterAction({
        search: search.trim(),
      }),
    );
  }, [dispatch, history, search]);
  return (
    <Box className={classes.wapperSearch}>
      <CommonInput
        value={search}
        onChange={handleChangeValue}
        className={clsx(classes.input, {
          [classes.hostInfoInput]: isHostInfo,
        })}
        onKeyDown={handleKeyDown}
        startAdornmentIcon={
          <Box
            className={clsx(classes.wrapperIcon, 'center-root')}
            onClick={() => onSearch()}
          >
            <SearchIcon />
          </Box>
        }
        placeholder={
          history.location.pathname == '/'
            ? 'Search event'
            : 'Search host’s event'
        }
      />
      {/* <Button
        className={classes.button}
        startIcon={<SearchIcon />}
        classes={{ root: classes.root }}
        onClick={onSearch}
      >
        Search
      </Button> */}
    </Box>
  );
};

export default SearchProEvent;

const useStyles = makeStyles((theme) => ({
  input: {
    height: 44,
    marginRight: 12,
    width: 360,
    '& input': {
      color: 'white',
      backgroundColor: '#2C2C2F',
      borderTopRightRadius: '20px',
      borderBottomRightRadius: '20px',
    },
    '& input::placeholder': {
      color: '#FFFFFF',
      opacity: 0.8,
    },
    [theme.breakpoints.down('md')]: {
      height: 36,
      width: 270,
    },
    [theme.breakpoints.down('sm')]: {
      width: 200,
    },
  },
  hostInfoInput: {
    [theme.breakpoints.down('sm')]: {
      width: 340,
    },
  },
  wapperSearch: {
    display: 'flex',
    // marginTop: 36,
    [theme.breakpoints.down('md')]: {
      // marginTop: 12,
      // marginBottom: 24,
      justifyContent: 'center',
    },
  },
  wrapperIcon: {
    padding: '0px 4px 0px 8px',
    background: '#2C2C2F',
    cursor: 'pointer',
    height: '100%',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
  },
  button: {
    height: 44,
    width: 92,
    borderRadius: 2,
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '17px',
    color: '#212121',
    backgroundColor: 'white',
    [theme.breakpoints.down('md')]: {
      height: 36,
    },
    [theme.breakpoints.down('sm')]: {
      width: 85,
    },
  },
  root: {
    '&:hover': {
      backgroundColor: '#FFF',
    },
  },
}));
