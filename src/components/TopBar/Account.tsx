import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import React, { MouseEvent, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import WalletConnectDialog from 'components/WalletConnect';
import { LocalStorageEnum } from 'enums/auth';
import { clientRoutesEnum } from 'enums/routes';
import { renderShortAddress } from 'helpers';
import ArrowDownIcon from 'icon/ArrowDownIcon';
import { getCurrentUserInfoAction } from 'store/actions/currentUserActions';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { updateMenuStateAction } from 'store/actions/menuActions';
import { getAppState, getCurrentUserState } from 'store/selectors';

import { useStyles } from './styles';
import MenuUser from './UserMenu';

const Account = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const classes = useStyles();
  const dispatch = useDispatch();
  const { account, active } = useWeb3React();
  const currentUser = useSelector(getCurrentUserState);
  const history = useHistory();
  const isWidget = location.pathname.includes('widget');
  const { themeWidget } = useParams<{ themeWidget: string }>();
  const { loginProcess } = useSelector(getAppState);
  const onOpenConnectDialog = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: true,
        component: <WalletConnectDialog />,
      }),
    );
  }, [dispatch]);
  useEffect(() => {
    if (active && localStorage.getItem(LocalStorageEnum.ACCESS_TOKEN)) {
      dispatch(getCurrentUserInfoAction());
    }
  }, [account, localStorage.getItem(LocalStorageEnum.ACCESS_TOKEN)]);

  const onOpenUserMenu = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      dispatch(
        updateMenuStateAction({
          anchorEl: event.currentTarget,
          component: <MenuUser />,
        }),
      );
    },
    [dispatch],
  );

  const onRedirectToPredictHistory = useCallback(() => {
    if (!active) {
      dispatch(
        updateDialogStateAction({
          open: true,
          component: <WalletConnectDialog />,
        }),
      );
    }
    if (
      active &&
      history.location.pathname != clientRoutesEnum.PREDICT_HISTORY
    ) {
      history.push(clientRoutesEnum.PREDICT_HISTORY);
    }
  }, [history, active]);
  const onRedirectTo = useCallback(
    (path: string, newTab: boolean) => {
      if (history.location.pathname != path) {
        const win = newTab ? window.open(path, '_blank') : history.push(path);
        win && win.focus();
        window.scrollTo(0, 0);
      }
    },
    [history],
  );
  return (
    <Box
      className={clsx(classes.account, 'center-root', {
        [classes.accountLight]: themeWidget == 'light',
      })}
    >
      {isDesktop && !isWidget && (
        <>
          {/* <Box
            onClick={() => onRedirectTo('/decentralized-pool', false)}
            display="flex"
          >
            <Button className={classes.history}>Liquidity Pool</Button>
            <Typography
              style={{
                margin: 'unset',
                color: '#ffb129',
                fontSize: '16px',
                marginBottom: '16px',
                marginLeft: '4px',
                cursor: 'pointer',
                textShadow:
                  '0 0 7px #77776c, 0 0 13px #6d6c52, 0 0 19px #707238, 0 0 25px #94872d',
              }}
              className="blink_me"
            >
              New
            </Typography>
          </Box> */}
          {/* <Typography>/</Typography> */}
          {/* <Button
            onClick={() => onRedirectTo('/', false)}
            className={classes.history}
          >
            Prediction
          </Button>
          <Typography>/</Typography> */}
          <Button
            onClick={() => onRedirectTo('https://predum.io/', true)}
            className={classes.history}
          >
            Introduction
          </Button>
          <Typography>/</Typography>
          {/* <Button
            onClick={() => onRedirectTo(clientRoutesEnum.INTRODUCE, false)}
            className={classes.history}
          >
            Introduction
          </Button>
          <Typography>/</Typography>
          <Button
            onClick={() => onRedirectTo(clientRoutesEnum.ROADMAP, false)}
            className={classes.history}
          >
            Roadmap
          </Button>
          <Typography>/</Typography>
          <Button
            onClick={() => onRedirectTo(clientRoutesEnum.PARTNER, false)}
            className={classes.history}
          >
            Partner
          </Button> */}
          {/* <Typography>/</Typography> */}
          <Button
            onClick={onRedirectToPredictHistory}
            className={classes.history}
          >
            History
          </Button>
          <Typography>/</Typography>
        </>
      )}
      {active && !loginProcess ? (
        <Button className={classes.btnAccount} onClick={onOpenUserMenu}>
          {currentUser.nickname
            ? `${currentUser.nickname}(${renderShortAddress(
                account || '',
                4,
                4,
              )})`
            : renderShortAddress(account || '', 4, 4)}
          <ArrowDownIcon />
        </Button>
      ) : (
        <Button className={classes.btnConnect} onClick={onOpenConnectDialog}>
          CONNECT WALLET
        </Button>
      )}
    </Box>
  );
};

export default Account;
