import { Box } from '@material-ui/core';
import clsx from 'clsx';
import CommonInput from 'components/common/CommonInput';
import CommonUploadFileCropImage from 'components/common/CommonUploadFileCropImage';
import LabelInput from 'components/HostPrediction/LabelInput';
import { isStringNumber } from 'helpers';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import {
  getAnswerType,
  getEventDataSource,
  getEventType,
  getFixtureSelected,
  getHomeDrawAwayState,
  getQuestion,
} from 'store/selectors';
import { AnswerType, WhoTakeWith } from 'types/hostPrediction';
import { EDataSource } from 'types/proEvent';
import { useStyles } from './GroupPredictDetailStyles';

const HomeDrawAway = () => {
  const classes = useStyles();
  const homeDrawAway = useSelector(getHomeDrawAwayState);
  const predictionType = useSelector(getEventType);
  const question = useSelector(getQuestion);
  const dispatch = useDispatch();
  const answerType = useSelector(getAnswerType);
  const fixture = useSelector(getFixtureSelected);
  const dataSource = useSelector(getEventDataSource);

  const handleChangeValueHomeDrawAway = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;
      // if (newValue.length > 30) return;
      const name = event.target.name.split('-');
      if (name[0] == 'odd') {
        if (
          !isStringNumber(newValue) ||
          (newValue && (newValue == '.' || newValue == ',' || +newValue < 1))
        ) {
          return;
        }
        newValue = newValue.replace(',', '.');
      }
      const newOption: any = [...homeDrawAway];
      newOption[+name[1]][name[0]] = newValue;
      dispatch(
        updateHostPredictionStateAction({
          homeDrawAway: newOption,
        }),
      );
    },
    [dispatch, homeDrawAway],
  );

  useEffect(() => {
    const isUserVsPools = predictionType != WhoTakeWith.USER_USER;
    const test = homeDrawAway.filter(
      (o) => !o.name || (isUserVsPools ? !o.odd : false),
    );
    dispatch(
      updateHostPredictionStateAction({ error: test.length > 0 || !question }),
    );
  }, [predictionType, homeDrawAway, question]);

  const onChangeOptionImage = useCallback(
    (file: File) => {
      const newOption: any = [...homeDrawAway];
      newOption[file.name].image = file;
      dispatch(
        updateHostPredictionStateAction({
          homeDrawAway: [...newOption],
        }),
      );
    },
    [dispatch, homeDrawAway],
  );

  const onDeleteImage = useCallback(
    (index: number) => {
      const newOption: any = [...homeDrawAway];
      newOption[index].image = undefined;
      newOption[index].isNotInit = true;
      dispatch(
        updateHostPredictionStateAction({
          homeDrawAway: [...newOption],
        }),
      );
    },
    [dispatch, homeDrawAway],
  );

  const renderDefaultImage = useCallback(
    (index: number) => {
      if (!fixture) return undefined;
      const teamsMeta = JSON.parse(fixture.teamsMeta);
      if (index == 0 && !homeDrawAway[0].isNotInit) {
        return teamsMeta.home.logo;
      } else if (index == 2 && !homeDrawAway[2].isNotInit) {
        return teamsMeta.away.logo;
      }
      return undefined;
    },
    [fixture, homeDrawAway],
  );

  const disabledName = useMemo(() => {
    return dataSource == EDataSource.SPORT_DATA_PROVIDER;
  }, [dataSource]);

  return (
    <Box className={classes.wrapper}>
      <LabelInput
        label={
          predictionType != WhoTakeWith.USER_USER ? 'Team / Player name' : ''
        }
        className={clsx(classes.multipleChoiceOption, classes.italic)}
        component={
          <Box width="100%">
            {homeDrawAway.map((o, i) => (
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
                            : dataSource === EDataSource.SPORT_DATA_PROVIDER
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
                    label={`Option Name ${i + 1}`}
                    className={classes.wrapperLabel}
                    component={
                      <CommonInput
                        key={`homeName-${i}`}
                        name={`name-${i}`}
                        value={o.name}
                        disabled={i == 1 || disabledName}
                        onChange={handleChangeValueHomeDrawAway}
                        className={classes.commonInput}
                      />
                    }
                  />
                  {predictionType != WhoTakeWith.USER_USER && (
                    <LabelInput
                      label={`Odd ${i + 1}`}
                      isAnnotate={true}
                      titleAnnotate="Odds are the measure of how much an user can win vs. how much the user predict. If an option has odd of 1.9, it means he will receive 1.9 ETH for every 1 ETH invested, including the original predicted amount."
                      className={clsx(
                        classes.oddTeamScoreHomeAway,
                        classes.italic,
                      )}
                      component={
                        <CommonInput
                          key={`homeOdd-${i}`}
                          name={`odd-${i}`}
                          value={o.odd || ''}
                          onChange={handleChangeValueHomeDrawAway}
                          className={classes.commonInput}
                        />
                      }
                    />
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        }
      />
    </Box>
  );
};

export default HomeDrawAway;
