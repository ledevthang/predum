import { Box, Button, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import CommonStepper from 'components/common/CommonStepper';
import FailedDialog from 'components/dialog/FailedDialog';
import ProcessingDialog from 'components/dialog/ProcessingDialog';
import SuccessDialog from 'components/dialog/SuccessDialog';
import SelectIdentity from 'components/ProEventPrediction/SelectIdentity';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { publishEvent } from 'store/actions/eventActions';
import {
  resetProEventPredictionStateAction,
  updateProEventPredictionStateAction,
} from 'store/actions/proEventPredictionActions';
import { getProEventPredictionState } from 'store/selectors';
import { useStyles } from './styles';
import React from 'react';

const CreateProEvent = () => {
  const classes = useStyles();
  const predictState = useSelector(getProEventPredictionState);
  const dispatch = useDispatch();
  const history = useHistory();
  const { account, library } = useWeb3React();

  useEffect(() => {
    dispatch(resetProEventPredictionStateAction());
  }, [history]);

  const renderMainComponent = useMemo(() => {
    switch (predictState.step) {
      case 1:
        return <SelectIdentity />;
    }
  }, [predictState.step]);

  const redirectToDetail = useCallback(
    (id: string) => {
      history.push(`/detail-event/${id}`);
    },
    [history],
  );

  const callbackSuccess = useCallback(
    (id: string) => {
      dispatch(
        updateDialogStateAction({
          component: <SuccessDialog id={id} />,
          open: true,
          callback: () => redirectToDetail(id),
        }),
      );
    },
    [dispatch, redirectToDetail],
  );

  const callbackError = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        component: <FailedDialog />,
        open: true,
      }),
    );
  }, [dispatch]);

  const onChangeStep = useCallback(
    (value: number) => {
      if (predictState.step == 5 && value == 1) {
        dispatch(
          updateDialogStateAction({
            open: true,
            component: <ProcessingDialog />,
          }),
        );
        dispatch(
          publishEvent(
            account || '',
            library?.provider,
            callbackSuccess,
            callbackError,
          ),
        );
        return;
      }
      dispatch(
        updateProEventPredictionStateAction({
          step: predictState.step + value,
        }),
      );
    },
    [
      predictState.step,
      dispatch,
      callbackSuccess,
      callbackError,
      account,
      library?.provider,
    ],
  );

  const disabledConfirm = useMemo(() => {
    return false;
  }, []);

  const renderButtonText = useMemo(() => {
    switch (predictState.step) {
      case 1:
        return 'Confirm event details';
      case 2:
        return 'Confirm Selections';
      case 3:
        return 'Confirm options details';
      case 4:
        return 'Publish event';
    }
  }, [predictState.step]);

  return (
    <Box className={classes.container1}>
      <Box className={clsx(classes.container)}>
        <>
          <Typography className={classes.textHead}>
            Host a Custom Prediction
          </Typography>
          <CommonStepper
            steps={steps}
            activeStep={predictState.step}
            className={classes.step}
          />
          {renderMainComponent}
          {predictState.step != 5 && (
            <Button
              className={classes.confirm}
              disabled={disabledConfirm}
              onClick={() => onChangeStep(1)}
            >
              {renderButtonText}
            </Button>
          )}
          <Button className={classes.back} onClick={() => onChangeStep(-1)}>
            BACK
          </Button>
        </>
      </Box>
    </Box>
  );
};

export default CreateProEvent;

const steps = [
  {
    id: 1,
    label: 'Identity',
  },
  {
    id: 2,
    label: 'Data source ',
  },
  {
    id: 3,
    label: 'Select category',
  },
  {
    id: 4,
    label: 'Select market',
  },
  {
    id: 4,
    label: 'Review',
  },
];
