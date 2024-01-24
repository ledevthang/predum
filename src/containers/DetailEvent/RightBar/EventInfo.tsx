import { Box, Button, CardMedia, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ResultByChainLink from 'components/Event/ResultByChainLink';
import { convertTime, renderShortAddress } from 'helpers';
import AddProfileIcon from 'icon/AddProfileIcon';
import TwoProfileIcon from 'icon/TwoProfileIcon';
import WarningIcon from 'icon/WariningIcon';
import {
  getCurrentUserInfoAction,
  updateUserFollowAction,
  updateUserUnfollowAction,
} from 'store/actions/currentUserActions';
import { getCurrentUserState, getEventDetail } from 'store/selectors';

import { useStyles } from './styles';

const EventInfo = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const event = useSelector(getEventDetail);
  const { active, account } = useWeb3React();
  const currentUser = useSelector(getCurrentUserState);
  const handleClickFollow = () => {
    if (currentUser?.followsId.map((u: any) => u.f1).includes(event?.userId)) {
      dispatch(
        updateUserUnfollowAction(event?.userId || 0, () => {
          dispatch(getCurrentUserInfoAction());
        }),
      );
    } else {
      dispatch(
        updateUserFollowAction(event?.userId || 0, () => {
          dispatch(getCurrentUserInfoAction());
        }),
      );
    }
  };
  const handleRedirectProfile = () => {
    if (event) {
      history.push(`/host-info/${event.address}`);
    }
  };
  return (
    <Box className={classes.wrapper}>
      <Box display="flex" width="100%">
        <CardMedia
          image={
            event?.userAvatar ? event.userAvatar : '/images/default-avatar.png'
          }
          style={{
            width: 40,
            height: 40,
            marginRight: 8,
            borderRadius: 20,
          }}
        />
        <Box>
          <Box display="flex" className={classes.hostName}>
            <Typography>
              {event?.userNickname
                ? event?.userNickname
                : renderShortAddress(event?.address || '', 4, 4)}
            </Typography>
            {/* {!event?.isUserVerified && <ShiedTickIcon />} */}
          </Box>
          {event?.userFollowers && (
            <Typography className={classes.follow}>
              {event?.userFollowers} followers
            </Typography>
          )}
        </Box>
      </Box>
      <Box display="flex" className={classes.wrapperButton}>
        <Button
          onClick={handleClickFollow}
          style={{
            display: !(active && event?.address != account)
              ? 'none'
              : 'inline-block',
          }}
        >
          <AddProfileIcon />{' '}
          {currentUser?.followsId.map((u: any) => u.f1).includes(event?.userId)
            ? 'Unfollow'
            : 'Follow'}
        </Button>
        <Button onClick={handleRedirectProfile}>
          <TwoProfileIcon /> View club
        </Button>
      </Box>
      {event?.pro == 0 ? (
        <Box className={classes.hostBy}>
          <WarningIcon />
          <Typography className={classes.warningText}>
            {'Result provided by host'}
          </Typography>
        </Box>
      ) : (
        <Box
          style={{
            marginTop: 12,
          }}
        >
          <ResultByChainLink metadata={event?.metadata} />{' '}
        </Box>
      )}
      <Box className={classes.timeWapper}>
        <Box className={classes.timeline}>
          <Typography>{'Deadline:' + ' '} </Typography>
          <Typography>{`${convertTime(event?.deadline)}`}</Typography>
        </Box>
        <Box className={classes.timeline}>
          <Typography>Confirm result time: </Typography>
          <Typography>{`${convertTime(event?.endTime)}`}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default EventInfo;
