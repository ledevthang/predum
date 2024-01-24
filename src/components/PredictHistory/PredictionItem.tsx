import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Decimal from 'decimal.js';
import React from 'react';
import { memo, useCallback, useMemo, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Web3 from 'web3';

import CommonTooltip from 'components/common/CommonTooltip';
import LoadingButton from 'components/common/LoadingButton';
import RenderIConByCategory from 'components/common/RenderIConByCategory';
import TooltipTypography from 'components/common/TooltipTypography';
import ClaimAmountFailed from 'components/dialog/ClaimAmountFailed';
import ClaimAmountSuccess from 'components/dialog/ClaimAmountSuccess';
import ReportDialog from 'components/dialog/ReportDialog';
import OptionItem from 'components/Event/OptionItem';
import ResultByChainLink from 'components/Event/ResultByChainLink';
import PredictedDialog from 'containers/SharePredict/PredictedDialog';
import {
  convertThousandSeperator,
  convertTime,
  convertWeiToToken,
  renderShortAddress,
} from 'helpers';
import { usePlatformFee } from 'hooks/usePlatformFee';
import DangerIcon from 'icon/DangerIcon';
import InfoIcon from 'icon/InfoIcon';
import ShareIcon from 'icon/ShareIcon';
import ShiedTickIcon from 'icon/SheildTickIcon';
import WarningIcon from 'icon/WariningIcon';
import { predictionABI } from 'services/contract';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { getPredictionById } from 'store/selectors';
import { AnswerType, MarketType, WhoTakeWith } from 'types/hostPrediction';
import { PredictStatus } from 'types/prediction';

import { useStyles } from './PredictionItemStyles';

interface IProps {
  predictionId: number;
}

const PredictionItem = ({ predictionId }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const prediction: any =
    useSelector(
      (store) => getPredictionById(store, predictionId),
      shallowEqual,
    ) || {};
  const classes = useStyles();
  const { library, account } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { uvpPlatformFee: UVP_PLATFORM_FEE, uvuPlatformFee: P2P_PLATFORM_FEE } =
    usePlatformFee();

  const isInfluencer = false;

  const renderOption = useMemo(() => {
    const options = JSON.parse(prediction.options || '{}');
    return options[prediction.optionIndex];
  }, [prediction.options, prediction.optionIndex]);

  const renderOdd = useMemo(() => {
    const odds = JSON.parse(prediction.odds || '{}');
    return new Decimal(odds[prediction.optionIndex]).div(10000).toString();
  }, [prediction, prediction.odds, prediction.optionIndex]);

  const renderTextButton = useMemo(() => {
    switch (prediction.status) {
      case PredictStatus.CLAIM:
        return 'CLAIM';
      case PredictStatus.CLAIMED:
      case PredictStatus.CLAIMED_CASH_BACK:
        return 'CLAIMED';
      case PredictStatus.LOST:
        return 'LOST';
      case PredictStatus.PREDICTED:
        return 'PREDICTED';
      case PredictStatus.CLAIM_CASH_BACK:
        return 'CLAIM CASH BACK';
    }
  }, [prediction.status]);

  const renderButtonClassName = useMemo(() => {
    switch (prediction.status) {
      case PredictStatus.CLAIM:
      case PredictStatus.CLAIM_CASH_BACK:
        return classes.available;
      case PredictStatus.CLAIMED:
      case PredictStatus.CLAIMED_CASH_BACK:
        return classes.finished;
      case PredictStatus.LOST:
        return classes.invalid;
      case PredictStatus.PREDICTED:
        return classes.pending;
    }
  }, [prediction.status]);

  const onClaimReward = useCallback(async () => {
    setIsLoading(true);
    const web3 = new Web3(library?.provider || window.ethereum);
    const contract = new web3.eth.Contract(
      predictionABI as any,
      process.env.REACT_APP_PREDICTION,
    );
    try {
      const res =
        prediction.status == PredictStatus.CLAIM
          ? await contract.methods
              .claimReward(
                prediction.eventId,
                prediction.token,
                prediction.predictNum,
              )
              .send({
                from: account,
                // gasPrice: web3.utils.toWei('0.1', 'gwei'),
              })
          : await contract.methods
              .claimCashBack(
                prediction.eventId,
                prediction.token,
                prediction.predictNum,
              )
              .send({
                from: account,
                // gasPrice: web3.utils.toWei('0.1', 'gwei'),
              });
      setTimeout(() => {
        prediction.status == PredictStatus.CLAIM
          ? dispatch(
              updateDialogStateAction({
                open: true,
                component: (
                  <PredictedDialog
                    eventId={prediction.eventId}
                    predictDetail={prediction}
                  />
                ),
              }),
            )
          : dispatch(
              updateDialogStateAction({
                open: true,
                component: (
                  <ClaimAmountSuccess
                    id={prediction.id}
                    callback={() => {
                      setIsLoading(false);
                    }}
                  />
                ),
              }),
            );
        prediction.status = PredictStatus.CLAIMED;
        setIsLoading(false);
      }, 6000);
    } catch (e) {
      setIsLoading(false);
      dispatch(
        updateDialogStateAction({
          open: true,
          component: <ClaimAmountFailed />,
        }),
      );
    }
  }, [library?.provider, prediction, dispatch, account]);

  const renderUnit = useMemo(() => {
    if (prediction.token == process.env.REACT_APP_PRT_TOKEN) return 'LINK';
    return 'ETH';
  }, [prediction.token]);

  const renderAmount = useMemo(() => {
    const { eventType } = JSON.parse(prediction.metadata) as {
      eventType: WhoTakeWith;
    };
    const amount = convertWeiToToken(prediction.amount);
    const result =
      eventType == WhoTakeWith.USER_USER
        ? amount
        : new Decimal(amount).div(1 - UVP_PLATFORM_FEE).toString();
    return result;
  }, [library, prediction.amount, prediction.metadata, UVP_PLATFORM_FEE]);

  const renderSponsor = useMemo(() => {
    return convertWeiToToken(prediction.sponsor || '0', 5);
  }, [library, prediction.sponsor]);

  const renderReward = useMemo(() => {
    if (prediction.status == PredictStatus.LOST) return '';
    const { eventType } = JSON.parse(prediction.metadata) as {
      eventType: WhoTakeWith;
    };
    const reward = new Decimal(
      convertWeiToToken(prediction.estimateReward || '0', 5),
    ).toNumber();
    const prize = `+ ${convertThousandSeperator(
      renderSponsor,
    )} ${renderUnit} PRIZE`;
    const rewardWithoutSponsor =
      eventType == WhoTakeWith.USER_USER
        ? convertThousandSeperator(
            new Decimal(
              new Decimal(reward).minus(renderSponsor).minus(renderAmount),
            )
              .mul(1 - P2P_PLATFORM_FEE - prediction.hostFee / 10000)
              .add(renderAmount)
              .toNumber(),
          )
        : convertThousandSeperator(reward);
    if (prediction.status == PredictStatus.CLAIM) {
      if (eventType === WhoTakeWith.USER_USER) {
        if (reward < +renderAmount) {
          return `${reward} ${renderUnit}`;
        }
        return `${rewardWithoutSponsor} ${renderUnit} ${
          +renderSponsor ? prize : ''
        }`;
      }
      return `${rewardWithoutSponsor} ${renderUnit}`;
    }
    if (prediction.status == PredictStatus.PREDICTED) {
      if (eventType === WhoTakeWith.USER_USER) {
        return `Potential Winning ${rewardWithoutSponsor} ${renderUnit} ${
          +renderSponsor ? prize : ''
        }`;
      }
      return `Potential Winning ${rewardWithoutSponsor} ${renderUnit}`;
    }
    if (
      prediction.status == PredictStatus.CLAIM_CASH_BACK ||
      prediction.status == PredictStatus.CLAIMED_CASH_BACK
    ) {
      return `${renderAmount} ${renderUnit}`;
    }
    if (eventType === WhoTakeWith.USER_USER) {
      if (reward < +renderAmount) {
        return `${reward} ${renderUnit}`;
      }
      return `${rewardWithoutSponsor} ${renderUnit} ${
        +renderSponsor ? prize : ''
      }`;
    } else {
      return `${rewardWithoutSponsor} ${renderUnit}`;
    }
  }, [
    library,
    prediction.estimateReward,
    prediction.rewardAmount,
    prediction.status,
    prediction.id,
    renderUnit,
    renderSponsor,
    renderAmount,
    P2P_PLATFORM_FEE,
    UVP_PLATFORM_FEE,
  ]);

  const isUserVsPool = useMemo(() => {
    const { eventType } = JSON.parse(prediction.metadata) as {
      eventType: WhoTakeWith;
    };
    return eventType != WhoTakeWith.USER_USER;
  }, [prediction.metadata]);

  const renderHandicapIfNeed = useMemo(() => {
    const { handicap } = JSON.parse(prediction.metadata) as {
      handicap: string[];
    };
    if (!handicap) return;
    const handicapIndex = prediction.optionIndex == 0 ? 0 : 1;
    const optionOther = handicapIndex == 0 ? 1 : 0;
    const value = new Decimal(+handicap[handicapIndex])
      .minus(+handicap[optionOther])
      .toNumber();
    return `(${value})`;
  }, [prediction]);
  const getShowShare = () => {
    let x =
      prediction.status != PredictStatus.LOST &&
      prediction.status != PredictStatus.CLAIM_CASH_BACK &&
      prediction.status != PredictStatus.CLAIMED_CASH_BACK;

    let y = disabledClaimButton && renderTextButton == 'CLAIM';
    return x && !y;
  };
  const renderHostBy = useMemo(() => {
    return (
      <Box className={classes.hostBy}>
        {prediction.isUserVerified ? <ShiedTickIcon /> : <WarningIcon />}
        <Typography
          style={{
            fontSize: 14,
          }}
        >
          Hosted by{' '}
          {prediction?.nickname
            ? prediction.nickname
            : renderShortAddress(prediction.address, 4, 4)}
        </Typography>
      </Box>
    );
  }, [prediction.address, prediction.isUserVerified]);

  const renderProvider = useMemo(() => {
    if (isInfluencer) {
      return (
        <Box className={classes.hostBy}>
          <ShiedTickIcon />
          <Typography
            style={{
              fontSize: 14,
            }}
          >
            {'Odds provided by Odd & results provided by user'}
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box display="flex" mt={0.5}>
          {/* <Box className={classes.hostBy}>
            <WarningIcon />
            <Typography className={classes.warningText}>
              {'Odds provided by user'}
            </Typography>
          </Box> */}
          <Box className={clsx(classes.hostBy, classes.providerWarning)}>
            <WarningIcon />
            <Typography
              className={classes.warningText}
              style={{
                fontSize: 14,
              }}
            >
              {'Result provided by host'}
            </Typography>
          </Box>
        </Box>
      );
    }
  }, [isInfluencer]);

  const renderInfo = useMemo(() => {
    if (isInfluencer || prediction.eventStatus != 'FINISH') return;
    let reportStatus = '';
    const date = dayjs(prediction.eventClaimTime);
    const dateToMilliSecond = date.valueOf();
    const dateFormat = convertTime(date.toDate());
    const now = Date.now();
    if (now <= dateToMilliSecond && !prediction.reportContents.length) {
      reportStatus = `Result will be finalized on ${dateFormat}`;
    } else if (now > dateToMilliSecond && !prediction.reportContents.length) {
      reportStatus = 'Result was finalized';
    } else if (now <= dateToMilliSecond && prediction.reportContents.length) {
      reportStatus = `On-going dispute. Result will be updated on ${dateFormat}`;
    } else if (now > dateToMilliSecond && prediction.reportContents.length) {
      reportStatus = 'Dispute resolved';
    }
    return (
      <Box className={classes.wrapperInfo}>
        <Typography>{reportStatus}</Typography>
        {prediction.pro == 0 && (
          <CommonTooltip title="Within 48 hours after host confirms result, you get to report if the result is incorrect before it’s finalized. The Predum team will look into and resolve the reported result.">
            <InfoIcon />
          </CommonTooltip>
        )}
      </Box>
    );
  }, [isInfluencer, prediction]);

  const onOpenReportDialog = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: true,
        component: <ReportDialog predictionId={prediction.id} />,
      }),
    );
  }, [dispatch, prediction.id]);

  const disableReport = useMemo(() => {
    const date = dayjs(prediction.eventClaimTime);
    const dateToMilliSecond = date.valueOf();
    return (
      prediction.eventStatus != 'FINISH' ||
      Date.now() > dateToMilliSecond ||
      !!prediction.reportContent
    );
  }, [
    prediction.eventStatus,
    prediction.eventClaimTime,
    prediction.reportContent,
  ]);

  const disabledClaimButton = useMemo(() => {
    const date = dayjs(prediction.eventClaimTime);
    const dateToMilliSecond = date.valueOf();
    return (
      (prediction.status != PredictStatus.CLAIM &&
        prediction.status != PredictStatus.CLAIM_CASH_BACK) ||
      isLoading ||
      Date.now() <= dateToMilliSecond
    );
  }, [isLoading, prediction.status, prediction.eventClaimTime]);

  const getImage = useMemo(() => {
    const metadata = JSON.parse(prediction.metadata || '{}');
    const images = metadata.images || {};
    if (prediction.pro != 0) {
      if (
        prediction?.metadata &&
        JSON.parse(prediction?.metadata) &&
        JSON.parse(prediction?.metadata).fixtureMeta
      ) {
        let fixtureMeta = JSON.parse(prediction?.metadata).fixtureMeta;
        let teamsMeta = JSON.parse(fixtureMeta).teams;
        if (prediction.marketType == MarketType.HANDICAP) {
          if (!images[0]) {
            images[0] = teamsMeta.home.logo;
          }
          if (!images[4]) {
            images[4] = teamsMeta.away.logo;
          }
        } else if (prediction.marketType == MarketType.HOME_DRAW_AWAY) {
          if (!images[0]) {
            images[0] = teamsMeta.home.logo;
          }
          if (!images[2]) {
            images[2] = teamsMeta.away.logo;
          }
        }
      }
    }
    return images[prediction.optionIndex];
  }, [prediction.metadata, prediction.optionIndex]);

  const getPercentage = useMemo(() => {
    return prediction.predictionTokenOptionAmounts?.[prediction.token]?.[
      prediction.optionIndex
    ];
  }, [prediction.optionIndex, prediction.token]);

  const getAnswerType = useMemo(() => {
    const metadata = JSON.parse(prediction.metadata || '{}');
    return metadata.answerType;
  }, [prediction.metadata]);

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Box className={classes.wrapper}>
          <Box className={classes.time}>
            <Typography>Time:</Typography>
            <Typography>{`${convertTime(prediction.createdAt)}`}</Typography>
          </Box>
          <Box className={classes.transaction}>
            <Typography>Transaction:</Typography>
            <Link
              target="_blank"
              to={{
                pathname:
                  process.env.REACT_APP_NODE_ENV == 'production'
                    ? `https://arbiscan.io/tx/${prediction.transactionNumber}`
                    : `https://goerli.arbiscan.io/tx/${prediction.transactionNumber}`,
              }}
            >
              {prediction.blockNumber}
            </Link>
          </Box>
          <Box className={classes.category}>
            <RenderIConByCategory
              category={prediction.subCategory}
              color="#BDBDBD"
            />
            <Typography>{prediction.subCategory}</Typography>
          </Box>
        </Box>
        {!isMobile && (
          <Box
            style={{
              marginLeft: 'auto',
            }}
          >
            <Button
              className={classes.report}
              classes={{ disabled: classes.reportDisabled }}
              onClick={onOpenReportDialog}
              disabled={disableReport}
            >
              <DangerIcon color="white" />
              Report
            </Button>
            {getShowShare() && (
              <Button
                className={classes.report}
                onClick={() => {
                  dispatch(
                    updateDialogStateAction({
                      open: true,
                      component: (
                        <PredictedDialog
                          eventId={prediction.eventId}
                          predictDetail={prediction}
                          isPredict={
                            prediction.status == PredictStatus.PREDICTED
                          }
                        />
                      ),
                    }),
                  );
                }}
              >
                <ShareIcon color="white" />
                Share
              </Button>
            )}
          </Box>
        )}
        {isMobile && (
          <Box className={clsx(classes.wrapperMobile, classes.wrapperVerify)}>
            <Box>
              {renderHostBy}
              {prediction.pro == 0 && renderProvider}
              {prediction.pro != 0 && (
                <ResultByChainLink metadata={prediction.metadata} />
              )}
            </Box>
            <Box display="flex">
              {getShowShare() && (
                <Button
                  className={classes.report}
                  onClick={() => {
                    dispatch(
                      updateDialogStateAction({
                        open: true,
                        component: (
                          <PredictedDialog
                            eventId={prediction.eventId}
                            predictDetail={prediction}
                            isPredict={
                              prediction.status == PredictStatus.PREDICTED
                            }
                          />
                        ),
                      }),
                    );
                  }}
                >
                  <ShareIcon color="white" />
                  Share
                </Button>
              )}
              <Button
                className={classes.report}
                classes={{ disabled: classes.reportDisabled }}
                onClick={onOpenReportDialog}
                disabled={disableReport}
              >
                <DangerIcon color="white" />
                Report
              </Button>
            </Box>
          </Box>
        )}
      </Box>
      {!isMobile && (
        <Box className={classes.wrapperVerify}>
          {renderHostBy}
          {prediction.pro == 0 && renderProvider}
          {prediction.pro != 0 && (
            <ResultByChainLink metadata={prediction.metadata} />
          )}
        </Box>
      )}
      <Box className={classes.wrapperName}>
        <Link
          className={classes.name}
          to={`/detail-event/${prediction.eventId}`}
        >
          <TooltipTypography
            text={
              prediction.eventShortDescription
                ? prediction.eventShortDescription
                : prediction.name
            }
          />
          <TooltipTypography
            text={prediction.eventShortDescription ? prediction.name : ''}
          />
        </Link>
      </Box>
      <Box className={classes.wrapperChoice}>
        <Box>
          <Typography className={classes.yourPrediction}>
            Your prediction
          </Typography>
          <Box className={classes.wrapper2}>
            {/* <Box className={classes.wrapperChoice1}>
              <Box className={classes.wrapperOptionName}>
                <TooltipTypography text={renderOption} />
                {prediction.marketType == MarketType.HANDICAP && (
                  <Typography>{renderHandicapIfNeed}</Typography>
                )}
              </Box>
              <Typography>{isUserVsPool && renderOdd}</Typography>
            </Box> */}
            <OptionItem
              className={classes.wrapperChoice1}
              name={renderOption}
              odd={isUserVsPool ? renderOdd : undefined}
              image={getImage}
              percentage={getPercentage}
              isImageOption={getAnswerType == AnswerType.WITH_PHOTOS}
            />
            <Box className={classes.wrapperType}>
              <Typography>{`${convertThousandSeperator(
                renderAmount,
              )} ${renderUnit}`}</Typography>
              <Typography>
                {prediction.marketType == MarketType.TRUE_FALSE
                  ? 'Yes / No'
                  : prediction.marketType}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={classes.wrapper3}>
          <Typography>{renderReward}</Typography>
          <LoadingButton
            onClick={onClaimReward}
            className={renderButtonClassName}
            isLoading={isLoading}
            disabled={disabledClaimButton}
          >
            {renderTextButton}
          </LoadingButton>
          {renderInfo}
        </Box>
      </Box>
    </Box>
  );
};

export default memo(PredictionItem);
