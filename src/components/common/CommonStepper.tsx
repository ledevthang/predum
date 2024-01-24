import { Box, makeStyles, Step, StepLabel, Stepper } from '@material-ui/core';
import { StepIconProps } from '@material-ui/core/StepIcon';
import clsx from 'clsx';
import React, { memo } from 'react';

import StepCompleteIcon from 'icon/SetpCompleteIcon';

interface IProps {
  activeStep: number;
  isShowAll?: boolean;
  className?: string;
  isHome?: boolean;
  steps: {
    id: number;
    label: string;
  }[];
}

const CommonStepper = ({
  steps,
  activeStep,
  className,
  isShowAll,
  isHome,
}: IProps) => {
  const classes = useStyles();
  const renderStepIcon = ({ icon, completed }: StepIconProps) => {
    return (
      <>
        {completed ? (
          <Box className={classes.completed}>
            <StepCompleteIcon />
          </Box>
        ) : (
          <Box
            className={clsx(
              isHome ? classes.homeSize : classes.notComplete,
              'center-root',
            )}
          >
            {icon}
          </Box>
        )}
      </>
    );
  };

  return (
    <Stepper
      activeStep={activeStep - 1}
      className={clsx(classes.root, className)}
    >
      {steps.map((v) => {
        const stepProps: { completed?: boolean } = {};
        return (
          <Step key={v.id} {...stepProps}>
            <StepLabel
              StepIconComponent={renderStepIcon}
              className={clsx(classes.step, 'center-root', {
                [classes.showAll]: isShowAll,
              })}
            >
              {(v.id == activeStep || isShowAll) && v.label}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default memo(CommonStepper);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '24px 0px',
    backgroundColor: 'unset',
    '& .MuiStep-root': {
      padding: '0px 10px',
    },
  },
  showAll: {
    '&>span>span': {
      color: '#FFF',
      fontWeight: 500,
    },
  },
  homeSize: {
    width: 36,
    height: 36,
    border: '2px solid #BDBDBD',
    borderRadius: '50%',
    fontSize: 14,
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      width: 24,
      height: 24,
      background: 'black',
      fontSize: 12,
    },
  },
  completed: {
    height: 48,
    [theme.breakpoints.down('md')]: {
      height: 36,
    },
    [theme.breakpoints.down('sm')]: {
      height: 24,
    },
    '& svg': {
      width: 48,
      height: 48,
      [theme.breakpoints.down('md')]: {
        width: 36,
        height: 36,
      },
      [theme.breakpoints.down('sm')]: {
        width: 24,
        height: 24,
      },
      fill: '#17C7A7',
    },
  },
  notComplete: {
    width: 48,
    height: 48,
    border: '2px solid #BDBDBD',
    borderRadius: '50%',
    fontSize: 28,
    fontWeight: 600,
    [theme.breakpoints.down('md')]: {
      width: 36,
      height: 36,
      fontSize: 14,
    },
    [theme.breakpoints.down('sm')]: {
      width: 24,
      height: 24,
      fontSize: 12,
    },
  },
  step: {
    position: 'relative',
    '&>span': {
      paddingRight: 0,
    },
    '&>span:last-child': {
      position: 'absolute',
      bottom: 'calc(-50% - 12px)',
      width: 'fit-content',
      whiteSpace: 'nowrap',
      fontSize: 16,
      [theme.breakpoints.down('md')]: {
        fontSize: 14,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 12,
      },
    },
  },
}));
