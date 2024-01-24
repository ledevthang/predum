import React, { useCallback, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useStyles } from './SelectMarketProEventStyles';
import CommonInput from 'components/common/CommonInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDescription,
  getHomeDrawAwayState,
  getMarketType,
} from 'store/selectors';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { isStringNumber } from 'helpers';
import { MarketType } from 'types/hostPrediction';

interface IProps {
  disabledSelect?: boolean;
  disabledEdit?: boolean;
}

const PredictionOption1x2 = ({ disabledSelect, disabledEdit }: IProps) => {
  const classes = useStyles();
  const homeDrawAway = useSelector(getHomeDrawAwayState);
  const dispatch = useDispatch();
  const marketType = useSelector(getMarketType);
  const description = useSelector(getDescription);

  const handleChangeValueHomeDrawAway = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;
      const name = event.target.name;
      if (
        !isStringNumber(newValue) ||
        (newValue && (newValue == '.' || newValue == ',' || +newValue < 1))
      ) {
        return;
      }
      newValue = newValue.replace(',', '.');
      const newOption: any = [...homeDrawAway];
      newOption[+name]['odd'] = newValue;
      dispatch(
        updateHostPredictionStateAction({
          homeDrawAway: newOption,
        }),
      );
    },
    [dispatch, homeDrawAway],
  );

  useEffect(() => {
    if (marketType != MarketType.HOME_DRAW_AWAY) return;
    const test = homeDrawAway.filter((o) => !o.name || !o.odd);
    dispatch(
      updateHostPredictionStateAction({
        error: test.length > 0 || !description,
      }),
    );
  }, [homeDrawAway, marketType, description]);

  return (
    <Box className={classes.listOption}>
      {homeDrawAway.map((x, i) => (
        <Box
          className={clsx(
            classes.optionDetail,
            'center-root',
            classes.heightOptionDetail1x2,
          )}
          key={i}
        >
          <Typography>{x.name}</Typography>
          <CommonInput
            disabled={disabledSelect || disabledEdit}
            value={homeDrawAway[i].odd}
            name={`${i}`}
            onChange={handleChangeValueHomeDrawAway}
            className={clsx(classes.commonInput, {
              [classes.border]: !disabledSelect && !disabledEdit,
            })}
          />
        </Box>
      ))}
    </Box>
  );
};

export default PredictionOption1x2;
