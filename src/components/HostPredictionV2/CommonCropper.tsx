import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import { Cropper } from 'react-cropper';
import theme from 'material';

interface IProps {
  setBannerSrc: (value: string) => void;
  setOpen: (value: boolean) => void;
  bannerSrc: string;
  open: boolean;
  aspectRatio: number;
  callback: (value: File) => void;
}
const CommonCropper = ({
  setBannerSrc,
  setOpen,
  bannerSrc,
  open,
  aspectRatio,
  callback,
}: IProps) => {
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [cropper, setCropper] = useState<any>();

  const handleCloseDialog = () => {
    setBannerSrc('');
    setOpen(false);
  };
  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      let canvas = cropper.getCroppedCanvas();
      canvas.toBlob((blob: any) => {
        let url = URL.createObjectURL(blob);
        let file = new File([blob], 'name.png', { type: 'image/png' });
        callback(file);
        setOpen(false);
        setBannerSrc(url);
      });
    }
  };

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
          src={bannerSrc}
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
        <Button onClick={getCropData} className={classes.saveButton}>
          Crop
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonCropper;

const useStyles = makeStyles((theme) => ({
  saveButton: {
    '&>span': {
      color: 'black',
      // background: '#3FADD5 !important',
    },
    margin: '0px 20px',
  },
}));
