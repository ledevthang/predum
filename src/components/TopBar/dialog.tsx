import { Box, Button, Dialog, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CommonInput from 'components/common/CommonInput';
import WalletConnectDialog from 'components/WalletConnect';
import SearchIcon from 'icon/SearchIcon';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { updateFilterAction } from 'store/actions/filterActions';
import { updateSideBarStateAction } from 'store/actions/sideBarActions';
import { getSideBarState } from 'store/selectors';

import { useStyles } from './styles';

const MaxWidthDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const sideBar = useSelector(getSideBarState);
  const history = useHistory();
  const { active } = useWeb3React();
  const dispatch = useDispatch();
  const handleClose = React.useCallback(() => {
    dispatch(
      updateSideBarStateAction({
        ...sideBar,
        isOpen: false,
        isSaveData: false,
      }),
    );
    setOpen(false);
  }, [dispatch]);
  React.useEffect(() => {
    let { isOpen } = sideBar;
    setOpen(!!isOpen);
  }, [sideBar]);

  const handleChangeValue = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setSearch(newValue);
    },
    [],
  );

  const onRedirectHostPrediction = React.useCallback(() => {
    if (!active) {
      dispatch(
        updateDialogStateAction({
          open: true,
          component: <WalletConnectDialog />,
        }),
      );
    }
    if (active && history.location.pathname != '/host-prediction') {
      history.push('/host-prediction');
      dispatch(
        updateSideBarStateAction({
          ...sideBar,
          isOpen: false,
        }),
      );
    }
    dispatch(
      updateSideBarStateAction({
        ...sideBar,
        isOpen: false,
      }),
    );
  }, [history, dispatch, active]);
  const onSearch = React.useCallback(() => {
    if (history.location.pathname != '/') {
      history.push('/');
    }
    dispatch(
      updateFilterAction({
        search: search.trim(),
      }),
    );
    dispatch(
      updateSideBarStateAction({
        ...sideBar,
        isOpen: false,
      }),
    );
    setOpen(false);
  }, [dispatch, history, search]);
  const classes = useStyles();
  const onRedirectTo = React.useCallback(
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
    <Box>
      <Dialog
        fullWidth={false}
        open={open}
        onClose={handleClose}
        className={classes.dialog}
      >
        <CommonInput
          value={search}
          onChange={handleChangeValue}
          className={classes.inputMenu}
          placeholder="SEARCH EVENT ..."
          startAdornmentIcon={
            <Button onClick={onSearch}>
              <SearchIcon color="#5A5A5E" />
            </Button>
          }
        />
        <Button
          className={clsx(classes.btnHostMenu, 'center-root')}
          onClick={onRedirectHostPrediction}
        >
          <Typography>Host prediction</Typography>
        </Button>
        <Button
          style={{
            padding: 8,
            width: 32,
            position: 'absolute',
            top: 8,
            right: 8,
            fontSize: 16,
            fontWeight: 600,
            color: '#BFBFBF',
          }}
          onClick={() => {
            setOpen(false);
          }}
        >
          X
        </Button>
        {/* <BetSlip /> */}
        <Box display="flex" flexDirection="column">
          <Box display="flex" ml={1}>
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
          <Box ml={2} mt={2} mb={2}>
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
        <Box className={classes.menuBurger}>
          <Typography onClick={() => onRedirectTo('https://predum.io/', true)}>
            Introduction
          </Typography>
        </Box>
      </Dialog>
    </Box>
  );
};

export default MaxWidthDialog;
