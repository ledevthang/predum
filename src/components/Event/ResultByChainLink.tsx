import { Typography } from '@material-ui/core';
import ShiedTickIcon from 'icon/SheildTickIcon';
import React from 'react';
import { useStyles } from './EventItemStyles';

interface IProps {
  metadata?: string;
}
const ResultByChainLink = ({ metadata }: IProps) => {
  const classes = useStyles();

  const shouldAutoUpdate = () => {
    const { shouldAutoUpdate } = JSON.parse(metadata || '{}') as {
      shouldAutoUpdate: number;
    };
    return shouldAutoUpdate;
  };

  return (
    <>
      {shouldAutoUpdate() ? (
        <Typography className={classes.chainLink}>
          <ShiedTickIcon /> Result provided by{' '}
          {shouldAutoUpdate() == 5 || shouldAutoUpdate() == 6
            ? 'Chainlink'
            : 'RapidAPI'}
        </Typography>
      ) : (
        ''
      )}
    </>
  );
};

export default ResultByChainLink;
