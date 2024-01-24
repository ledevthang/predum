import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getHostPrediction, getQuestion } from 'store/selectors';
import { AnswerType, MarketType, WhoTakeWith } from 'types/hostPrediction';
import { useStyles } from './OptionPreviewStyle';
import _ from 'lodash';
import OptionItem from 'components/Event/OptionItem';
import { EDataSource } from 'types/proEvent';

const OptionPreview = () => {
  const classes = useStyles();
  const question = useSelector(getQuestion);
  const predictState = useSelector(getHostPrediction);

  const renderOverUnderName = useCallback((value: string) => {
    switch (value) {
      case 'totalScores':
        return 'Total Score';
      case 'over':
        return 'Over';
      case 'under':
        return 'Under';
    }
  }, []);

  const isWrapperOverUnder = useMemo(() => {
    return (
      predictState.marketType == MarketType.OVER_UNDER &&
      predictState.organizingMethod.eventType != WhoTakeWith.USER_USER
    );
  }, [predictState]);

  const renderDefaultImageHandicap = useCallback(
    (index: number) => {
      if (!predictState.fixture) return undefined;
      const teamsMeta = JSON.parse(predictState.fixture.teamsMeta);
      if (index == 0 && !predictState.handicap[0].isNotInit) {
        return teamsMeta.home.logo;
      } else if (index == 1 && !predictState.handicap[1].isNotInit) {
        return teamsMeta.away.logo;
      }
      return undefined;
    },
    [predictState.handicap, predictState.fixture],
  );

  const renderDefaultImageHomeDrawAway = useCallback(
    (index: number) => {
      if (!predictState.fixture) return undefined;
      const teamsMeta = JSON.parse(predictState.fixture.teamsMeta);
      if (index == 0 && !predictState.homeDrawAway[0].isNotInit) {
        return teamsMeta.home.logo;
      } else if (index == 2 && !predictState.homeDrawAway[2].isNotInit) {
        return teamsMeta.away.logo;
      }
      return undefined;
    },
    [predictState.fixture, predictState.homeDrawAway],
  );

  const renderOptions = useMemo(() => {
    const isUserVsPools =
      predictState.organizingMethod.eventType != WhoTakeWith.USER_USER;
    if (predictState.marketType == MarketType.MULTIPLE_CHOICES) {
      const options = predictState.multipleChoices.options;
      return options.map((o, i) => (
        <OptionItem
          key={i}
          name={o.name}
          odd={isUserVsPools ? o.odd : undefined}
          isImageOption={predictState.answerType == AnswerType.WITH_PHOTOS}
          image={o.image ? URL.createObjectURL(o.image) : undefined}
          disabledPercentage
        />
      ));
    } else if (predictState.marketType == MarketType.TRUE_FALSE) {
      const options = predictState.trueFalse.options;
      return options.map((o, i) => (
        <OptionItem
          key={i}
          name={o.name}
          odd={isUserVsPools ? o.odd : undefined}
          isImageOption={predictState.answerType == AnswerType.WITH_PHOTOS}
          image={o.image ? URL.createObjectURL(o.image) : undefined}
          disabledPercentage
        />
      ));
    } else if (predictState.marketType == MarketType.HANDICAP) {
      const options = predictState.handicap;
      return (
        <>
          <OptionItem
            name={options[0].name}
            isImageOption={predictState.answerType == AnswerType.WITH_PHOTOS}
            odd={isUserVsPools ? options[0].odd : undefined}
            image={
              options[0].image
                ? URL.createObjectURL(options[0].image)
                : predictState.dataSource == EDataSource.SPORT_DATA_PROVIDER
                ? renderDefaultImageHandicap(0)
                : undefined
            }
            disabledPercentage
          />

          <Box className={classes.handicap}>
            <Typography>
              {options[0].value} : {options[1].value}
            </Typography>
          </Box>
          <OptionItem
            name={options[1].name}
            isImageOption={predictState.answerType == AnswerType.WITH_PHOTOS}
            odd={isUserVsPools ? options[1].odd : undefined}
            image={
              options[1].image
                ? URL.createObjectURL(options[1].image)
                : predictState.dataSource == EDataSource.SPORT_DATA_PROVIDER
                ? renderDefaultImageHandicap(1)
                : undefined
            }
            disabledPercentage
          />
        </>
      );
    } else if (predictState.marketType == MarketType.OVER_UNDER) {
      const options: any = _.omit(predictState.overUnder, ['totalScore']);
      if (isUserVsPools) {
        return Object.keys(options).map((o, i) => (
          <Box key={i} className={clsx('center-root')}>
            <Typography className={classes.overUnderName}>
              {renderOverUnderName(o)}
            </Typography>
            {options[o].map((v: number, i: number) => (
              <Typography key={i} className={classes.overUnderValue}>
                {v}
              </Typography>
            ))}
          </Box>
        ));
      } else {
        return (
          <>
            <Box className={clsx(classes.choiceOverUnderUvU, 'center-root')}>
              <Typography>Over</Typography>
              <Typography>{predictState.overUnder.totalScore}</Typography>
            </Box>
            <Box className={clsx(classes.choiceOverUnderUvU, 'center-root')}>
              <Typography>Under</Typography>
              <Typography>{predictState.overUnder.totalScore}</Typography>
            </Box>
          </>
        );
      }
    } else {
      const options = predictState.homeDrawAway;
      return options.map((o, i) => (
        <OptionItem
          key={i}
          name={o.name}
          odd={isUserVsPools ? o.odd : undefined}
          image={
            o.image
              ? URL.createObjectURL(o.image)
              : predictState.dataSource == EDataSource.SPORT_DATA_PROVIDER
              ? renderDefaultImageHomeDrawAway(i)
              : undefined
          }
          disabledPercentage
          isImageOption={predictState.answerType == AnswerType.WITH_PHOTOS}
        />
      ));
    }
  }, [predictState, renderOverUnderName]);

  return (
    <Box className={classes.container}>
      <Typography className={classes.question}>{question}</Typography>
      <Typography className={classes.marketType}>
        {predictState.marketType == MarketType.TRUE_FALSE
          ? 'Yes / No'
          : predictState.marketType}
      </Typography>
      <Box
        className={clsx(classes.wrapperChoice, {
          [classes.wrapperOverUnder]: isWrapperOverUnder,
        })}
      >
        {renderOptions}
      </Box>
    </Box>
  );
};

export default OptionPreview;
