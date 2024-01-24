import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ShareEventDialog from 'components/DetailEvent/ShareEventDialog';
import Participants from 'components/Event/Participant';
import ResultByChainLink from 'components/Event/ResultByChainLink';
import { renderShortAddress } from 'helpers';
import WarningIcon from 'icon/WariningIcon';
import {
  getCurrentUserInfoAction,
  updateUserFollowAction,
  updateUserUnfollowAction,
} from 'store/actions/currentUserActions';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { getCurrentUserState } from 'store/selectors';
import { IEvent } from 'types/event';

import { useStyles } from './styles';

interface IProps {
  event: IEvent;
}

const EventHeader = ({ event }: IProps) => {
  const classes = useStyles();
  const history = useHistory();
  const [preAdd, setPreAdd] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentUser = useSelector(getCurrentUserState);
  const { account, active } = useWeb3React();

  const dispatch = useDispatch();

  const handleClickReturnHome = useCallback(() => {
    history.push('/');
  }, [history]);
  useEffect(() => {
    try {
      let state: any = history.location.state;
      if (!state) return;
      if (!state.address) return;
      setPreAdd(state.address);
    } catch (error) {
      console.log('error', error);
    }
  }, []);
  const onShowShareDialog = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: true,
        component: <ShareEventDialog />,
      }),
    );
  }, [dispatch]);
  const handleClickButton = (type: string) => {
    if (type == 'unfollow') {
      dispatch(
        updateUserUnfollowAction(event?.userId || 0, () => {
          dispatch(getCurrentUserInfoAction());
        }),
      );
    } else if (type == 'follow') {
      dispatch(
        updateUserFollowAction(event?.userId || 0, () => {
          dispatch(getCurrentUserInfoAction());
        }),
      );
    }
  };
  const renderProvider = () => {
    return (
      <Box mb={2}>
        {event.pro == 0 && (
          <Box display="flex" className={classes.wapperProvider}>
            <Box className={clsx(classes.hostBy, classes.providerWarning)}>
              <WarningIcon />
              <Typography className={classes.warningText}>
                {'Result provided by host'}
              </Typography>
            </Box>
            {isMobile && (
              <Participants
                participant={event.numParticipants}
                views={event.views}
              />
            )}
          </Box>
        )}
        {event.pro != 0 && (
          <Box
            ml={isMobile ? 2 : 0}
            display="flex"
            justifyContent="space-between"
          >
            <ResultByChainLink metadata={event.metadata} />
            {isMobile && (
              <Participants
                participant={event.numParticipants}
                views={event.views}
              />
            )}
          </Box>
        )}
      </Box>
    );
  };
  return (
    <>
      <Typography className={classes.header}>
        <Typography
          className={classes.breadcrumb}
          component={'span'}
          onClick={handleClickReturnHome}
        >
          Home /
        </Typography>
        <Typography
          component={'span'}
          className={classes.breadcrumb}
          onClick={() => {
            history.push(`/host-info/${[preAdd]}`);
          }}
        >
          {preAdd != '' &&
            `${
              preAdd.length < 40 ? preAdd : renderShortAddress(preAdd, 4, 4)
            }/`}
        </Typography>
        {` ${event?.name}`}
      </Typography>
      {/* {event && (
        <Box className={classes.wapperHeader}>
          <Box
            className={clsx(classes.hostByFirst, {
              [classes.unfollow]: currentUser?.followsId
                .map((u: any) => u.f1)
                .includes(event.userId),
            })}
          >
            <Box>
              {event.isUserVerified ? <ShiedTickIcon /> : <WarningIcon />}
              <Typography
                className={classes.warningText}
                onClick={() => {
                  history.push(`/host-info/${event.address}`);
                }}
                style={{
                  fontSize: 14,
                }}
              >
                Hosted by{' '}
                {event?.userNickname
                  ? event.userNickname
                  : renderShortAddress(event.address, 4, 4)}
              </Typography>
              {currentUser?.followsId
                .map((u: any) => u.f1)
                .includes(event.userId) &&
                active &&
                account != event.address && (
                  <Button onClick={() => handleClickButton('unfollow')}>
                    Unfollow
                  </Button>
                )}
              {!currentUser?.followsId
                .map((u: any) => u.f1)
                .includes(event.userId) &&
                active &&
                account != event.address && (
                  <Button onClick={() => handleClickButton('follow')}>
                    Follow
                  </Button>
                )}
            </Box>
            {!isMobile && (
              <Participants
                participant={event.numParticipants}
                status={event.listingStatus}
                views={event.views}
              />
            )}
            {isMobile && <Participants status={event.listingStatus} />}
          </Box>
          {renderProvider()}
        </Box>
      )} */}
    </>
  );
};

export default EventHeader;
