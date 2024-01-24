import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CommonInput from 'components/common/CommonInput';
import LoadingButton from 'components/common/LoadingButton';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserInfoAction } from 'store/actions/currentUserActions';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import {
  getUserByAddressAction,
  updateUserNicknameAction,
} from 'store/actions/hostActions';
import { getHostState } from 'store/selectors';

const AddNicknameDialog = ({
  isEdit,
  oldNickname,
}: {
  isEdit?: boolean;
  oldNickname?: string;
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState('');
  const hostState = useSelector(getHostState);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState(
    'This nickname has already been taken',
  );
  useEffect(() => {
    if (isEdit && oldNickname) {
      setNickname(oldNickname);
    }
  }, []);
  useEffect(() => {
    if (nickname.length > 20) {
      setIsError(true);
      setHelperText('Nickname has maximum 20 characters');
    } else {
      setIsError(false);
      setHelperText('');
    }
  }, [nickname]);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value;
    setNickname(newValue);
  };
  const onSaveNickname = () => {
    setIsLoading(true);
    dispatch(
      updateUserNicknameAction(
        nickname,
        () => {
          setIsLoading(false);
          dispatch(
            updateDialogStateAction({
              open: false,
              component: undefined,
            }),
          );
          dispatch(
            getUserByAddressAction({
              address: hostState.address,
            }),
          );
          dispatch(getCurrentUserInfoAction());
        },
        () => {
          setHelperText('This nickname has already been taken');
          setIsError(true);
          setIsLoading(false);
        },
      ),
    );
  };
  return (
    <Box className={clsx(classes.container, 'center-root')}>
      <Typography>{isEdit ? 'Edit Nickname' : 'Add Nickname'}</Typography>
      <Box
        className={clsx(classes.input, {
          [classes.isHasError]: isError,
        })}
      >
        <Typography>Please enter your nickname</Typography>
        <CommonInput
          value={nickname}
          onChange={handleChangeInput}
          className={classes.inputField}
          error={isError}
          helperText={helperText}
        />
      </Box>
      <Box
        className={clsx(classes.button, {
          [classes.disabled]: isError,
        })}
      >
        <LoadingButton
          isLoading={isLoading}
          onClick={onSaveNickname}
          disableRipple={true}
          disabled={isError}
        >
          Save nickname
        </LoadingButton>
        <Typography>
          {isEdit
            ? 'After you save, you will not be able to change your nickname again'
            : 'After you save, you can change your nickname 1 more time'}
        </Typography>
      </Box>
    </Box>
  );
};

export default AddNicknameDialog;
const useStyles = makeStyles((theme) => ({
  container: {
    width: 500,
    backgroundColor: '#5A5A5E',
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    '&>p:first-child': {
      marginBottom: 14,
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '29px',
    },
    [theme.breakpoints.down('sm')]: {
      width: 325,
    },
  },
  inputField: {
    '&>p': {
      fontSize: '14px',
      bottom: '-27px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '290px',
    },
  },
  isHasError: {
    marginBottom: '26px !important',
  },
  input: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: 16,
    flexDirection: 'column',
    '&>p': {
      marginBottom: 10,
    },
    '& input': {
      border: '1px solid',
      height: 32,
      paddingLeft: '10px',
    },
  },
  disabled: {
    '& span:first-child': {
      color: 'unset !important',
    },
  },
  button: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    '& span:first-child': {
      height: '40px',
      width: '130px',
      color: 'black',
      background:
        'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
      borderRadius: '20px',
      marginBottom: '10px',
    },
    '&>p': {
      textAlign: 'center',
    },
  },
}));
