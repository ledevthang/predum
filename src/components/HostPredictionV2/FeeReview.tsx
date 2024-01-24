import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { convertThousandSeperator, getNameToken } from 'helpers';
import MoneyBagIcon from 'icon/MoneyBagIcon';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  getOrganizingMethod,
  getFeeForHost,
  getKindOfEvent,
} from 'store/selectors';
import { EKindOfEvent } from 'types/proEvent';
import { useStyles } from './FeeReviewStyle';

const FeeReview = () => {
  const classes = useStyles();
  const organizingMethod = useSelector(getOrganizingMethod);
  const feeHost = useSelector(getFeeForHost);
  const kindOfEvent = useSelector(getKindOfEvent);

  return (
    <Box className={classes.container}>
      <Box className={clsx(classes.svg, 'center-root')}>
        <MoneyBagIcon width={67} height={67} />
      </Box>
      <Box className={classes.main}>
        {organizingMethod.betting.map((b) => (
          <Typography key={b.token} className={classes.token}>
            {`${convertThousandSeperator(b.liquidityPool)} ${getNameToken(
              b.token,
            )}`}
          </Typography>
        ))}
        <Typography style={{ fontSize: 14, color: '#BDBDBD' }}>
          {kindOfEvent === EKindOfEvent.P2P_PRIZE_POOL
            ? `${
                (feeHost || 0) + 1
              } % of winner's profit will be deducted as fee`
            : '0.5% of total predicted amount will be deducted as fee'}
        </Typography>
      </Box>
    </Box>
  );
};

export default FeeReview;
