import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CommonLineChart from 'components/Investment/CommonLineChart';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

interface IProps {
  data: number[];
  labels: string[];
  title?: string;
  yText: string;
}

const CommonLineChartFilterDate = ({ data, labels, title, yText }: IProps) => {
  const classes = useStyles();
  const [days, setDays] = useState(0);
  const [isAcitve, setIsActive] = useState<number>(7);
  const [indexFilter, setIndexFilter] = useState(0);
  useEffect(() => {
    const startTime = dayjs(labels[0]);
    const now = dayjs(new Date());
    let days = now.diff(startTime, 'day');
    setDays(days);
  }, [labels]);
  useEffect(() => {
    handleFilterDay(7);
    setIsActive(7);
  }, [days]);
  const handleFilterDay = (day: number) => {
    setIsActive(day);
    if (day == 0) {
      setIndexFilter(0);
      return;
    }
    let flag = true;
    let index = 0;
    labels.forEach((label: string, i: number) => {
      let daysDiff = dayjs(new Date()).diff(dayjs(label), 'day');
      if (flag) {
        if (daysDiff < day) {
          flag = false;
          index = i;
        }
      }
    });
    setIndexFilter(labels.length - index);
  };
  const getDataChart = () => {
    let temp = data.slice(-indexFilter);
    if (isAcitve == 30)
      return temp.filter((item, index) => {
        return (data.length - 1 - index) % 3 == 0;
      });
    return temp;
  };
  const getLabelChart = () => {
    let temp = labels.slice(-indexFilter);
    if (isAcitve == 30)
      return temp.filter((item, index) => {
        return (data.length - 1 - index) % 3 == 0;
      });
    return temp;
  };
  const getFilterDay = () => {
    return (
      <Box className={classes.wapperFilter}>
        <Button
          className={clsx({
            [classes.active]: isAcitve == 7,
          })}
          onClick={() => handleFilterDay(7)}
        >
          7 days
        </Button>
        <Typography>/</Typography>
        {days > 7 && (
          <>
            <Button
              className={clsx({
                [classes.active]: isAcitve == 30,
              })}
              onClick={() => handleFilterDay(30)}
            >
              30 days
            </Button>
            <Typography>/</Typography>
          </>
        )}
        {days > 30 && (
          <>
            <Button
              className={clsx({
                [classes.active]: isAcitve == 90,
              })}
              onClick={() => handleFilterDay(90)}
            >
              3 months
            </Button>
            <Typography>/</Typography>
          </>
        )}
        {days > 90 && (
          <>
            <Button
              className={clsx({
                [classes.active]: isAcitve == 180,
              })}
              onClick={() => handleFilterDay(180)}
            >
              6 months
            </Button>
            <Typography>/</Typography>
          </>
        )}
        <Button
          className={clsx({
            [classes.active]: isAcitve == 0,
          })}
          onClick={() => handleFilterDay(0)}
        >
          All
        </Button>
      </Box>
    );
  };
  return (
    <Box
      display="flex"
      alignItems="flex-end"
      flexDirection="column"
      className={classes.wapper}
    >
      <Box className={classes.filter}>{getFilterDay()}</Box>
      <Box className={classes.wapperChart}>
        <CommonLineChart
          data={getDataChart()}
          labels={getLabelChart()}
          title={title}
          yText={yText}
          type={
            isAcitve == 7 || isAcitve == 30 || isAcitve == undefined
              ? 'day'
              : 'month'
          }
        />
      </Box>
    </Box>
  );
};

export default CommonLineChartFilterDate;

const useStyles = makeStyles((theme) => ({
  filter: {
    marginBottom: 20,
    padding: '8px 4px',
    border: '1px solid #BDBDBD',
  },
  wapper: {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
      paddingTop: 20,
    },
  },
  active: {
    '& span': {
      color: '#3FADD5',
    },
  },
  wapperFilter: {
    display: 'flex',
    '&>button>span': {
      fontSize: 16,
      padding: '0px 12px',
    },
    '&>p': {
      fontSize: 18,
    },
  },
  wapperChart: {
    height: 400,
    width: '100%',
  },
}));
