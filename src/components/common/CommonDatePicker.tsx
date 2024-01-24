import 'date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import CalendarIcon from 'icon/CalendarIcon';

interface IProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
  helperText?: string;
  required?: boolean;
  maxDate?: Date | null;
  minDate?: Date | null;
  onClose?: () => void;
}

const CommonDatePicker = ({
  value,
  onChange,
  className,
  helperText,
  required,
  maxDate,
  minDate,
  onClose,
}: IProps) => {
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
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        autoOk={true}
        value={value}
        minDate={minDate}
        error={true}
        helperText={
          helperText ||
          (!value && shouldValidation.current && 'This field is required')
        }
        onChange={onChange}
        className={clsx(classes.root, className)}
        InputProps={{
          disableUnderline: true,
        }}
        PopoverProps={{
          className: classes.popup,
        }}
        keyboardIcon={<CalendarIcon />}
        maxDate={maxDate}
        onClose={onClose}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CommonDatePicker;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#4B4B4B',
    width: '100%',
    paddingLeft: 16,
    marginTop: 0,
    marginBottom: 0,
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
      position: 'absolute',
      bottom: -20,
      left: 0,
      whiteSpace: 'nowrap',
    },
  },
  popup: {
    '& .MuiPickersBasePicker-container': {
      backgroundColor: '#4B4B4B',
    },
    '& .MuiPickersCalendarHeader-dayLabel': {
      color: '#111111',
    },

    '& .MuiPickersCalendarHeader-iconButton': {
      '&:hover': {
        backgroundColor: '#FFFFFF',
      },
    },
  },
}));
