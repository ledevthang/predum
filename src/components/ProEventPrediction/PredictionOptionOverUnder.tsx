import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CommonInput from 'components/common/CommonInput';
import { isStringNumber } from 'helpers';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import {
  getDescription,
  getMarketType,
  getOverUnderState,
} from 'store/selectors';
import { MarketType } from 'types/hostPrediction';
import { useStyles } from './SelectMarketProEventStyles';

interface IProps {
  disabledSelect?: boolean;
  disabledEdit?: boolean;
}

const PredictionOptionOverUnder = ({
  disabledSelect,
  disabledEdit,
}: IProps) => {
  const classes = useStyles();
  const overUnder: any = useSelector(getOverUnderState);
  const dispatch = useDispatch();
  const marketType = useSelector(getMarketType);
  const description = useSelector(getDescription);

  const handleChangeOverUnder = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;
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

  useEffect(() => {
    if (marketType != MarketType.OVER_UNDER) return;
    let error = false;
    const test = [
      ...overUnder.totalScores,
      ...overUnder.over,
      ...overUnder.under,
    ].filter((v) => !v);
    error = test.length > 0 || !description;
    dispatch(updateHostPredictionStateAction({ error: error }));
  }, [overUnder, marketType, description]);

  return (
    <Box className={classes.wapperOverUnder}>
      <Box className={clsx('center-root')}>
        <Typography className={classes.overUnderName}>Total Score</Typography>
        {overUnder.totalScores.map((v: string, i: number) => (
          <Typography key={i} className={classes.overUnderValue}>
            {v}
          </Typography>
        ))}
      </Box>
      <Box className={clsx('center-root')}>
        <Typography className={classes.overUnderName}>Over</Typography>
        {overUnder.over.map((v: string, i: number) => (
          <CommonInput
            key={i}
            name={`over-${i}`}
            disabled={disabledSelect || disabledEdit}
            value={overUnder.over[i]}
            onChange={handleChangeOverUnder}
            className={clsx(classes.overUnderValue, {
              [classes.border]: !disabledSelect && !disabledEdit,
            })}
          />
        ))}
      </Box>
      <Box className={clsx('center-root')}>
        <Typography className={classes.overUnderName}>Under</Typography>
        {overUnder.under.map((v: string, i: number) => (
          <CommonInput
            key={i}
            name={`under-${i}`}
            disabled={disabledSelect || disabledEdit}
            value={overUnder.under[i]}
            onChange={handleChangeOverUnder}
            className={clsx(classes.overUnderValue, {
              [classes.border]: !disabledSelect && !disabledEdit,
            })}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PredictionOptionOverUnder;
