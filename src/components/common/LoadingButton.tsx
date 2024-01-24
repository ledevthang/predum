import React, { ReactNode } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import ReactLoading from 'react-loading';
import clsx from 'clsx';

interface IProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disableRipple?: boolean;
  disabled?: boolean;
}

const LoadingButton = ({
  children,
  className,
  onClick,
  isLoading,
  disableRipple,
  disabled,
}: IProps) => {
  const classes = useStyles();
  return (
    <Button
      className={clsx(classes.container, className)}
      onClick={onClick}
      disableRipple={disableRipple}
      disabled={disabled}
    >
      {isLoading && (
        <ReactLoading
          className={classes.loading}
          type="bubbles"
          color="#FFFFFF"
          width={24}
          height={24}
        />
      )}
      {children}
    </Button>
  );
};

export default LoadingButton;
const useStyles = makeStyles((theme) => ({
  container: {},
  loading: {
    marginRight: 8,
  },
}));
