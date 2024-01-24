import { Box, Button, Divider } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import { clientRoutesEnum } from 'enums/routes';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateMenuStateAction } from 'store/actions/menuActions';
import { logoutUserAction } from 'store/actions/userActions';
import { useStyles } from './styles';

const UserMenu = () => {
  const classes = useStyles();
  const { deactivate, account } = useWeb3React();
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = useCallback(() => {
    deactivate();
    dispatch(logoutUserAction());
    dispatch(
      updateMenuStateAction({
        anchorEl: undefined,
        component: undefined,
      }),
    );
    let landingUrl = [
      clientRoutesEnum.AUDIT.toString(),
      clientRoutesEnum.DISCLAIMER.toString(),
      clientRoutesEnum.INTRODUCE.toString(),
      clientRoutesEnum.OUR_TEAM.toString(),
      clientRoutesEnum.PARTNER.toString(),
      clientRoutesEnum.PRIVACY.toString(),
      clientRoutesEnum.ROADMAP.toString(),
      clientRoutesEnum.TERM.toString(),
    ];
    if (
      window.location.pathname != '/' &&
      !window.location.pathname.includes('host-info') &&
      !window.location.pathname.includes('detail-event') &&
      !landingUrl.includes(window.location.pathname) &&
      !window.location.pathname.includes('world-cup')
    ) {
      window.location.href = '/';
    }
  }, [deactivate, dispatch]);

  const onRedirectHostPrediction = useCallback(() => {
    if (history.location.pathname != clientRoutesEnum.PREDICT_HISTORY) {
      history.push(clientRoutesEnum.PREDICT_HISTORY);
    }
    dispatch(
      updateMenuStateAction({
        anchorEl: undefined,
        component: undefined,
      }),
    );
  }, [dispatch, history]);
  const onRedirectHostInfo = useCallback(() => {
    dispatch(
      updateMenuStateAction({
        anchorEl: undefined,
        component: undefined,
      }),
    );
    history.push(`/host-info/${account}`);
    dispatch(
      updateMenuStateAction({
        anchorEl: undefined,
        component: undefined,
      }),
    );
  }, [account, history]);

  return (
    <Box className={classes.userMenu}>
      <Button onClick={onRedirectHostInfo}>PROFILE</Button>
      <Button onClick={onRedirectHostPrediction}>HISTORY</Button>
      <Divider />
      <Button onClick={logout}>LOG OUT</Button>
    </Box>
  );
};

export default UserMenu;
