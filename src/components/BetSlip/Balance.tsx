import { Box, Button } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  convertThousandSeperator,
  getNameToken,
  roundNumberWithFixed,
} from 'helpers';
import RefreshIcon from 'icon/RefreshIcon';
import { getUserBalance } from 'store/actions/userActions';
import { getUserState } from 'store/selectors';

import { useStyles } from './styles';

interface IProps {
  token: string;
}

const Balance = ({ token }: IProps) => {
  const classes = useStyles();
  const { active, library, account } = useWeb3React();
  const userState = useSelector(getUserState);
  const { themeWidget } = useParams<{ themeWidget: string }>();
  const dispatch = useDispatch();
  const [isRefresh, setIsRefresh] = useState(false);

  const renderBalance = useMemo(() => {
    if (!active || !token) return '';
    const userBalance = userState.userBalance;
    let balance = '';
    userBalance.forEach((t) => {
      if (t.token == token) balance = t.balance;
    });
    return balance;
  }, [userState, token, active]);

  const renderTokenName = useMemo(() => {
    if (!active || !token) return '';
    return getNameToken(token);
  }, [active, token]);

  const onRefreshBalance = useCallback(() => {
    if (!account) return;
    setIsRefresh(true);
    dispatch(
      getUserBalance(library.provider, account, () => {
        setIsRefresh(false);
      }),
    );
  }, [dispatch, library.provider, account]);

  return (
    <Box
      className={classes.balanceWapper}
      style={{
        color: themeWidget == 'light' ? '#1c1c1e' : '#BDBDBD',
      }}
    >
      <Box>Your balance:</Box>
      <Box
        className={classes.balanceNumber}
        style={{
          color: themeWidget == 'light' ? '#1c1c1e' : '#FFFFFF',
        }}
      >
        {convertThousandSeperator(roundNumberWithFixed(renderBalance, 5))}{' '}
        {renderTokenName}
      </Box>
      <Button
        disableRipple
        onClick={onRefreshBalance}
        className={clsx(classes.refreshBtn, {
          [classes.refreshAnimation]: isRefresh,
        })}
      >
        <RefreshIcon color="white" />
      </Button>
    </Box>
  );
};

export default Balance;
