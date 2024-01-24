import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { getUserBalance } from 'store/actions/userActions';
import { getTokensState } from 'store/selectors';

const InsufficientDialog = () => {
  const classes = useStyles();
  const tokens = useSelector(getTokensState);
  const dispatch = useDispatch();
  const { active, library, account } = useWeb3React();
  const [isRefresh, setIsRefresh] = useState(false);

  const onRefreshBalance = useCallback(() => {
    if (!account) return;
    setIsRefresh(true);
    dispatch(
      getUserBalance(library.provider, account, () => {
        setIsRefresh(false);
        dispatch(
          updateDialogStateAction({
            open: false,
            component: undefined,
            callback: undefined,
          }),
        );
      }),
    );
  }, [dispatch, library.provider, account]);

  return (
    <Box className={clsx(classes.container, 'center-root')}>
      <Typography className={classes.text}>
        You need 2,000 EFUN in your wallet to host an event
      </Typography>
      <Button
        disableRipple
        className={classes.buyBtn}
        onClick={() => {
          let url = '';
          tokens.forEach((t, i) => {
            if (t.name == 'EFUN') url = t.url;
          });
          window.open(url, '_blank')?.focus();
        }}
      >
        Buy EFUN
      </Button>
      <Button
        disableRipple
        onClick={onRefreshBalance}
        className={classes.refreshBtn}
        disabled={isRefresh}
      >
        Reload your balance
      </Button>
    </Box>
  );
};

export default InsufficientDialog;
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#5A5A5E',
    flexDirection: 'column',
    padding: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  buyBtn: {
    fontSize: 14,
    color: '#3FADD5',
    marginTop: 12,
  },
  refreshBtn: {
    marginTop: 8,
    padding: '2px 8px !important',
    border: '1px solid #3FADD5',
    background:
      'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    borderRadius: 2,
  },
}));
