import { Box, Typography } from '@material-ui/core';
import { renderShortAddress } from 'helpers';
import ShiedTickIcon from 'icon/SheildTickIcon';
import WarningIcon from 'icon/WariningIcon';
import React, { useMemo } from 'react';
import { IEvent } from 'types/event';
import { WhoTakeWith } from 'types/hostPrediction';
import { useStyles } from './styles';
import ResultByChainLink from 'components/Event/ResultByChainLink';
import { useHistory } from 'react-router-dom';
import CommonTooltip from 'components/common/CommonTooltip';

const ProEventFooter = ({ event }: { event: IEvent }) => {
  const classes = useStyles();
  const history = useHistory();
  const type = useMemo(() => {
    const { eventType } = JSON.parse(event?.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return eventType;
  }, [event?.metadata]);

  const renderType = useMemo(() => {
    if (type == WhoTakeWith.AFFILIATE) return 'Affiliate';
    if (type == WhoTakeWith.USER_POOL) return 'User vs Pool';
    return 'Peer-to-Peer & Prize';
  }, [type]);
  return (
    <Box className={classes.wapperFooter}>
      <Box className={classes.hostBy}>
        {event.isUserVerified ? <ShiedTickIcon /> : <WarningIcon />}
        <Typography
          style={{
            fontSize: 14,
          }}
        >
          Hosted by{' '}
        </Typography>

        <Box
          onClick={() => {
            history.push(`/host-info/${event.address}`);
          }}
        >
          <Typography
            style={{
              marginLeft: 4,
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            {event?.userNickname
              ? event.userNickname
              : event && renderShortAddress(event.address, 4, 4)}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          className={classes.boldText}
          style={{
            textAlign: 'center',
            minWidth: 170,
            fontSize: 14,
          }}
        >
          {renderType}
        </Typography>
      </Box>
      <Box>
        <CommonTooltip title="RapidAPI, the world's largest API hub, is used by over three million developers to find, test, and connect to thousands of APIs — all with a single API key and dashboard. Find the APIs that you need for your project, embed the API into your app, and track usage of all your APIs through a single dashboard.">
          <ResultByChainLink metadata={event.metadata} />
        </CommonTooltip>
      </Box>
    </Box>
  );
};

export default ProEventFooter;
