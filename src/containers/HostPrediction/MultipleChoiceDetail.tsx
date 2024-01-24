import { Box, Button } from '@material-ui/core';
import clsx from 'clsx';
import CommonInput from 'components/common/CommonInput';
import CommonUploadFileCropImage from 'components/common/CommonUploadFileCropImage';
import LabelInput from 'components/HostPrediction/LabelInput';
import { isStringNumber } from 'helpers';
import AddIcon from 'icon/AddIcon';
import CloseIcon from 'icon/CloseIcon';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import {
  getAnswerType,
  getEventType,
  getMultipleChoiceState,
  getQuestion,
} from 'store/selectors';
import { AnswerType, WhoTakeWith } from 'types/hostPrediction';
import { useStyles } from './GroupPredictDetailStyles';

const MultipleChoiceDetail = () => {
  const classes = useStyles();
  const multipleChoice = useSelector(getMultipleChoiceState);
  const predictionType = useSelector(getEventType);
  const question = useSelector(getQuestion);
  const dispatch = useDispatch();
  const answerType = useSelector(getAnswerType);

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
      const newOption: any = [...multipleChoice.options];
      newOption[+name[1]][name[0]] = newValue;
      dispatch(
        updateHostPredictionStateAction({
          multipleChoices: {
            options: newOption,
          },
        }),
      );
    },
    [dispatch, multipleChoice.options],
  );

  const addNewOption = useCallback(() => {
    const newOption = [...multipleChoice.options];
    newOption.push({
      name: '',
      odd: '',
    });
    dispatch(
      updateHostPredictionStateAction({
        multipleChoices: {
          options: newOption,
        },
      }),
    );
  }, [multipleChoice.options, dispatch]);

  const onRemoveOption = useCallback(
    (index: number) => {
      const newOptions = [...multipleChoice.options];
      newOptions.splice(index, 1);
      dispatch(
        updateHostPredictionStateAction({
          multipleChoices: {
            options: newOptions,
          },
        }),
      );
    },
    [dispatch, multipleChoice],
  );

  useEffect(() => {
    const isUserVsPools = predictionType != WhoTakeWith.USER_USER;
    const options = multipleChoice.options;
    const error = options.filter(
      (o) => !o.name || (isUserVsPools ? !o.odd : false),
    );
    dispatch(
      updateHostPredictionStateAction({
        error: error.length > 0 || !question,
      }),
    );
  }, [predictionType, multipleChoice.options, question]);

  const onChangeOptionImage = useCallback(
    (file: File) => {
      const newOption: any = [...multipleChoice.options];
      newOption[file.name].image = file;
      dispatch(
        updateHostPredictionStateAction({
          multipleChoices: {
            options: newOption,
          },
        }),
      );
    },
    [dispatch, multipleChoice],
  );

  const onDeleteImage = useCallback(
    (index: number) => {
      const newOption: any = [...multipleChoice.options];
      newOption[index].image = undefined;
      dispatch(
        updateHostPredictionStateAction({
          multipleChoices: {
            options: newOption,
          },
        }),
      );
    },
    [dispatch, multipleChoice],
  );

  return (
    <Box>
      <Box className={clsx(classes.wrapper, classes.wrapperMultiple)}>
        <Box width="100%">
          {multipleChoice.options.map((o, i) => (
            <Box key={i} width="100%">
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
                      <Box className={classes.wrapperInput}>
                        <CommonInput
                          key={`odd-${i}`}
                          name={`odd-${i}`}
                          value={o.odd || ''}
                          onChange={handleChangeValue}
                          className={classes.commonInput}
                        />
                      </Box>
                    }
                  />
                )}
                {i > 1 && (
                  <Button
                    disableRipple
                    className={classes.clear}
                    onClick={() => onRemoveOption(i)}
                  >
                    <CloseIcon color="#FFFFFF" />
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Button className={classes.addBtn} onClick={addNewOption}>
        <AddIcon color="#212121" />
        Add option
      </Button>
    </Box>
  );
};

export default MultipleChoiceDetail;
