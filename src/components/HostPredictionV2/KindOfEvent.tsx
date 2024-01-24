import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import CommonTooltip from 'components/common/CommonTooltip';
import CommonTooltipMobile from 'components/common/CommonTooltipMobile';
import InfoIcon from 'icon/InfoIcon';
import React from 'react';
import { useStyles } from './KindOfEventStyle';

interface IProps {
  Logo: any;
  name: string;
  description: string;
  tooltipContent: string;
  selected: boolean;
  onChangeKindOfEvent: () => void;
  disabled?: boolean;
}

const KindOfEvent = ({
  Logo,
  name,
  description,
  selected,
  onChangeKindOfEvent,
  disabled,
  tooltipContent,
}: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <>
      <Box
        className={clsx(classes.wrapperIcon, {
          [classes.wrapperIconSelected]: selected,
          [classes.disabled]: disabled,
        })}
        onClick={!disabled ? onChangeKindOfEvent : () => {}}
      >
        {Logo}
        <Box className={classes.wrapperNameAndIcon}>
          <Typography className={classes.kindOfEvent}>{name}</Typography>
          {isDesktop ? (
            <CommonTooltip title={tooltipContent}>
              <InfoIcon />
            </CommonTooltip>
          ) : (
            <CommonTooltipMobile title={tooltipContent}>
              <InfoIcon />
            </CommonTooltipMobile>
          )}
          {/* <InfoIcon /> */}
        </Box>

        <Typography className={classes.kindOfEventDescription}>
          {description}
        </Typography>
      </Box>
      {disabled && (
        <Box className={classes.comingSoon}>
          <Typography>Coming soon</Typography>
          <Divider />
        </Box>
      )}
    </>
  );
};

export default KindOfEvent;
