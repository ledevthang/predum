import { Box, CardMedia, Typography } from '@material-ui/core';
import clsx from 'clsx';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ChangeBanner from 'components/HostPredictionV2/ChangeBanner';
import CommonCropper from 'components/HostPredictionV2/CommonCropper';
import { generateBackupBanner, getTimeZone } from 'helpers';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { getEventDetailState } from 'store/selectors';
import { ILeague } from 'types/league';

import { useStyles } from './OverViewMatchDetailStyle';

interface IProps {
  selectedEvent: any;
  league: ILeague;
  shouldEditBanner: boolean;
  isShowShareIcon?: boolean;
  isOverlay?: boolean;
  bannerMatch?: string;
}

const OverViewMatchDetailEvent = ({
  selectedEvent,
  league,
  shouldEditBanner,
  bannerMatch,
  isOverlay,
  isShowShareIcon,
}: IProps) => {
  const classes = useStyles();
  const eventDetail = useSelector(getEventDetailState, shallowEqual);
  const isWidget = location.pathname.includes('widget');
  const { themeWidget } = useParams<{ themeWidget: string }>();
  const [bannerSrc, setBannerSrc] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const renderSeason = useMemo(() => {
    const leagueMeta = JSON.parse(selectedEvent?.leagueMeta || '{}');
    return leagueMeta.season;
  }, [selectedEvent?.leagueMeta]);

  const renderHomeData = useMemo(() => {
    const teamsMeta = JSON.parse(selectedEvent?.teamsMeta || '{}');
    return teamsMeta?.home;
  }, [selectedEvent?.teamsMeta]);

  const renderAway = useMemo(() => {
    const teamsMeta = JSON.parse(selectedEvent?.teamsMeta || '{}');
    return teamsMeta?.away;
  }, [selectedEvent?.teamsMeta]);
  const styleBanner = useMemo(() => {
    return {
      backgroundImage: bannerMatch
        ? `url("${bannerMatch}")`
        : `url("${
            eventDetail.eventBanner
              ? URL.createObjectURL(eventDetail.eventBanner)
              : generateBackupBanner(
                  eventDetail.categoryName,
                  eventDetail.subcategoryName,
                )
          }")`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  }, [eventDetail]);

  const callBackUploadBanner = (file: File) => {
    dispatch(
      updateHostPredictionStateAction({
        eventBanner: file,
      }),
    );
  };
  return (
    <Box style={styleBanner}>
      <Box
        zIndex={2}
        className={clsx(classes.main, {
          [classes.overlayBanner]: isOverlay,
          [classes.overlayBannerLight]: themeWidget == 'light',
        })}
      >
        <CommonCropper
          setBannerSrc={setBannerSrc}
          setOpen={setOpen}
          open={open}
          bannerSrc={bannerSrc}
          callback={callBackUploadBanner}
          aspectRatio={85 / 24}
        />
        {shouldEditBanner && (
          <ChangeBanner
            className={classes.changeBtn}
            setBannerSrc={setBannerSrc}
            setOpen={setOpen}
          />
        )}
        <Box className={classes.wrapper1}>
          <CardMedia image={league?.logo} className={classes.competitionLogo} />
          <Typography className={classes.competitionName}>
            {league?.name}
          </Typography>
        </Box>
        {/* <Typography className={classes.deadline}>
        Deadline : 3 mins before START
      </Typography> */}
        <Typography className={classes.season}>
          Regular Season - {renderSeason}
        </Typography>
        <Box className={classes.wrapper2Teams}>
          <Box className={classes.wrapper1Team}>
            <CardMedia
              image={renderHomeData?.logo}
              className={classes.teamLogo}
            />
            <Typography className={classes.teamName}>
              {renderHomeData?.name}
            </Typography>
          </Box>
          <Box className={clsx(classes.wrapperTime, 'center-root')}>
            <Box display="flex">
              <Typography className={classes.hour}>
                {dayjs(selectedEvent?.date).format('HH:mm')}
              </Typography>
              <Typography className={classes.hour} style={{ marginLeft: 4 }}>
                {getTimeZone()}
              </Typography>
            </Box>
            <Typography className={classes.day}>
              {dayjs(selectedEvent?.date).format('DD MMMM YYYY')}
            </Typography>
            {selectedEvent?.goalsMeta &&
              JSON.parse(selectedEvent?.goalsMeta).home != null && (
                <Box className={classes.wapperScore}>
                  <Typography>
                    {JSON.parse(selectedEvent?.goalsMeta).home}
                  </Typography>
                  <Typography>:</Typography>
                  <Typography>
                    {JSON.parse(selectedEvent?.goalsMeta).away}
                  </Typography>
                </Box>
              )}
          </Box>

          <Box className={classes.wrapper1Team}>
            <CardMedia image={renderAway?.logo} className={classes.teamLogo} />
            <Typography className={classes.teamName}>
              {renderAway?.name}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OverViewMatchDetailEvent;
