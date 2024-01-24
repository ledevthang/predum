import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import CommonTooltip from 'components/common/CommonTooltip';
import CommonTooltipMobile from 'components/common/CommonTooltipMobile';
import InfoIcon from 'icon/InfoIcon';
import React, { ReactElement } from 'react';
import { useStyles } from './LabelInputStyles';

interface IProps {
  label?: string;
  component: ReactElement;
  className?: string;
  isAnnotate?: boolean;
  titleAnnotate?: string;
}

const LabelInput = ({
  component,
  label,
  className,
  isAnnotate,
  titleAnnotate,
}: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <Box className={clsx(classes.container, className)}>
      <Box display="flex" className={classes.wapper}>
        {label && <Typography className={classes.label}>{label}</Typography>}
        {isAnnotate &&
          titleAnnotate &&
          (isDesktop ? (
            <CommonTooltip title={titleAnnotate}>
              <InfoIcon />
            </CommonTooltip>
          ) : (
            <CommonTooltipMobile title={titleAnnotate}>
              <InfoIcon />
            </CommonTooltipMobile>
          ))}
      </Box>

      {component}
    </Box>
  );
};

export default LabelInput;
