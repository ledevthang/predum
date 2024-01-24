import { Box, makeStyles, Typography } from '@material-ui/core';
import ArrowDownIcon from 'icon/ArrowDownIcon';
import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Link to="admin" className={classes.link} style={{ marginRight: 120 }}>
        Event Report
      </Link>
      <Box className={classes.wrapper}>
        <Box className={classes.wrapper2}>
          <Typography>Statistic</Typography>
          <ArrowDownIcon />
        </Box>
        <Box className={classes.hide} id="hide">
          {screens.map((s) => (
            <Link
              key={s.name}
              to={`admin?type=${s.params}`}
              className={classes.link}
            >
              {s.name}
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminHeader;

let screens = [
  {
    name: 'Overall',
    params: 'statistic',
  },
  {
    name: 'P2P & Prize',
    params: 'p2p',
  },
  {
    name: 'User vs. Pool',
    params: 'uvp',
  },
];

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'base',
    marginRight: 100,
    marginTop: 32,
    justifyContent: 'flex-end',
  },
  link: {
    marginLeft: 24,
    textDecoration: 'none',
    fontSize: 18,
    textTransform: 'uppercase',
    color: 'white',
    padding: '4px 0px',
    whiteSpace: 'nowrap',
    '&:hover': {
      color: '#3FADD5',
    },
  },
  wrapper2: {
    display: 'flex',
    marginLeft: 24,
    alignItems: 'center',
    cursor: 'pointer',
    '&>p': {
      fontSize: 18,
      textTransform: 'uppercase',
      marginRight: 4,
    },
  },
  wrapper: {
    position: 'absolute',
    marginTop: 4,
    '& svg': {
      width: 20,
      height: 20,
      transition: 'all 0.5s',
    },
    '&:hover': {
      '& svg': {
        width: 20,
        height: 20,
        transform: 'rotate(-180deg) !important',
        transition: 'all 0.5s',
      },
      '& #hide': {
        opacity: 1,
        transition: 'all 0.5s',
        pointerEvents: 'auto',
      },
    },
  },
  hide: {
    opacity: 0,
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'none',
    padding: '8px 16px 8px 0px',
    border: '1px solid #4B4B4B',
    borderRadius: 2,
    marginTop: 8,
    transition: 'all 0.5s',
    '& a:not(:last-child)': {
      borderBottom: '1px solid #FFFFFF',
    },
  },
}));
