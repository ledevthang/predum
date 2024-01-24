import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Cropper } from 'react-cropper';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import AddNicknameDialog from 'components/dialog/AddNicknameDialog';
import FilterProEvent from 'components/Event/FilterProEvent';
import NewEvent from 'components/Event/index2';
import SearchProEvent from 'components/Event/SearchProEvent';
import Sort from 'components/Event/Sort';
import { renderShortAddress } from 'helpers';
import CameraIcon from 'icon/CameraIcon';
// import EditIcon from 'icon/EditIcon';
import { getAllCategoryAction } from 'store/actions/categoryActions';
import {
  getCurrentUserInfoAction,
  updateUserFollowAction,
  updateUserUnfollowAction,
} from 'store/actions/currentUserActions';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { updateFilterAction } from 'store/actions/filterActions';
import {
  getUserByAddressAction,
  updateAvatarUrlAction,
  updateUserBannerAction,
} from 'store/actions/hostActions';
import { getCurrentUserState, getHostState } from 'store/selectors';

import About from './About';
import Community from './Community';
import { useStyles } from './styles';
import TotalInfo from './Totalnfo';

import 'cropperjs/dist/cropper.css';

const HostInfo = () => {
  const classes = useStyles();

  const { hostAddress } = useParams<{ hostAddress: string }>();
  const hostState = useSelector(getHostState);
  const { account, active } = useWeb3React();
  const currentUser = useSelector(getCurrentUserState);
  const [avatarUrl, setAvatarUrl] = useState('/images/default-avatar.png');
  const [sortBy, setSortBy] = useState<
    'events' | 'community' | 'about' | 'live'
  >('events');
  const [bannerSrc, setBannerSrc] = useState('/images/HostBanner.png');
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [type, setType] = useState<'banner' | 'avatar' | ''>('');
  const [cropper, setCropper] = useState<any>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isLoadingUpload, setIsLoadingUpload] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    dispatch(
      getUserByAddressAction({
        address: hostAddress,
      }),
    );
  }, [hostAddress, account]);

  useEffect(() => {
    dispatch(
      updateFilterAction({
        userId: hostState.id,
      }),
    );
    dispatch(getAllCategoryAction(hostState.id));
    if (hostState.bannerUrl) {
      setBannerSrc(hostState.bannerUrl);
    } else {
      setBannerSrc('/images/HostBanner.png');
    }
    if (hostState.avatarUrl) {
      setAvatarUrl(hostState.avatarUrl);
    } else {
      setAvatarUrl('/images/default-avatar.png');
    }
  }, [hostState, hostState.bannerUrl, account]);
  useEffect(() => {
    setSortBy('events');
  }, [account]);
  useEffect(() => {
    if (type == '') return;
    else setOpen(true);
  }, [type]);
  const handleClickReturnHome = useCallback(() => {
    history.push('/');
  }, [history]);
  const handleCloseDialog = () => {
    if (hostState.bannerUrl) {
      setBannerSrc(hostState.bannerUrl);
    } else {
      setBannerSrc('/images/HostBanner.png');
    }
    if (hostState.avatarUrl) {
      setAvatarUrl(hostState.avatarUrl);
    } else {
      setAvatarUrl('/images/default-avatar.png');
    }
    setOpen(false);
    setType('');
  };
  const handleClickButton = (type: string) => {
    if (type == 'unfollow') {
      dispatch(
        updateUserUnfollowAction(hostState.id, () => {
          dispatch(getCurrentUserInfoAction());
        }),
      );
    } else if (type == 'follow') {
      dispatch(
        updateUserFollowAction(hostState.id, () => {
          dispatch(getCurrentUserInfoAction());
        }),
      );
    }
  };
  const onChangeBanner = useCallback(
    (e: React.ChangeEvent<any>) => {
      let fileName = e.target.files[0].name;
      let idxDot = fileName.lastIndexOf('.') + 1;
      let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

      if (e.target.files[0].size > 5 * 1024 * 1024) {
        alert('Only accept images smaller than 5MB!');
        return;
      }
      if (
        extFile == 'jpg' ||
        extFile == 'jpeg' ||
        extFile == 'svg' ||
        extFile == 'png'
      ) {
        setBannerSrc(URL.createObjectURL(e.target.files[0]));
        setType('banner');
        // setOpen(true);
        e.target.value = null;
      } else {
        alert('Only jpg/jpeg/png and svg files are allowed!');
      }
    },
    [dispatch],
  );
  const handelChangeAvatar = useCallback(
    (e: React.ChangeEvent<any>) => {
      let fileName = e.target.files[0].name;
      let idxDot = fileName.lastIndexOf('.') + 1;
      let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

      if (e.target.files[0].size > 5 * 1024 * 1024) {
        alert('Only accept images smaller than 5MB!');
        return;
      }
      if (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png') {
        setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        setType('avatar');
        // setOpen(true);
        e.target.value = null;
      } else {
        alert('Only jpg/jpeg and png files are allowed!');
      }
    },
    [dispatch],
  );
  const handleAddNickname = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: true,
        component: (
          <AddNicknameDialog
            isEdit={!!hostState.nickname}
            oldNickname={hostState.nickname}
          />
        ),
      }),
    );
  }, [dispatch, hostState.nickname]);

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      let canvas = cropper.getCroppedCanvas();
      canvas.toBlob((blob: any) => {
        let url = URL.createObjectURL(blob);
        let file = new File([blob], 'name.png', { type: 'image/png' });
        setIsLoadingUpload(true);
        if (type == 'banner') {
          dispatch(
            updateUserBannerAction(file, () => {
              setOpen(false);
              setBannerSrc(url);
              setIsLoadingUpload(false);
              setType('');
              dispatch(
                getUserByAddressAction({
                  address: hostAddress,
                }),
              );
            }),
          );
        } else {
          dispatch(
            updateAvatarUrlAction(file, () => {
              setOpen(false);
              setAvatarUrl(url);
              setIsLoadingUpload(false);
              setType('');
              dispatch(
                getUserByAddressAction({
                  address: hostAddress,
                }),
              );
            }),
          );
        }
      });
    }
  };
  return (
    <Box className={classes.container}>
      <Box display="flex">
        <Typography onClick={handleClickReturnHome}>Home </Typography>
        <Typography>
          {' '}
          /{' '}
          {hostState?.nickname
            ? hostState?.nickname
            : hostAddress && renderShortAddress(hostAddress, 4, 4)}
        </Typography>
      </Box>
      <Box className={classes.bannerWapper}>
        <CardMedia image={bannerSrc} className={classes.banner} />
        <Box className={classes.hostName}>
          <Box display="flex" alignItems="center">
            <Typography>
              {' '}
              {hostState?.nickname
                ? `${hostState?.nickname}`
                : renderShortAddress(hostAddress, 4, 4)}
            </Typography>
            <Box
              className={clsx(classes.header, {
                [classes.unfollow]: currentUser?.followsId
                  .map((u: any) => u.f1)
                  .includes(hostState.id),
              })}
            >
              {hostState.address != account && active && (
                <>
                  {currentUser?.followsId
                    .map((u: any) => u.f1)
                    .includes(hostState.id) && (
                    <Button onClick={() => handleClickButton('unfollow')}>
                      Unfollow
                    </Button>
                  )}
                  {!currentUser?.followsId
                    .map((u: any) => u.f1)
                    .includes(hostState.id) && (
                    <Button onClick={() => handleClickButton('follow')}>
                      Follow
                    </Button>
                  )}
                </>
              )}
              {account == hostState.address && (
                <Box
                  className={classes.addNickname}
                  onClick={handleAddNickname}
                >
                  {/* {!hostState.nickname && <AddIcon color="#29B6F6" />}
                  <Typography>
                    {!hostState.nickname
                      ? 'Add your nickname'
                      : 'Edit nickname'}
                  </Typography> */}
                  <Edit />
                </Box>
              )}
            </Box>
          </Box>
          <Box>
            <Box>
              <Typography>{hostState.description}</Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.avatar}>
          <CardMedia image={avatarUrl} />
          <Box
            style={{
              visibility: account == hostState.address ? 'initial' : 'hidden',
              minHeight: 34,
              minWidth: 34,
              background: '#4b4b4b',
            }}
            className={classes.iconChangeAva}
          >
            <Button startIcon={<CameraIcon />} component="label">
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handelChangeAvatar}
              />
            </Button>
          </Box>
          <Box className={classes.hostNameDesktop}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection={
                hostState.address != account && active ? 'column' : 'row'
              }
            >
              <Typography
                style={{
                  marginRight: hostState.address != account && active ? 0 : 8,
                  marginBottom: hostState.address != account && active ? 8 : 0,
                }}
              >
                {' '}
                {hostState?.nickname
                  ? `${hostState?.nickname}`
                  : renderShortAddress(hostAddress, 4, 4)}
              </Typography>
              <Box
                className={clsx(classes.header, {
                  [classes.unfollow]: currentUser?.followsId
                    .map((u: any) => u.f1)
                    .includes(hostState.id),
                })}
              >
                {hostState.address != account && active && (
                  <>
                    {currentUser?.followsId
                      .map((u: any) => u.f1)
                      .includes(hostState.id) && (
                      <Button onClick={() => handleClickButton('unfollow')}>
                        Unfollow
                      </Button>
                    )}
                    {!currentUser?.followsId
                      .map((u: any) => u.f1)
                      .includes(hostState.id) && (
                      <Button onClick={() => handleClickButton('follow')}>
                        Follow
                      </Button>
                    )}
                  </>
                )}
                {account == hostState.address && (
                  <Box
                    className={classes.addNickname}
                    onClick={handleAddNickname}
                  >
                    <Edit />
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        {account == hostState.address && (
          <Box className={classes.buttonWapper}>
            <Button
              className={classes.button}
              startIcon={<CameraIcon />}
              component="label"
            >
              {isMobile ? '' : 'Change banner'}
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={onChangeBanner}
              />
            </Button>
            <Dialog
              onClose={handleCloseDialog}
              aria-labelledby="customized-dialog-title"
              fullScreen={fullScreen}
              maxWidth="lg"
              open={open}
            >
              <DialogContent dividers>
                <Cropper
                  style={{ height: 500, width: '100%' }}
                  aspectRatio={type == 'banner' ? 21 / 7 : 1 / 1}
                  guides={false}
                  src={type == 'banner' ? bannerSrc : avatarUrl}
                  responsive={true}
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                  viewMode={1}
                  dragMode="move"
                  movable={!isLoadingUpload}
                  rotatable={!isLoadingUpload}
                  scalable={!isLoadingUpload}
                  zoomable={!isLoadingUpload}
                  cropBoxMovable={!isLoadingUpload}
                  cropBoxResizable={!isLoadingUpload}
                />
              </DialogContent>
              <DialogActions>
                {!isLoadingUpload && (
                  <>
                    <Button
                      onClick={handleCloseDialog}
                      className={classes.saveButton}
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={getCropData}
                      className={classes.saveButton}
                    >
                      Crop
                    </Button>
                  </>
                )}
                {isLoadingUpload && (
                  <Typography className={classes.processing}>
                    Processing...
                  </Typography>
                )}
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </Box>
      <Box className={classes.wrapper}>
        <TotalInfo hostState={hostState} />
      </Box>
      <Box className={classes.sort}>
        <Box
          className={clsx({
            [classes.active]: sortBy == 'events',
          })}
          onClick={() => {
            setSortBy('events');
          }}
        >
          <Typography>Prediction</Typography>
          {/* {sortBy == 'events' && <Divider />} */}
        </Box>
        <Box
          className={clsx({
            [classes.active]: sortBy == 'live',
          })}
          onClick={() => {
            setSortBy('live');
          }}
        >
          <Typography>Live</Typography>
          {/* {sortBy == 'live' && <Divider />} */}
        </Box>
        <Box
          className={clsx({
            [classes.active]: sortBy == 'community',
          })}
          onClick={() => {
            setSortBy('community');
          }}
        >
          <Typography>Community</Typography>
          {/* {sortBy == 'community' && <Divider />} */}
        </Box>
        <Box
          className={clsx({
            [classes.active]: sortBy == 'about',
          })}
          onClick={() => {
            setSortBy('about');
          }}
        >
          <Typography>About</Typography>
          {/* {sortBy == 'about' && <Divider />} */}
        </Box>
      </Box>

      {(sortBy == 'events' || sortBy == 'live') && (
        <>
          {isMobile && (
            <Box
              style={{
                width: '100%',
                marginBottom: 8,
              }}
            >
              <SearchProEvent />
            </Box>
          )}
          <Box className={classes.searchFilter}>
            {/* <SearchProEvent /> */}
            <Sort />
            <FilterProEvent />
          </Box>
        </>
      )}
      {sortBy == 'events' && <NewEvent />}
      {sortBy == 'live' && <NewEvent isLive />}
      {sortBy == 'about' && <About hostState={hostState} />}
      {sortBy == 'community' && <Community hostState={hostState} />}
    </Box>
  );
};
export default memo(HostInfo);
