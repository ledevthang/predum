import { Box, Typography } from '@material-ui/core';
import { renderShortAddress } from 'helpers';
import ShiedTickIcon from 'icon/SheildTickIcon';
import WarningIcon from 'icon/WariningIcon';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { IEvent } from 'types/event';
import { useStyles } from './ProEventItemStyles';

const VerifyInfo = ({ event }: { event?: IEvent }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleClickHostAddress = (address: string | undefined) => {
    history.push(`/host-info/${address}`);
  };
  return (
    <Box className={classes.wrapperFooter2}>
      <Box>
        {event?.isUserVerified ? <ShiedTickIcon /> : <WarningIcon />}
        <Box display="flex">
          <Typography>Hosted by</Typography>
          {event && (
            <Typography
              style={{
                marginLeft: 4,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => handleClickHostAddress(event.address)}
            >
              {renderShortAddress(event.address, 4, 4)}
            </Typography>
          )}
        </Box>
      </Box>
      <Box>
        <ShiedTickIcon />
        <Typography>Odds provided by</Typography>
        <Typography className={classes.oddChecker}>RapidAPI</Typography>
      </Box>
    </Box>
  );
};

export default VerifyInfo;
