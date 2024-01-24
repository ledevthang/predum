import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CloseCircleIcon from 'icon/CloseCircleIcon';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateDialogStateAction } from 'store/actions/dialogActions';

interface IProps {
  reason?: string;
}
const ClaimAmountFailed = ({ reason }: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const closeDialog = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: false,
        component: undefined,
        callback: undefined,
      }),
    );
  }, [dispatch]);

  return (
    <Box className={clsx(classes.container, 'center-root')}>
      <Typography className={classes.notice}>Notice</Typography>
      <CloseCircleIcon />
      <Typography className={classes.description}></Typography>
      {reason ? reason : ' Fail to claim tokens'}
      <Button className={classes.closeBtn} onClick={closeDialog}>
        Close
      </Button>
    </Box>
  );
};

export default ClaimAmountFailed;
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
      width: 'fit-content',
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
