import {
  FormControl,
  FormHelperText,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import { memo, ReactElement, useEffect, useRef } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';

import ArrowDownIcon from 'icon/ArrowDownIcon';

interface IInput {
  values: {
    Icon?: ReactElement;
    value: string;
    id: string | number;
  }[];
  currentValue?: number | string;
  className?: string;
  label?: string;
  onChange: any;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  classNameItem?: string;
}

const CommonSelectInput = ({
  values,
  currentValue,
  className,
  onChange,
  label,
  name,
  disabled,
  required,
  classNameItem,
}: IInput) => {
  const classes = useStyles();
  const isWidget = location.pathname.includes('widget');
  const { themeWidget } = useParams<{ themeWidget: string }>();

  const shouldValidation = useRef(false);
  useEffect(() => {
    if (currentValue && required && !shouldValidation.current) {
      shouldValidation.current = true;
    }
  }, [currentValue]);

  useEffect(() => {
    shouldValidation.current = false;
  }, []);

  return (
    <FormControl className={clsx(classes.formControl, className)}>
      <Select
        value={`${currentValue || ''}`}
        onChange={onChange}
        displayEmpty
        className={clsx(classes.root, { [classes.lightRoot]: isWidget })}
        disableUnderline
        MenuProps={{
          classes: {
            paper:
              isWidget && themeWidget == 'light'
                ? classes.dropdownStyleLight
                : classes.dropdownStyle,
          },
        }}
        IconComponent={ArrowDownIcon}
        classes={{ select: classes.select }}
        name={name}
        disabled={disabled}
      >
        {label && (
          <MenuItem value="">
            <Typography
              className={classes.none}
              style={{
                color: isWidget && themeWidget == 'light' ? '#1c1c1e' : 'white',
              }}
            >
              {label}
            </Typography>
          </MenuItem>
        )}
        {values.map((v) => (
          <MenuItem
            key={v.value}
            value={v.id}
            classes={{
              selected:
                isWidget && themeWidget == 'light'
                  ? classes.activeLight
                  : classes.active,
              root: classes.item,
            }}
          >
            {v.Icon}
            <Typography className={classNameItem}>{v.value}</Typography>
          </MenuItem>
        ))}
      </Select>
      {shouldValidation.current && required && !currentValue && (
        <FormHelperText className={classes.error}>
          This field is required
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default memo(CommonSelectInput);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    paddingLeft: 8,
    backgroundColor: '#4B4B4B',
    fontSize: 16,
    '& svg': {
      width: 16,
      height: 16,
      position: 'absolute',
      top: 'calc(50% - 8px)',
      right: 8,
      pointerEvents: 'none',
    },
    '& input': {
      height: 0,
      color: theme.palette.text.primary,
    },
    '& p': {
      fontSize: 16,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
    outline: 'none !important',
  },
  lightRoot: {
    backgroundColor: 'unset',
  },
  dropdownStyle: {
    backgroundColor: '#4B4B4B',
  },
  dropdownStyleLight: {
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: '#4B4B4B',
    '& svg': {
      marginRight: 8,
    },
    '& p': {
      fontSize: 16,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
  },
  active: {
    backgroundColor: '#1C1C1E !important',
  },
  activeLight: {
    backgroundColor: 'rgba(0, 0, 0, 0.1) !important',
  },
  select: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    '& svg': {
      height: 24,
      width: 24,
      marginRight: 8,
    },
  },
  none: {
    fontSize: 16,
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
  formControl: {
    width: '100%',
    position: 'relative',
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
