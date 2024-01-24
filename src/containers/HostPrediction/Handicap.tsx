import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CommonInput from 'components/common/CommonInput';
import CommonUploadFileCropImage from 'components/common/CommonUploadFileCropImage';
import LabelInput from 'components/HostPrediction/LabelInput';
import { isStringNumber } from 'helpers';
import { isInteger } from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import {
  getAnswerType,
  getEventDataSource,
  getEventType,
  getFixtureSelected,
  getHandicapState,
  getQuestion,
} from 'store/selectors';
import { AnswerType, WhoTakeWith } from 'types/hostPrediction';
import { EDataSource } from 'types/proEvent';
import { useStyles } from './GroupPredictDetailStyles';

const Handicap = () => {
  const classes = useStyles();
  const handicap = useSelector(getHandicapState);
  const dispatch = useDispatch();
  const question = useSelector(getQuestion);
  const predictionType = useSelector(getEventType);
  const answerType = useSelector(getAnswerType);
  const fixture = useSelector(getFixtureSelected);
  const dataSource = useSelector(getEventDataSource);

  const handleChangeValueHandicap = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name.split('-');
      let newValue = event.target.value;
      // if (newValue.length > 30) return;
      if (name[0] == 'value' || name[0] == 'odd') {
        if (!isStringNumber(newValue)) {
          return;
        }
        if (
          name[0] == 'odd' &&
          newValue &&
          (newValue == '.' || newValue == ',' || +newValue < 1)
        ) {
          return;
        }
        newValue = newValue.replace(',', '.');
      }
      const newOption: any = [...handicap];
      newOption[+name[1]][name[0]] = newValue;
      if (name[0] == 'value') {
        const otherName = name[1] == '0' ? '1' : '0';
        if (+newValue > 0 && handicap[otherName].value != '0') {
          newOption[otherName].value = '0';
        }
      }
      dispatch(
        updateHostPredictionStateAction({
          handicap: [...newOption],
        }),
      );
    },
    [dispatch, handicap],
  );

  const hasErrorHandicap = useMemo(() => {
    return handicap.filter((h) => !isInteger(+h.value * 4)).length > 0;
  }, [handicap]);

  useEffect(() => {
    const isUserVsPools = predictionType != WhoTakeWith.USER_USER;
    let test;
    if (isUserVsPools) {
      test = handicap.filter((o) => !o.name || !o.odd || !o.value);
    } else {
      test = handicap.filter((o) => !o.name || !o.value);
    }
    const test2 = handicap.filter((t) => !isInteger(+t.value * 4));

    dispatch(
      updateHostPredictionStateAction({
        error: test.length > 0 || test2.length > 0 || !question,
      }),
    );
  }, [handicap, predictionType, question]);

  const onChangeOptionImage = useCallback(
    (file: File) => {
      const newOption: any = [...handicap];
      newOption[file.name].image = file;
      dispatch(
        updateHostPredictionStateAction({
          handicap: [...newOption],
        }),
      );
    },
    [dispatch, handicap],
  );

  const onDeleteImage = useCallback(
    (index: number) => {
      const newOption: any = [...handicap];
      newOption[index].image = undefined;
      newOption[index].isNotInit = true;
      dispatch(
        updateHostPredictionStateAction({
          handicap: [...newOption],
        }),
      );
    },
    [dispatch, handicap, dataSource],
  );

  const renderDefaultImage = useCallback(
    (index: number) => {
      if (!fixture) return undefined;
      const teamsMeta = JSON.parse(fixture.teamsMeta);
      if (index == 0 && !handicap[0].isNotInit) {
        return teamsMeta.home.logo;
      } else if (index == 1 && !handicap[1].isNotInit) {
        return teamsMeta.away.logo;
      }
      return undefined;
    },
    [fixture, handicap],
  );

  const disabledName = useMemo(() => {
    return dataSource == EDataSource.SPORT_DATA_PROVIDER;
  }, [dataSource]);

  return (
    <Box className={classes.wrapper}>
      <Box width="100%">
        {handicap.map((o, i) => (
          <Box key={i}>
            {answerType == AnswerType.WITH_PHOTOS && (
              <LabelInput
                label={`Option Photo ${i + 1} (128x100)`}
                className={classes.wrapperImage}
                component={
                  <CommonUploadFileCropImage
                    onDeleteImage={() => onDeleteImage(i)}
                    name={`${i}`}
                    file={
                      o.image
                        ? URL.createObjectURL(o.image)
                        : dataSource == EDataSource.SPORT_DATA_PROVIDER
                        ? renderDefaultImage(i)
                        : undefined
                    }
                    onChange={onChangeOptionImage}
                    className={classes.img}
                  />
                }
              />
            )}
            <Box display="flex" width="100%">
              <LabelInput
                className={classes.wrapperLabel}
                label={`Option Name ${i + 1}`}
                component={
                  <CommonInput
                    key={`handicapName-${i}`}
                    name={`name-${i}`}
                    value={o.name}
                    onChange={handleChangeValueHandicap}
                    className={classes.commonInput}
                    disabled={disabledName}
                  />
                }
              />
              <LabelInput
                label="Handicap"
                isAnnotate={true}
                titleAnnotate="Handicap is a points or goal margin applied to the favored team or player in a contest in order to create more level odds for each outcome."
                className={clsx(classes.oddTeamScore, classes.italic)}
                component={
                  <Box>
                    <CommonInput
                      name={`value-${i}`}
                      value={handicap[i].value}
                      onChange={handleChangeValueHandicap}
                      className={classes.commonInput}
                      // disabled={Number(handicap[i].value || '0') > 0}
                    />
                  </Box>
                }
              />
              {predictionType != WhoTakeWith.USER_USER && (
                <LabelInput
                  label={`Odd ${i + 1}`}
                  isAnnotate={true}
                  titleAnnotate="Odds are the measure of how much an user can win vs. how much the user predict. If an option has odd of 1.9, it means he will receive 1.9 ETH for every 1 ETH invested, including the original predicted amount."
                  className={clsx(classes.oddTeamScore, classes.italic)}
                  component={
                    <CommonInput
                      key={`handicapOdd-${i}`}
                      name={`odd-${i}`}
                      value={o.odd}
                      onChange={handleChangeValueHandicap}
                      className={classes.commonInput}
                    />
                  }
                />
              )}
            </Box>
          </Box>
        ))}
      </Box>
      {hasErrorHandicap && (
        <Typography className={classes.errorHandicap}>
          The decimal value must be either 0.0, 0.25, 0.5 or 0.75
        </Typography>
      )}
    </Box>
  );
};

export default Handicap;
