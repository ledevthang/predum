import { Box, Button, Divider, Typography } from '@material-ui/core';
import clsx from 'clsx';
import CommonDatePicker from 'components/common/CommonDatePicker';
import CommonDateTimePicker from 'components/common/CommonDateTimePicker';
import CommonInput from 'components/common/CommonInput';
import CommonRadioGroup from 'components/common/CommonRadioGroup';
import CommonSelectInput from 'components/common/CommonSelectInput';
import LabelInput from 'components/HostPrediction/LabelInput';
import dayjs from 'dayjs';
import {
  convertThousandSeperator,
  convertTime,
  convertTimeUTC,
  getTimeZone,
  getTimeZoneInt,
  isSorted,
  isStringNumber,
} from 'helpers';
import AddIcon from 'icon/AddIcon';
import CloseIcon from 'icon/CloseIcon';
import { isInteger } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import {
  getCoinSelected,
  getEventType,
  getMarketInfo,
  getMarketPriceType,
  getMultipleChoiceState,
  getOptionalDetailState,
  getPriceRange,
  getQuestion,
} from 'store/selectors';
import {
  AnswerType,
  MarketPriceType,
  MarketType,
  WhoTakeWith,
} from 'types/hostPrediction';
import ComponentWithTooltip from './ComponentWithTooltip';
import { useStyles } from './PredictionMarketStyle';

const MarketPredictionProMultipleChoice = () => {
  const classes = useStyles();
  const optionalDetail = useSelector(getOptionalDetailState);
  const question = useSelector(getQuestion);
  const marketPriceType = useSelector(getMarketPriceType);
  const coin = useSelector(getCoinSelected);
  const { endTime, deadline } = useSelector(getMarketInfo);
  const predictionType = useSelector(getEventType);
  const priceRange = useSelector(getPriceRange);
  const multipleChoicesState = useSelector(getMultipleChoiceState);
  const [dateEndInit, setDateEndInit] = useState(true);

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

  const renderAnnotateMarket = () => {
    return (
      <Box className={classes.annotate}>
        <Typography>
          Multiple Choice market provides users with multiple answer options and
          it requires user to predict only one correct answers from the choice
          options.
        </Typography>
      </Box>
    );
  };

  const renderPriceType = useMemo(() => {
    return Object.values(MarketPriceType).map((c) => ({
      id: c,
      value: c,
    }));
  }, []);

  const handleChangePriceType = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const marketPriceType = event.target.value as MarketPriceType;
      dispatch(
        updateHostPredictionStateAction({
          marketPriceType,
        }),
      );
    },
    [dispatch],
  );

  const handleChangeEndTime = useCallback(
    (date: Date | null) => {
      if (!date) return;
      dispatch(
        updateHostPredictionStateAction({
          endTime:
            marketPriceType == MarketPriceType.VOLUME
              ? dayjs(date)
                  .startOf('day')
                  .add(getTimeZoneInt(), 'hours')
                  .toDate()
              : date,
        }),
      );
    },
    [dispatch, marketPriceType],
  );

  const renderEndTime = useMemo(() => {
    if (!endTime) return '';
    if (marketPriceType == MarketPriceType.PRICE) {
      return `${convertTime(endTime)} (${convertTimeUTC(endTime)})`;
    }
    const datePadding = dayjs(endTime).add(1, 'days').toDate();
    return `${convertTimeUTC(datePadding)} (${convertTime(datePadding)})`;
  }, [endTime, marketPriceType]);

  const handleChangePriceRange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = Number(event.target.name);
      let value = event.target.value.substring(1);
      value = value.replace(/,/g, '');
      if (!isStringNumber(value)) return;
      const newRange = [...priceRange];
      newRange[name] = value;
      dispatch(
        updateHostPredictionStateAction({
          priceRange: newRange,
        }),
      );
    },
    [priceRange, dispatch],
  );

  const priceRangeWithoutEndItem = useMemo(() => {
    return priceRange.slice(0, priceRange.length - 1);
  }, [priceRange]);

  const addNewOption = useCallback(() => {
    const newRange = [...priceRange];
    newRange.push('');
    dispatch(
      updateHostPredictionStateAction({
        priceRange: newRange,
      }),
    );
  }, [priceRange, dispatch]);

  const onRemoveOption = useCallback(
    (index: number) => {
      const newRange = [...priceRange];
      newRange.splice(index, 1);
      dispatch(
        updateHostPredictionStateAction({
          priceRange: newRange,
        }),
      );
    },
    [priceRange, dispatch],
  );

  const renderErrorRange = useMemo(() => {
    const isUndefined = priceRange.findIndex((p) => !p);
    if (isUndefined > 0) return;
    const rangeInNumber = priceRange.map((p) => Number(p));
    const isSort = isSorted(rangeInNumber);
    if (isSort) return;
    return 'The range price should be sorted in ascending';
  }, [priceRange]);

  useEffect(() => {
    const multipleChoices = [];
    multipleChoices.push({
      name: `< $${convertThousandSeperator(priceRange[0])}`,
      odd: multipleChoicesState.options[0].odd,
    });
    priceRange.forEach((p, i) => {
      if (i != priceRange.length - 1) {
        multipleChoices.push({
          name: `$${convertThousandSeperator(
            p,
          )} to <$${convertThousandSeperator(priceRange[i + 1])}`,
          odd: multipleChoicesState.options[i + 1].odd,
        });
      }
    });

    multipleChoices.push({
      name: `>= $${convertThousandSeperator(
        priceRange[priceRange.length - 1],
      )}`,
      odd: multipleChoicesState.options[priceRange.length]?.odd,
    });
    dispatch(
      updateHostPredictionStateAction({
        multipleChoices: {
          options: multipleChoices,
        },
      }),
    );
  }, [priceRange]);

  useEffect(() => {
    let error = false;
    const isUndefined = priceRange.findIndex((p) => !p);
    if (isUndefined >= 0) {
      error = true;
    } else {
      const rangeInNumber = priceRange.map((p) => Number(p));
      error = !isSorted(rangeInNumber);
    }
    let errorEndTime = !endTime;
    if (marketPriceType == MarketPriceType.VOLUME) {
      const endTimeDate = dayjs(endTime).startOf('day');
      const deadlineDate = dayjs(deadline).startOf('day');
      if (deadlineDate.isAfter(endTimeDate)) {
        errorEndTime = true;
      }
    } else {
      const deadlineOver = dayjs(deadline).add(2.5, 'hours');
      if (dayjs(deadlineOver).isAfter(endTime)) {
        errorEndTime = true;
      }
    }

    let errorInt = -1;
    if (marketPriceType == MarketPriceType.VOLUME) {
      errorInt = priceRange.findIndex((p) => !!p && !isInteger(Number(p)));
    }

    const isUserVsPools = predictionType != WhoTakeWith.USER_USER;
    const options = multipleChoicesState.options;
    const errorOdd = options.filter((o) => (isUserVsPools ? !o.odd : false));

    dispatch(
      updateHostPredictionStateAction({
        error: error || errorOdd.length > 0 || errorEndTime || errorInt >= 0,
      }),
    );
  }, [endTime, multipleChoicesState.options, priceRange]);

  const handleChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;
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
      const newOption: any = [...multipleChoicesState.options];
      newOption[+name[1]][name[0]] = newValue;
      dispatch(
        updateHostPredictionStateAction({
          multipleChoices: {
            options: newOption,
          },
        }),
      );
    },
    [dispatch, multipleChoicesState.options, marketPriceType],
  );

  const renderOdd = (i: number, odd: string) => {
    return (
      predictionType != WhoTakeWith.USER_USER && (
        <LabelInput
          label={`Odd ${i + 1}`}
          isAnnotate={true}
          titleAnnotate="Odds are the measure of how much an user can win vs. how much the user predict. If an option has odd of 1.9, it means he will receive 1.9 ETH for every 1 ETH invested, including the original predicted amount."
          className={clsx(classes.odd)}
          component={
            <Box className={classes.wrapperInput}>
              <CommonInput
                key={`odd-${i}`}
                name={`odd-${i}`}
                value={odd}
                onChange={handleChangeValue}
                className={classes.commonInput}
              />
            </Box>
          }
        />
      )
    );
  };

  useEffect(() => {
    if (marketPriceType == MarketPriceType.VOLUME && endTime) {
      dispatch(
        updateHostPredictionStateAction({
          endTime: dayjs(endTime)
            .startOf('day')
            .add(getTimeZoneInt(), 'hours')
            .toDate(),
        }),
      );
    }
  }, [marketPriceType]);

  useEffect(() => {
    if (!endTime) {
      dispatch(
        updateHostPredictionStateAction({
          endTime: dayjs(deadline).add(2.5, 'hours').toDate(),
        }),
      );
    }
  }, []);

  const helperText = useMemo(() => {
    if (!endTime) return '';
    if (marketPriceType == MarketPriceType.VOLUME) {
      const endTimeDate = dayjs(endTime).startOf('day');
      const deadlineDate = dayjs(deadline).startOf('day');
      if (deadlineDate.isAfter(endTimeDate)) {
        return 'EndDate must be after Deadline';
      }
    } else {
      const deadlineOver = dayjs(deadline).add(2.5, 'hours');
      if (dayjs(deadlineOver).isAfter(endTime)) {
        return 'EndDate must be after Deadline over 2.5 hours';
      }
    }
  }, [marketPriceType, endTime, deadline]);

  useEffect(() => {
    const time =
      marketPriceType == MarketPriceType.PRICE
        ? `${convertTime(endTime)} (${convertTimeUTC(endTime)})`
        : convertTimeUTC(endTime, 'DD/MM/YYYY UTC');

    dispatch(
      updateHostPredictionStateAction({
        shortDescription: `What is the ${marketPriceType} of ${coin?.name} on ${time}?`,
      }),
    );
  }, [marketPriceType, endTime]);

  const renderHelperText = useCallback(
    (id: number) => {
      if (marketPriceType == MarketPriceType.PRICE || !priceRange[id]) return;
      const isInt = isInteger(Number(priceRange[id]));
      return isInt ? '' : 'This field must be integer';
    },
    [marketPriceType, priceRange],
  );

  return (
    <ComponentWithTooltip
      title="Prediction Game"
      isAnnotate={true}
      titleAnnotate={renderAnnotateMarket()}
      className={classes.marginTop}
    >
      <Box className={classes.container}>
        <LabelInput
          label="Market type"
          component={
            <CommonRadioGroup
              values={Object.values([MarketType.MULTIPLE_CHOICES]).map((m) => {
                return {
                  value: m,
                };
              })}
              currentValue={optionalDetail}
              onChange={handleMarketChange}
              className={classes.radioOption}
            />
          }
        />
        <Box className={classes.main}>
          <Box className={classes.wrapperMarketPriceQuestion2}>
            <Box className={classes.wrapperMarketPriceQuestion}>
              <Typography>What is the</Typography>
              <CommonSelectInput
                values={renderPriceType}
                onChange={handleChangePriceType}
                currentValue={marketPriceType}
                className={classes.selectPriceType}
              />
              <Typography>of {coin?.name} on</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              {marketPriceType == MarketPriceType.VOLUME ? (
                <CommonDatePicker
                  value={endTime}
                  onChange={handleChangeEndTime}
                  className={classes.dateTime}
                  helperText={helperText}
                  minDate={deadline}
                  required
                  // minDate={dayjs(deadline).add(1, 'day').startOf('day').toDate()}
                />
              ) : (
                <CommonDateTimePicker
                  value={endTime}
                  onChange={handleChangeEndTime}
                  className={classes.dateTime}
                  helperText={helperText}
                  minDate={deadline}
                  required
                  // minDate={dayjs(deadline).add(2.5, 'hours').toDate()}
                />
              )}
              <Typography style={{ marginLeft: 8 }}>
                {marketPriceType == MarketPriceType.VOLUME
                  ? 'UTC'
                  : getTimeZone()}
              </Typography>
            </Box>
          </Box>
          <Typography className={classes.updateText}>
            The result will be updated by Chainlink on {renderEndTime}
          </Typography>
          <Typography className={classes.optionDetail}>
            Option Detail
          </Typography>
          <Box className={classes.wrapper}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className={classes.index}>{1}</Typography>
              <LabelInput
                label="Less than"
                className={classes.flex1}
                component={
                  <CommonInput
                    value={convertThousandSeperator(`$${priceRange[0]}`, true)}
                    name={'0'}
                    required
                    onChange={handleChangePriceRange}
                    className={classes.commonInput}
                    helperText={renderHelperText(0)}
                    error={!!renderHelperText(0)}
                  />
                }
              />
              {renderOdd(0, multipleChoicesState.options[0].odd)}
            </Box>
            {priceRangeWithoutEndItem.map((p, i) => (
              <Box
                key={i}
                display="flex"
                justifyContent="space-between"
                position="relative"
                alignItems="center"
              >
                <Typography className={classes.index}>{i + 2}</Typography>
                <Box className={classes.wrapperPriceRange}>
                  <LabelInput
                    label="Equal or greater"
                    component={
                      <CommonInput
                        value={convertThousandSeperator(`$${p}`, true)}
                        name={`${i}`}
                        required
                        onChange={handleChangePriceRange}
                        className={classes.commonInput}
                        helperText={renderHelperText(i)}
                        error={!!renderHelperText(i)}
                      />
                    }
                  />
                  <Divider />
                  <LabelInput
                    label="Less than"
                    component={
                      <CommonInput
                        value={convertThousandSeperator(
                          `$${priceRange[i + 1]}`,
                          true,
                        )}
                        name={`${i + 1}`}
                        required
                        onChange={handleChangePriceRange}
                        className={classes.commonInput}
                        helperText={renderHelperText(i + 1)}
                        error={!!renderHelperText(i + 1)}
                      />
                    }
                  />
                </Box>
                {renderOdd(i + 1, multipleChoicesState.options[i + 1]?.odd)}
                <Button
                  disableRipple
                  className={classes.clear}
                  onClick={() => onRemoveOption(i)}
                >
                  <CloseIcon color="#FFFFFF" />
                </Button>
              </Box>
            ))}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography className={classes.index}>
                {priceRange.length + 1}
              </Typography>
              <LabelInput
                label="Equal or greater"
                className={classes.flex1}
                component={
                  <CommonInput
                    value={convertThousandSeperator(
                      `$${priceRange[priceRange.length - 1]}`,
                      true,
                    )}
                    name={`${priceRange.length - 1}`}
                    required
                    onChange={handleChangePriceRange}
                    className={classes.commonInput}
                    helperText={renderHelperText(priceRange.length - 1)}
                    error={!!renderHelperText(priceRange.length - 1)}
                  />
                }
              />
              {renderOdd(
                priceRange.length,
                multipleChoicesState.options[priceRange.length]?.odd,
              )}
            </Box>
          </Box>
          <Button className={classes.addBtn} onClick={addNewOption}>
            <AddIcon color="#212121" />
            Add option
          </Button>
          <Typography className={classes.errorRange}>
            {renderErrorRange}
          </Typography>
        </Box>
      </Box>
    </ComponentWithTooltip>
  );
};

export default MarketPredictionProMultipleChoice;
