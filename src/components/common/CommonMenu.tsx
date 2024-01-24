import { makeStyles, Menu } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMenuStateAction } from 'store/actions/menuActions';
import { getMenuState } from 'store/selectors';

const CommonMenu = () => {
  const classes = useStyles();
  const menuState = useSelector(getMenuState);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(
      updateMenuStateAction({
        anchorEl: undefined,
        component: undefined,
      }),
    );
  }, [dispatch]);

  return (
    <Menu
      anchorEl={menuState.anchorEl}
      keepMounted
      open={Boolean(menuState.anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      className={classes.container}
    >
      {menuState.component}
    </Menu>
  );
};

export default CommonMenu;

const useStyles = makeStyles((theme) => ({
  container: {
    '& .MuiPaper-root': {
      borderRadius: 0,
    },
    '& ul': {
      padding: 0,
      borderRadius: 0,
    },
    '& .MuiPopover-paper': {
      minHeight: 0,
    },
  },
}));
