import { Button, Dialog, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CloseIcon from 'icon/CloseIcon';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { getDialogState } from 'store/selectors';

const CommonDialog = () => {
  const dialog = useSelector(getDialogState);
  const classes = useStyles();
  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    dialog.callback && dialog.callback();
    dispatch(
      updateDialogStateAction({
        open: false,
        component: undefined,
        callback: undefined,
      }),
    );
  }, [dispatch, dialog.callback]);

  return (
    <Dialog open={dialog.open} className={classes.container} onClose={onClose}>
      {dialog.open && (
        <Button
          className={clsx(classes.btnClose, 'center-root')}
          onClick={onClose}
        >
          <CloseIcon width={10} height={10} color="white" />
        </Button>
      )}
      {dialog.component}
    </Dialog>
  );
};

export default CommonDialog;

const useStyles = makeStyles((theme) => ({
  container: {
    '& .MuiPaper-rounded': {
      borderRadius: 0,
      maxWidth: 'unset',
    },
    '& .MuiPaper-root': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    '& .MuiDialog-paperWidthSm': {
      margin: 16,
    },
  },
  main: {},
  btnClose: {
    borderRadius: 0,
    marginLeft: 'auto',
    width: 24,
    height: 24,
    // backgroundColor: 'white',
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 5,
  },
}));
