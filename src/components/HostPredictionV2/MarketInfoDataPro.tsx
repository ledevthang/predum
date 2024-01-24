import { Box, makeStyles } from '@material-ui/core';
import CommonCheckBox from 'components/common/CommonCheckBox';
import CommonInput from 'components/common/CommonInput';
import CommonTextarea from 'components/common/CommonTextarea';
import LabelInput from 'components/HostPrediction/LabelInput';
import ListPredictOption from 'components/ProEventPrediction/ListPredictOption';
import ReviewInfluencer from 'components/ProEventPrediction/ReviewInfluencer';
import { useInitDataProviderOdd } from 'hooks/useInitDataProviderOdd';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import {
  getCategoryState,
  getDescription,
  getEventDataSource,
  getKindOfEvent,
  getLockEmbeddedLink,
  getStreamUrl,
} from 'store/selectors';
import { EDataSource, EKindOfEvent } from 'types/proEvent';
import ComponentWithTooltip from './ComponentWithTooltip';
import EventDetailReview from './EventDetailReview';
import Fee from './Fee';
import MarketPredictionProMultipleChoice from './MarketPredictionProMultipleChoice';
import PrizePool from './PrizePool';
import StatisticCommission from './StatisticCommission';

const MarketInfoDataPro = () => {
  const classes = useStyles();
  const description = useSelector(getDescription);
  const dispatch = useDispatch();
  const dataSource = useSelector(getEventDataSource);
  const category = useSelector(getCategoryState);
  const kindOfEvent = useSelector(getKindOfEvent);
  const lockEmbeddedLink = useSelector(getLockEmbeddedLink);
  const streamUrl = useSelector(getStreamUrl);

  const isMarketPredictionPro = useMemo(() => {
    return (
      dataSource == EDataSource.SPORT_DATA_PROVIDER &&
      category.categoryName == 'Market Prediction'
    );
  }, [dataSource, category.categoryName]);

  useInitDataProviderOdd();

  const handleChangeDescription = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      dispatch(
        updateHostPredictionStateAction({
          description: newValue,
        }),
      );
    },
    [dispatch],
  );

  const handleChangeStreamUrl = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      dispatch(
        updateHostPredictionStateAction({
          streamUrl: newValue,
        }),
      );
    },
    [dispatch],
  );

  const handleChange = useCallback(() => {
    dispatch(
      updateHostPredictionStateAction({
        lockEmbeddedLink: !lockEmbeddedLink,
        ...(!lockEmbeddedLink && {
          streamUrl: '',
        }),
      }),
    );
  }, [dispatch, lockEmbeddedLink]);

  return (
    <Box width="100%">
      {isMarketPredictionPro ? (
        <EventDetailReview />
      ) : (
        <>
          {kindOfEvent == EKindOfEvent.AFFILIATE && (
            <Box className={classes.inputWapper}>
              <Box>
                <CommonCheckBox
                  checked={!lockEmbeddedLink}
                  handleChange={handleChange}
                  label="I want to embed a livestream link"
                />
              </Box>
              <LabelInput
                label="Embed live stream link"
                component={
                  <CommonInput
                    value={streamUrl}
                    onChange={handleChangeStreamUrl}
                    className={classes.commonInput2}
                    disabled={lockEmbeddedLink}
                  />
                }
              />
            </Box>
          )}
          <ComponentWithTooltip title="Event Detail">
            <ReviewInfluencer shouldEditBanner />
          </ComponentWithTooltip>
          <LabelInput
            label="Description"
            className={classes.description}
            component={
              <CommonTextarea
                value={description || ''}
                minRows={7}
                onChange={handleChangeDescription}
                className={classes.commonInput}
                required
              />
            }
          />
        </>
      )}
      {kindOfEvent == EKindOfEvent.AFFILIATE && <StatisticCommission />}
      {kindOfEvent != EKindOfEvent.AFFILIATE && (
        <>
          <Fee />
          <PrizePool />
        </>
      )}
      {isMarketPredictionPro ? (
        <MarketPredictionProMultipleChoice />
      ) : (
        <ComponentWithTooltip title="Prediction Game">
          <ListPredictOption
            disabledEdit={kindOfEvent == EKindOfEvent.AFFILIATE}
          />
        </ComponentWithTooltip>
      )}
    </Box>
  );
};

export default MarketInfoDataPro;

const useStyles = makeStyles((theme) => ({
  commonInput: {
    width: 360,
    height: 44,
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 24,
    [theme.breakpoints.down('sm')]: {
      marginTop: 16,
      width: '100%',
    },
  },
  inputWapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 24,
    '&>div': {
      width: '50%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  },
  commonInput2: {
    height: '44px',
    width: '100%',
    marginBottom: '24px',
    backgroundColor: '#4B4B4B',
    '& .Mui-disabled': {
      color: '#FFFFFF',
      opacity: 0.7,
    },
  },
}));
