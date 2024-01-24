import { Box, Button, CardMedia, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CommonDatePicker from 'components/common/CommonDatePicker';
import CommonInput from 'components/common/CommonInput';
import CommonTextarea from 'components/common/CommonTextarea';
import CommonTimePicker from 'components/common/CommonTimePicker';
import CommonUploadFileV2 from 'components/common/CommonUploadFileV2';
import LabelInput from 'components/HostPrediction/LabelInput';
import CommonCropper from 'components/HostPredictionV2/CommonCropper';
import {
  convertTime,
  convertTimeUTC,
  generateBackupBanner,
  getTimeZone,
} from 'helpers';
import CloseIcon from 'icon/CloseIcon';
import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { getEventDetailState } from 'store/selectors';
import { EDataSource } from 'types/proEvent';
import ChangeBanner from './ChangeBanner';
import { useStyles } from './EventDetailStyle';

const EventDetail = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const eventDetail = useSelector(getEventDetailState, shallowEqual);

  const [helperText, setHelperText] = useState('');
  const [helperTextEndDate, setHelperTextEndDate] = useState('');

  const [dateInit, setDateInit] = useState(true);
  const [dateEndInit, setDateEndInit] = useState(true);
  const [bannerSrc, setBannerSrc] = useState('');
  const [thumbnailSrc, setThumbnailSrc] = useState('');
  const [open, setOpen] = useState(false);
  const [openThumbnail, setOpenThumbnail] = useState(false);

  const onChangeThumbnail = useCallback((e: React.ChangeEvent<any>) => {
    let fileName = e.target.files[0].name;
    let idxDot = fileName.lastIndexOf('.') + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

    if (e.target.files[0].size > 5 * 1024 * 1024) {
      alert('Only accept images smaller than 5MB!');
      return;
    }
    if (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png') {
      setThumbnailSrc(URL.createObjectURL(e.target.files[0]));
      setOpenThumbnail(true);
      e.target.value = null;
    } else {
      alert('Only jpg/jpeg and png files are allowed!');
    }
  }, []);

  const handleChangeDescription = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      dispatch(
        updateHostPredictionStateAction({
          description: newValue,
        }),
      );
    },
    [dispatch],
  );

  const handleChangeDeadline = useCallback(
    (date: Date | null) => {
      if (!date) return;
      if (dateInit) {
        date = new Date(date.getTime() + 1 * 3600 * 1000);
        const current = new Date(Date.now() + 1 * 3600 * 1000);
        date.setHours(current.getHours());
        date.setMinutes(current.getMinutes());
        date.setSeconds(0);
        setDateInit(false);
      }
      dispatch(
        updateHostPredictionStateAction({
          deadline: date,
        }),
      );
    },
    [dispatch, dateInit],
  );
  const handleChangeEndDate = useCallback(
    (date: Date | null) => {
      if (!date) return;
      if (dateEndInit) {
        setDateEndInit(false);
        date = new Date(date.getTime() + 2.5 * 3600 * 1000);
        const current = new Date(
          (eventDetail.deadline || new Date()).getTime() + 2.5 * 3600 * 1000,
        );
        date.setHours(current.getHours());
        date.setMinutes(current.getMinutes());
      }
      dispatch(
        updateHostPredictionStateAction({
          endTime: date,
        }),
      );
    },
    [dispatch, eventDetail, dateEndInit],
  );

  const handleChangeEventName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      dispatch(
        updateHostPredictionStateAction({
          eventName: newValue,
        }),
      );
    },
    [dispatch],
  );

  const onDeleteThumbnail = useCallback(() => {
    dispatch(
      updateHostPredictionStateAction({
        thumbnailUrl: null,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    let deadline = eventDetail.deadline?.getTime() || 0;
    let endtime = eventDetail.endTime?.getTime() || 0;
    if (
      deadline - new Date().getTime() < 1 * 3600 * 1000 - 60 * 1000 &&
      deadline != 0
    ) {
      setHelperText('Deadline must be over 1 hours from now');
    } else {
      setHelperText('');
    }
    if (endtime - deadline < 2.5 * 60 * 60 * 1000 && endtime != 0) {
      setHelperTextEndDate('EndDate must be after Deadline over 2.5 hours');
    } else {
      setHelperTextEndDate('');
    }
  }, [
    eventDetail.deadline,
    eventDetail.endTime,
    eventDetail.eventName,
    eventDetail.description,
    eventDetail.thumbnailUrl,
  ]);

  const renderThumbnail = () => {
    if (eventDetail.dataSource == EDataSource.MYSELF) {
      return (
        <CommonUploadFileV2
          file={
            eventDetail.thumbnailUrl
              ? URL.createObjectURL(eventDetail.thumbnailUrl)
              : undefined
          }
          label="Event thumbnail"
          size="(240*240)"
          onChange={onChangeThumbnail}
          onDeleteImage={onDeleteThumbnail}
          className={classes.thumbnailUrl}
        />
      );
    } else if (!eventDetail.thumbnailUrl) {
      const fixture = eventDetail.fixture;
      const coin = eventDetail.coinSelected;
      if (coin && eventDetail.subcategory == 7) {
        return <CardMedia image={coin.logo} className={classes.thumbnailUrl} />;
      }
      if (fixture) {
        const teamsMeta = JSON.parse(fixture.teamsMeta);
        return (
          <Box
            className={clsx(classes.thumbnailUrl, 'center-root')}
            bgcolor="#111111"
          >
            <CardMedia
              image={teamsMeta.home.logo}
              className={classes.teamLogo}
            />
            <Typography className={classes.vs}>VS</Typography>
            <CardMedia
              image={teamsMeta.away.logo}
              className={classes.teamLogo}
            />
          </Box>
        );
      }
    } else {
      return (
        <CardMedia
          image={URL.createObjectURL(eventDetail.thumbnailUrl)}
          className={classes.thumbnailUrl}
        />
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onClearThumbnail = useCallback(() => {
    dispatch(
      updateHostPredictionStateAction({
        thumbnailUrl: null,
      }),
    );
  }, [dispatch]);

  const onClearBanner = useCallback(() => {
    dispatch(
      updateHostPredictionStateAction({
        eventBanner: null,
      }),
    );
  }, [dispatch]);

  const updateBanner = (file: File) => {
    dispatch(
      updateHostPredictionStateAction({
        eventBanner: file,
      }),
    );
  };

  const updateThumbnail = (file: File) => {
    dispatch(
      updateHostPredictionStateAction({
        thumbnailUrl: file,
      }),
    );
  };

  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>Event Detail</Typography>
      <Box className={classes.main}>
        <Box position="relative">
          <CardMedia
            className={classes.eventBanner}
            image={
              eventDetail.eventBanner
                ? URL.createObjectURL(eventDetail.eventBanner)
                : generateBackupBanner(
                    eventDetail.categoryName,
                    eventDetail.subcategoryName,
                  )
            }
          />
          <CommonCropper
            setBannerSrc={setBannerSrc}
            setOpen={setOpen}
            open={open}
            bannerSrc={bannerSrc}
            aspectRatio={85 / 24}
            callback={updateBanner}
          />
          <Box className={classes.wrapperEditBanner}>
            <ChangeBanner
              className={classes.changeBtn}
              setBannerSrc={setBannerSrc}
              setOpen={setOpen}
            />
            {eventDetail.eventBanner && (
              <Button
                className={classes.closeBtn}
                disableRipple
                onClick={onClearBanner}
              >
                <CloseIcon color="red" />
              </Button>
            )}
          </Box>
        </Box>
        <Box className={classes.wrapperMain}>
          <Box className={classes.wrapperThumbnail}>
            {renderThumbnail()}
            <CommonCropper
              setBannerSrc={setThumbnailSrc}
              setOpen={setOpenThumbnail}
              open={openThumbnail}
              bannerSrc={thumbnailSrc}
              aspectRatio={24 / 24}
              callback={updateThumbnail}
            />
            {eventDetail.dataSource == EDataSource.SPORT_DATA_PROVIDER && (
              <Box className={classes.wrapperEditThumbnail}>
                <Button
                  className={classes.buttonChangeThumbnail}
                  component="label"
                >
                  Change thumbnail
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={onChangeThumbnail}
                  />
                </Button>
                {eventDetail.thumbnailUrl && (
                  <Button
                    className={classes.closeBtn}
                    disableRipple
                    onClick={onClearThumbnail}
                  >
                    <CloseIcon color="red" />
                  </Button>
                )}
              </Box>
            )}
          </Box>
          <Box className={classes.main1}>
            <>
              <LabelInput
                label="Event name"
                component={
                  <CommonInput
                    value={eventDetail.eventName || ''}
                    onChange={handleChangeEventName}
                    className={
                      eventDetail.dataSource != EDataSource.MYSELF
                        ? classes.commonInputDisabled
                        : classes.commonInput
                    }
                    disabled={eventDetail.dataSource != EDataSource.MYSELF}
                    required
                  />
                }
              />
              {eventDetail.dataSource == EDataSource.MYSELF ||
              eventDetail.subcategoryName == 'Coin Price' ? (
                <LabelInput
                  label={`Predict deadline ${getTimeZone()}`}
                  isAnnotate={true}
                  titleAnnotate="No prediction can placed after deadline."
                  component={
                    <Box className={classes.marginBottom}>
                      <Box className={clsx(classes.wrapperTime)}>
                        <CommonDatePicker
                          value={eventDetail.deadline}
                          helperText={helperText}
                          onChange={handleChangeDeadline}
                          className={classes.dateTime}
                          minDate={new Date()}
                          required
                        />
                        <CommonTimePicker
                          value={eventDetail.deadline}
                          onChange={handleChangeDeadline}
                          className={classes.dateTime}
                          required
                        />
                      </Box>
                      {eventDetail.subcategoryName == 'Coin Price' &&
                        eventDetail.deadline && (
                          <Typography
                            style={{
                              textAlign: 'right',
                              fontSize: 14,
                              marginTop: 4,
                            }}
                          >
                            {convertTimeUTC(eventDetail.deadline)}
                          </Typography>
                        )}
                    </Box>
                  }
                />
              ) : (
                <Box className={classes.time}>
                  <Typography>Deadline</Typography>
                  <Typography>{convertTime(eventDetail.deadline)}</Typography>
                </Box>
              )}
              {eventDetail.subcategoryName == 'Coin Price' &&
              eventDetail.dataSource == EDataSource.SPORT_DATA_PROVIDER ? (
                <Typography>
                  Endtime will be determined by your predict question
                </Typography>
              ) : eventDetail.dataSource == EDataSource.MYSELF ? (
                <LabelInput
                  label={`End date ${getTimeZone()}`}
                  titleAnnotate="Event ends at this date and you (the host) have to confirm event’s result. "
                  isAnnotate={true}
                  component={
                    <Box
                      className={clsx(
                        classes.wrapperTime,
                        classes.marginBottom,
                      )}
                    >
                      <CommonDatePicker
                        value={eventDetail.endTime}
                        onChange={handleChangeEndDate}
                        className={classes.dateTime}
                        helperText={helperTextEndDate}
                        minDate={eventDetail.deadline || new Date()}
                      />
                      <CommonTimePicker
                        value={eventDetail.endTime}
                        onChange={handleChangeEndDate}
                        className={classes.dateTime}
                      />
                    </Box>
                  }
                />
              ) : (
                <Box className={classes.time}>
                  <Typography>Endtime</Typography>
                  <Typography>{convertTime(eventDetail.endTime)}</Typography>
                </Box>
              )}
            </>

            <LabelInput
              label="Description"
              className={classes.marginTop2}
              component={
                <CommonTextarea
                  value={eventDetail.description || ''}
                  minRows={7}
                  onChange={handleChangeDescription}
                  className={classes.commonInput}
                  required
                />
              }
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EventDetail;
