import React, { useCallback, useEffect, useMemo } from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import { useStyles } from './SelectMarketProEventStyles';
import CommonInput from 'components/common/CommonInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDescription,
  getHandicapState,
  getMarketType,
} from 'store/selectors';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { isStringNumber } from 'helpers';
import { isInteger } from 'lodash';
import { MarketType } from 'types/hostPrediction';

interface IProps {
  disabledSelect?: boolean;
  disabledEdit?: boolean;
}
const PredictionOptionHandicap = ({ disabledSelect, disabledEdit }: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const handicap = useSelector(getHandicapState);
  const marketType = useSelector(getMarketType);
  const description = useSelector(getDescription);

  const handleChangeValueHandicap = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;
      const name = event.target.name.split('-');
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
    let test;
    test = handicap.filter((o) => !o.name || !o.odd || !o.value);
    const test2 = handicap.filter((t) => !isInteger(+t.value * 4));

    if (marketType == MarketType.HANDICAP) {
      dispatch(
        updateHostPredictionStateAction({
          error: test.length > 0 || test2.length > 0 || !description,
        }),
      );
    }
  }, [handicap, marketType, description]);

  return (
    <Box className={classes.listOption} position="relative">
      <Box
        className={clsx(
          classes.optionDetail,
          'center-root',
          classes.heightOptionDetail1x2,
          { [classes.handicapMobile]: isMobile },
        )}
      >
        <Typography style={{ marginTop: 4 }}>{handicap[0].name}</Typography>
        <CommonInput
          disabled={disabledSelect || disabledEdit}
          name={`odd-0`}
          value={handicap[0].odd}
          onChange={handleChangeValueHandicap}
          className={clsx(classes.commonInput, {
            [classes.border]: !disabledSelect && !disabledEdit,
          })}
        />{' '}
      </Box>
      <Box className="center-root" flexDirection="column">
        <Typography style={{ fontSize: 14, marginTop: 4 }}>Handicap</Typography>
        <Box className={clsx(classes.handicap, 'center-root')}>
          <CommonInput
            disabled={disabledSelect || disabledEdit}
            name={`value-0`}
            value={handicap[0].value}
            onChange={handleChangeValueHandicap}
            className={clsx(classes.commonInput, classes.margin, {
              [classes.border]: !disabledSelect && !disabledEdit,
            })}
          />
          <CommonInput
            disabled={disabledSelect || disabledEdit}
            name={`value-1`}
            value={handicap[1].value}
            onChange={handleChangeValueHandicap}
            className={clsx(classes.commonInput, {
              [classes.border]: !disabledSelect && !disabledEdit,
            })}
          />
        </Box>
      </Box>
      <Box
        className={clsx(
          classes.optionDetail,
          'center-root',
          classes.heightOptionDetail1x2,
          { [classes.handicapMobile]: isMobile },
        )}
      >
        <Typography style={{ marginTop: 4 }}>{handicap[1].name}</Typography>
        <CommonInput
          disabled={disabledSelect || disabledEdit}
          value={handicap[1].odd}
          name={`odd-1`}
          onChange={handleChangeValueHandicap}
          className={clsx(classes.commonInput, {
            [classes.border]: !disabledSelect && !disabledEdit,
          })}
        />
      </Box>
      {hasErrorHandicap && (
        <Typography className={classes.errorHandicap}>
          The decimal value must be either 0.0, 0.25, 0.5 or 0.75
        </Typography>
      )}
    </Box>
  );
};

export default PredictionOptionHandicap;
