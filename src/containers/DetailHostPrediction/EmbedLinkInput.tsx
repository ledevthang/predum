import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button } from '@material-ui/core';
import LabelInput from 'components/HostPrediction/LabelInput';
import CommonInput from 'components/common/CommonInput';
import { useDispatch } from 'react-redux';
import { useStyles } from './styles';
import clsx from 'clsx';
import { updateEventStreamUrlAction } from 'store/actions/eventActions';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import CustomDialog from 'components/dialog/CustomDialog';

const EmbedLinkInput = ({
  id,
  reloadHostEventData,
  hostStreamUrl,
}: {
  id: number;
  hostStreamUrl: undefined | string;
  reloadHostEventData: () => void;
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [streamUrl, setStreamUrl] = useState('');
  useEffect(() => {
    if (hostStreamUrl) setStreamUrl(hostStreamUrl);
  }, [hostStreamUrl]);

  const handleChangeStreamLink = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setStreamUrl(newValue);
    },
    [streamUrl],
  );
  const handleClickPublish = useCallback(() => {
    if (streamUrl) {
      dispatch(
        updateEventStreamUrlAction(id, streamUrl, () => {
          callbackSuccess();
        }),
      );
    }
  }, [dispatch, streamUrl]);

  const callbackSuccess = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        component: <CustomDialog content="Link has been published!" />,
        open: true,
        callback: reloadHostEventData,
      }),
    );
  }, [dispatch]);
  const callbackDeleteSuccess = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        component: <CustomDialog content="Link has been deleted!" />,
        open: true,
        callback: reloadHostEventData,
      }),
    );
  }, [dispatch]);
  const handleClickDeleteStreamUrl = useCallback(() => {
    dispatch(
      updateEventStreamUrlAction(id, '', () => {
        callbackDeleteSuccess();
      }),
    );
  }, []);
  return (
    <Box className={clsx(classes.containerReview, 'center-root')}>
      <LabelInput
        label="Embed live stream link"
        component={
          <Box className={classes.mainReview}>
            <CommonInput
              value={streamUrl}
              onChange={handleChangeStreamLink}
              className={classes.reviewText}
              disabled={hostStreamUrl != null && hostStreamUrl != ''}
            />
            <Button
              onClick={
                hostStreamUrl != null && hostStreamUrl != ''
                  ? handleClickDeleteStreamUrl
                  : handleClickPublish
              }
            >
              {hostStreamUrl != null && hostStreamUrl != ''
                ? 'Delete'
                : 'Publish'}
            </Button>
          </Box>
        }
      />
    </Box>
  );
};

export default EmbedLinkInput;
