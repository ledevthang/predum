import { Box, Typography } from '@material-ui/core';
import { convertThousandSeperator, getNameToken } from 'helpers';
import React from 'react';
import { IPredictionP2PSummary } from 'types/admin';
import { useStyles } from './p2pStyles';

interface IProps {
  data: IPredictionP2PSummary;
  token: string;
}

const SummaryPredictionP2P = ({ data, token }: IProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.summary}>
      <Box className={classes.wrapperDetail}>
        <Typography>Total predictions</Typography>
        <Typography>{data.totalPredictions}</Typography>
      </Box>
      <Box className={classes.wrapperDetail}>
        <Typography>Total volume of all predictions</Typography>
        <Typography>
          {convertThousandSeperator(data.totalVolume.total)}{' '}
          {getNameToken(token)}
        </Typography>
      </Box>
      <Box className={classes.wrapperDetail2}>
        <Typography>Self Data</Typography>
        <Typography>
          {convertThousandSeperator(data.totalVolume.selfData)}{' '}
          {getNameToken(token)}
        </Typography>
      </Box>
      <Box className={classes.wrapperDetail2}>
        <Typography>Data Provider</Typography>
        <Typography>
          {convertThousandSeperator(data.totalVolume.dataPro)}{' '}
          {getNameToken(token)}
        </Typography>
      </Box>
      <Box className={classes.wrapperDetail}>
        <Typography>Avg. predicted pool per event</Typography>
        <Typography>
          {convertThousandSeperator(data.avgPredictAmount)}{' '}
          {getNameToken(token)}
        </Typography>
      </Box>
      <Box className={classes.wrapperDetail}>
        <Typography>Avg. predictions per event</Typography>
        <Typography>{convertThousandSeperator(data.avgPredictNum)}</Typography>
      </Box>
      <Box className={classes.wrapperDetail}>
        <Typography>Avg. predicted amount per user</Typography>
        <Typography>
          {convertThousandSeperator(data.avgPredictPerUser)}{' '}
          {getNameToken(token)}
        </Typography>
      </Box>
    </Box>
  );
};

export default SummaryPredictionP2P;
