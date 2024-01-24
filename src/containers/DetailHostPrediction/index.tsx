import { Box } from '@material-ui/core';
import { LocalStorageEnum } from 'enums/auth';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEventDetailAction } from 'store/actions/eventActions';
import { getEventDetail } from 'store/selectors';
import DetailHostPredictionItem from './DetailHostPredictionItem';
import { useStyles } from './styles';
import localStorageUtils from 'utils/LocalStorage';

const DetailHostPrediction = () => {
  const classes = useStyles();
  const { eventId } = useParams<{ eventId: string }>();
  const dispatch = useDispatch();
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const event = useSelector(getEventDetail);

  useEffect(() => {
    if (!eventId) return;
    const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
    setLoaded(false);
    window.scrollTo(0, 0);
    dispatch(
      getEventDetailAction(eventId, userId, () => {
        setLoaded(true);
      }),
    );
  }, [eventId]);

  const reloadHostEventData = () => {
    if (!eventId) return;
    const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
    setLoaded(false);
    window.scrollTo(0, 0);
    dispatch(
      getEventDetailAction(eventId, userId, () => {
        setLoaded(true);
      }),
    );
  };
  return (
    <Box className={classes.container}>
      {isLoaded && (
        <>
          {event && (
            <DetailHostPredictionItem
              host={event}
              reloadHostEventData={reloadHostEventData}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default memo(DetailHostPrediction);
