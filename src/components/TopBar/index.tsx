import {
  Box,
  Button,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import * as ethers from 'ethers';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import FailedDialog from 'components/dialog/FailedDialog';
import WalletConnectDialog from 'components/WalletConnect';
import { LocalStorageEnum } from 'enums/auth';
import MenuIcon from 'icon/MenuIcon';
import TelegramIcon from 'icon/Telegram2Icon';
import TwitterIcon from 'icon/Twitter2Icon';
import { injected, isProd, walletconnect } from 'services/wallet';
import { Coin98Connector } from 'services/wallet/Coin98';
import { updateAppStateAction } from 'store/actions/appActions';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import {
  resetFilterAction,
  updateFilterAction,
} from 'store/actions/filterActions';
import {
  resetSideBarStateAction,
  updateSideBarStateAction,
} from 'store/actions/sideBarActions';
import {
  getUserBalance,
  loginUserAction,
  updateUserSuccessAction,
} from 'store/actions/userActions';
import { getAppState, getFilterState, getSideBarState } from 'store/selectors';

import Account from './Account';
import MaxWidthDialog from './dialog';
import { useStyles } from './styles';

const TopBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { active, account, library, error, activate } = useWeb3React();
  const dispatch = useDispatch();
  const sideBar = useSelector(getSideBarState);
  const { connector, loginProcess } = useSelector(getAppState);
  const [search, setSearch] = useState('');
  const filter = useSelector(getFilterState);
  const history = useHistory();
  const isWidget = location.pathname.includes('widget');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setSearch(newValue);
    },
    [],
  );

  const handleClickMenuButton = useCallback(() => {
    dispatch(
      updateSideBarStateAction({
        ...sideBar,
        isOpen: true,
        isSaveData: Boolean(sideBar.organizingMethod.betting[0].liquidityPool),
      }),
    );
  }, [dispatch]);

  const onRedirectHostPrediction = useCallback(() => {
    if (!active || loginProcess) {
      dispatch(
        updateDialogStateAction({
          open: true,
          component: <WalletConnectDialog />,
        }),
      );
    }
    if (active && history.location.pathname != '/host-prediction') {
      history.push('/host-prediction');
    }
  }, [history, dispatch, active, loginProcess]);

  const onSearch = useCallback(() => {
    if (history.location.pathname != '/') {
      history.push('/');
    }
    dispatch(
      updateFilterAction({
        search: search.trim(),
      }),
    );
  }, [dispatch, history, search]);
  // useEffect(() => {
  //   if (!filter.search) return;
  //   setSearch(filter.search);
  // }, [filter.search]);

  useEffect(() => {
    if (!active) return;
    const connectorS = localStorage.getItem(LocalStorageEnum.CONNECTOR);
    const accessToken = localStorage.getItem(LocalStorageEnum.ACCESS_TOKEN);
    if (!connectorS) {
      localStorage.setItem(LocalStorageEnum.CONNECTOR, connector || '');
    }
    if (!accessToken) {
      dispatch(
        loginUserAction(
          {
            username: account || '',
          },
          () => {
            dispatch(
              updateAppStateAction({
                loginProcess: false,
              }),
            );
            dispatch(
              updateDialogStateAction({
                open: false,
                component: undefined,
              }),
            );
          },
        ),
      );
    } else {
      dispatch(
        updateAppStateAction({
          loginProcess: false,
        }),
      );
      dispatch(
        updateDialogStateAction({
          open: false,
          component: undefined,
        }),
      );
    }
  }, [active]);
  const callbackError = useCallback(
    (errMes: string) => {
      dispatch(
        updateDialogStateAction({
          component: <FailedDialog reason={errMes} />,
          open: true,
        }),
      );
    },
    [dispatch],
  );
  useEffect(() => {
    if (!error) return;
    if (localStorage.getItem(LocalStorageEnum.CONNECTOR) == 'WalletConnect') {
      callbackError(error.message);
    }
    dispatch(
      updateAppStateAction({
        loginProcess: false,
      }),
    );
  }, [error, dispatch]);
  useEffect(() => {
    if (!account || !library?.provider) return;
    dispatch(getUserBalance(library.provider, account));
    const accountStorage = localStorage.getItem(LocalStorageEnum.ACCOUNT);
    if (accountStorage == account) {
      const userId = localStorage.getItem(LocalStorageEnum.USER_ID);
      dispatch(
        updateUserSuccessAction({
          id: Number(userId || '0'),
        }),
      );
      return;
    }
    dispatch(
      updateAppStateAction({
        loginProcess: true,
      }),
    );
    dispatch(
      loginUserAction(
        {
          username: account,
        },
        () => {
          dispatch(
            updateAppStateAction({
              loginProcess: false,
            }),
          );
        },
      ),
    );
  }, [account, library]);

  const isUnlocked = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);

    let unlocked;

    try {
      const accounts = await provider.listAccounts();
      unlocked = accounts.length > 0;
    } catch (e) {
      unlocked = false;
    }

    return unlocked;
  }, []);
  const handleKeyDown = (e: any) => {
    e.key === 'Enter' && onSearch();
  };
  const connectWallet = useCallback(async () => {
    const connectorS = localStorage.getItem(LocalStorageEnum.CONNECTOR);
    if (connectorS) {
      if (connectorS == 'Metamask') {
        const isUnlock = await isUnlocked();
        if (!isUnlock) {
          localStorage.removeItem(LocalStorageEnum.CONNECTOR);
          localStorage.removeItem(LocalStorageEnum.ACCESS_TOKEN);
          localStorage.removeItem(LocalStorageEnum.REFRESH_TOKEN);
          localStorage.removeItem(LocalStorageEnum.ACCOUNT);
          localStorage.removeItem(LocalStorageEnum.USER_ID);
          return;
        }
      }
      // if(connectorS =='Metamask'){
      //   if (_get(window, 'ethereum._metamask')) {
      //     const isConnected = (typeof window.ethereum._metamask == 'function') &&  await window.ethereum._metamask?.isUnlocked()
      //     if(!isConnected) {
      //       localStorage.removeItem(LocalStorageEnum.CONNECTOR)
      //       localStorage.removeItem(LocalStorageEnum.ACCESS_TOKEN);
      //       return;
      //     }
      //   }
      // }
      switch (connectorS) {
        case 'Metamask':
          activate(injected);
          break;
        case 'WalletConnect':
          activate(walletconnect);
          break;
        case 'Coin98': {
          const coin98 = new Coin98Connector();
          activate(coin98);
          break;
        }
        case 'TrustWallet':
          if ((window.ethereum as any).isTrust) {
            activate(injected);
          }
          break;
      }
      dispatch(
        updateAppStateAction({
          connector: connectorS,
        }),
      );
    }
  }, [dispatch, isUnlocked]);

  useEffect(() => {
    connectWallet();
  }, [activate, dispatch]);

  const onRedirectToHome = useCallback(() => {
    if (history.location.pathname != '/') {
      history.push('/');
    }
    setSearch('');
    dispatch(
      updateFilterAction({
        search: '',
      }),
    );
    dispatch(resetSideBarStateAction());
    dispatch(resetFilterAction());
  }, [history, dispatch, search]);

  // const checkExist = () => {
  //   alert(`${window.web3} ${window.ethereum}`);
  // };

  // useEffect(() => {
  //   if (isAndroid) {
  //     window.addEventListener('load', checkExist);
  //   }
  //   return () => {
  //     window.removeEventListener('load', checkExist);
  //   };
  // }, [isAndroid]);
  return (
    <>
      <Box
        className={classes.container}
        display={isWidget ? 'none !important' : 'flex'}
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box className="center-root">
            {!isDesktop && (
              <Button className={classes.menu} onClick={handleClickMenuButton}>
                <MenuIcon color="#BDBDBD" />
              </Button>
            )}
            <CardMedia
              image="/images/logo.png"
              className={classes.logo}
              onClick={onRedirectToHome}
              style={{
                position: 'relative',
              }}
            >
              {isProd && (
                <Button
                  style={{
                    background: '#3FADD5',
                    width: 32,
                    height: 16,
                    borderRadius: '4px',
                    position: 'absolute',
                    top: -12,
                    right: -20,
                    color: 'white',
                    fontSize: 12,
                    margin: '0px 8px',
                  }}
                >
                  Beta
                </Button>
              )}
            </CardMedia>
            <Box style={{}}></Box>
            <Box
              className={classes.icon}
              onClick={() => {
                window
                  .open('https://twitter.com/predum__io', '_blank')
                  ?.focus();
              }}
              style={{
                marginLeft: 16,
              }}
            >
              <TwitterIcon />
            </Box>
            <Box
              className={classes.icon}
              onClick={() => {
                window.open('https://t.me/predum_community', '_blank')?.focus();
              }}
            >
              <TelegramIcon />
            </Box>
            {!isProd && !isMobile && (
              <Box display="flex">
                <Box display="flex" mr={3} ml={3}>
                  <Button
                    style={{
                      background: '#3FADD5',
                      width: 40,
                      height: 24,
                      borderRadius: '4px',
                      color: 'black',
                      margin: '0px 8px',
                    }}
                  >
                    Beta
                  </Button>
                  <Typography
                    style={{
                      color: '#3FADD5',
                      cursor: 'pointer',
                    }}
                  >
                    Try beta version
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    style={{
                      color: '#3FADD5',
                      cursor: 'pointer',
                    }}
                  >
                    Get testnet token guide
                  </Typography>
                </Box>
              </Box>
            )}
            {/* {isDesktop && (
          <CommonInput
            value={search}
            onChange={handleChangeValue}
            className={classes.input}
            placeholder="SEARCH EVENT ..."
            onKeyDown={handleKeyDown}
            endAdornmentIcon={
              <Button onClick={onSearch}>
                <SearchIcon color="#5A5A5E" />
              </Button>
            }
          />
        )} */}
          </Box>
          <MaxWidthDialog />
          <Box className={classes.wrapper}>
            <Account />
            {isDesktop && (
              <Button
                className={clsx(classes.btnHost, 'center-root')}
                onClick={onRedirectHostPrediction}
              >
                <Typography>Host prediction</Typography>
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default memo(TopBar);
