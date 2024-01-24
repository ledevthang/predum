import { Box, Button, Typography } from '@material-ui/core';
import CommonInput from 'components/common/CommonInput';
import { isStringNumber } from 'helpers';
import CloseIcon from 'icon/CloseIcon';
import { isInteger } from 'lodash';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { getEventType, getOverUnderState, getQuestion } from 'store/selectors';
import { WhoTakeWith } from 'types/hostPrediction';
import AddOptionButton from './AddOptionButton';
import { useStyles } from './GroupPredictDetailStyles';

const OverUnder = () => {
  const classes = useStyles();
  const predictionType = useSelector(getEventType);
  const overUnder: any = useSelector(getOverUnderState);
  const question = useSelector(getQuestion);
  const dispatch = useDispatch();

  const handleChangeTotalScore = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;
      if (!isStringNumber(newValue)) {
        return;
      }
      newValue = newValue.replace(',', '.');
      dispatch(
        updateHostPredictionStateAction({
          overUnder: {
            ...overUnder,
            totalScore: newValue,
          },
        }),
      );
    },
    [dispatch, overUnder],
  );

  const handleChangeOverUnder = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;
      // if (newValue.length > 30) return;
      if (!isStringNumber(newValue)) {
        return;
      }
      const name: any[] = event.target.name.split('-');
      if (name[0] == 'over' || name[0] == 'under') {
        if (newValue && (newValue == '.' || newValue == ',' || +newValue < 1))
          return;
      }
      const newOverUnder = [...overUnder[name[0]]];
      newOverUnder[name[1]] = newValue;
      newValue = newValue.replace(',', '.');
      dispatch(
        updateHostPredictionStateAction({
          overUnder: {
            ...overUnder,
            [name[0]]: newOverUnder,
          },
        }),
      );
    },
    [dispatch, overUnder],
  );

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

  const onRemoveOption = useCallback(
    (index: number) => {
      const newOverUnder = { ...overUnder };
      newOverUnder.totalScores.splice(index, 1);
      newOverUnder.over.splice(index, 1);
      newOverUnder.under.splice(index, 1);
      dispatch(
        updateHostPredictionStateAction({
          overUnder: {
            ...newOverUnder,
          },
        }),
      );
    },
    [dispatch, overUnder],
  );

  const onAddOption = useCallback(() => {
    const newOverUnder = { ...overUnder };
    newOverUnder.totalScores.push('');
    newOverUnder.over.push('');
    newOverUnder.under.push('');
    dispatch(
      updateHostPredictionStateAction({
        overUnder: {
          ...newOverUnder,
        },
      }),
    );
  }, [dispatch, overUnder]);

  const disabledAddOption = useMemo(() => {
    return overUnder.totalScores.length >= 5;
  }, [overUnder.totalScores.length]);

  const hasErrorTotalScore = useMemo(() => {
    if (predictionType == WhoTakeWith.USER_USER) {
      return !isInteger(+overUnder.totalScore * 2);
    }
    return (
      overUnder.totalScores.filter((t: string) => !isInteger(+t * 2)).length > 0
    );
  }, [overUnder, predictionType]);

  useEffect(() => {
    const isUserVsPools = predictionType == WhoTakeWith.USER_POOL;
    let error = false;
    if (isUserVsPools) {
      const test = [
        ...overUnder.totalScores,
        ...overUnder.over,
        ...overUnder.under,
      ].filter((v) => !v);
      const test2 = overUnder.totalScores.filter(
        (t: string) => !isInteger(+t * 2),
      );

      error = test.length > 0 || test2.length > 0;
    } else {
      error = !overUnder.totalScore || !isInteger(+overUnder.totalScore * 2);
    }
    dispatch(updateHostPredictionStateAction({ error: error || !question }));
  }, [predictionType, overUnder, question]);

  return (
    <Box>
      {predictionType == WhoTakeWith.USER_USER ? (
        <CommonInput
          value={overUnder.totalScore}
          onChange={handleChangeTotalScore}
          className={classes.commonInput}
        />
      ) : (
        <>
          <AddOptionButton
            className={classes.addButtonOverUnder}
            label="Add option"
            onClick={onAddOption}
            disabled={disabledAddOption}
          />
          <Box className={classes.wrapperOverUnder}>
            <Box className={classes.wrapperHeader}>
              {['totalScores', 'over', 'under'].map((o, i) => (
                <Typography className={classes.overUnderName} key={i}>
                  {renderOverUnderName(o)}
                </Typography>
              ))}
            </Box>
            {Array.from(Array(overUnder.totalScores.length).keys()).map(
              (v: number, i1: number) => (
                <Box className={classes.wrapperOverUnderInput} key={i1}>
                  {['totalScores', 'over', 'under'].map((o, i2) => (
                    <Box className={classes.wrapperUnderClear} key={i2}>
                      <CommonInput
                        name={`${o}-${i1}`}
                        value={overUnder[o][v]}
                        onChange={handleChangeOverUnder}
                        key={`${i1}-${i2}`}
                        className={classes.overUnderValue}
                      />
                    </Box>
                  ))}
                  {i1 != 0 && (
                    <Button
                      disableRipple
                      className={classes.clearOverUnder}
                      onClick={() => onRemoveOption(i1)}
                    >
                      <CloseIcon color="#FFFFFF" />
                    </Button>
                  )}
                </Box>
              ),
            )}
          </Box>
        </>
      )}
      {hasErrorTotalScore && (
        <Typography className={classes.errorTotalScore}>
          The decimal value must be either 0.0 or 0.5
        </Typography>
      )}
    </Box>
  );
};

export default OverUnder;
