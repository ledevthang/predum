import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

interface IProps {
  checked: boolean;
  handleChange: () => void;
  className?: string;
  label?: string;
}

const CommonCheckBox = ({
  checked,
  className,
  label,
  handleChange,
}: IProps) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      control={
        <Checkbox
          className={clsx(classes.main, className)}
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
          classes={{ checked: classes.checked }}
        />
      }
      label={label}
    />
  );
};

export default CommonCheckBox;

const useStyles = makeStyles((theme) => ({
  main: {
    color: 'white',
  },
  checked: {
    '& svg': {
      color: '#17C7A7',
    },
  },
}));
