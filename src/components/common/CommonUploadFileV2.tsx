import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import CloseIcon from 'icon/CloseIcon';
import ImageGallery from 'icon/ImageGallery';
import React from 'react';

interface IProps {
  label?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  file?: string;
  className?: string;
  onDeleteImage: () => void;
  size?: string;
  name?: string;
}

const CommonUploadFileV2 = ({
  label,
  onChange,
  file,
  className,
  onDeleteImage,
  size,
  name,
}: IProps) => {
  const classes = useStyles();
  return !file ? (
    <label className={clsx(classes.container, 'center-root', className)}>
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={onChange}
        name={name}
        accept="image/*"
      />
      <>
        <ImageGallery width={30} height={30} />
        <Typography className={classes.label}>{label}</Typography>
        <Typography className={classes.label}>{size}</Typography>
      </>
    </label>
  ) : (
    <div className={classes.imgWithDelete}>
      <img src={file} alt={label} className={clsx(classes.img, className)} />
      <Button className={classes.delete} onClick={onDeleteImage}>
        <CloseIcon width={12} height={12} color="red" />
      </Button>
    </div>
  );
};

export default CommonUploadFileV2;

const useStyles = makeStyles((theme) => ({
  container: {
    border: '1px dashed #3E3E3F',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  imgWithDelete: {
    position: 'relative',
    width: 'fit-content',
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
