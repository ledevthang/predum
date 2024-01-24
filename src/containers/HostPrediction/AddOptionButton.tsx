import { Button } from '@material-ui/core';
import clsx from 'clsx';
import AddIcon from 'icon/AddIcon';
import React from 'react';
import { useStyles } from './GroupPredictDetailStyles';

interface IProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

const AddOptionButton = ({ onClick, label, disabled, className }: IProps) => {
  const classes = useStyles();
  return (
    <Button
      className={clsx(classes.addBtn, className)}
      onClick={onClick}
      disabled={disabled}
    >
      <AddIcon color="#212121" />
      {label}
    </Button>
  );
};

export default AddOptionButton;
