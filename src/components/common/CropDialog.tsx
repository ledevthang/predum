import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import theme from 'material';
import { Cropper } from 'react-cropper';

interface IProps {
  handleCloseDialog: () => void;
  getCropData: (croper: any) => void;
  aspectRatio: number;
  open: boolean;
  src: string;
}

const CropDialog = ({
  handleCloseDialog,
  open,
  aspectRatio,
  src,
  getCropData,
}: IProps) => {
  const classes = useStyles();
  const [cropper, setCropper] = useState<any>();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      onClose={handleCloseDialog}
      aria-labelledby="customized-dialog-title"
      fullScreen={fullScreen}
      maxWidth="lg"
      open={open}
    >
      <DialogContent dividers>
        <Cropper
          style={{ height: 500, width: '100%' }}
          aspectRatio={aspectRatio}
          guides={false}
          src={src}
          responsive={true}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          viewMode={1}
          dragMode="move"
          cropBoxMovable={false}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} className={classes.saveButton}>
          Delete
        </Button>
        <Button
          onClick={() => getCropData(cropper)}
          className={classes.saveButton}
        >
          Crop
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CropDialog;
const useStyles = makeStyles((theme) => ({
  saveButton: {
    '&>span': {
      color: 'black',
    },
    margin: '0px 20px',
  },
}));
