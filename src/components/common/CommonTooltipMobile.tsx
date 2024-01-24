import { Box, makeStyles, Tooltip } from '@material-ui/core';
import React, { ReactElement, useState } from 'react';

interface IProps {
  title: string | ReactElement;
  children: any;
}

const CommonTooltipMobile = ({ title, children }: IProps) => {
  const classes = useStyles();
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);
  return (
    <Tooltip
      title={title}
      interactive
      placement="right-start"
      classes={{ tooltip: classes.tooltip }}
      open={openTooltip}
    >
      <Box
        onClick={() => setOpenTooltip(true)}
        onMouseLeave={() => setOpenTooltip(false)}
      >
        {children}
      </Box>
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
export default CommonTooltipMobile;
