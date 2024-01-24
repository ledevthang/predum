import {
  Box,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import EventStatus from 'components/Event/EventStatus';
import { convertTime } from 'helpers';
import React, { useMemo } from 'react';
import Countdown from 'react-countdown';
import { EEventStatus } from 'types/event';
import { IFixture } from 'types/fixture';
import { useStyles } from './styles';

const FixtureDetail = ({
  fixture,
  listingStatus,
}: {
  fixture: IFixture;
  listingStatus?: EEventStatus;
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const teamsMeta = useMemo(() => {
    return JSON.parse(fixture.teamsMeta);
  }, [fixture.teamsMeta]);
  const goalsMeta = useMemo(() => {
    return JSON.parse(fixture.goalsMeta);
  }, [fixture.goalsMeta]);

  const time = useMemo(() => {
    const deadline = new Date(fixture.date);
    return deadline.getTime() - new Date().getTime();
  }, [fixture.date]);
  return (
    <Box className={classes.container}>
      <Box className={classes.wapperLogo}>
        {!isMobile && <Typography>{teamsMeta.home.name}</Typography>}
        <CardMedia image={teamsMeta.home.logo} className={classes.logo} />
      </Box>
      <Box className={classes.wrapperFixtureDetail}>
        {/* <Typography>
          {teamsMeta.home.name} VS {teamsMeta.away.name}
        </Typography> */}
        {time > 0 && (
          <>
            <Typography>
              {convertTime(fixture.date, 'DD MMM, YYYY HH:mm')}
            </Typography>
            {/* <Typography>{convertTime(fixture.date, 'HH:mm')}</Typography> */}
          </>
        )}
        {time > 0 && time < 24 * 60 * 60 * 1000 && (
          <>
            <Box display="flex">
              <Typography
                style={{
                  marginRight: '4px',
                }}
              >
                Start in
              </Typography>
              <Typography>
                {
                  <Countdown
                    date={Date.now() + time}
                    renderer={({ hours, minutes, seconds }: any) => {
                      if (Number(hours) < 10) hours = `0${hours}`;
                      if (Number(minutes) < 10) minutes = `0${minutes}`;
                      if (Number(seconds) < 10) seconds = `0${seconds}`;
                      return (
                        <span>
                          {hours}:{minutes}:{seconds}
                        </span>
                      );
                    }}
                    onComplete={() => {
                      console.log('run done');
                    }}
                  />
                }
              </Typography>
            </Box>
          </>
        )}
        <EventStatus status={listingStatus} isPro />
        {goalsMeta.home != null && goalsMeta.away != null && (
          <Box className={classes.wapperScoreGroup}>
            <Typography>{goalsMeta.home}</Typography>
            <Typography>:</Typography>
            <Typography>{goalsMeta.away}</Typography>
          </Box>
        )}
      </Box>
      <Box className={classes.wapperLogo}>
        <CardMedia image={teamsMeta.away.logo} className={classes.logo} />
        {!isMobile && <Typography>{teamsMeta.away.name}</Typography>}
      </Box>
    </Box>
  );
};

export default FixtureDetail;
