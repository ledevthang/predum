import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CheckedIcon from 'icon/CheckedIcon';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateDialogStateAction } from 'store/actions/dialogActions';

const SuccessDialog = ({
  id,
  info,
  text,
  callback,
}: {
  id?: string;
  info?: string;
  text?: string;
  callback?: () => void;
}) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const redirectToHome = useCallback(() => {
    history.push(`/detail-event/${id}`);
  }, [history, id]);

  const closeDialog = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: false,
        component: undefined,
        callback: undefined,
      }),
    );
    if (callback) callback();
    if (!id) return;
    redirectToHome();
  }, [dispatch, redirectToHome]);

  return (
    <Box className={clsx(classes.container, 'center-root')}>
      <Typography className={classes.notice}>Notice</Typography>
      <CheckedIcon />
      <Typography className={classes.description}>
        {info ? info : 'Host event successfully'}
      </Typography>
      <Button className={classes.closeBtn} onClick={closeDialog}>
        {text ? text : 'Close'}
      </Button>
    </Box>
  );
};

export default SuccessDialog;
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#333333',
    width: 480,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&>svg': {
      width: 36,
      height: 36,
    },
    [theme.breakpoints.down('sm')]: {
      width: '260px',
    },
  },
  notice: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 24,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
      marginBottom: 12,
    },
  },
  description: {
    fontSize: 14,
    marginTop: 12,
    [theme.breakpoints.down('sm')]: {
      marginTop: 8,
      fontSize: 13,
    },
  },
  closeBtn: {
    borderRadius: 22,
    backgroundColor: '#BDBDBD',
    color: '#0B0B0E',
    fontSize: 14,
    fontWeight: 600,
    padding: '12px 56px !important',
    marginTop: 36,
    [theme.breakpoints.down('sm')]: {
      padding: '8px 38px !important',
      marginTop: 16,
      fontSize: 13,
    },
  },
}));
