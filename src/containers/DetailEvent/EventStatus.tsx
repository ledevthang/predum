import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import CommonTooltip from 'components/common/CommonTooltip';
import { convertTime } from 'helpers';
import InfoIcon from 'icon/InfoIcon';
import { IEvent } from 'types/event';
import { WhoTakeWith } from 'types/hostPrediction';

import BetSlipDetailEvent from './BetSlipDetailEvent';
import { useStyles } from './EventStatusStyles';

interface IProps {
  event: IEvent;
}

const EventStatus = ({ event }: IProps) => {
  const classes = useStyles();
  const [isEventOverDeadline, setIsEventOverDeadline] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const isWidget = location.pathname.includes('widget');
  const isOverTime = (a: string) => {
    let time = new Date(a);
    return new Date() > time;
  };
  useEffect(() => {
    setIsEventOverDeadline(isOverTime(`${event?.deadline}`));
  }, [event?.deadline]);
  const renderOverDeadline = () => {
    let isBefore48hEndtime = dayjs(event.endTime)
      .add(2, 'day')
      .isAfter(new Date());
    let isOverEndtime = dayjs(event.endTime).isBefore(new Date());
    if (isBefore48hEndtime && isOverEndtime && !event.result) {
      return (
        <Box className={clsx(classes.wapperDeadline, classes.fDrection)}>
          <Typography>The result is pending</Typography>
          <Box>
            <Typography>
              {`Your token will be refunded if no result confirmed by ${convertTime(
                dayjs(event.endTime).add(2, 'day').toDate(),
              )}`}
            </Typography>
          </Box>
        </Box>
      );
    }
    if (!isBefore48hEndtime && !event.result) {
      return (
        <Box className={clsx(classes.wapperDeadline, classes.fDrection)}>
          <Typography>No result was comfirmed</Typography>
          <Box display="flex">
            <Typography>You can claim your winning below or in</Typography>
            <Typography
              className={classes.typoHistory}
              onClick={redirectHistoryPage}
            >
              history page
            </Typography>
          </Box>
        </Box>
      );
    }
    return (
      <Box className={classes.wapperDeadline}>
        <Typography>Event is locked after deadline</Typography>
      </Box>
    );
  };

  const redirectHistoryPage = () => {
    history.push('/prediction-history');
  };
  const renderInfo = () => {
    if (event.status != 'FINISH') return;
    let reportStatus = '';
    const date = dayjs(event.claimTime);
    const dateToMilliSecond = date.valueOf();
    const dateFormat = convertTime(date.toDate());
    const now = Date.now();
    if (now <= dateToMilliSecond && !event.reportContents.length) {
      reportStatus = `Result will be finalized on ${dateFormat}`;
    } else if (now > dateToMilliSecond && !event.reportContents.length) {
      reportStatus = 'Result was finalized';
    } else if (now <= dateToMilliSecond && event.reportContents.length) {
      reportStatus = `On-going dispute. Result will be updated on ${dateFormat}`;
    } else if (now > dateToMilliSecond && event.reportContents.length) {
      reportStatus = 'Dispute resolved';
    }
    return (
      <>
        <Typography>{reportStatus}</Typography>
        {event.pro == 0 && (
          <CommonTooltip title="Within 48 hours after host confirms result, you get to report if the result is incorrect before it’s finalized. The Predum team will look into and resolve the reported result.">
            <InfoIcon />
          </CommonTooltip>
        )}
      </>
    );
  };
  const renderFinalized = () => {
    let isOver48hFinalTime = dayjs(event.finalTime)
      .add(2, 'day')
      .isAfter(new Date());

    if (isOver48hFinalTime) {
      return (
        <Box className={clsx(classes.wapperDeadline, classes.fDrection)}>
          <Typography>
            {event?.pro == 0
              ? `The host has confirmed the event's result`
              : event.isBlock
              ? 'Event is canceled or postponed'
              : 'Result is automatically updated'}
          </Typography>
          {event?.pro == 0 && (
            <Box display="flex">
              <Typography>Result:</Typography>
              <Typography
                className={classes.typoHistory}
                onClick={() => {
                  window.open(event.resultProofUrl || '', '_blank')?.focus();
                }}
              >
                {event.resultProofUrl}
              </Typography>
            </Box>
          )}
          <Box display="flex">{renderInfo()}</Box>
        </Box>
      );
    } else {
      return (
        <Box className={clsx(classes.wapperDeadline, classes.fDrection)}>
          <Typography>The event has officially ended.</Typography>
          <Box display="flex">
            <Typography>Result was finalized</Typography>
            {event.pro == 0 && <InfoIcon />}
          </Box>
          {event?.pro == 0 && (
            <Box display="flex">
              <Typography>Result:</Typography>
              <Typography
                className={classes.typoHistory}
                onClick={() => {
                  window.open(event.resultProofUrl || '', '_blank')?.focus();
                }}
              >
                {event.resultProofUrl}
              </Typography>
            </Box>
          )}
          <Box display="flex">
            <Typography>You can claim your winning below or in</Typography>
            <Typography
              className={classes.typoHistory}
              onClick={redirectHistoryPage}
            >
              history page
            </Typography>
          </Box>
        </Box>
      );
    }
  };

  return (
    <Box
      className={clsx(
        classes.wapperStatus,
        {
          [classes.wapperStatusPro]:
            JSON.parse(event?.metadata || '{}').eventType !=
              WhoTakeWith.USER_USER &&
            event?.pro != 0 &&
            JSON.parse(event?.metadata || '{}').fixtureMeta,
        },
        {
          [classes.wapperStatusProWidget]: isWidget,
        },
      )}
    >
      {isEventOverDeadline ? (
        event.result ? (
          renderFinalized()
        ) : (
          renderOverDeadline()
        )
      ) : (
        <BetSlipDetailEvent event={event} />
      )}
    </Box>
  );
};

export default EventStatus;
