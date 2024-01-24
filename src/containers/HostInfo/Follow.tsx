import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { renderShortAddress } from 'helpers';
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getCurrentUserInfoAction,
  updateUserUnfollowAction,
} from 'store/actions/currentUserActions';
import { getCurrentUserState } from 'store/selectors';

const Follow = ({ setSortBy }: { setSortBy: (value: string) => void }) => {
  const classes = useStyles();
  const currentUser = useSelector(getCurrentUserState);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleClickButton = (userId: number) => {
    dispatch(
      updateUserUnfollowAction(userId || 0, () => {
        dispatch(getCurrentUserInfoAction());
      }),
    );
  };
  const handleClickHostAddress = (address: string) => {
    window.scrollTo(0, 0);
    setSortBy('events');
    history.push(`/host-info/${address}`);
  };
  return (
    <Box className="center-root">
      <Box className={classes.container}>
        <Box className={clsx(classes.follow, classes.following)}>
          <Box className="center-root">
            <Typography>Following</Typography>
          </Box>
          <Box className={classes.wapper}>
            {currentUser.followsId[0].f1 != null &&
              currentUser.followsId.map((u: any, i: number) => {
                return (
                  <Box key={i} className={classes.wapper2}>
                    <Typography onClick={() => handleClickHostAddress(u.f3)}>
                      {u.f2 != null ? u.f2 : renderShortAddress(u.f3, 4, 4)}
                    </Typography>
                    <Button onClick={() => handleClickButton(u.f1)}>
                      Unfollow
                    </Button>
                  </Box>
                );
              })}
          </Box>
        </Box>
        <Box className={clsx(classes.follow)}>
          <Box className="center-root">
            <Typography>Follower</Typography>
          </Box>
          <Box className={classes.wapper}>
            {currentUser.followersId[0].f1 != null &&
              currentUser.followersId.map((u: any, i: number) => {
                if (u.f3 != null) {
                  return (
                    <Box key={i} className={classes.wapperFollower}>
                      <Typography onClick={() => handleClickHostAddress(u.f3)}>
                        {u.f2 != null ? u.f2 : renderShortAddress(u.f3, 4, 4)}
                      </Typography>
                    </Box>
                  );
                } else return <></>;
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Follow);
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    width: 600,
    border: '1px solid gray',
    padding: 20,
    marginBottom: 40,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      width: 'calc(100% - 40px)',
    },
  },
  wapper: {
    minHeight: 250,
    width: '100%',
  },
  wapper2: {
    margin: '0px 20px 16px 0px',
    display: 'flex',
    '&>p': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
    justifyContent: 'space-between',
    '& button': {
      width: 70,
      height: 25,
      borderRadius: 16,
      backgroundColor: '#4B4B4B',
      '&:hover': {
        background: '#4B4B4B !important',
      },
      color: '#BDBDBD !important',
      fontSize: 14,
      textTransform: 'none',
    },
  },
  wapperFollower: {
    marginLeft: '16px',
    '&>p': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  follow: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    '&>div>p:first-child': {
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '29px',
      color: '#FFFFFF',
      marginBottom: 20,
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  following: {
    borderRight: '1px solid gray',
    [theme.breakpoints.down('sm')]: {
      borderBottom: '1px solid gray',
      borderRight: 'unset',
      marginBottom: 20,
    },
  },
}));
