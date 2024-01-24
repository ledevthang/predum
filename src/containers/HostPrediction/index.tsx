import React from 'react';
import { Box, Button, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import CommonStepper from 'components/common/CommonStepper';
import FailedDialog from 'components/dialog/FailedDialog';
import ProcessingDialog from 'components/dialog/ProcessingDialog';
import SuccessDialog from 'components/dialog/SuccessDialog';
import DataSource from 'components/ProEventPrediction/DataSource';
import SelectCategory from 'components/ProEventPrediction/SelectCategory';
import SelectEvent from 'components/ProEventPrediction/SelectEvent';
import SelectIdentity from 'components/ProEventPrediction/SelectIdentity';
import SelectMarketProEvent from 'components/ProEventPrediction/SelectMarketProEvent';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { publishEvent } from 'store/actions/eventActions';
import {
  resetHostPredictionStateAction,
  updateHostPredictionStateAction,
} from 'store/actions/hostPredictionActions';
import { getHostEventError, getHostPrediction } from 'store/selectors';
import { EProEventIdentity } from 'types/proEvent';
import EventDetail from './EventDetail';
import EventReview from './EventReview';
import OptionalDetail from './OptionalDetail';
import Review from './Review';
import { useStyles } from './styles';
import ReviewInfluencer from 'components/ProEventPrediction/ReviewInfluencer';

const HostPrediction = () => {
  const classes = useStyles();
  const predictState = useSelector(getHostPrediction);
  const disabledConfirm = useSelector(getHostEventError);
  const dispatch = useDispatch();
  const history = useHistory();
  const { account, library } = useWeb3React();

  useEffect(() => {
    dispatch(resetHostPredictionStateAction());
  }, [history]);

  const renderMainComponent = useMemo(() => {
    switch (predictState.step) {
      case 1:
        return <SelectIdentity />;
      case 2:
        return <DataSource />;
      case 3:
        return <SelectCategory />;
      case 4:
        if (predictState.identity == EProEventIdentity.INFLUENCER) {
          return <SelectEvent />;
        }
        return <EventDetail />;
      case 5:
        if (predictState.identity == EProEventIdentity.INFLUENCER) {
          return <SelectMarketProEvent />;
        }
        return <OptionalDetail />;
      case 6:
        return <Review />;
    }
  }, [predictState.step, predictState.identity]);

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
      if (predictState.step == 6 && value == 1) {
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
        updateHostPredictionStateAction({
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

  const renderButtonText = useMemo(() => {
    switch (predictState.step) {
      case 1:
      case 2:
      case 3:
        return 'Confirm selection';
      case 4:
        if (predictState.identity == EProEventIdentity.INFLUENCER) {
          return 'Confirm selection';
        } else {
          return 'Confirm details';
        }
      case 5:
        if (predictState.identity == EProEventIdentity.INFLUENCER) {
          return 'Confirm selection';
        } else {
          return 'Confirm details';
        }
      case 6:
        return 'Publish event';
    }
  }, [predictState.step, predictState.identity]);

  const renderTitle = useMemo(() => {
    switch (predictState.step) {
      case 1:
        return 'Select your identity';
      case 2:
        return 'Select Your Data Source';
      case 3:
        return 'Select Predict Category';
      case 4:
        if (predictState.identity != EProEventIdentity.INFLUENCER)
          return 'Enter Event Detail';
        return 'Select Event';
      case 5:
        if (predictState.identity != EProEventIdentity.INFLUENCER)
          return 'Create Market';
        return 'Select Market';
      case 6:
        return 'Publish event';
    }
  }, [predictState.step, predictState.identity]);

  const renderReviewComponent = useMemo(() => {
    if (predictState.identity == EProEventIdentity.INFLUENCER) {
      return <ReviewInfluencer shouldEditBanner />;
    }
    return <EventReview />;
  }, [predictState.identity]);

  const steps = useMemo(() => {
    const isInfluencer = predictState.identity == EProEventIdentity.INFLUENCER;
    return [
      {
        id: 1,
        label: 'Identity',
      },
      {
        id: 2,
        label: 'Data Source',
      },
      {
        id: 3,
        label: 'Select Category',
      },
      {
        id: 4,
        label: isInfluencer ? 'Select Event' : 'Event Detail',
      },
      {
        id: 5,
        label: isInfluencer ? 'Select Market' : 'Create Market',
      },
      {
        id: 6,
        label: 'Review',
      },
    ];
  }, [predictState.identity]);

  return (
    <Box className={classes.container1}>
      <Box className={clsx(classes.container)}>
        <Typography className={classes.textHead}>{renderTitle}</Typography>
        <CommonStepper
          steps={steps}
          activeStep={predictState.step}
          className={classes.step}
        />
        {renderMainComponent}
        {predictState.step != 6 && (
          <Button
            className={classes.confirm}
            disabled={disabledConfirm}
            onClick={() => onChangeStep(1)}
          >
            {renderButtonText}
          </Button>
        )}
        {predictState.step != 1 && predictState.step != 6 && (
          <Button className={classes.back} onClick={() => onChangeStep(-1)}>
            BACK
          </Button>
        )}
      </Box>
      {predictState.step == 6 && renderReviewComponent}
      {predictState.step == 6 && (
        <Typography className={classes.description}>
          {predictState.description}
        </Typography>
      )}
      {predictState.step == 6 && (
        <Box className={classes.wrapperBtnStep3}>
          <Button
            className={classes.confirm}
            disabled={disabledConfirm}
            onClick={() => onChangeStep(1)}
          >
            {renderButtonText}
          </Button>
          <Button className={classes.back} onClick={() => onChangeStep(-1)}>
            BACK
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default HostPrediction;
