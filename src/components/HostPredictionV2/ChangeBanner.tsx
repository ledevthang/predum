import React, { useCallback } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import CloudIcon from 'icon/CloudIcon';
import clsx from 'clsx';

interface IProps {
  setBannerSrc: (value: string) => void;
  setOpen: (value: boolean) => void;
  className?: string;
}

const ChangeBanner = ({ setBannerSrc, setOpen, className }: IProps) => {
  const classes = useStyles();

  const onChangeBanner = useCallback((e: React.ChangeEvent<any>) => {
    let fileName = e.target.files[0].name;
    let idxDot = fileName.lastIndexOf('.') + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

    if (e.target.files[0].size > 5 * 1024 * 1024) {
      alert('Only accept images smaller than 5MB!');
      return;
    }
    if (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png') {
      setBannerSrc(URL.createObjectURL(e.target.files[0]));
      setOpen(true);
      e.target.value = null;
    } else {
      alert('Only jpg/jpeg and png files are allowed!');
    }
  }, []);

  return (
    <Button
      className={clsx(classes.button, className)}
      startIcon={<CloudIcon />}
      component="label"
    >
      Change banner
      <input hidden accept="image/*" type="file" onChange={onChangeBanner} />
    </Button>
  );
};

export default ChangeBanner;

const useStyles = makeStyles((theme) => ({
  button: {
    border: '1px dashed #3FADD5',
    padding: '8px 12px !important',
    '&>span': {
      color: '#3FADD5',
      fontSize: '14px',
      lineHeight: '17px',
    },
    '&>svg': {
      height: 12,
      width: 16,
    },
    [theme.breakpoints.down('sm')]: {
      padding: '4px 8px !important',
    },
  },
}));
