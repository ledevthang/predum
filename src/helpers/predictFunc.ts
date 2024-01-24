import Decimal from 'decimal.js';
import { convertThousandSeperator, convertWeiToToken } from 'helpers';
import { WhoTakeWith } from 'types/hostPrediction';
import { IPrediction, PredictStatus } from 'types/prediction';

export const renderOption = (prediction: IPrediction) => {
  const options = JSON.parse(prediction.options || '{}');
  return options[prediction.optionIndex];
};

export const renderSponsor = (prediction: IPrediction) => {
  return convertWeiToToken(prediction.sponsor, 5);
};
export const renderUnit = (prediction: IPrediction) => {
  return 'ETH';
};
export const renderAmount = (
  prediction: IPrediction,
  UVP_PLATFORM_FEE: any,
) => {
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
export const renderReward = (
  prediction: IPrediction,
  UVP_PLATFORM_FEE: any,
  P2P_PLATFORM_FEE: any,
) => {
  if (prediction.status == PredictStatus.LOST) return '';
  const { eventType } = JSON.parse(prediction.metadata) as {
    eventType: WhoTakeWith;
  };
  const reward = new Decimal(
    convertWeiToToken(prediction.estimateReward || '0', 5),
  ).toNumber();
  const rewardWithoutSponsor =
    eventType == WhoTakeWith.USER_USER
      ? new Decimal(
          new Decimal(reward)
            .minus(renderSponsor(prediction))
            .minus(renderAmount(prediction, UVP_PLATFORM_FEE)),
        )
          .mul(1 - P2P_PLATFORM_FEE - prediction.hostFee / 10000)
          .add(renderAmount(prediction, UVP_PLATFORM_FEE))
          .toNumber()
      : reward;
  if (prediction.status == PredictStatus.CLAIM) {
    if (eventType === WhoTakeWith.USER_USER) {
      if (reward < +renderAmount(prediction, UVP_PLATFORM_FEE)) {
        return `${reward} ${renderUnit(prediction)}`;
      }
      return `${convertThousandSeperator(
        +rewardWithoutSponsor +
          (+renderSponsor(prediction) ? +renderSponsor(prediction) : 0),
      )}`;
    }
    return `${convertThousandSeperator(rewardWithoutSponsor)} ${renderUnit(
      prediction,
    )}`;
  }
  if (prediction.status == PredictStatus.PREDICTED) {
    if (eventType === WhoTakeWith.USER_USER) {
      return `${convertThousandSeperator(
        +rewardWithoutSponsor +
          (+renderSponsor(prediction) ? +renderSponsor(prediction) : 0),
      )} ${renderUnit(prediction)}`;
    }
    return `${convertThousandSeperator(rewardWithoutSponsor)} ${renderUnit(
      prediction,
    )}`;
  }
  if (
    prediction.status == PredictStatus.CLAIM_CASH_BACK ||
    prediction.status == PredictStatus.CLAIMED_CASH_BACK
  ) {
    return `${renderAmount(prediction, UVP_PLATFORM_FEE)} ${renderUnit(
      prediction,
    )}`;
  }
  if (eventType === WhoTakeWith.USER_USER) {
    if (reward < +renderAmount(prediction, UVP_PLATFORM_FEE)) {
      return `${reward} ${renderUnit(prediction)}`;
    }
    return `${convertThousandSeperator(
      +rewardWithoutSponsor +
        (+renderSponsor(prediction) ? +renderSponsor(prediction) : 0),
    )} ${renderUnit(prediction)}`;
  } else {
    return `${rewardWithoutSponsor} ${renderUnit(prediction)}`;
  }
};
