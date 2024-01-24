import { Box, Button, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import { BNB_TOKEN } from 'common';
import CommonStepper from 'components/common/CommonStepper';
import CustomDialog from 'components/dialog/CustomDialog';
import FailedDialog from 'components/dialog/FailedDialog';
import ProcessingDialog from 'components/dialog/ProcessingDialog';
import SuccessDialog from 'components/dialog/SuccessDialog';
import MarketInfoDataPro from 'components/HostPredictionV2/MarketInfoDataPro';
import DataSource from 'components/ProEventPrediction/DataSource';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { publishEvent } from 'store/actions/eventActions';
import {
  resetHostPredictionStateAction,
  updateHostPredictionStateAction,
} from 'store/actions/hostPredictionActions';
import { getAllTokensActionByJSON } from 'store/actions/tokensActions';
import {
  getFixtureSelected,
  getHostEventError,
  getHostPrediction,
  getUserState,
} from 'store/selectors';
import { MarketPriceType, MarketType, WhoTakeWith } from 'types/hostPrediction';
import { EDataSource, EKindOfEvent } from 'types/proEvent';
import EventInfo from './EventInfo';
import MarketInfo from './MarketInfo';
import Preview from './Preview';
import ProPreview from './ProPreview';
import SelectKindOfEvent from './SelectKindOfEvent';
import { useStyles } from './styles';

const HostPredictionV2 = () => {
  const classes = useStyles();
  const predictState = useSelector(getHostPrediction);
  const dispatch = useDispatch();
  const disabledConfirm = useSelector(getHostEventError);
  const { account, library } = useWeb3React();
  const history = useHistory();
  const userState = useSelector(getUserState);
  const fixture = useSelector(getFixtureSelected);

  const [isLoading, setIsLoading] = useState(false);

  const isUvPDataProvider = useMemo(() => {
    return (
      predictState.organizingMethod.eventType != WhoTakeWith.USER_USER &&
      predictState.dataSource == EDataSource.SPORT_DATA_PROVIDER
    );
  }, [predictState.organizingMethod.eventType, predictState.dataSource]);

  const renderMainComponent = useMemo(() => {
    switch (predictState.step) {
      case 0:
        return <SelectKindOfEvent />;
      case 1:
        if (predictState.kindOfEvent == EKindOfEvent.AFFILIATE) {
          return <EventInfo />;
        }
        return <DataSource />;
      case 2:
        if (predictState.kindOfEvent == EKindOfEvent.AFFILIATE) {
          return <MarketInfoDataPro />;
        }
        return <EventInfo />;
      case 3:
        return <MarketInfo />;
      case 4:
        if (isUvPDataProvider && predictState.categoryName == 'Sport') {
          return <ProPreview />;
        }
        return <Preview />;
    }
  }, [predictState.step, isUvPDataProvider, predictState.categoryName]);

  const renderButtonText = useMemo(() => {
    if (predictState.kindOfEvent != EKindOfEvent.AFFILIATE) {
      if (predictState.step == 2) {
        return 'Confirm Info';
      } else if (predictState.step == 3) {
        return 'Preview event';
      }
    }
    return 'Confirm Selections';
  }, [predictState.step, predictState.kindOfEvent]);

  const shouldAddStep = useMemo(() => {
    if (predictState.kindOfEvent == EKindOfEvent.AFFILIATE) {
      if (predictState.step < 2) {
        return true;
      }
      return false;
    }
    if (predictState.step < 4) {
      return true;
    }
    return false;
  }, [predictState.step]);

  const steps = useMemo(() => {
    if (predictState.kindOfEvent != EKindOfEvent.AFFILIATE)
      return [
        {
          id: 1,
          label: 'Data Source',
        },
        {
          id: 2,
          label: 'Event Info',
        },
        {
          id: 3,
          label: 'Market Info',
        },
        {
          id: 4,
          label: 'Preview Info',
        },
      ];
    return [
      {
        id: 1,
        label: 'Select Event',
      },
      {
        id: 2,
        label: 'Publish Event',
      },
    ];
  }, [predictState.kindOfEvent]);

  const onChangeStep = useCallback(
    (value: number) => {
      if (predictState.kindOfEvent != EKindOfEvent.AFFILIATE) {
        let updateEndTimePrice = {};
        if (predictState.step == 3 && value == 1) {
          // if (+userState.efunBalance < 2000) {
          //   dispatch(
          //     updateDialogStateAction({
          //       open: true,
          //       component: <InsufficientDialog />,
          //     }),
          //   );
          //   return;
          // }
          if (
            predictState.dataSource &&
            predictState.subcategoryName == 'Coin Price' &&
            predictState.marketPriceType == MarketPriceType.VOLUME
          ) {
            updateEndTimePrice = {
              endTime: dayjs(predictState.endTime).add(1, 'day').toDate(),
            };
          }
        }
        const shouldReset =
          (predictState.dataSource != predictState.preDataSource ||
            predictState.organizingMethod.preEventType !=
              predictState.organizingMethod.eventType) &&
          value == 1 &&
          predictState.step == 1;

        const reset = !shouldReset
          ? {}
          : ({
              eventName: '',
              deadline: null,
              endTime: null,
              thumbnailUrl: null,
              eventBanner: null,
              description: '',
              category: null,
              subcategory: null,
              competition: null,
              showOtherEvent: 'category',
              preShowOtherEvent: undefined,
              categoryName: undefined,
              subcategoryName: undefined,
              shouldInitProMarket: true,
              shouldInitFirstChoiceProMarket: true,
              marketType: MarketType.MULTIPLE_CHOICES,
              handicap: [
                {
                  name: '',
                  odd: '',
                  value: '',
                  isNotInit: undefined,
                },
                {
                  name: '',
                  odd: '',
                  value: '',
                  isNotInit: undefined,
                },
              ],
              homeDrawAway: [
                {
                  name: '',
                  odd: '',
                  isNotInit: undefined,
                },
                {
                  name: 'Draw',
                  odd: '',
                },
                {
                  name: '',
                  odd: '',
                  isNotInit: undefined,
                },
              ],
              fixture: undefined,
              search: '',
            } as any);
        const reset2 =
          value == 1 && predictState.step == 1
            ? {
                preDataSource: predictState.dataSource,
                organizingMethod: {
                  ...predictState.organizingMethod,
                  preEventType: predictState.organizingMethod.eventType,
                },
              }
            : {};
        dispatch(
          updateHostPredictionStateAction({
            step: predictState.step + value,
            ...reset2,
            ...reset,
            ...updateEndTimePrice,
          }),
        );
        return;
      }
      const reset3 =
        value == 1 && predictState.step == 0
          ? {
              dataSource: EDataSource.SPORT_DATA_PROVIDER,
              preDataSource: predictState.dataSource,
            }
          : {};
      dispatch(
        updateHostPredictionStateAction({
          step: predictState.step + value,
          organizingMethod: {
            eventType: WhoTakeWith.AFFILIATE,
            betting: [
              {
                token: BNB_TOKEN,
                liquidityPool: '0',
              },
            ],
          },
          ...reset3,
        }),
      );
    },
    [
      predictState.step,
      predictState.dataSource,
      predictState.preDataSource,
      userState.efunBalance,
      predictState.subcategoryName,
      predictState.marketPriceType,
      predictState.endTime,
      predictState.kindOfEvent,
      dispatch,
    ],
  );

  const renderTitle = useMemo(() => {
    if (predictState.step == 0) {
      return 'Select The Kind Of Event You Want To Host';
    }
    if (predictState.kindOfEvent == EKindOfEvent.P2P_PRIZE_POOL) {
      return 'Peer-to-peer & Prize';
    } else if (predictState.kindOfEvent == EKindOfEvent.USER_VS_POOL) {
      return 'User vs. Pool';
    }
  }, [predictState.step, predictState.kindOfEvent]);

  const shouldFillBackground = useMemo(() => {
    if (
      predictState.kindOfEvent == EKindOfEvent.AFFILIATE &&
      predictState.step != 0
    )
      return false;
    if (predictState.step < 2) return true;
    return false;
  }, [predictState.step, predictState.kindOfEvent]);

  const isConfirm = useMemo(() => {
    if (predictState.kindOfEvent != EKindOfEvent.AFFILIATE) {
      return predictState.step == 4;
    }
    return predictState.step == 2;
  }, [predictState.step, predictState.kindOfEvent]);

  const redirectToDetail = useCallback(
    (id: string) => {
      id ? history.push(`/detail-event/${id}`) : history.push('');
    },
    [history],
  );

  const callbackSuccess = useCallback(
    (id: string) => {
      setIsLoading(false);
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
    setIsLoading(false);
    dispatch(
      updateDialogStateAction({
        component: <FailedDialog />,
        open: true,
      }),
    );
  }, [dispatch]);

  const callbackWaitForBE = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        component: (
          <CustomDialog content="Please wait, the transaction is being validated." />
        ),
        open: true,
      }),
    );
  }, [dispatch]);

  const onPublishEvent = useCallback(() => {
    // if (+userState.efunBalance < 2000) {
    //   dispatch(
    //     updateDialogStateAction({
    //       open: true,
    //       component: <InsufficientDialog />,
    //     }),
    //   );
    //   return;
    // }
    setIsLoading(true);
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
        callbackWaitForBE,
      ),
    );
  }, [
    dispatch,
    account,
    library?.provider,
    userState.efunBalance,
    callbackSuccess,
    callbackError,
    predictState.dataSource,
    predictState.organizingMethod.eventType,
  ]);

  const isUvPDataProviderError = useMemo(() => {
    const marketType = predictState.marketType;
    return (
      predictState.step == 3 &&
      isUvPDataProvider &&
      predictState.categoryName == 'Sport' &&
      marketType != MarketType.HANDICAP &&
      marketType != MarketType.HOME_DRAW_AWAY &&
      marketType != MarketType.OVER_UNDER
    );
  }, [
    isUvPDataProvider,
    predictState.marketType,
    predictState.step,
    predictState.categoryName,
  ]);

  const disableNextStep = useMemo(() => {
    if (
      predictState.step == 2 &&
      isUvPDataProvider &&
      predictState.categoryName == 'Sport'
    ) {
      return true;
    }
    return disabledConfirm || isUvPDataProviderError;
  }, [
    predictState.step,
    disabledConfirm,
    isUvPDataProviderError,
    isUvPDataProvider,
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [predictState.step]);

  useEffect(() => {
    dispatch(getAllTokensActionByJSON());
    return () => {
      dispatch(resetHostPredictionStateAction());
    };
  }, []);

  const disableAffiliate = useMemo(() => {
    if (predictState.kindOfEvent != EKindOfEvent.AFFILIATE) return false;
    const marketType = predictState.marketType;
    return (
      marketType != MarketType.HANDICAP &&
      marketType != MarketType.HOME_DRAW_AWAY &&
      marketType != MarketType.OVER_UNDER
    );
  }, [predictState.marketType, predictState.kindOfEvent]);

  return (
    <Box className={classes.container}>
      <Box
        className={clsx(
          { [classes.shouldFillBackground]: shouldFillBackground },
          classes.container1,
        )}
      >
        <Typography className={classes.title}>{renderTitle}</Typography>
        {predictState.step != 0 && (
          <CommonStepper
            steps={steps}
            activeStep={predictState.step}
            className={clsx({
              [classes.step]:
                predictState.kindOfEvent != EKindOfEvent.AFFILIATE,
              [classes.stepAffiliate]:
                predictState.kindOfEvent == EKindOfEvent.AFFILIATE,
            })}
          />
        )}
        {renderMainComponent}
        {shouldAddStep && (
          <Button
            className={classes.confirm}
            disabled={disableNextStep}
            onClick={() => onChangeStep(1)}
          >
            {renderButtonText}
          </Button>
        )}
        {isConfirm && (
          <Button
            className={classes.confirm}
            onClick={onPublishEvent}
            disabled={isLoading || disableAffiliate}
          >
            Publish event
          </Button>
        )}
        {predictState.step > 0 && (
          <Button className={classes.back} onClick={() => onChangeStep(-1)}>
            BACK
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default HostPredictionV2;
