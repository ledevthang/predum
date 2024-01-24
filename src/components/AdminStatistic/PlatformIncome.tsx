import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { convertThousandSeperator, getNameToken } from 'helpers';
import React from 'react';
import { IPlatformIncome } from 'types/admin';
import { useStyles } from './PlatformIncomeStyles';

interface IProps {
  income: IPlatformIncome;
  token: string;
}
const PlatformIncome = ({ income, token }: IProps) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Typography className={classes.name}>Platform Income</Typography>
      {/* <Box className={clsx(classes.wrapper, classes.border)}>
        <Typography className={classes.type}>Event creation fee</Typography>
        <Typography>
          {convertThousandSeperator(income.eventCreateFee[0]?.total || 0)} EFUN
        </Typography>
      </Box> */}
      <Box className={clsx(classes.wrapper, classes.border)}>
        <Typography className={classes.type}>
          Fee from P2P event (1% winner profit)
        </Typography>
        <Box className={classes.wrapperToken}>
          {income.uvuTotalAmount.map((u, i) => (
            <Typography key={i}>
              {convertThousandSeperator(u.total)}{' '}
              {getNameToken(u.token || token)}
            </Typography>
          ))}
        </Box>
      </Box>
      <Box className={classes.wrapper}>
        <Typography className={classes.type}>
          Fee from UvP event (0.5% of total predicted amount)
        </Typography>
        <Box className={classes.wrapperToken}>
          {income.uvpTotalAmount.map((u, i) => (
            <Typography key={i}>
              {u.total} {getNameToken(u.token || token)}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PlatformIncome;
