import { Box, Typography } from '@material-ui/core';
import ActiveUserType from 'components/AdminStatistic/ActiveUserType';
import EventCreation from 'components/AdminStatistic/EventCreation';
import EventPrediction from 'components/AdminStatistic/EventPrediction';
import FilterAdmin from 'components/AdminStatistic/Filter';
import React, { useMemo } from 'react';
import { useStyles } from './styles';

interface IProps {
  type: 'p2p' | 'uvp';
}

const P2PStatistic = ({ type }: IProps) => {
  const classes = useStyles();

  const name = useMemo(() => {
    return type == 'p2p' ? 'P2P & Prize' : 'User vs. Pool';
  }, [type]);

  return (
    <Box padding={8}>
      <Typography className={classes.headline}>{name}</Typography>
      <FilterAdmin />
      <Box mb={10} mt={10}>
        <Box className={classes.category}>
          <Box className={classes.classNameItem}>
            {`Event creation of ${name}`}
          </Box>
        </Box>
        <EventCreation type={type} />
      </Box>
      <Box mb={10}>
        <Box className={classes.category}>
          <Box className={classes.classNameItem}>{`Prediction of ${name}`}</Box>
        </Box>
        <EventPrediction type={type} />
      </Box>
      <Box mb={10}>
        <Box className={classes.category}>
          <Box className={classes.classNameItem}>
            {`Active users of ${name}`}
          </Box>
        </Box>
        <ActiveUserType type={type} />
      </Box>
    </Box>
  );
};

export default P2PStatistic;
