import {
  makeStyles,
  TextareaAutosize,
  Box,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { memo, useEffect, useRef } from 'react';

interface IInput {
  id?: string;
  value: any;
  placeholder?: string;
  onChange: any;
  className?: string;
  type?: string;
  onBlur?: any;
  minRows?: number;
  maxRows?: number;
  required?: boolean;
}

const CommonTextarea = ({
  value,
  placeholder,
  onChange,
  className,
  minRows,
  maxRows,
  required,
  ...otherProps
}: IInput) => {
  const classes = useStyles();

  const shouldValidation = useRef(false);
  useEffect(() => {
    if (value && required && !shouldValidation.current) {
      shouldValidation.current = true;
    }
  }, [value]);

  useEffect(() => {
    shouldValidation.current = false;
  }, []);

  return (
    <Box className={clsx(classes.container, className)}>
      <TextareaAutosize
        minRows={minRows}
        maxRows={maxRows}
        placeholder={placeholder}
        className={clsx(classes.root)}
        onChange={onChange}
        value={value}
        {...otherProps}
      />
      {required && !value && shouldValidation.current && (
        <Typography className={classes.error}>
          This field is required
        </Typography>
      )}
    </Box>
  );
};

export default memo(CommonTextarea);

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100% !important',
    position: 'relative',
  },
  root: {
    fontSize: 16,
    width: '100%',
    resize: 'vertical',
    padding: '12px 16px',
    backgroundColor: '#4B4B4B',
    border: 'unset',
    borderRadius: 2,
    color: '#FFFFFF',
    fontFamily: 'Barlow Condensed, sans-serif',
    '&::placeholder': {
      fontSize: 16,
      height: 32,
      letterSpacing: '0.9px',
      opacity: '0.75 !important',
      color: theme.palette.text.primary,
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
    outline: 'none !important',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
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
