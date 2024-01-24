import {
  Box,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import CommonSelectInput from 'components/common/CommonSelectInput';
import HeaderMeta from 'components/common/HeaderMeta';
import ShareEventDialog from 'components/DetailEvent/ShareEventDialog';
import { LocalStorageEnum } from 'enums/auth';
import { generateBackupBanner } from 'helpers';
import { getCurrentUserInfoAction } from 'store/actions/currentUserActions';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import {
  getEventDetailAction,
  updateEventViewAction,
} from 'store/actions/eventActions';
import { resetSideBarStateAction } from 'store/actions/sideBarActions';
import { getAllTokensAction } from 'store/actions/tokensActions';
import {
  getEventDetail,
  getNewTokenState,
  getSideBarState,
  getUserState,
} from 'store/selectors';
import { EUnit, WhoTakeWith } from 'types/hostPrediction';
import localStorageUtils from 'utils/LocalStorage';

import EventDescription from './EventDescription';
import EventDetailQuestion from './EventDetailQuestion';
import EventHeader from './EventHeader';
import EventPredicted from './EventPredicted';
import EventPredictedMobile from './EventPredictedMobile';
import OtherEvents from './OtherEvents';
import OtherEventsCategory from './OtherEventsCategory';
import PredictEventCustom from './PredictEventCustom';
import PredictEventProCustom from './PredictEventProCustom';
import Comments from './RightBar/Comments';
import EventInfo from './RightBar/EventInfo';
import PoolInfo from './RightBar/PoolInfo';
import { useStyles } from './styles';
import WarningDialog from './WarningDialog';

const DetailEvent = () => {
  const classes = useStyles();
  const { eventId } = useParams<{ eventId: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const event = useSelector(getEventDetail);
  const sideBar = useSelector(getSideBarState);
  const tokens = useSelector(getNewTokenState);
  const [filterValue, setFilterValue] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const user = useSelector(getUserState);
  const chains = useMemo(() => {
    return tokens.map((token) => {
      return {
        value: token.name,
        id: token.address,
        Icon: <CardMedia image={token.logo} className={classes.coin} />,
      };
    });
  }, [classes.coin, tokens]);
  const sortByList = useMemo(() => {
    const sortType = [
      { id: '', value: 'Sort by' },
      { id: 'latest', value: 'Latest' },
      { id: 'oldes', value: 'Oldest' },
      { id: 'high', value: 'Biggest amount' },
      { id: 'low', value: 'Smallest amount' },
    ];
    return sortType;
  }, []);
  const renderChains = useMemo(() => {
    if (!event) return [];
    const eventType = sideBar.betSlipData?.eventType;
    if (eventType == WhoTakeWith.AFFILIATE) {
      return [
        {
          value: EUnit.EFUN,
          id: process.env.REACT_APP_EFUN_TOKEN || '',
          Icon: (
            <CardMedia image="/images/EfunCoin.png" className={classes.coin} />
          ),
        },
      ];
    }
    let newChains = chains.filter((c, i) => {
      return event.tokens?.includes(c.id);
    });
    newChains.unshift({
      id: '',
      value: 'All tokens' as any,
      Icon: <></>,
    });
    return newChains.map((c) => ({
      id: c.id,
      value: c.value,
      Icon: c.Icon,
    }));
  }, [
    chains,
    sideBar.betSlipData?.chains,
    sideBar.betSlipData?.eventType,
    event,
  ]);
  const handleChangeUnit = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFilterValue(event.target.value);
    },
    [],
  );
  const handleChangeSortBy = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log(event.target.value);
      setOrderBy(event.target.value);
    },
    [],
  );
  useEffect(() => {
    if (!eventId) return;
    window.scrollTo(0, 0);
    const userId = localStorageUtils.getItem(LocalStorageEnum.USER_ID);
    dispatch(updateEventViewAction(eventId));
    if (sideBar.betSlipData?.id && Number(eventId) != sideBar.betSlipData?.id) {
      dispatch(resetSideBarStateAction());
    }
    dispatch(
      getEventDetailAction(eventId, userId, () => {
        setLoaded(true);
      }),
    );
  }, [eventId, user.id]);
  useEffect(() => {
    if (user.id) {
      dispatch(getCurrentUserInfoAction());
    }
  }, [user.id]);
  useEffect(() => {
    if (event && event.pro == 0) {
      setIsDialogOpen(!isOverDeadline());
    }
  }, [isLoaded]);

  useEffect(() => {
    dispatch(
      getAllTokensAction({
        pageNumber: 1,
        pageSize: 20,
      }),
    );
  }, []);
  const isOverDeadline = () => {
    if (!event) return false;
    const deadline = new Date(event.deadline);
    return deadline.getTime() < new Date().getTime();
  };
  const isProUvP = useMemo(() => {
    const { eventType } = JSON.parse(event?.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return (
      eventType != WhoTakeWith.USER_USER &&
      event?.pro != 0 &&
      JSON.parse(event?.metadata || '{}').fixtureMeta
    );
  }, [event?.metadata, event?.pro]);
  const isUvP = useMemo(() => {
    const { eventType } = JSON.parse(event?.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return eventType != WhoTakeWith.USER_USER;
  }, [event?.metadata]);

  // const renderBannerProUvPEvent = () => {
  //   let metadata = JSON.parse(event?.metadata || '{}');
  //   let fixture = JSON.parse(metadata.fixtureMeta);
  //   let selectedEvent = {
  //     teamsMeta: JSON.stringify(fixture.teams),
  //     leagueMeta: JSON.stringify(fixture.league),
  //     goalsMeta: event?.goalsMeta,
  //     date: fixture.fixture.date,
  //   };
  //   let league = fixture.league;
  //   return (
  //     <Box mb={3}>
  //       <OverViewMatch
  //         selectedEvent={selectedEvent}
  //         league={league}
  //         shouldEditBanner={false}
  //         isShowShareIcon={true}
  //         isOverlay
  //         bannerMatch={
  //           event?.bannerUrl ||
  //           generateBackupBanner(event?.category, event?.subCategory)
  //         }
  //       />
  //     </Box>
  //   );
  // };
  const onShowShareDialog = useCallback(() => {
    dispatch(
      updateDialogStateAction({
        open: true,
        component: <ShareEventDialog />,
      }),
    );
  }, [dispatch]);
  return (
    <>
      <Box className={classes.container}>
        {isLoaded && (
          <>
            {event && (
              <>
                <HeaderMeta
                  title={event.name}
                  image={
                    event.thumbnailUrl ||
                    event.bannerUrl ||
                    generateBackupBanner(event.category, event.subCategory)
                  }
                />
                <EventHeader event={event} />
              </>
            )}
            {event?.streamUrl ? (
              <ReactPlayer
                url={event?.streamUrl}
                controls
                id="video"
                style={{ marginBottom: 24, width: 'unset !important' }}
              />
            ) : (
              <>
                {!isProUvP && event?.bannerUrl && (
                  <Box position="relative">
                    <CardMedia
                      image={
                        event?.bannerUrl ||
                        generateBackupBanner(
                          event?.category,
                          event?.subCategory,
                        )
                      }
                      className={classes.thumbnail}
                    />
                    {/* {event && (
                    <Box
                      className={classes.share}
                      onClick={onShowShareDialog}
                    >
                      <ShareIcon />
                    </Box>
                  )} */}
                  </Box>
                )}
                {/* {isProUvP && renderBannerProUvPEvent()} */}
              </>
            )}
            <WarningDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
            {/* {!isProUvP && <EventCardCustom event={event} />} */}
            {/* {event && <EventPool event={event} />} */}
            {!isProUvP && <PredictEventCustom event={event} />}
            {isProUvP && <PredictEventProCustom event={event} />}
            {!isDesktop && (
              <Box
                className={classes.wrapper}
                flexDirection={isMobile ? 'column' : 'row'}
              >
                <PoolInfo />
                <EventInfo />
              </Box>
            )}
            {event && <EventDescription event={event} />}
            <Box className={classes.wapperPrediction}>
              <Typography>All Predictions</Typography>
              <Box className={classes.wrapperSortFilter}>
                {isMobile && (
                  <CommonSelectInput
                    values={sortByList}
                    onChange={handleChangeSortBy}
                    currentValue={orderBy}
                    className={classes.selectCoin}
                  />
                )}
                <CommonSelectInput
                  values={renderChains}
                  onChange={handleChangeUnit}
                  currentValue={filterValue}
                  className={classes.selectCoin}
                />
              </Box>
              {!isMobile ? (
                <EventPredicted id={eventId} filterToken={filterValue} />
              ) : (
                <EventPredictedMobile
                  id={eventId}
                  filterToken={filterValue}
                  orderBy={orderBy}
                />
              )}
            </Box>
            <EventDetailQuestion
              questionList={isUvP ? questionListUvP : questionListPvP}
            />
            {!isDesktop && (
              <Box>
                <Comments />
              </Box>
            )}
            {event && <OtherEvents eventId={event.id.toString()} />}
            {event && <OtherEventsCategory eventId={event.id.toString()} />}
          </>
        )}
      </Box>
    </>
  );
};

export default memo(DetailEvent);
const questionListUvP = [
  {
    id: 1,
    question: 'How is my payout calculated in User vs.Pool game?',
    content: `
    <p>Your pay out is calculated based on your predict amount and the odd value. Say you predict 0.1 ETH and the odd value of your selected option is 1.8.</p>

    <p>If you win, meaning your selected option is the final result, the amount you will receive is 0.18 (with your 0.1 ETH predicted initially). Your profit is 0.08 ETH
    </p>
    
    <p>Keep in mind that the predict amount may be limited by the size of the liquidity pool that the host provided.</p>`,
  },
  {
    id: 2,
    question: 'What is User vs. Pool game?',
    content: `User vs. Pool game allows you to win tokens from the liquidity pool provided by the host. The amount you can will be decided by the odd value that host set for each option.`,
  },
  {
    id: 3,
    question: 'If I win, when do I receive my payout?',
    content: `<p>If it's the game that host will provide answer. You will be able to claim your payout 48h after the result is confirmed (after end date).</p>
    <p>If it's the game that has automatic result provided by RapidAPI, then you can claim your payout immediately after end date
    </p>`,
  },
  {
    id: 4,
    question: 'Where can I claim my payout?',
    content: `You can claim your winning under All Prediction list within the game or in history page`,
  },
];

const questionListPvP = [
  {
    id: 1,
    question: 'How is my payout calculated in Peer to peer & Prize game?',
    content: `
    <p>Your pay out is calculated based on your predict amount among the total amount placed on the prediction. Example, the game you play has prize pool of 0.5 ETH. The prediction amount on other options (which are the options you do not select) is 0.4 ETH. If you place 0.02 ETH prediction on Option A, and the total prediction amount placed on Option A is 0.12 ETH (including your 0.02 ETH), then your expected payout will be (0.02 / 0.12) * (0.4 + 0.5) = 0.15 ETH.
    </p>
    <p>Keep in mind that the predict amount may be limited by the size of the liquidity pool that the host provided.</p>`,
  },
  {
    id: 2,
    question: 'What is Peer to peer & Prize game?',
    content: `Peer to peer & Prize game allows you to wager against each other and win tokens from the losers and from the prize pool provided by the host.`,
  },
  {
    id: 3,
    question: 'If I win, when do I receive my payout?',
    content: `<p>If it's the game that host will provide answer. You will be able to claim your payout 48h after the result is confirmed (after end date).</p>
    <p>If it's the game that has automatic result provided by RapidAPI, then you can claim your payout immediately after end date
    </p>`,
  },
  {
    id: 4,
    question: 'Where can I claim my payout?',
    content: `You can claim your winning under All Prediction list within the game or in history page`,
  },
];
