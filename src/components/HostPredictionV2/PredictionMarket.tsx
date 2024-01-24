import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, Button, Divider, Typography } from '@material-ui/core';
import ComponentWithTooltip from './ComponentWithTooltip';
import { useStyles } from './PredictionMarketStyle';
import LabelInput from 'components/HostPrediction/LabelInput';
import CommonRadioGroup from 'components/common/CommonRadioGroup';
import { AnswerType, MarketType, WhoTakeWith } from 'types/hostPrediction';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAnswerType,
  getCategoryState,
  getEventDataSource,
  getEventType,
  getOptionalDetailState,
  getQuestion,
  getShouldInitFirstChoiceProMarket,
} from 'store/selectors';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import MultipleChoiceDetail from 'containers/HostPrediction/MultipleChoiceDetail';
import Handicap from 'containers/HostPrediction/Handicap';
import OverUnder from 'containers/HostPrediction/OverUnder';
import HomeDrawAway from 'containers/HostPrediction/HomeDrawAway';
import CommonInput from 'components/common/CommonInput';
import TrueFalse from 'containers/HostPrediction/TrueFalse';
import clsx from 'clsx';
import { EDataSource } from 'types/proEvent';
import CommonTooltip from 'components/common/CommonTooltip';
import InfoIcon from 'icon/InfoIcon';

const PredictionMarket = () => {
  const classes = useStyles();
  const optionalDetail = useSelector(getOptionalDetailState);
  const predictionType = useSelector(getEventType);
  const question = useSelector(getQuestion);
  const categoryState = useSelector(getCategoryState);
  const answerType = useSelector(getAnswerType);
  const dataSource = useSelector(getEventDataSource);
  const shouldInitFirstChoiceProMarket = useSelector(
    getShouldInitFirstChoiceProMarket,
  );

  const dispatch = useDispatch();

  const handleMarketChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newMarketType = event.target.value as MarketType;
      dispatch(
        updateHostPredictionStateAction({
          marketType: newMarketType,
          answerType: AnswerType.ONLY_TEXT,
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
      case MarketType.TRUE_FALSE:
        return <TrueFalse />;
    }
  }, [optionalDetail]);

  const handleChangeQuestion = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      dispatch(
        updateHostPredictionStateAction({
          shortDescription: newValue,
        }),
      );
    },
    [dispatch],
  );
  const renderAnnotateMarket = () => {
    return (
      <Box className={classes.annotate}>
        <Typography>
          Multiple Choice market provides users with multiple answer options and
          it requires user to predict only one correct answers from the choice
          options.
        </Typography>
        <Typography>
          The handicap market is where users predict on a team that begins the
          game with a disadvantage (or handicap) and needs to score more goals
          in order to beat the opposition.
        </Typography>
        <Typography>
          An over–under market is where the host predict a number for a
          statistic in a given game (usually the combined score of the two
          teams), and the users will predict that the actual number in the game
          will be either higher or lower than that number.
        </Typography>
        <Typography>
          Home/Away/Draw market is where user has to select a Home Team to win,
          or an Away Team to win, or a Draw at the end of the play time of a
          match.
        </Typography>
        <Typography>
          Yes/No market is where the host present a statement and the users have
          to choose the correct answer between two answer options, which are
          “Yes” or “No”
        </Typography>
      </Box>
    );
  };

  const onChangeAnswerType = useCallback(
    (answerType: AnswerType) => {
      dispatch(
        updateHostPredictionStateAction({
          answerType,
        }),
      );
    },
    [dispatch],
  );

  const renderMarketDataPro = () => {
    return (
      <Box>
        <Box>
          <Box className={classes.proWrapTooltip}>
            <Typography>Auto-update result</Typography>
            <CommonTooltip title="The result of these markets will be automatically updated by the platform without host’s action. Winners will receive their rewards immediately.">
              <InfoIcon />
            </CommonTooltip>
          </Box>
          <CommonRadioGroup
            values={[MarketType.HOME_DRAW_AWAY, MarketType.HANDICAP]
              .filter((m) =>
                categoryState.categoryName != 'Sport' &&
                categoryState.categoryName != 'eSport'
                  ? m == MarketType.TRUE_FALSE ||
                    m == MarketType.MULTIPLE_CHOICES
                  : true,
              )
              .map((m) => {
                return {
                  value: m,
                };
              })}
            currentValue={optionalDetail}
            onChange={handleMarketChange}
          />
        </Box>

        <Box>
          <Box className={classes.proWrapTooltip}>
            <Typography>Manual-update result</Typography>
            <CommonTooltip title="The result of these markets will be manually updated by the host. Winners will receive their rewards 48 hours after host confirm result.">
              <InfoIcon />
            </CommonTooltip>
          </Box>
          <CommonRadioGroup
            values={[
              MarketType.MULTIPLE_CHOICES,
              MarketType.OVER_UNDER,
              MarketType.TRUE_FALSE,
            ]
              .filter((m) =>
                categoryState.categoryName != 'Sport' &&
                categoryState.categoryName != 'eSport'
                  ? m == MarketType.TRUE_FALSE ||
                    m == MarketType.MULTIPLE_CHOICES
                  : true,
              )
              .map((m) => {
                return {
                  value: m,
                };
              })}
            currentValue={optionalDetail}
            onChange={handleMarketChange}
          />
        </Box>
      </Box>
    );
  };

  useEffect(() => {
    if (
      dataSource == EDataSource.SPORT_DATA_PROVIDER &&
      shouldInitFirstChoiceProMarket
    ) {
      dispatch(
        updateHostPredictionStateAction({
          shouldInitFirstChoiceProMarket: false,
          marketType: MarketType.HOME_DRAW_AWAY,
        }),
      );
    }
  }, [dataSource, shouldInitFirstChoiceProMarket]);

  return (
    <ComponentWithTooltip
      title="Prediction Market"
      isAnnotate={true}
      titleAnnotate={renderAnnotateMarket()}
      className={classes.marginTop}
    >
      <Box className={classes.container}>
        <LabelInput
          label="Market type"
          component={
            dataSource == EDataSource.MYSELF ? (
              <CommonRadioGroup
                values={Object.values(MarketType)
                  .filter((m) =>
                    categoryState.categoryName != 'Sport' &&
                    categoryState.categoryName != 'eSport'
                      ? m == MarketType.TRUE_FALSE ||
                        m == MarketType.MULTIPLE_CHOICES
                      : true,
                  )
                  .map((m) => {
                    return {
                      value: m,
                    };
                  })}
                currentValue={optionalDetail}
                onChange={handleMarketChange}
              />
            ) : (
              renderMarketDataPro()
            )
          }
        />
        <Box className={classes.main}>
          <Box display="flex" alignItems="center" mb={3}>
            <Button
              disableRipple
              onClick={() => onChangeAnswerType(AnswerType.ONLY_TEXT)}
              className={clsx(classes.answerType, {
                [classes.answerTypeActive]: answerType == AnswerType.ONLY_TEXT,
              })}
            >
              Answers only text
            </Button>
            <Divider orientation="vertical" className={classes.divider} />
            <Button
              disableRipple
              classes={{ disabled: classes.disabled }}
              onClick={() => onChangeAnswerType(AnswerType.WITH_PHOTOS)}
              disabled={optionalDetail == MarketType.OVER_UNDER}
              className={clsx(classes.answerType, {
                [classes.answerTypeActive]:
                  answerType == AnswerType.WITH_PHOTOS,
              })}
            >
              Answers with photos
            </Button>
          </Box>
          <LabelInput
            label="Enter your question"
            component={
              <CommonInput
                value={question}
                required
                onChange={handleChangeQuestion}
                className={clsx(classes.commonInput, classes.inputMarket)}
              />
            }
          />
          <Typography className={classes.predictionText}>
            {optionalDetail == MarketType.OVER_UNDER &&
            predictionType == WhoTakeWith.USER_USER
              ? 'Total score'
              : 'Option details'}
          </Typography>
          <Box className={classes.inputMarket}>{renderPredictionOption}</Box>
        </Box>
      </Box>
    </ComponentWithTooltip>
  );
};

export default PredictionMarket;
