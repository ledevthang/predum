import { Box } from '@material-ui/core';
import MarketInfoDataPro from 'components/HostPredictionV2/MarketInfoDataPro';
import MarketInfoMySelf from 'components/HostPredictionV2/MarketInfoMySelf';
import React from 'react';
import { useSelector } from 'react-redux';
import { getEventDataSource, getEventType } from 'store/selectors';
import { WhoTakeWith } from 'types/hostPrediction';
import { EDataSource } from 'types/proEvent';
import { useStyles } from './styles';

const MarketInfo = () => {
  const classes = useStyles();
  const dataSource = useSelector(getEventDataSource);
  const eventType = useSelector(getEventType);

  return (
    <Box width="100%">
      {dataSource == EDataSource.MYSELF && <MarketInfoMySelf />}
      {dataSource == EDataSource.SPORT_DATA_PROVIDER &&
        eventType == WhoTakeWith.USER_USER && <MarketInfoMySelf />}
      {dataSource == EDataSource.SPORT_DATA_PROVIDER &&
        eventType != WhoTakeWith.USER_USER && <MarketInfoDataPro />}
    </Box>
  );
};

export default MarketInfo;
