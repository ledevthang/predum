import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { memo, useCallback, useEffect, useRef } from 'react';

interface IProps {
  name?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  link?: string;
  isHasData?: boolean;
  isUnderlineText?: boolean;
  clearFileData?: (e: React.ChangeEvent<any>) => void;
  required?: boolean;
  isHiddenChooseFile?: boolean;
  isHiddenDeleteButton?: boolean;
}

const CommonUploadFileInput = ({
  name,
  onChange,
  className,
  link,
  clearFileData,
  isHasData,
  required,
  isHiddenChooseFile,
  isUnderlineText,
  isHiddenDeleteButton,
}: IProps) => {
  const classes = useStyles();

  const shouldValidation = useRef(false);
  useEffect(() => {
    if (isHasData && required && !shouldValidation.current) {
      shouldValidation.current = true;
    }
  }, [isHasData]);

  useEffect(() => {
    shouldValidation.current = false;
  }, []);
  const handleClickResult = () => {
    let action: any;
    if (isHiddenChooseFile) {
      action = window.open(link, '_blank');
    }
    if (isHiddenChooseFile && window != null && action && link) {
      action.focus();
    }
  };
  const renderDeleteButton = useCallback(() => {
    if (!isHiddenDeleteButton) {
      if (isHasData) {
        return (
          <Box onClick={clearFileData} className={classes.delete}>
            X
          </Box>
        );
      }
    }
    return <></>;
  }, [isHasData, isHiddenDeleteButton]);

  return (
    <Box className={clsx(classes.main, className)} onClick={handleClickResult}>
      <Typography
        className={clsx(classes.name, {
          [classes.underline]: isUnderlineText,
        })}
      >
        {name}
      </Typography>
      {renderDeleteButton()}
      {!isHiddenChooseFile && (
        <label className={classes.label}>
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onChange}
          />
          <i /> Choose file
        </label>
      )}
      <Typography className={classes.error}>
        {required &&
          !isHasData &&
          shouldValidation.current &&
          'This field is required'}
      </Typography>
    </Box>
  );
};

export default memo(CommonUploadFileInput);

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#4B4B4B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  input: {
    display: 'none',
  },
  underline: {
    textDecoration: 'underline',
  },
  delete: {
    marginRight: 6,
    padding: '7px 12px',
    cursor: 'pointer',
    fontSize: 14,
    backgroundColor: '#616161',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      padding: '6px 10px',
    },
  },
  label: {
    marginRight: 6,
    padding: '7px 26px',
    cursor: 'pointer',
    fontSize: 14,
    backgroundColor: '#616161',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
      padding: '6px 17px',
    },
  },
  name: {
    marginRight: 'auto',
    marginLeft: 16,
  },
  error: {
    fontSize: '0.75rem',
    marginTop: 3,
    textAlign: 'left',
    position: 'absolute',
    bottom: -23,
    left: 0,
    color: '#f44336',
  },
}));
