import { Box, CardMedia, useMediaQuery, useTheme } from '@material-ui/core';
import { generateBackupBanner } from 'helpers';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  getEventDetailAction,
  updateEventViewAction,
} from 'store/actions/eventActions';
import { resetSideBarStateAction } from 'store/actions/sideBarActions';
import { getAllTokensAction } from 'store/actions/tokensActions';
import {
  getEventDetail,
  getPredictionsData,
  getSideBarState,
  getUserState,
} from 'store/selectors';
// import EventPredicted from/ './EventPredicted';
// import EventPredictedMobile from './EventPredictedMobile';
// import PredictEventCustom from './PredictEventCustom';
import { useStyles } from 'containers/DetailEvent/styles';
// import WarningDialog from './WarningDialog';
import localStorageUtils from 'utils/LocalStorage';
import { LocalStorageEnum } from 'enums/auth';
// import EventPool from './EventPool';
// import EventHeader from './EventHeader';
import { WhoTakeWith } from 'types/hostPrediction';
import OverViewMatch from 'components/ProEventPrediction/OverViewMatch';
// import PredictEventProCustom from './PredictEventProCustom';
import HeaderMeta from 'components/common/HeaderMeta';
import { getCurrentUserInfoAction } from 'store/actions/currentUserActions';
import ShareIcon from 'icon/ShareIcon';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import ShareEventDialog from 'components/DetailEvent/ShareEventDialog';
import EventHeader from 'containers/DetailEvent/EventHeader';
import WarningDialog from 'containers/DetailEvent/WarningDialog';
import EventCardCustom from 'containers/DetailEvent/EventCardCustom';
import EventPool from 'containers/DetailEvent/EventPool';
import PredictEventCustom from 'containers/DetailEvent/PredictEventCustom';
import PredictEventProCustom from 'containers/DetailEvent/PredictEventProCustom';
import { getPreviewPrediction } from 'store/actions/predictionActions';
import { IEvent } from 'types/event';
// import EventCardCustom from './EventCardCustom';

const SharePredict = () => {
  const classes = useStyles();
  const { eventId, type, predictId } = useParams<{
    eventId: string;
    type: string;
    predictId: string;
  }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const event = useSelector(getEventDetail);
  const history = useHistory();
  const sideBar = useSelector(getSideBarState);
  const predictions = useSelector(getPredictionsData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const user = useSelector(getUserState);
  useEffect(() => {
    if (type == 'claim') {
      history.push('/');
    }
  }, [type]);
  useEffect(() => {
    if (!eventId) return;
    window.scrollTo(0, 0);
    const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
    dispatch(updateEventViewAction(eventId));
    if (sideBar.betSlipData?.id && Number(eventId) != sideBar.betSlipData?.id) {
      dispatch(resetSideBarStateAction());
    }
    dispatch(
      getEventDetailAction(eventId, userId, () => {
        setLoaded(true);
      }),
    );
  }, [eventId, user.id]);
  useEffect(() => {
    dispatch(getPreviewPrediction(+predictId));
  }, [predictId]);
  useEffect(() => {
    if (user.id) {
      dispatch(getCurrentUserInfoAction());
    }
  }, [user.id]);
  useEffect(() => {
    if (event && event.pro == 0) {
      setIsDialogOpen(!isOverDeadline());
    }
  }, [isLoaded]);

  useEffect(() => {
    dispatch(
      getAllTokensAction({
        pageNumber: 1,
        pageSize: 20,
      }),
    );
  }, []);
  const isOverDeadline = () => {
    if (!event) return false;
    const deadline = new Date(event.deadline);
    return deadline.getTime() < new Date().getTime();
  };
  const isProUvP = useMemo(() => {
    const { eventType } = JSON.parse(event?.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return (
      eventType != WhoTakeWith.USER_USER &&
      event?.pro != 0 &&
      JSON.parse(event?.metadata || '{}').fixtureMeta
    );
  }, [event?.metadata, event?.pro]);

  const renderBannerProUvPEvent = () => {
    let metadata = JSON.parse(event?.metadata || '{}');
    let fixture = JSON.parse(metadata.fixtureMeta);
    let selectedEvent = {
      teamsMeta: JSON.stringify(fixture.teams),
      leagueMeta: JSON.stringify(fixture.league),
      goalsMeta: event?.goalsMeta,
      date: fixture.fixture.date,
    };
    let league = fixture.league;
    return (
      <Box mb={3}>
        <OverViewMatch
          selectedEvent={selectedEvent}
          league={league}
          shouldEditBanner={false}
          isShowShareIcon={true}
          isOverlay
          bannerMatch={
            event?.bannerUrl ||
            generateBackupBanner(event?.category, event?.subCategory)
          }
        />
      </Box>
    );
  };
  const getImage = (event: IEvent) => {
    if (predictions.length == 0) return;
    if (type == 'claim') return predictions[0].previewPredictUrl;
    else
      return (
        event.thumbnailUrl ||
        event.bannerUrl ||
        generateBackupBanner(event.category, event.subCategory)
      );
  };
  const onShowShareDialog = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: true,
        component: <ShareEventDialog />,
      }),
    );
  }, [dispatch]);
  return (
    <>
      <Box className={classes.container}>
        {isLoaded && (
          <>
            {event && predictions.length > 0 && (
              <>
                <HeaderMeta
                  title={predictions[0].name}
                  image={getImage(event)}
                />
                <EventHeader event={event} />
              </>
            )}
            {event?.streamUrl ? (
              <ReactPlayer
                url={event?.streamUrl}
                controls
                id="video"
                style={{ marginBottom: 24, width: 'unset !important' }}
              />
            ) : (
              <>
                {!isProUvP && (
                  <Box position="relative">
                    <CardMedia
                      image={
                        event?.bannerUrl ||
                        generateBackupBanner(
                          event?.category,
                          event?.subCategory,
                        )
                      }
                      className={classes.thumbnail}
                    />
                    {event && (
                      <Box
                        className={classes.share}
                        onClick={onShowShareDialog}
                      >
                        <ShareIcon />
                      </Box>
                    )}
                  </Box>
                )}

                {isProUvP && renderBannerProUvPEvent()}
              </>
            )}
            <WarningDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
            {!isProUvP && <EventCardCustom event={event} />}
            {event && <EventPool event={event} />}
            {!isProUvP && <PredictEventCustom event={event} />}
            {isProUvP && <PredictEventProCustom event={event} />}

            {/* <Box className={classes.wapperPrediction}>
              <Typography>All Predictions</Typography>
              {!isMobile ? (
                <EventPredicted id={eventId} />
              ) : (
                <EventPredictedMobile id={eventId} />
              )}
            </Box> */}
          </>
        )}
      </Box>
    </>
  );
};

export default memo(SharePredict);
