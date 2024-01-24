import { Box, Typography } from '@material-ui/core';
import { convertThousandSeperator, getNameToken } from 'helpers';
import React from 'react';
import { IEventP2PSummary } from 'types/admin';
import { useStyles } from './p2pStyles';

interface IProps {
  data: IEventP2PSummary;
  token: string;
}

const SummaryReactionP2P = ({ data, token }: IProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.summary}>
      <Box className={classes.wrapperDetail}>
        <Typography>Total events created</Typography>
        <Typography>{convertThousandSeperator(data.totalEvents)}</Typography>
      </Box>
      <Box className={classes.wrapperDetail}>
        <Typography>Number of hosts</Typography>
        <Typography>{convertThousandSeperator(data.totalHosts)}</Typography>
      </Box>
      <Box className={classes.wrapperDetail}>
        <Typography>Total prize pool</Typography>
        <Typography>
          {convertThousandSeperator(data.totalPoolAmount)} {getNameToken(token)}
        </Typography>
      </Box>
      <Box className={classes.wrapperDetail}>
        <Typography>Avg. prize pool</Typography>
        <Typography>
          {convertThousandSeperator(data.avgPoolAmount)} {getNameToken(token)}
        </Typography>
      </Box>
    </Box>
  );
};

export default SummaryReactionP2P;
