import { Box, Typography } from '@material-ui/core';
import KindOfEvent from 'components/HostPredictionV2/KindOfEvent';
import MoneyBagIcon from 'icon/MoneyBagIcon';
import P2PPrizePool from 'icon/P2PPrizePool';
import People from 'icon/People';
import Profile2UsersIcon from 'icon/Profile2UsersIcon';
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { getHostPrediction, getOrganizingMethod } from 'store/selectors';
import { WhoTakeWith } from 'types/hostPrediction';
import { EKindOfEvent } from 'types/proEvent';
import { useStyles } from './styles';

const SelectKindOfEvent = () => {
  const classes = useStyles();
  const { kindOfEvent } = useSelector(getHostPrediction);
  const organizingMethod = useSelector(getOrganizingMethod);
  const dispatch = useDispatch();

  const onChangeKindOfEvent = useCallback((kindOfEvent: EKindOfEvent) => {
    const eventType =
      kindOfEvent === EKindOfEvent.P2P_PRIZE_POOL
        ? WhoTakeWith.USER_USER
        : kindOfEvent === EKindOfEvent.USER_VS_POOL
        ? WhoTakeWith.USER_POOL
        : WhoTakeWith.AFFILIATE;
    dispatch(
      updateHostPredictionStateAction({
        kindOfEvent,
        organizingMethod: {
          ...organizingMethod,
          eventType,
        },
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      updateHostPredictionStateAction({
        error: !kindOfEvent,
        errorPool: false,
      }),
    );
  }, [kindOfEvent]);

  return (
    <Box className={classes.kindOfEventContainer}>
      <Box className={classes.koeMain}>
        {KINDS_OF_EVENT.map((k, i) => (
          <KindOfEvent
            onChangeKindOfEvent={() => onChangeKindOfEvent(k.name)}
            key={i}
            disabled={k.name == EKindOfEvent.AFFILIATE}
            Logo={k.Logo}
            name={k.name}
            description={k.description}
            selected={kindOfEvent == k.name}
            tooltipContent={k.tooltipContent}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SelectKindOfEvent;

const KINDS_OF_EVENT = [
  {
    Logo: <People height={60} width={60} />,
    name: EKindOfEvent.AFFILIATE,
    description: 'Resell prediction event for commission',
    tooltipContent:
      'Host and invite people to predict in your event. The predictors play against Decentralized liquidity pool. More people predicting means bigger commission.',
  },
  {
    Logo: <P2PPrizePool height={60} width={60} />,
    name: EKindOfEvent.P2P_PRIZE_POOL,
    description: 'Promotional prediction event that rewards winner',
    tooltipContent:
      'People will wager against each other in your event. The winners will takes from the losers. The prize pool that you offer will be used to reward the winners.',
  },
  {
    Logo: (
      <Box display="flex" alignItems="center" className="wrapperLogoUvp">
        <Profile2UsersIcon height={60} width={60} />
        <Typography
          style={{
            fontSize: 16,
            fontWeight: 500,
            marginRight: 12,
            marginLeft: 12,
            color: '#BDBDBB',
          }}
        >
          VS
        </Typography>
        <MoneyBagIcon height={60} width={60} />
      </Box>
    ),
    name: EKindOfEvent.USER_VS_POOL,
    description: 'Become a bookie with personal liquidity pool',
    tooltipContent:
      'People will predict against you. Winners will be paid by the odd you set from the liquidity pool you provide.',
  },
];
