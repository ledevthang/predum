import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CommonInput from 'components/common/CommonInput';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { adminLogin } from 'store/actions/userActions';

const AdminLogin = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name == 'username') {
      setUsername(event.target.value);
    } else if (event.target.name == 'password') {
      setPassword(event.target.value);
    }
  };

  const callback = useCallback(
    (status: boolean) => {
      if (status) {
        history.push('/admin');
      } else {
        setMessage('Your username or password is incorrect');
      }
    },
    [history],
  );

  const onLogin = useCallback(() => {
    dispatch(
      adminLogin(
        {
          username,
          password,
          isAdmin: true,
        },
        callback,
      ),
    );
  }, [dispatch, username, password, callback]);

  return (
    <Box className={clsx(classes.container, 'center-root')}>
      <Box className={clsx(classes.main, 'center-root')}>
        <Typography className={classes.text1}>Login to your account</Typography>
        <Box width="100%" mb={1}>
          <Typography className={classes.label}>Username</Typography>
          <CommonInput
            value={username}
            onChange={handleChange}
            name="username"
            className={classes.field}
          />
        </Box>
        <Box width="100%">
          <Typography className={classes.label}>Password</Typography>
          <CommonInput
            value={password}
            type="password"
            onChange={handleChange}
            name="password"
            className={classes.field}
          />
        </Box>
        <Box className={classes.wrapper}>
          {message && <Box className={classes.msg}>{message}</Box>}
          <Button className={classes.login} onClick={onLogin}>
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLogin;

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    height: '100vh',
  },
  main: {
    width: 332,
    flexDirection: 'column',
    backgroundColor: '#2C2C2F',
    padding: 32,
  },
  field: {
    width: '100%',
    marginTop: 8,
    height: 44,
    backgroundColor: '#4B4B4B',
    [theme.breakpoints.down('sm')]: {
      height: 36,
    },
  },
  text1: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 16,
  },
  login: {
    height: 56,
    width: '100%',
    backgroundColor: '#3FADD5',
    color: '#0B0B0E',
  },
  msg: {
    width: '100%',
    top: 8,
    backgroundColor: '#FFF0F0',
    color: '#ED5050',
    position: 'absolute',
  },
  wrapper: {
    marginTop: 36,
    width: '100%',
    position: 'relative',
  },
  label: {
    fontSize: 16,
  },
}));
