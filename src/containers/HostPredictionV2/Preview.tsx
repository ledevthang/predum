import { Box } from '@material-ui/core';
import CommonCheckBox from 'components/common/CommonCheckBox';
import CommonInput from 'components/common/CommonInput';
import LabelInput from 'components/HostPrediction/LabelInput';
import EventDetailReview from 'components/HostPredictionV2/EventDetailReview';
import FeeReview from 'components/HostPredictionV2/FeeReview';
import OptionPreview from 'components/HostPredictionV2/OptionPreview';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import {
  getEventBanner,
  getLockEmbeddedLink,
  getStreamUrl,
} from 'store/selectors';
import { useStyles } from './styles';

const Preview = () => {
  const bannerImage = useSelector(getEventBanner);
  const lockEmbeddedLink = useSelector(getLockEmbeddedLink);
  const streamUrl = useSelector(getStreamUrl);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChangeStreamUrl = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      dispatch(
        updateHostPredictionStateAction({
          streamUrl: newValue,
        }),
      );
    },
    [dispatch],
  );
  const handleChange = useCallback(() => {
    dispatch(
      updateHostPredictionStateAction({
        lockEmbeddedLink: !lockEmbeddedLink,
        ...(!lockEmbeddedLink && {
          streamUrl: '',
        }),
      }),
    );
  }, [dispatch, lockEmbeddedLink]);

  return (
    <Box width="100%">
      {bannerImage && (
        <img
          src={URL.createObjectURL(bannerImage)}
          className={classes.bannerEvent}
          alt="preview"
        />
      )}
      <Box className={classes.inputWapper}>
        <Box>
          <CommonCheckBox
            checked={!lockEmbeddedLink}
            handleChange={handleChange}
            label="I want to embed a livestream link"
          />
        </Box>
        <LabelInput
          label="Embed live stream link"
          component={
            <CommonInput
              value={streamUrl}
              onChange={handleChangeStreamUrl}
              className={classes.commonInput}
              disabled={lockEmbeddedLink}
            />
          }
        />
      </Box>
      <EventDetailReview />
      <FeeReview />
      <OptionPreview />
    </Box>
  );
};

export default Preview;
