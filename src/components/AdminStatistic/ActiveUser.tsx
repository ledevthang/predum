import { Box, Typography } from '@material-ui/core';
import { CHART_BACKGROUNDS } from 'common';
import React from 'react';
import { useStyles } from './ActiveUserStyles';
import CommonChart from './CommonChart';

interface IProps {
  predictions: number[];
  hosts: number[];
  totalWallet: number;
}

const ActiveUser = ({ predictions, hosts, totalWallet }: IProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.wrapperTotal}>
        <Typography>Total users:</Typography>
        <Typography>{totalWallet}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box width="49%">
          <Box display="flex" alignItems="center" justifyContent="space-around">
            <Box className={classes.chart}>
              <CommonChart
                data={predictions}
                labels={['Prediction', 'Non-predictions']}
              />
              <Typography className={classes.nameChart}>
                Number of predictors
              </Typography>
            </Box>
            <Box>
              <Box display="flex" alignItems="center" mt={1}>
                <Box
                  bgcolor={CHART_BACKGROUNDS[0]}
                  width="30px"
                  height="16px"
                  borderRadius={3}
                  mr={1}
                />
                <Typography className={classes.detail}>
                  {`Predictors: ${predictions[0]}`}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <Box
                  bgcolor={CHART_BACKGROUNDS[1]}
                  width="30px"
                  height="16px"
                  borderRadius={3}
                  mr={1}
                />
                <Typography className={classes.detail}>
                  {`Non-predictors: ${predictions[1]}`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box width="49%">
          <Box display="flex" alignItems="center" justifyContent="space-around">
            <Box className={classes.chart}>
              <CommonChart data={hosts} labels={['Host', 'Non-host']} />
              <Typography className={classes.nameChart}>
                Number of host
              </Typography>
            </Box>
            <Box>
              <Box display="flex" alignItems="center" mt={1}>
                <Box
                  bgcolor={CHART_BACKGROUNDS[0]}
                  width="30px"
                  height="16px"
                  borderRadius={3}
                  mr={1}
                />
                <Typography className={classes.detail}>
                  {`Host: ${hosts[0]}`}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <Box
                  bgcolor={CHART_BACKGROUNDS[1]}
                  width="30px"
                  height="16px"
                  borderRadius={3}
                  mr={1}
                />
                <Typography className={classes.detail}>
                  {`Non-host: ${hosts[1]}`}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ActiveUser;
