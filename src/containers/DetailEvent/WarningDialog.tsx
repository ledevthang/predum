import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  makeStyles,
} from '@material-ui/core';
import InfoIcon from 'icon/InfoIcon';
import React, { memo } from 'react';

const WarningDialog = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const classes = useStyles();
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <></>
      <Dialog
        open={isOpen}
        fullWidth={true}
        maxWidth="md"
        onClose={handleClose}
        className={classes.dialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Box className={classes.wapper}>
          <DialogContent>
            <InfoIcon color="#1976D2" />
            <DialogContentText
              id="alert-dialog-description"
              className={classes.mainText}
            >
              The host has full control of the result of this event.
            </DialogContentText>
            <DialogContentText
              id="alert-dialog-description"
              className={classes.text}
            >
              Only participate if you trust this host.
            </DialogContentText>
          </DialogContent>
          <Button onClick={handleClose} className={classes.button}>
            I UNDERSTAND
          </Button>
        </Box>
      </Dialog>
    </>
  );
};

export default memo(WarningDialog);

const useStyles = makeStyles((theme) => ({
  button: {
    height: 40,
    width: 170,
    color: 'black',
    borderRadius: 20,
    background:
      'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
  },
  wapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#333333',
    paddingBottom: 40,
    height: 280,
    '& div:first-child': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& svg': {
        height: 36,
        width: 36,
        marginTop: 28,
      },
    },
  },
  mainText: {
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    textTransform: 'uppercase',
    textAlign: 'center',
    color: 'white',
    marginTop: 10,
  },
  text: {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '19px',
    color: 'white',
    marginTop: 10,
  },
  dialog: {
    '& .MuiDialog-paperWidthMd': {
      maxWidth: 600,
    },
  },
}));
