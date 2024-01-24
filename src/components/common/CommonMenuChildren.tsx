import { makeStyles, Menu } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

interface IProps {
  anchorEl: any;
  handleClose: () => void;
  children: any;
  className?: string;
}

const CommonMenuChildren = ({
  anchorEl,
  children,
  handleClose,
  className,
}: IProps) => {
  const classes = useStyles();
  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      getContentAnchorEl={null}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      className={clsx(classes.container, className)}
    >
      {children}
    </Menu>
  );
};

export default CommonMenuChildren;

const useStyles = makeStyles((theme) => ({
  container: {
    '& .MuiPaper-root': {
      borderRadius: 0,
      backgroundColor: '#333333',
    },
    '& ul': {
      padding: 0,
      borderRadius: 0,
    },
    '& .MuiPopover-paper': {
      minHeight: 0,
    },
  },
}));
