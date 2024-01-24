import { Box, Typography } from '@material-ui/core';
import Decimal from 'decimal.js';
import { convertWeiToToken, getNameToken } from 'helpers';
import { usePlatformFee } from 'hooks/usePlatformFee';
import React, { useCallback, useMemo } from 'react';
import { IEvent } from 'types/event';
import { WhoTakeWith } from 'types/hostPrediction';
import EventHeader from './EventHeader';
import EventTitle from './EventTitle';
import { useStyles } from './ProHostHistoryItemStyle';

interface IProps {
  host: IEvent;
  reloadHostEventData: (id: number) => void;
}
export const ProHostHistoryItem = ({ host, reloadHostEventData }: IProps) => {
  const classes = useStyles();
  const { uvpPlatformFee: UVP_PLATFORM_FEE } = usePlatformFee();

  const isOver48hEndTime = useCallback(() => {
    let stringEndtime = `${host.endTime}`;
    let endTime = new Date(stringEndtime).getTime();
    let now = new Date().getTime();
    if (now < endTime) {
      return 'on going';
    } else {
      let difference = now - endTime;
      if (host.result || difference > 48 * 3600 * 1000) {
        return 'ended';
      } else return 'pending result';
    }
  }, [host.endTime, host.deadline, host.result]);
  const renderPoolValues = useCallback(
    (amount: any, isUvP?: boolean) => {
      const result = Object.keys(amount)
        .filter((a) => !!amount[a])
        .map(
          (p, i) =>
            `${convertWeiToToken(
              isUvP
                ? new Decimal(amount[p]).div(1 - UVP_PLATFORM_FEE).toString()
                : amount[p],
            )} ${getNameToken(p)} `,
        )
        .join(' & ');
      return result || '0';
    },
    [UVP_PLATFORM_FEE],
  );

  const isUserVsPool = useMemo(() => {
    const { eventType } = JSON.parse(host.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return eventType != WhoTakeWith.USER_USER;
  }, [host.metadata]);

  return (
    <>
      <Box className={classes.container}>
        <EventHeader host={host} />
        <Box className={classes.titleWapper}>
          <EventTitle host={host} statusType={isOver48hEndTime()} />
        </Box>
        <Box className={classes.statisticsWapper}>
          <Box className={classes.statisticsInfo}>
            <Typography>Statistics</Typography>
            <Box className={classes.inforContainer}>
              <Box className={classes.inforWapper}>
                <Box className={classes.infor}>
                  <Typography>Number of participants: </Typography>
                  <Typography>
                    {host.participants ? host.participants.length : 0}
                  </Typography>
                </Box>
                <Box className={classes.infor}>
                  <Typography>Total Predicted Pool: </Typography>
                  <Typography>
                    {renderPoolValues(
                      host.predictionTokenAmounts,
                      isUserVsPool,
                    )}
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.inforWapper}>
                <Box className={classes.infor}>
                  <Typography>Commission: </Typography>
                  <Typography> 10%</Typography>
                </Box>
                <Box className={classes.infor}>
                  <Typography>Event views: </Typography>
                  <Typography>{host.views} views</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className={classes.commission}>
            <Typography>Potential commission</Typography>
            <Typography>5000 EFUN</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
