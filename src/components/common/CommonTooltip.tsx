import { Box, makeStyles, Tooltip } from '@material-ui/core';
import React, { ReactElement } from 'react';

interface IProps {
  title: string | ReactElement;
  children: any;
}

const CommonTooltip = ({ title, children }: IProps) => {
  const classes = useStyles();
  return (
    <Tooltip
      title={title}
      interactive
      placement="right-start"
      classes={{ tooltip: classes.tooltip }}
    >
      <Box>{children}</Box>
    </Tooltip>
  );
};

const useStyles = makeStyles((theme) => ({
  tooltip: {
    fontSize: '16px',
    backgroundColor: '#111111',
    width: '500px',
    '& p': {
      textAlign: 'justify',
    },
  },
}));
export default CommonTooltip;
