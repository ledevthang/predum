import React, { useCallback, useMemo } from 'react';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './OptionalDetailStyles';
import LabelInput from 'components/HostPrediction/LabelInput';
import CommonRadioGroup from 'components/common/CommonRadioGroup';
import { MarketType } from 'types/hostPrediction';
import { useDispatch, useSelector } from 'react-redux';
import { getOptionalDetailState, getEventType } from 'store/selectors';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import MultipleChoiceDetail from './MultipleChoiceDetail';
import Handicap from './Handicap';
import { WhoTakeWith } from 'types/hostPrediction';
import OverUnder from './OverUnder';
import HomeDrawAway from './HomeDrawAway';

const OptionalDetail = () => {
  const classes = useStyles();
  const optionalDetail = useSelector(getOptionalDetailState);
  const predictionType = useSelector(getEventType);
  const dispatch = useDispatch();

  const handleMarketChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        updateHostPredictionStateAction({
          marketType: event.target.value as MarketType,
        }),
      );
    },
    [dispatch],
  );

  const renderPredictionOption = useMemo(() => {
    switch (optionalDetail) {
      case MarketType.MULTIPLE_CHOICES:
        return <MultipleChoiceDetail />;
      case MarketType.HANDICAP:
        return <Handicap />;
      case MarketType.OVER_UNDER:
        return <OverUnder />;
      case MarketType.HOME_DRAW_AWAY:
        return <HomeDrawAway />;
    }
  }, [optionalDetail]);

  return (
    <Box className={classes.container}>
      <LabelInput
        label="Market type"
        component={
          <CommonRadioGroup
            values={Object.values(MarketType).map((m) => ({
              value: m,
            }))}
            currentValue={optionalDetail}
            onChange={handleMarketChange}
          />
        }
      />
      <Typography className={classes.predictionText}>
        {optionalDetail == MarketType.OVER_UNDER &&
        predictionType == WhoTakeWith.USER_USER
          ? 'Total score'
          : 'Prediction options'}
      </Typography>
      {renderPredictionOption}
    </Box>
  );
};

export default OptionalDetail;
