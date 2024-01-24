import React, { ReactElement } from 'react';
import {
  Box,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import InfoIcon from 'icon/InfoIcon';
import CommonTooltip from 'components/common/CommonTooltip';
import CommonTooltipMobile from 'components/common/CommonTooltipMobile';

interface IProps {
  title: string;
  children: any;
  className?: string;
  isAnnotate?: boolean;
  titleAnnotate?: string | ReactElement;
}

const ComponentWithTooltip = ({
  title,
  children,
  className,
  isAnnotate,
  titleAnnotate,
}: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  return (
    <Box width="100%" className={className}>
      <Box display="flex" alignItems="center" className={classes.wrapper}>
        <Typography className={classes.title}>{title}</Typography>
        {isAnnotate &&
          titleAnnotate &&
          (isDesktop ? (
            <CommonTooltip title={titleAnnotate}>
              <InfoIcon width={18} height={18} />
            </CommonTooltip>
          ) : (
            <CommonTooltipMobile title={titleAnnotate}>
              <InfoIcon width={18} height={18} />
            </CommonTooltipMobile>
          ))}
      </Box>
      {children}
    </Box>
  );
};

export default ComponentWithTooltip;

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 24,
    fontWeight: 500,
    marginRight: 6,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
  wrapper: {
    marginBottom: 0,
  },
}));
