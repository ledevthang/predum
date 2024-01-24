import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { LIMIT_FILE_SIZE } from 'common';
import CloseIcon from 'icon/CloseIcon';
import ImageGallery from 'icon/ImageGallery';
import React, { useState } from 'react';
import CropDialog from './CropDialog';

interface IProps {
  label?: string;
  onChange: (file: File) => void;
  file?: string;
  className?: string;
  onDeleteImage: () => void;
  size?: string;
  name: string;
}

const CommonUploadFileCropImage = ({
  label,
  onChange,
  file,
  className,
  onDeleteImage,
  size,
  name,
}: IProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [fileCrop, setFileCrop] = useState<File>();
  const [fileSrc, setFileSrc] = useState<string>('');
  const getCropData = (cropper: any) => {
    if (typeof cropper !== 'undefined') {
      let canvas = cropper.getCroppedCanvas();
      canvas.toBlob((blob: any) => {
        let file = new File([blob], name, { type: 'image/png' });
        onChange(file);
        setFileCrop(file);
      });
    }
  };
  const onChangeInput = (e: React.ChangeEvent<any>) => {
    let fileName = e.target.files[0].name;
    const size = e.target.files[0].size;
    let idxDot = fileName.lastIndexOf('.') + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (
      (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png') &&
      size <= LIMIT_FILE_SIZE
    ) {
      setFileSrc(URL.createObjectURL(e.target.files[0]));
      setOpen(true);
      e.target.files = undefined;
    } else {
      alert('Only jpg/jpeg and png files with less than 5MB are allowed!');
    }
  };
  const onDeleteImageCrop = () => {
    setFileSrc('');
    setOpen(false);
    onDeleteImage();
  };
  return !file ? (
    <label className={clsx(classes.container, 'center-root', className)}>
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={onChangeInput}
        name={name}
        accept="image/*"
      />
      <>
        <ImageGallery width={30} height={30} />
        <Typography className={classes.label}>{label}</Typography>
        <Typography className={classes.label}>{size}</Typography>
        <CropDialog
          open={open}
          handleCloseDialog={() => {
            setOpen(false);
          }}
          getCropData={getCropData}
          src={fileSrc}
          aspectRatio={32 / 25}
        />
      </>
    </label>
  ) : (
    <div className={classes.imgWithDelete}>
      <img src={file} alt={label} className={clsx(classes.img, className)} />
      <Button className={classes.delete} onClick={onDeleteImageCrop}>
        <CloseIcon width={12} height={12} color="red" />
      </Button>
    </div>
  );
};

export default CommonUploadFileCropImage;

const useStyles = makeStyles((theme) => ({
  container: {
    width: 120,
    height: 120,
    border: '1px dashed #3E3E3F',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  imgWithDelete: {
    position: 'relative',
    '&:hover button': {
      opacity: 1,
      transform: 'translateY(30%)',
    },
  },
  label: {
    fontSize: 12,
    color: '#BDBDBD',
  },
  img: {
    width: 120,
    height: 120,
    objectFit: 'cover',
  },
  delete: {
    position: 'absolute',
    opacity: 0,
    right: 8,
    transform: 'translateY(0)',
    transition: 'transform 0.5s, opacity 0.5s',
    color: 'white',
    width: 24,
    height: 24,
    backgroundColor: '#BDBDBD',
    borderRadius: 22,
  },
}));
