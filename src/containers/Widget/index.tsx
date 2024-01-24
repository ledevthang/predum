import { Box } from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Account from 'components/TopBar/Account';
import PredictEventCustom from 'containers/DetailEvent/PredictEventCustom';
import PredictEventProCustom from 'containers/DetailEvent/PredictEventProCustom';
import { LocalStorageEnum } from 'enums/auth';
import { getCurrentUserInfoAction } from 'store/actions/currentUserActions';
import {
  getEventDetailAction,
  updateEventViewAction,
} from 'store/actions/eventActions';
import { getEventDetail, getUserState } from 'store/selectors';
import { WhoTakeWith } from 'types/hostPrediction';
import localStorageUtils from 'utils/LocalStorage';

const WidgetDetail = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const dispatch = useDispatch();
  const event = useSelector(getEventDetail);
  const user = useSelector(getUserState);
  useEffect(() => {
    if (!eventId) return;
    window.scrollTo(0, 0);
    const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
    dispatch(updateEventViewAction(eventId));
    dispatch(getEventDetailAction(eventId, userId));
  }, [eventId, user.id]);
  useEffect(() => {
    if (user.id) {
      dispatch(getCurrentUserInfoAction());
    }
  }, [user.id]);
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
  return (
    <Box>
      {!isProUvP && <PredictEventCustom event={event} />}
      {isProUvP && <PredictEventProCustom event={event} />}
      <Box
        style={{
          position: 'absolute',
          right: 20,
          top: 22,
        }}
      >
        <Account />
      </Box>
    </Box>
  );
};
export default WidgetDetail;
