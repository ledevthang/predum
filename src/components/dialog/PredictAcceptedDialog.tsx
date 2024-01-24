import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateDialogStateAction } from 'store/actions/dialogActions';

interface IProps {
  eventId: number;
}

const PredictAcceptDialog = ({ eventId }: IProps) => {
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
    // dispatch(updateEventAfterPredictSuccess(eventId));
  }, [dispatch, eventId]);

  return (
    <Box className={clsx(classes.container, 'center-root')}>
      <Typography className={classes.notice}>Notice</Typography>
      <Typography className={classes.description}>
        Your prediction has been accepted
      </Typography>
      <Button className={classes.closeBtn} onClick={closeDialog}>
        Close
      </Button>
      <Link
        to="/prediction-history"
        className={classes.link}
        onClick={closeDialog}
      >
        View my prediction in History
      </Link>
    </Box>
  );
};

export default PredictAcceptDialog;
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#333333',
    width: 480,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'fit-content',
    },
  },
  notice: {
    fontSize: 18,
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  description: {
    fontSize: 14,
    marginTop: 24,
    [theme.breakpoints.down('sm')]: {
      marginTop: 16,
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
  link: {
    textTransform: 'uppercase',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginTop: 16,
    color: '#FFFFFF',
    [theme.breakpoints.down('sm')]: {
      marginTop: 8,
      fontSize: 14,
    },
  },
}));
