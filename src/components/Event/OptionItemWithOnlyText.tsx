import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useParams } from 'react-router-dom';

import TooltipTypography from 'components/common/TooltipTypography';
import DollarIcon from 'icon/DollarCircleIcon';

import { useStyles } from './EventItemStyles';

interface IProps {
  name: string;
  odd?: string;
  percentage?: number;
  className?: string;
  disabledPercentage?: boolean;
  onClick?: () => void;
}
const OptionItemWithOnlyText = ({
  name,
  odd,
  percentage,
  className,
  disabledPercentage,
  onClick,
}: IProps) => {
  const classes = useStyles();
  const { themeWidget } = useParams<{ themeWidget: string }>();

  return (
    <Box
      className={clsx(
        themeWidget == 'light'
          ? classes.optionOnlyTextLight
          : classes.optionOnlyText,
        className,
      )}
      onClick={onClick}
    >
      <TooltipTypography text={name} className={classes.tooltip} />
      {(odd || !disabledPercentage) && (
        <Box
          className={
            themeWidget == 'light'
              ? classes.wrapOnlyText2Light
              : classes.wrapOnlyText2
          }
        >
          {odd && <p>{`${odd}${!disabledPercentage ? ' - ' : ''}`}</p>}
          {!disabledPercentage && (
            <Box className="center-root">
              <DollarIcon />
              <Typography>{percentage || 0}%</Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default OptionItemWithOnlyText;
