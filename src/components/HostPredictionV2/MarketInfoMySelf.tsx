import { Box } from '@material-ui/core';
import { useInitDataProviderP2P } from 'hooks/useInitDataProviderP2P';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getCategoryState, getEventDataSource } from 'store/selectors';
import { EDataSource } from 'types/proEvent';
import EventDetailReview from './EventDetailReview';
import Fee from './Fee';
import MarketPredictionProMultipleChoice from './MarketPredictionProMultipleChoice';
import PredictionMarket from './PredictionMarket';
import PrizePool from './PrizePool';

const MarketInfoMySelf = () => {
  useInitDataProviderP2P();
  const dataSource = useSelector(getEventDataSource);
  const category = useSelector(getCategoryState);

  const isMarketPredictionPro = useMemo(() => {
    return (
      dataSource == EDataSource.SPORT_DATA_PROVIDER &&
      category.categoryName == 'Market Prediction'
    );
  }, [dataSource, category.categoryName]);

  return (
    <Box>
      <EventDetailReview />
      <Fee />
      <PrizePool />
      {isMarketPredictionPro ? (
        <MarketPredictionProMultipleChoice />
      ) : (
        <PredictionMarket />
      )}
    </Box>
  );
};

export default MarketInfoMySelf;
