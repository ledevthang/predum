import { Box, CardMedia, makeStyles } from '@material-ui/core';
import React from 'react';

interface IProps {
  reports: string[];
  reportType: string[];
}
const ShowMoreReportDialog = ({ reports, reportType }: IProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {reports.map((r, i) => (
        <Box className={classes.main} key={i}>
          {reportType[i] == 'file' ? (
            <CardMedia className={classes.img} image={r} />
          ) : (
            <a href={r}>{r}</a>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ShowMoreReportDialog;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '32px 64px',
    backgroundColor: '#5A5A5E',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 400,
    boxSizing: 'content-box',
    '& a': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: 'block',
      color: 'white',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '16px 32px',
      width: 200,
    },
  },
  main: {
    width: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  img: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
}));
