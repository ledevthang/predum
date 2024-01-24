import { Box } from '@material-ui/core';
import clsx from 'clsx';
import React, { useMemo } from 'react';

import { EEventStatus } from 'types/event';

import { useStyles } from './EventItemStyles';

const EventStatus = ({
  status,
  isPro,
  className,
}: {
  status?: EEventStatus;
  isPro?: boolean;
  className?: string;
}) => {
  const classes = useStyles();
  const isDetail = location.pathname.includes('detail');
  const renderStatus = useMemo(() => {
    switch (status) {
      case EEventStatus.ENDED:
        return (
          <Box
            className={clsx(classes.finished, 'center-root', {
              [classes.statusPro]: isPro,
              [classes.statusDetail]: isDetail,
            })}
          >
            ENDED
          </Box>
        );
      case EEventStatus.PREDICTED:
        return (
          <Box
            className={clsx(classes.predicted, 'center-root', {
              [classes.statusPro]: isPro,
              [classes.statusDetail]: isDetail,
            })}
          >
            PREDICTED
          </Box>
        );
      case EEventStatus.PENDING:
        return (
          <Box
            className={clsx(classes.pending, 'center-root', {
              [classes.statusPro]: isPro,
              [classes.statusDetail]: isDetail,
            })}
          >
            PENDING
          </Box>
        );
      case EEventStatus.LOCKED:
        return (
          <Box
            className={clsx(classes.invalid, 'center-root', {
              [classes.statusPro]: isPro,
              [classes.statusDetail]: isDetail,
            })}
          >
            LOCKED
          </Box>
        );
      default:
        return (
          <Box
            className={classes.pending}
            style={{
              visibility: 'hidden',
              display: isDetail ? 'none' : 'initial',
            }}
          >
            Default
          </Box>
        );
    }
  }, [status, isPro, isDetail]);

  return <Box className={className}>{renderStatus}</Box>;
};

export default EventStatus;
