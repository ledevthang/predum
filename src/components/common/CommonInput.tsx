import { TextField, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, {
  KeyboardEventHandler,
  memo,
  ReactElement,
  useEffect,
  useRef,
} from 'react';

interface IInput {
  value?: string | number | Date;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement> | undefined;
  className?: string;
  placeholder?: string;
  name?: string;
  multiline?: boolean;
  rows?: number;
  type?: string;
  disabled?: boolean;
  startAdornmentIcon?: ReactElement;
  endAdornmentIcon?: ReactElement;
  error?: boolean;
  helperText?: string;
  required?: boolean;
}
const CommonInput = ({
  value,
  onChange,
  onKeyDown,
  className,
  name,
  multiline,
  rows,
  placeholder,
  type,
  startAdornmentIcon,
  endAdornmentIcon,
  disabled,
  error,
  helperText,
  required,
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
    <TextField
      value={value}
      onChange={onChange}
      name={name}
      multiline={multiline}
      rows={rows}
      type={type}
      disabled={disabled}
      error={error || (required && !value)}
      helperText={
        helperText ||
        (!value &&
          (typeof value == 'string' || value != 0) &&
          required &&
          shouldValidation.current &&
          'This field is required')
      }
      InputProps={{
        startAdornment: startAdornmentIcon,
        endAdornment: endAdornmentIcon,
        disableUnderline: true,
      }}
      className={clsx(className, classes.root)}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  );
};

export default memo(CommonInput);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    borderRadius: 2,
    '& .MuiInput-root': {
      height: 'inherit',
    },
    '& input': {
      padding: 0,
      height: 'inherit',
      fontSize: 16,
      paddingLeft: 12,
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
    '& input::placeholder': {
      fontSize: 16,
      color: '#BDBDBD',
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
      },
    },
    '&>p': {
      whiteSpace: 'nowrap',
    },
    '& p.Mui-error': {
      position: 'absolute',
      bottom: -23,
      [theme.breakpoints.down('sm')]: {
        marginTop: 0,
      },
    },
  },
  notchedOutline: {},
}));
