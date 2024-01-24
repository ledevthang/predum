import {
  Box,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

interface IProps {
  currentValue: number | string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  className?: string;
  values: {
    value: string;
    description?: string;
  }[];
}

const CommonRadioGroup = ({
  currentValue,
  onChange,
  name,
  values,
  className,
}: IProps) => {
  const classes = useStyles();
  return (
    <RadioGroup
      name={name}
      value={currentValue}
      onChange={onChange}
      className={clsx(classes.root, className)}
    >
      {values.map((v) => (
        <Box className={classes.wrapper} key={v.value}>
          <FormControlLabel
            value={v.value}
            control={
              <Radio
                className={classes.radio}
                classes={{ checked: classes.checked }}
              />
            }
            label={v.value == 'True / False' ? 'Yes / No' : v.value}
            className={classes.item}
          />
          <Typography className={classes.description}>
            {v.description}
          </Typography>
        </Box>
      ))}
    </RadioGroup>
  );
};

export default CommonRadioGroup;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 'fit-content',
    flexWrap: 'unset',
  },
  item: {
    width: '100%',
    fontSize: 16,
    margin: 0,
    '&>span': {
      padding: '0px 12px 0px 0px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  radio: {
    color: 'white',
    '&$checked': {
      color: 'white',
    },
  },
  wrapper: {
    marginBottom: 16,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 8,
    },
  },
  checked: {},
  description: {
    fontSize: 14,
    color: '#BDBDBD',
    [theme.breakpoints.down('sm')]: {
      fontSize: 12,
    },
  },
}));
