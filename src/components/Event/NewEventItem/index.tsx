import {
  Box,
  CardMedia,
  Tooltip,
  TooltipProps,
  Typography,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import Decimal from 'decimal.js';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Web3 from 'web3';

import RenderIConByCategory from 'components/common/RenderIConByCategory';
import {
  convertThousandSeperator,
  convertTime,
  convertWeiToToken,
  getNameToken,
  renderShortAddress,
} from 'helpers';
import { usePlatformFee } from 'hooks/usePlatformFee';
import PinIcon from 'icon/PinIcon';
import ShiedTickIcon from 'icon/SheildTickIcon';
import TimeStopIcon from 'icon/TimeStopIcon';
import UnPinIcon from 'icon/UnPinIcon';
import UserIcon from 'icon/UserIcon';
import WarningIcon from 'icon/WariningIcon';
import {
  getAllTokensAction,
  getAllTokensActionByJSON,
} from 'store/actions/tokensActions';
import { getHostState, getNewTokenState } from 'store/selectors';
import { EEventStatus, IEvent } from 'types/event';
import { MarketType } from 'types/hostPrediction';

import EventStatus from '../EventStatus';
import NewEventDefaultThumbnail from './NewEventDefaultThumbnail';
import { useStyles } from './styles';

const NewEventItem = ({
  event,
  updatePinnedEvents,
  isLive,
  isInvisible,
}: {
  event: IEvent;
  updatePinnedEvents?: (eventId: number) => void;
  isLive?: boolean;
  isInvisible?: boolean;
}) => {
  const classes = useStyles();
  const { uvpPlatformFee: UVP_PLATFORM_FEE } = usePlatformFee();
  const tokens = useSelector(getNewTokenState);
  const history = useHistory();
  const isDetail = location.pathname.includes('detail');
  const hostState = useSelector(getHostState);
  const { account } = useWeb3React();
  const isMarketTypeHandicap = useMemo(() => {
    return event.marketType == MarketType.HANDICAP;
  }, [event]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getAllTokensAction({
        pageNumber: 1,
        pageSize: 20,
      }),
    );
    dispatch(getAllTokensActionByJSON());
  }, []);
  const chains = useMemo(() => {
    return tokens.map((token) => {
      return {
        value: token.name,
        id: token.address,
        icon: token.logo,
      };
    });
  }, [tokens]);
  const renderPoolValues = (amount: any, isUvP?: boolean) => {
    let pools: any = [];
    Object.keys(amount)
      .filter((a) => !!Number(amount[a] || '0'))
      .map((p, i) => {
        pools.push({
          name: getNameToken(p),
          value: convertThousandSeperator(
            convertWeiToToken(
              isUvP
                ? new Decimal(amount[p])
                    .div(1 - UVP_PLATFORM_FEE)
                    .toNumber()
                    .toLocaleString('fullwide', { useGrouping: false })
                : amount[p],
            ),
          ),
        });
      });
    if (pools.length == 0) {
      return <Typography className={classes.highlightText}>0</Typography>;
    }
    return pools.map((o: any, i: number) => {
      let tokenImg = '';
      chains.forEach((c, index) => {
        if (c.value == o.name) {
          tokenImg = c.icon;
        }
      });
      return (
        <Box display="flex" key={i} alignItems="center" mr={1}>
          <CardMedia
            image={tokenImg}
            style={{
              height: 14,
              width: 14,
              marginRight: 4,
            }}
          />
          <Typography className={classes.highlightText}>{o.value}</Typography>
        </Box>
      );
    });
  };
  const renderCategory = useMemo(() => {
    return (
      event.subCategory && (
        <Box className={classes.category}>
          <RenderIConByCategory
            category={event?.subCategory ? event?.subCategory : event.category}
            color="#BDBDBD"
          />
          <Typography>
            {event?.subCategory ? event?.subCategory : event.category}
          </Typography>
        </Box>
      )
    );
  }, [event.subCategory, classes.category]);
  const onRedirectDetailPage = () => {
    if (history.location.pathname.includes('host-info')) {
      history.push(`/detail-event/${event.id}`, {
        address: event.address,
        nickname: event.userNickname,
      });
    } else history.push(`/detail-event/${event.id}`);
  };
  const getEventInfo = () => {
    let text = '';
    let result = <></>;
    let isOnlyText = true;
    switch (event.listingStatus) {
      case EEventStatus.ENDED:
        text = 'Game ended';
        break;
      case EEventStatus.PENDING:
        text = 'Predict result pending';
        break;
      case EEventStatus.LOCKED:
        text = 'Predict locked after deadline';
        break;
      default: {
        isOnlyText = false;
        let optionLength = JSON.parse(event.options).length;
        if (optionLength == 2 || isMarketTypeHandicap) {
          result = (
            <Box display="flex" width="100%">
              <Box width="50%">
                <Typography
                  style={{
                    textAlign: 'center',
                    borderRight: '1px dashed #BDBDBD',
                  }}
                >
                  {JSON.parse(event.options)[0].length > 20
                    ? renderShortAddress(
                        JSON.parse(event.options)[0],
                        Web3.utils.isAddress(JSON.parse(event.options)[0])
                          ? 10
                          : 14,
                        Web3.utils.isAddress(JSON.parse(event.options)[0])
                          ? 4
                          : 0,
                      )
                    : JSON.parse(event.options)[0]}
                </Typography>
              </Box>
              <Box width="50%">
                <Typography
                  style={{
                    textAlign: 'center',
                  }}
                >
                  {JSON.parse(event.options)[isMarketTypeHandicap ? 4 : 1]
                    .length > 20
                    ? renderShortAddress(
                        JSON.parse(event.options)[isMarketTypeHandicap ? 4 : 1],
                        Web3.utils.isAddress(
                          JSON.parse(event.options)[
                            isMarketTypeHandicap ? 4 : 1
                          ],
                        )
                          ? 10
                          : 14,
                        Web3.utils.isAddress(
                          JSON.parse(event.options)[
                            isMarketTypeHandicap ? 4 : 1
                          ],
                        )
                          ? 4
                          : 0,
                      )
                    : JSON.parse(event.options)[isMarketTypeHandicap ? 4 : 1]}
                </Typography>
              </Box>
            </Box>
          );
        } else {
          result = (
            <Box display="flex" width="100%">
              <Box
                width="calc(50% - 20px)"
                style={{
                  borderRight: '1px dashed #BDBDBD',
                }}
              >
                <Typography
                  style={{
                    textAlign: 'center',
                  }}
                >
                  {JSON.parse(event.options)[0]}
                </Typography>
              </Box>
              <Box
                width="calc(50% - 20px)"
                style={{
                  borderRight: '1px dashed #BDBDBD',
                }}
              >
                <Typography
                  style={{
                    textAlign: 'center',
                  }}
                >
                  {JSON.parse(event.options)[1]}
                </Typography>
              </Box>
              <Box width="40px">
                <Typography
                  style={{
                    textAlign: 'center',
                  }}
                >
                  +{JSON.parse(event.options).length - 2}
                </Typography>
              </Box>
            </Box>
          );
        }
        // text = `${JSON.parse(event.options).length} Predict Options`;
        break;
      }
    }
    return isOnlyText ? text : result;
  };
  const CustomTooltip = (props: TooltipProps) => {
    return <Tooltip arrow classes={{ tooltip: classes.tooltip }} {...props} />;
  };
  return (
    <Box
      className={isDetail ? classes.containerDetail : classes.container}
      onClick={() => onRedirectDetailPage()}
      style={{
        visibility: isInvisible ? 'hidden' : 'initial',
      }}
    >
      <Box display="flex">
        <NewEventDefaultThumbnail event={event} />
        <Box
          ml={1}
          mb={1}
          style={{
            width: ' calc(100% - 96px)',
            height: 100,
            display: 'flex',
            justifyContent: 'space-evenly',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <Box>
            {renderCategory}
            <CustomTooltip
              title={
                event.shortDescription ? event.shortDescription : event.name
              }
              placement="top"
            >
              <Typography className={classes.eventName}>
                {event.shortDescription == '' &&
                  (event.name.length > 80
                    ? renderShortAddress(event.name, 70, 0)
                    : event.name)}
                {event.shortDescription != '' &&
                event.shortDescription &&
                event.shortDescription.length > 60
                  ? renderShortAddress(event.shortDescription, 50, 0)
                  : event.shortDescription}
              </Typography>
            </CustomTooltip>
          </Box>
          {account == hostState.address &&
            location.pathname.includes('host-info') &&
            !isLive && (
              <Box
                className={classes.pin}
                onClick={(e: any) => {
                  e.stopPropagation();
                  updatePinnedEvents && updatePinnedEvents(event.id);
                }}
              >
                {event.isPinned ? <PinIcon /> : <UnPinIcon />}
              </Box>
            )}
          {account == hostState.address &&
            location.pathname.includes('host-info') &&
            isLive && (
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  background: '#E53935',
                  padding: '2px 8px',
                }}
              >
                <Typography
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  Live
                </Typography>
              </Box>
            )}
          <Box className={classes.host}>
            {event?.isUserVerified ? <ShiedTickIcon /> : <WarningIcon />}
            <Typography>
              {event.userNickname
                ? event.userNickname
                : renderShortAddress(event.address, 4, 4)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.inputStatus}>
        <>{getEventInfo()}</>
      </Box>
      <Box className={classes.eventInfo}>
        <Box>
          <Box display="flex">{renderPoolValues(event.poolTokenAmounts)}</Box>
          <Box className={classes.wrapperTime}>
            <TimeStopIcon />
            <Typography>{convertTime(event.endTime)}</Typography>
          </Box>
        </Box>
        <Box>
          <EventStatus
            status={event.listingStatus || ('Pending result' as any)}
          />
          <Box className={classes.views}>
            <UserIcon />
            <Typography>
              {event.participants && event.participants[0] != null
                ? event.participants.length
                : 0}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default NewEventItem;
