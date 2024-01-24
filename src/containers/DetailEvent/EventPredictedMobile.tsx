import { Box, Button, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Decimal from 'decimal.js';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Web3 from 'web3';

import CommonTooltip from 'components/common/CommonTooltip';
import LoadingButton from 'components/common/LoadingButton';
import ClaimAmountFailed from 'components/dialog/ClaimAmountFailed';
import ClaimAmountSuccess from 'components/dialog/ClaimAmountSuccess';
import ReportDialog from 'components/dialog/ReportDialog';
import {
  convertTime,
  convertWeiToToken,
  getNameToken,
  renderShortAddress,
} from 'helpers';
import { usePlatformFee } from 'hooks/usePlatformFee';
import DangerIcon from 'icon/DangerIcon';
import InfoIcon from 'icon/InfoIcon';
import { predictionABI } from 'services/contract';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { getAllPredictionEachEventAction } from 'store/actions/predictionActions';
import { getPredictionsData } from 'store/selectors';
import { MarketType, WhoTakeWith } from 'types/hostPrediction';
import { IPrediction, PredictStatus } from 'types/prediction';

import { useStyles } from './EventPredictedMobileStyles';

interface IProps {
  id: string;
  filterToken: string;
  orderBy?: string;
}

const EventPredictedMobile = ({ id, filterToken, orderBy }: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const predictions = useSelector(getPredictionsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { library, account } = useWeb3React();
  const { uvpPlatformFee: UVP_PLATFORM_FEE, uvuPlatformFee: P2P_PLATFORM_FEE } =
    usePlatformFee();
  const getAllPrediction = (page: number) => {
    const params: any = {
      pageNumber: page,
      pageSize: 5,
      eventId: +id,
    };
    if (orderBy) {
      params.orderBy = orderBy;
    }
    if (filterToken) {
      params.token = filterToken;
    }
    dispatch(
      getAllPredictionEachEventAction(
        params,
        () => {},
        (totalPage: number) => {
          setTotalPage(totalPage);
        },
      ),
    );
  };
  useEffect(() => {
    getAllPrediction(1);
    setCurrentPage(1);
  }, [id, account, filterToken, orderBy]);
  const renderChoosedOption = (prediction: IPrediction) => {
    const options = JSON.parse(prediction.options) as string[];
    if (Web3.utils.isAddress(options[prediction.optionIndex].toUpperCase())) {
      return renderShortAddress(options[prediction.optionIndex], 20, 4);
    }
    return options[prediction.optionIndex];
  };
  const renderValue = (prediction: IPrediction) => {
    return `${renderAmount(prediction)} ${getNameToken(prediction.token)}`;
  };
  const onOpenReportDialog = (prediction: IPrediction) => {
    dispatch(
      updateDialogStateAction({
        open: true,
        component: <ReportDialog predictionId={prediction.id} />,
      }),
    );
  };
  const disabledClaimButton = (prediction: IPrediction) => {
    const date = dayjs(prediction.eventClaimTime);
    const dateToMilliSecond = date.valueOf();
    return (
      (prediction.status != PredictStatus.CLAIM &&
        prediction.status != PredictStatus.CLAIM_CASH_BACK) ||
      isLoading ||
      Date.now() <= dateToMilliSecond
    );
  };
  const onClaimReward = useCallback(
    async (prediction: IPrediction) => {
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
        dispatch(
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
      } catch (e) {
        setIsLoading(false);
        dispatch(
          updateDialogStateAction({
            open: true,
            component: <ClaimAmountFailed />,
          }),
        );
      }
    },
    [library?.provider, dispatch, account],
  );
  const renderButtonClassName = (prediction: IPrediction) => {
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
  };
  const renderTextButton = (prediction: IPrediction) => {
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
  };
  const isPredictedWin = (prediction: IPrediction) => {
    let choosed = renderChoosedOption(prediction);
    if (prediction.marketType == MarketType.HANDICAP) {
      if (prediction.eventResult == 'Half Win - Half Lose') {
        if (prediction.optionIndex == 0) return true;
        return false;
      } else if (prediction.eventResult == 'Half Lose - Half Win') {
        if (prediction.optionIndex == 0) return false;
        return true;
      } else if (prediction.eventResult == 'Draw - Draw') {
        return true;
      }
    }
    return choosed == prediction.eventResult;
  };
  const disableReport = (prediction: IPrediction) => {
    const date = dayjs(prediction.eventClaimTime);
    const dateToMilliSecond = date.valueOf();
    return (
      prediction.eventStatus != 'FINISH' ||
      Date.now() > dateToMilliSecond ||
      !!prediction.reportContent
    );
  };
  const renderInfo = (prediction: IPrediction) => {
    if (prediction.eventStatus != 'FINISH') return;
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
      <>
        <Typography>{reportStatus}</Typography>
        {prediction.pro == 0 && (
          <CommonTooltip title="Within 48 hours after host confirms result, you get to report if the result is incorrect before it’s finalized. The Predum team will look into and resolve the reported result.">
            <InfoIcon />
          </CommonTooltip>
        )}
      </>
    );
  };
  const renderUnit = (prediction: IPrediction) => {
    if (prediction.token == process.env.REACT_APP_PRT_TOKEN) return 'PRT';
    return 'ETH';
  };
  const renderSponsor = (prediction: IPrediction) => {
    return convertWeiToToken(prediction.sponsor ? prediction.sponsor : '0', 5);
  };
  const renderAmount = (prediction: IPrediction) => {
    const { eventType } = JSON.parse(prediction.metadata) as {
      eventType: WhoTakeWith;
    };
    const amount = convertWeiToToken(prediction.amount);
    const result =
      eventType == WhoTakeWith.USER_USER
        ? amount
        : new Decimal(amount).div(1 - UVP_PLATFORM_FEE).toString();
    return result;
  };

  const renderReward = (prediction: IPrediction) => {
    if (prediction.status == PredictStatus.LOST) return '';
    const reward = convertWeiToToken(prediction.estimateReward || '0', 5);
    const { eventType } = JSON.parse(prediction.metadata) as {
      eventType: WhoTakeWith;
    };
    const sponsor = renderSponsor(prediction);
    const unit = renderUnit(prediction);
    const prize = `+ ${sponsor} ${unit} PRIZE`;
    const amount = renderAmount(prediction);
    const rewardWithoutSponsor =
      eventType == WhoTakeWith.USER_USER
        ? new Decimal(new Decimal(reward).minus(sponsor).minus(amount))
            .mul(1 - P2P_PLATFORM_FEE - prediction.hostFee / 10000)
            .add(amount)
            .toNumber()
        : reward;
    if (prediction.status == PredictStatus.CLAIM) {
      if (eventType === WhoTakeWith.USER_USER) {
        if (+reward < +amount) {
          return `${reward} ${unit}`;
        }
        return `${rewardWithoutSponsor} ${unit} ${+sponsor ? prize : ''}`;
      }
      return `${rewardWithoutSponsor} ${unit}`;
    }
    if (prediction.status == PredictStatus.PREDICTED) {
      if (eventType === WhoTakeWith.USER_USER) {
        return `Potential Winning ${rewardWithoutSponsor} ${unit} ${
          +sponsor ? prize : ''
        }`;
      }
      return `Potential Winning ${rewardWithoutSponsor} ${unit}`;
    }
    if (
      prediction.status == PredictStatus.CLAIM_CASH_BACK ||
      prediction.status == PredictStatus.CLAIMED_CASH_BACK
    ) {
      return `${amount} ${unit}`;
    }
    if (eventType === WhoTakeWith.USER_USER) {
      if (+reward < +amount) {
        return `${reward} ${unit}`;
      }
      return `${rewardWithoutSponsor} ${unit} ${+sponsor ? prize : ''}`;
    } else {
      const total = new Decimal(rewardWithoutSponsor);
      return `${total} ${unit}`;
    }
  };

  const renderPredictionStatus = (prediction: IPrediction) => {
    let choosed = renderChoosedOption(prediction);
    return (
      <Box className={classes.wapperStatus}>
        <Typography
          className={clsx(classes.status, {
            [classes.loseColor]: prediction.status == PredictStatus.LOST,
            [classes.whiteColor]:
              prediction.status != PredictStatus.LOST &&
              !dayjs(prediction.eventClaimTime).isAfter(new Date()),
          })}
        >
          {isPredictedWin(prediction)
            ? dayjs(prediction.eventClaimTime).isAfter(new Date())
              ? 'YOU WON'
              : renderReward(prediction)
            : prediction.status != PredictStatus.LOST
            ? renderReward(prediction)
            : 'YOU LOST'}
        </Typography>
        {prediction.status != PredictStatus.LOST &&
          !dayjs(prediction.eventClaimTime).isAfter(new Date()) && (
            <LoadingButton
              onClick={() => onClaimReward(prediction)}
              className={renderButtonClassName(prediction)}
              disabled={disabledClaimButton(prediction)}
            >
              {renderTextButton(prediction)}
            </LoadingButton>
          )}

        <Box display="flex">{renderInfo(prediction)}</Box>
        {prediction.reportContents.length == 0 && (
          <Button
            className={classes.report}
            classes={{ disabled: classes.reportDisabled }}
            onClick={() => onOpenReportDialog(prediction)}
            disabled={disableReport(prediction)}
          >
            <DangerIcon color="white" />
            Report
          </Button>
        )}
      </Box>
    );
  };
  const onChangePage = (event: any, page: number) => {
    setCurrentPage(page);
    getAllPrediction(page);
  };
  return (
    <>
      {predictions.map((prediction, index) => {
        return (
          <Box
            className={clsx(classes.wapper, {
              [classes.host]: account == prediction.userAddress,
            })}
            key={index}
          >
            <Box
              className={clsx(classes.wapper2, {
                [classes.borderBottom]:
                  account == prediction.userAddress &&
                  prediction.status != PredictStatus.PREDICTED,
              })}
            >
              <Box className={classes.item}>
                <Typography>Time</Typography>
                <Typography>{`${convertTime(
                  prediction.createdAt,
                )}`}</Typography>
              </Box>
              <Box className={classes.item}>
                <Typography>Wallet Address</Typography>
                <Typography>
                  {renderShortAddress(prediction.userAddress, 20, 4)}
                </Typography>
              </Box>
              <Box className={classes.item}>
                <Typography>Option</Typography>
                <Typography>{renderChoosedOption(prediction)}</Typography>
              </Box>
              <Box className={classes.item}>
                <Typography>Predict Amount</Typography>
                <Typography>{renderValue(prediction)}</Typography>
              </Box>
            </Box>
            <Box>
              {account == prediction.userAddress &&
                prediction.status != PredictStatus.PREDICTED &&
                renderPredictionStatus(prediction)}
            </Box>
          </Box>
        );
      })}
      <Box className="center-root">
        <Pagination
          page={currentPage}
          count={Math.ceil(totalPage / 5)}
          variant="outlined"
          shape="rounded"
          siblingCount={0}
          className={classes.pagination}
          onChange={onChangePage}
        />
      </Box>
    </>
  );
};

export default EventPredictedMobile;
