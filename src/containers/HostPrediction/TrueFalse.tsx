import React, { useCallback, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAnswerType,
  getEventType,
  getQuestion,
  getTrueFalse,
} from 'store/selectors';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import LabelInput from 'components/HostPrediction/LabelInput';
import clsx from 'clsx';
import { useStyles } from './GroupPredictDetailStyles';
import CommonInput from 'components/common/CommonInput';
import { AnswerType, WhoTakeWith } from 'types/hostPrediction';
import { isStringNumber } from 'helpers';
import CommonUploadFileCropImage from 'components/common/CommonUploadFileCropImage';

const TrueFalse = () => {
  const question = useSelector(getQuestion);
  const dispatch = useDispatch();
  const trueFalse = useSelector(getTrueFalse);
  const predictionType = useSelector(getEventType);
  const classes = useStyles();
  const answerType = useSelector(getAnswerType);

  const handleChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;
      const name = event.target.name.split('-');
      // if (newValue.length > 30) return;
      if (name[0] == 'odd') {
        if (
          !isStringNumber(newValue) ||
          (newValue && (newValue == '.' || newValue == ',' || +newValue < 1))
        ) {
          return;
        }
        newValue = newValue.replace(',', '.');
      }
      const newOption: any = [...trueFalse.options];
      newOption[+name[1]][name[0]] = newValue;
      dispatch(
        updateHostPredictionStateAction({
          trueFalse: {
            options: newOption,
          },
        }),
      );
    },
    [dispatch, trueFalse.options],
  );

  useEffect(() => {
    const isUserVsPools = predictionType != WhoTakeWith.USER_USER;
    const options = trueFalse.options;
    const error = options.filter(
      (o) => !o.name || (isUserVsPools ? !o.odd : false),
    );
    dispatch(
      updateHostPredictionStateAction({
        error: error.length > 0 || !question,
      }),
    );
  }, [predictionType, trueFalse.options, question]);

  const onChangeOptionImage = useCallback(
    (file: File) => {
      const newOption: any = [...trueFalse.options];
      newOption[file.name].image = file;
      dispatch(
        updateHostPredictionStateAction({
          trueFalse: {
            options: newOption,
          },
        }),
      );
    },
    [dispatch, trueFalse],
  );

  const onDeleteImage = useCallback(
    (index: number) => {
      const newOption: any = [...trueFalse.options];
      newOption[index].image = undefined;
      dispatch(
        updateHostPredictionStateAction({
          trueFalse: {
            options: newOption,
          },
        }),
      );
    },
    [dispatch, trueFalse],
  );

  return (
    <Box>
      <Box className={clsx(classes.wrapper, classes.wrapperMultiple)}>
        <Box width="100%">
          {trueFalse.options.map((o, i) => (
            <Box key={i}>
              {answerType == AnswerType.WITH_PHOTOS && (
                <LabelInput
                  label={`Option Photo ${i + 1} (128x100)`}
                  className={classes.wrapperImage}
                  component={
                    <CommonUploadFileCropImage
                      onDeleteImage={() => onDeleteImage(i)}
                      name={`${i}`}
                      file={o.image ? URL.createObjectURL(o.image) : undefined}
                      onChange={onChangeOptionImage}
                      className={classes.img}
                    />
                  }
                />
              )}
              <Box className={classes.wrapperInput}>
                <LabelInput
                  label={`Option Name ${i + 1}`}
                  className={classes.wrapperLabel}
                  component={
                    <CommonInput
                      key={`name-${i}`}
                      name={`name-${i}`}
                      value={o.name}
                      onChange={handleChangeValue}
                      disabled
                      className={classes.commonInput}
                    />
                  }
                />
                {predictionType != WhoTakeWith.USER_USER && (
                  <LabelInput
                    label={`Odd ${i + 1}`}
                    isAnnotate={true}
                    titleAnnotate="Odds are the measure of how much an user can win vs. how much the user predict. If an option has odd of 1.9, it means he will receive 1.9 ETH for every 1 ETH invested, including the original predicted amount."
                    className={clsx(classes.odd, classes.italic)}
                    component={
                      <CommonInput
                        key={`odd-${i}`}
                        name={`odd-${i}`}
                        value={o.odd || ''}
                        onChange={handleChangeValue}
                        className={classes.commonInput}
                      />
                    }
                  />
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TrueFalse;
