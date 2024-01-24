import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core';
import {
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import clsx from 'clsx';
import 'date-fns';
import ClockIcon from 'icon/ClockIcon';
import React, { useEffect, useRef, useState } from 'react';

interface IProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
  helperText?: string;
  required?: boolean;
}

const CommonTimePicker = ({
  value,
  onChange,
  className,
  helperText,
  required,
}: IProps) => {
  const classes = useStyles();
  const [errMes, setErrMes] = useState<string | undefined>('');
  const onError = (a: any, b: any) => {
    if (String(b) == 'Invalid Date' && b != null) {
      setErrMes(String(b));
    } else if (helperText) {
      setErrMes(helperText);
    } else {
      setErrMes('');
    }
  };

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
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        disableToolbar
        variant="inline"
        format="HH:mm:ss"
        margin="normal"
        value={value}
        ampm={false}
        error={true}
        helperText={
          helperText ||
          (!value && shouldValidation.current && 'This field is required')
        }
        autoOk={true}
        onChange={onChange}
        className={clsx(classes.root, className)}
        InputProps={{
          disableUnderline: true,
        }}
        onError={onError}
        PopoverProps={{
          className: classes.popup,
        }}
        keyboardIcon={<ClockIcon />}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CommonTimePicker;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#4B4B4B',
    width: '100%',
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 16,
    '& input': {
      fontSize: 16,
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
    '& .MuiInputBase-root': {
      height: '100%',
    },
    '& .MuiFormHelperText-root': {
      marginTop: 10,
    },
  },
  popup: {
    '& .MuiPickersBasePicker-container': {
      backgroundColor: '#4B4B4B',
    },
    // '& .MuiPickersClock-clock':{
    //     backgroundColor:'#111111'
    // },
  },
}));
