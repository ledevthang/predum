import { Box } from '@material-ui/core';
import clsx from 'clsx';
import CommonDatePicker from 'components/common/CommonDatePicker';
import CommonInput from 'components/common/CommonInput';
import CommonSelectInput from 'components/common/CommonSelectInput';
import CommonTextarea from 'components/common/CommonTextarea';
import CommonTimePicker from 'components/common/CommonTimePicker';
import CommonUploadFileInput from 'components/common/CommonUploadFileInput';
import LabelInput from 'components/HostPrediction/LabelInput';
import { renderShortAddress } from 'helpers';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getAllCompetitionsAction } from 'store/actions/competitionActions';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { getCompetitionsState, getEventDetailState } from 'store/selectors';
import AddOptionButton from './AddOptionButton';
import { useStyles } from './EventDetailStyles';

const EventDetail = () => {
  const classes = useStyles();
  const eventDetail = useSelector(getEventDetailState, shallowEqual);
  const competitions = useSelector(getCompetitionsState);
  const dispatch = useDispatch();
  const [thumbnailName, setThumbnailName] = useState('');
  const [eventBanner, setEventBanner] = useState('');
  const [dateInit, setDateInit] = useState(true);
  const [dateEndInit, setDateEndInit] = useState(true);
  const [helperText, setHelperText] = useState('');
  const [helperTextEndDate, setHelperTextEndDate] = useState('');
  const [isHasThumbnail, setIsHasThumbnail] = useState(false);
  const [isHasBanner, setIsHasBanner] = useState(false);
  const [errorCompetition, setErrorCompetition] = useState(false);

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

  const onChangeAddCompetition = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      dispatch(
        updateHostPredictionStateAction({
          addCompetition: newValue,
        }),
      );
    },
    [dispatch],
  );

  const handleChangeSubTitle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      dispatch(
        updateHostPredictionStateAction({
          shortDescription: newValue,
        }),
      );
    },
    [dispatch],
  );

  const handleChangeThumbnail = useCallback(
    (e: React.ChangeEvent<any>) => {
      let fileName = e.target.files[0].name;
      let idxDot = fileName.lastIndexOf('.') + 1;
      let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
      if (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png') {
        setIsHasThumbnail(true);
        dispatch(
          updateHostPredictionStateAction({
            thumbnailUrl: e.target.files[0],
          }),
        );
      } else {
        alert('Only jpg/jpeg and png files are allowed!');
      }
    },
    [dispatch, isHasThumbnail],
  );
  const clearThumbnail = useCallback(
    (e: React.ChangeEvent<any>) => {
      setIsHasThumbnail(false);
      setThumbnailName('');
      dispatch(
        updateHostPredictionStateAction({
          thumbnailUrl: undefined,
        }),
      );
    },
    [dispatch, isHasThumbnail],
  );

  const clearBanner = useCallback(
    (e: React.ChangeEvent<any>) => {
      setIsHasBanner(false);
      setEventBanner('');
      dispatch(
        updateHostPredictionStateAction({
          eventBanner: undefined,
        }),
      );
    },
    [dispatch, isHasBanner],
  );
  const handleChangeEventBanner = useCallback(
    (e: React.ChangeEvent<any>) => {
      let fileName = e.target.files[0].name;
      let idxDot = fileName.lastIndexOf('.') + 1;
      let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
      if (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png') {
        setIsHasBanner(true);
        dispatch(
          updateHostPredictionStateAction({
            eventBanner: e.target.files[0],
          }),
        );
      } else {
        alert('Only jpg/jpeg and png files are allowed!');
      }
    },
    [dispatch, isHasBanner],
  );

  const handleChangeCompetition = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      dispatch(
        updateHostPredictionStateAction({
          competition: newValue,
        }),
      );
    },
    [dispatch],
  );

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

  useEffect(() => {
    let clonePredictState = JSON.parse(JSON.stringify(eventDetail));
    clonePredictState = _.omit(clonePredictState, [
      'addCompetition',
      'competition',
      'isAddCompetition',
      'eventBanner',
      'category',
      'subcategory',
      'categoryName',
      'fixtureId',
    ]);
    let deadline = new Date(clonePredictState.deadline).getTime();
    let isDeadlineValid = true;
    let endtime = new Date(clonePredictState.endTime).getTime();
    let isEndtimeValid = true;
    if (
      deadline - new Date().getTime() < 2 * 3600 * 1000 - 60 * 1000 &&
      deadline != 0
    ) {
      isDeadlineValid = false;
      setHelperText('Deadline must be over 2 hours from now');
    } else {
      isDeadlineValid = true;
      setHelperText('');
    }
    if (endtime - deadline < 2 * 60 * 60 * 1000 && endtime != 0) {
      isEndtimeValid = false;
      setHelperTextEndDate('EndDate must be after Deadline over 2 hours');
    } else {
      isEndtimeValid = true;
      setHelperTextEndDate('');
    }
    const test = Object.keys(clonePredictState).filter(
      (p) => !(eventDetail as any)[p],
    );
    const error =
      test.length > 0 ||
      errorCompetition ||
      (!eventDetail.competition && !eventDetail.addCompetition) ||
      !isDeadlineValid ||
      !isEndtimeValid;
    dispatch(
      updateHostPredictionStateAction({
        error,
      }),
    );
  }, [eventDetail]);

  const handleChangeDeadline = useCallback(
    (date: Date | null) => {
      if (!date) return;
      if (dateInit) {
        date = new Date(date.getTime() + 2 * 3600 * 1000);
        const current = new Date(Date.now() + 2 * 3600 * 1000);
        date.setHours(current.getHours());
        date.setMinutes(current.getMinutes());
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
        date = new Date(date.getTime() + 2 * 3600 * 1000 + 30 * 60 * 1000);
        const current = new Date(Date.now() + 2 * 3600 * 1000 + 30 * 60 * 1000);
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

  useEffect(() => {
    if (eventDetail.thumbnailUrl) {
      eventDetail.thumbnailUrl.name.length > 20
        ? setThumbnailName(
            renderShortAddress(eventDetail.thumbnailUrl.name, 10, 10),
          )
        : setThumbnailName(eventDetail.thumbnailUrl.name);
    } else {
      setThumbnailName('');
    }
    if (eventDetail.eventBanner) {
      eventDetail.eventBanner.name.length > 20
        ? setEventBanner(
            renderShortAddress(eventDetail.eventBanner.name, 10, 10),
          )
        : setEventBanner(eventDetail.eventBanner.name);
    } else {
      setEventBanner('');
    }
  }, [eventDetail.thumbnailUrl, eventDetail.eventBanner]);

  const onAddCompetition = useCallback(() => {
    dispatch(
      updateHostPredictionStateAction({
        isAddCompetition: true,
      }),
    );
  }, []);

  const renderCompetitions = useMemo(() => {
    return competitions.map((c) => ({
      id: c.id,
      value: c.name,
    }));
  }, [competitions]);

  useEffect(() => {
    dispatch(
      getAllCompetitionsAction(
        eventDetail.subcategory || eventDetail.category || 0,
      ),
    );
  }, [eventDetail.category, eventDetail.subcategory]);

  useEffect(() => {
    eventDetail.eventBanner ? setIsHasBanner(true) : setIsHasBanner(false);
    eventDetail.thumbnailUrl
      ? setIsHasThumbnail(true)
      : setIsHasThumbnail(false);
  }, []);

  useEffect(() => {
    if (!eventDetail.addCompetition) {
      setErrorCompetition(false);
    } else if (
      renderCompetitions.findIndex(
        (r) => r.value == eventDetail.addCompetition,
      ) >= 0
    ) {
      setErrorCompetition(true);
    } else setErrorCompetition(false);
  }, [eventDetail.addCompetition, renderCompetitions]);

  return (
    <Box className={classes.container}>
      <LabelInput
        label="Event name"
        component={
          <CommonInput
            value={eventDetail.eventName || ''}
            onChange={handleChangeEventName}
            className={classes.commonInput}
            required
          />
        }
      />
      <LabelInput
        label="Subtitle"
        component={
          <CommonInput
            value={eventDetail.shortDescription || ''}
            onChange={handleChangeSubTitle}
            className={classes.commonInput}
            required
          />
        }
      />
      <LabelInput
        label="Thumbnail (240*240)"
        component={
          <CommonUploadFileInput
            name={thumbnailName}
            onChange={handleChangeThumbnail}
            className={classes.commonInput}
            isHasData={isHasThumbnail}
            clearFileData={clearThumbnail}
            required
          />
        }
      />
      <LabelInput
        label="Event banner (850*240)"
        component={
          <CommonUploadFileInput
            name={eventBanner}
            onChange={handleChangeEventBanner}
            className={classes.commonInput}
            clearFileData={clearBanner}
            isHasData={isHasBanner}
          />
        }
      />
      <LabelInput
        label="Competition / Tournament"
        component={
          <CommonSelectInput
            values={renderCompetitions}
            currentValue={eventDetail.competition || ''}
            onChange={handleChangeCompetition}
            className={classes.commonInput}
            label="Select your Competition / Tournament"
            disabled={!!eventDetail.addCompetition}
          />
        }
      />
      <AddOptionButton
        className={classes.customAddButton}
        disabled={!!eventDetail.competition || eventDetail.isAddCompetition}
        label="Add competition"
        onClick={onAddCompetition}
      />
      {eventDetail.isAddCompetition && (
        <LabelInput
          label="Additional Competition"
          component={
            <CommonInput
              disabled={!!eventDetail.competition}
              value={eventDetail.addCompetition || ''}
              onChange={onChangeAddCompetition}
              className={classes.commonInput}
              error={errorCompetition}
              helperText={errorCompetition ? 'Competition already exists' : ''}
            />
          }
        />
      )}
      <LabelInput
        label="Description"
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
      <LabelInput
        label="Predict deadline"
        component={
          <Box className={clsx(classes.wrapperTime, classes.marginBottom)}>
            <CommonDatePicker
              value={eventDetail.deadline}
              helperText={helperText}
              onChange={handleChangeDeadline}
              className={classes.dateTime}
              required
            />
            <CommonTimePicker
              value={eventDetail.deadline}
              onChange={handleChangeDeadline}
              className={classes.dateTime}
              required
            />
          </Box>
        }
      />
      <Box
        className={clsx({
          [classes.wapperEndTime]: helperText != '',
        })}
      >
        <LabelInput
          label="End date"
          component={
            <Box className={classes.wrapperTime}>
              <CommonDatePicker
                value={eventDetail.endTime}
                onChange={handleChangeEndDate}
                className={classes.dateTime}
                helperText={helperTextEndDate}
              />
              <CommonTimePicker
                value={eventDetail.endTime}
                onChange={handleChangeEndDate}
                className={classes.dateTime}
              />
            </Box>
          }
        />
      </Box>
    </Box>
  );
};

export default EventDetail;
