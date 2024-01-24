import { Button, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { memo } from 'react';

const Arrow = ({
  children,
  disabled,
  onClick,
  className,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
  className?: string;
}) => {
  const classes = useStyles();

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      style={{
        opacity: disabled ? '0' : '1',
      }}
      className={clsx(classes.container, className)}
    >
      {children}
    </Button>
  );
};

export default memo(Arrow);

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    userSelect: 'none',
    // top: '50%',
    height: 'fit-content',
    zIndex: 2,
    // position: 'absolute',
    transform: 'translateY(-50%)',
  },
}));
