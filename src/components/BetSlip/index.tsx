import {
  Box,
  CardMedia,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import Decimal from 'decimal.js';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
//@ts-ignore
import { Slide } from 'react-slideshow-image';
import Web3 from 'web3';

import { BNB_TOKEN } from 'common';
import CommonTooltip from 'components/common/CommonTooltip';
import CommonTooltipMobile from 'components/common/CommonTooltipMobile';
import LoadingButton from 'components/common/LoadingButton';
import CustomDialog from 'components/dialog/CustomDialog';
import FailedDialog from 'components/dialog/FailedDialog';
import WalletConnectDialog from 'components/WalletConnect';
import PredictedDialog from 'containers/SharePredict/PredictedDialog';
import { LocalStorageEnum } from 'enums/auth';
import {
  checkApproveTx,
  convertThousandSeperator,
  convertWeiToToken,
  getMinPredictionValue,
  getNameToken,
} from 'helpers';
import { usePlatformFee } from 'hooks/usePlatformFee';
import InfoIcon from 'icon/InfoIcon';
import { predictionABI } from 'services/contract';
import eventService from 'services/event';
import bannerService from 'services/public';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { updateEventAfterPredictSuccess } from 'store/actions/eventActions';
import { getAllPredictionEachEventAction } from 'store/actions/predictionActions';
import {
  resetSideBarStateAction,
  updateSideBarStateAction,
} from 'store/actions/sideBarActions';
import { getUserBalance } from 'store/actions/userActions';
import { getSideBarState, getUserState } from 'store/selectors';
import { EventType, WhoTakeWith } from 'types/hostPrediction';
import { IPrediction } from 'types/prediction';
import { IBanner } from 'types/public';
import localStorageUtils from 'utils/LocalStorage';

import Balance from './Balance';
import { betSlipItem, BetSlipItem } from './betSlipItem';
import { useStyles } from './styles';

import 'react-slideshow-image/dist/styles.css';

export const BetSlip = () => {
  const classes = useStyles();
  const sideBar = useSelector(getSideBarState);
  const { library, account, active } = useWeb3React();
  const [betSlipData, setBetSlipData] = useState<betSlipItem>();
  const userState = useSelector(getUserState);
  const [prize, setPrize] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const history = useHistory();
  const dispatch = useDispatch();
  const [maxPredictValue, setMaxPredictValue] = useState('0');
  const [potentialPayout, setPotentialPayout] = useState('0');
  const { uvpPlatformFee: UVP_PLATFORM_FEE, uvuPlatformFee: P2P_PLATFORM_FEE } =
    usePlatformFee();
  const [banners, setBanners] = useState<IBanner[]>([]);

  useEffect(() => {
    (async () => {
      const data = await bannerService.GetAllRightBanners();
      setBanners(data);
    })();
  }, []);

  const changeIsLoading = (isLoading: boolean) => {
    dispatch(
      updateSideBarStateAction({
        ...sideBar,
        isLoading: isLoading,
      }),
    );
  };

  const onPlacePrediction = async () => {
    if (!active) {
      dispatch(
        updateDialogStateAction({
          open: true,
          component: <WalletConnectDialog />,
        }),
      );
      return;
    }
    if (!sideBar.betSlipData?.id) {
      dispatch(
        updateDialogStateAction({
          open: true,
          component: (
            <CustomDialog content="Please select an option first before placing a prediction" />
          ),
        }),
      );
      return;
    }
    if (!library?.provider || !betSlipData || !account) return;
    changeIsLoading(true);
    const newEvent = await eventService.GetEventDetail(
      `${sideBar.betSlipData?.id}`,
    );
    if (new Date(newEvent.deadline).getTime() < new Date().getTime()) {
      dispatch(
        updateDialogStateAction({
          component: (
            <FailedDialog reason={'You cannot predict after deadline'} />
          ),
          open: true,
        }),
      );
      dispatch(resetSideBarStateAction());
      return;
    }
    const web3 = new Web3(library.provider || window.ethereum);
    const contract = new web3.eth.Contract(
      predictionABI as any,
      process.env.REACT_APP_PREDICTION,
    );
    const betting = sideBar.organizingMethod.betting;
    const amount = betting
      .map((b) => (b.token == BNB_TOKEN ? +b.liquidityPool : 0))
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
      }, 0);
    try {
      if (betting[0].token !== BNB_TOKEN)
        await checkApproveTx(
          web3,
          account,
          betting[0].liquidityPool,
          betting[0].token,
        );
      await contract.methods
        .predict(
          betSlipData.id,
          [betSlipData.index],
          betting.map((b) => b.token),
          betting.map((b) => web3.utils.toWei(`${b.liquidityPool}`, 'ether')),
        )
        .send({
          from: account,
          value: web3.utils.toWei(`${amount}`),
          // gas: 800000,
          // gasPrice: web3.utils.toWei('0.1', 'gwei'),
        });
      dispatch(getUserBalance(library.provider, account));
      dispatch(
        updateEventAfterPredictSuccess(
          betSlipData.id,
          localStorageUtils.getItem(LocalStorageEnum.USER_ID) || '',
          JSON.stringify(betSlipData.eventTotalPool),
          () => {
            changeIsLoading(false);
            // dispatch(
            //   updateDialogStateAction({
            //     open: true,
            //     component: <PredictAcceptDialog eventId={betSlipData.id} />,
            //     callback: () => {},
            //   }),
            // );
            dispatch(resetSideBarStateAction());
            dispatch(
              getAllPredictionEachEventAction(
                {
                  pageNumber: 1,
                  pageSize: 20,
                  eventId: +betSlipData.id,
                  orderBy: 'latest',
                },
                (data: IPrediction) => {
                  dispatch(
                    updateDialogStateAction({
                      open: true,
                      component: (
                        <PredictedDialog
                          eventId={betSlipData.id}
                          predictDetail={data}
                          isPredict
                        />
                      ),
                      callback: () => {},
                    }),
                  );
                },
              ),
            );
          },
        ),
      );
    } catch (e) {
      changeIsLoading(false);
    }
  };

  useEffect(() => {
    sideBar.betSlipData
      ? setBetSlipData(sideBar.betSlipData)
      : setBetSlipData(undefined);
  }, [sideBar]);

  const renderBalance = useMemo(() => {
    if (!active) return '';
    const selectedToken = sideBar.organizingMethod.betting[0].token;
    const userBalance = userState.userBalance;
    let balance = '';
    userBalance.forEach((t) => {
      if (t.token == selectedToken) balance = t.balance;
    });
    return balance;
  }, [userState, sideBar.organizingMethod.betting[0].token, active]);

  const renderTokenName = useMemo(() => {
    if (sideBar.betSlipData?.id != 0 && !sideBar.betSlipData?.id) return '';
    return getNameToken(sideBar.organizingMethod.betting[0].token);
  }, [sideBar.organizingMethod.betting[0].token, sideBar.betSlipData?.id]);

  const disabled = useMemo(() => {
    if (!active) return false;
    const liquidityPool = sideBar.organizingMethod.betting[0].liquidityPool;
    const test =
      sideBar.isLoading ||
      !sideBar.organizingMethod.betting[0].token ||
      !liquidityPool;
    if (test) return false;
    const min = getMinPredictionValue(
      sideBar.organizingMethod.betting[0].token,
    );
    if (+min > +liquidityPool) {
      return true;
    }
    if (+renderBalance < +liquidityPool) {
      return true;
    }
    if (Number(maxPredictValue) && +liquidityPool > Number(maxPredictValue)) {
      return true;
    }
    return false;
  }, [sideBar.isLoading, sideBar, active, maxPredictValue, renderBalance]);

  const getTotalPotentialAmount = useCallback(async () => {
    if (sideBar.betSlipData?.id != 0 && !sideBar.betSlipData?.id) return;
    const web3 = new Web3(library?.provider || window.ethereum);
    const contract = new web3.eth.Contract(
      predictionABI as any,
      process.env.REACT_APP_PREDICTION,
    );
    const eventId = sideBar.betSlipData.id;
    const index = sideBar.betSlipData.index;
    try {
      const res = await contract.methods
        .getMaxPayout(eventId, sideBar.organizingMethod.betting[0].token, index)
        .call();
      console.log(res);
      setMaxPredictValue(convertWeiToToken(res));
    } catch (e) {
      setMaxPredictValue('0');
    }
  }, [
    library?.provider,
    sideBar.betSlipData?.id,
    sideBar.betSlipData?.index,
    sideBar.organizingMethod.betting[0].token,
  ]);

  useEffect(() => {
    if (sideBar.betSlipData?.type != EventType.GROUP_PREDICT) {
      getTotalPotentialAmount();
    } else {
      setMaxPredictValue('0');
    }
  }, [
    sideBar.betSlipData?.id,
    sideBar.betSlipData?.index,
    sideBar.organizingMethod.betting[0].token,
  ]);

  const getSponsorPotential = async (
    web3: Web3,
    contract: any,
    id: number,
    token: string,
    index: number,
    amount: string,
  ) => {
    try {
      const res = await contract.methods
        .calculateSponsor(id, token, index, web3.utils.toWei(amount))
        .call();
      return res;
    } catch (e) {
      return '0';
    }
  };
  const getPotentialAmount = async () => {
    if (sideBar.betSlipData?.id != 0 && !sideBar.betSlipData?.id) return;
    const web3 = new Web3(library?.provider || window.ethereum);
    const contract = new web3.eth.Contract(
      predictionABI as any,
      process.env.REACT_APP_PREDICTION,
    );
    const id = sideBar.betSlipData.id;
    const token = sideBar.organizingMethod.betting[0].token;
    const index = sideBar.betSlipData.index;
    const amount = sideBar.organizingMethod.betting[0].liquidityPool;
    try {
      const res = await contract.methods
        .getPotentialReward(id, token, index, web3.utils.toWei(amount))
        .call();
      const sponsorValue = await getSponsorPotential(
        web3,
        contract,
        id,
        token,
        index,
        amount,
      );
      const resToken = web3.utils.fromWei(res);
      const sponsorValueToken = web3.utils.fromWei(sponsorValue);
      setPrize(convertWeiToToken(sponsorValue, 4));
      const eventType = sideBar.betSlipData.eventType;
      const potential =
        eventType != WhoTakeWith.USER_USER
          ? new Decimal(resToken).mul(1 - UVP_PLATFORM_FEE).toString()
          : new Decimal(
              new Decimal(resToken).minus(sponsorValueToken).minus(amount),
            )
              .mul(1 - P2P_PLATFORM_FEE - sideBar.betSlipData.hostFee / 10000)
              .add(amount)
              .toString();
      setPotentialPayout(potential);
    } catch (e) {
      console.log('potential error', e);
    }
  };

  const debouncedGetPotential = debounce(() => {
    getPotentialAmount();
  }, 2000);

  useEffect(() => {
    setPotentialPayout('0');
    debouncedGetPotential();
  }, [
    sideBar.betSlipData?.id,
    sideBar.betSlipData?.index,
    sideBar.organizingMethod.betting[0].liquidityPool,
    sideBar.organizingMethod.betting[0].token,
    UVP_PLATFORM_FEE,
    P2P_PLATFORM_FEE,
  ]);
  const renderPrize = () => {
    const prize = betSlipData?.prize;
    if (!prize) return;
    let index = 0;
    prize?.forEach((p, i) => {
      if (p.name == renderTokenName) index = i;
    });
    return prize[index].value;
  };
  const onRedirectTo = useCallback(
    (path: string, newTab: boolean) => {
      dispatch(
        updateSideBarStateAction({
          ...sideBar,
          isOpen: false,
        }),
      );
      if (history.location.pathname != path) {
        const win = newTab ? window.open(path, '_blank') : history.push(path);
        win && win.focus();
        window.scrollTo(0, 0);
      }
    },
    [history],
  );
  const renderTitleAnnotate = () => {
    const isUvU = sideBar.betSlipData?.eventType == WhoTakeWith.USER_USER;
    const fee = sideBar.betSlipData?.hostFee
      ? sideBar.betSlipData?.hostFee / 100
      : 0;
    return (
      <>
        <Typography>
          Your predicted amount can be limited to ensure that the liquidity pool
          can pay off all the winners.
        </Typography>
        <Typography>
          Once an option reaches its predicted amount limit, it will be locked
          and you can only predict on other option
        </Typography>
        <Typography>
          {isUvU
            ? `${fee}% winner's profit will be deducted as fee`
            : '0.5% of total predicted amount will be deducted as fee'}
        </Typography>
      </>
    );
  };
  const renderPvPTitleAnnotate = () => {
    const isUvU = sideBar.betSlipData?.eventType == WhoTakeWith.USER_USER;
    const fee = sideBar.betSlipData?.hostFee
      ? (sideBar.betSlipData?.hostFee + 100) / 100
      : 0;
    return (
      <>
        <Typography>
          {isUvU
            ? `${fee}% winner's profit will be deducted as fee`
            : '0.5% of total predicted amount will be deducted as fee'}
        </Typography>
      </>
    );
  };

  const onRedirectToPage = useCallback((link: string) => {
    if (link.startsWith('/') && history.location.pathname != link) {
      history.push(link);
      return;
    }
    if (window.location.href != link) window.open(link, '_blank');
  }, []);

  return (
    <Box className={classes.wapperBetSlip}>
      <Box className={classes.betSlip}>
        <Box className={classes.title}>
          Predict Slip
          {betSlipData?.id &&
            (isDesktop ? (
              <CommonTooltip
                title={
                  betSlipData.eventType == WhoTakeWith.USER_USER
                    ? renderPvPTitleAnnotate()
                    : renderTitleAnnotate()
                }
              >
                <InfoIcon width={16} height={16} />
              </CommonTooltip>
            ) : (
              <CommonTooltipMobile
                title={
                  betSlipData.eventType == WhoTakeWith.USER_USER
                    ? renderPvPTitleAnnotate()
                    : renderTitleAnnotate()
                }
              >
                <InfoIcon width={16} height={16} />
              </CommonTooltipMobile>
            ))}
        </Box>
        <Box>
          {betSlipData ? (
            <Box key={betSlipData.id}>
              <BetSlipItem
                id={betSlipData.id}
                icon={betSlipData.icon}
                typeBet={betSlipData.typeBet}
                category={betSlipData.category}
                subCategory={betSlipData.subCategory}
                title={betSlipData.title}
                odds={betSlipData.odds}
                nameOdds={betSlipData.nameOdds}
                marketType={betSlipData.marketType}
                handicap={betSlipData.handicap}
                chains={betSlipData.chains}
                prize={betSlipData.prize}
                index={betSlipData.index}
                maxPredictValue={maxPredictValue}
                type={betSlipData.type}
                eventType={betSlipData.eventType}
                hostFee={betSlipData.hostFee}
              ></BetSlipItem>
              <Divider className={classes.devider} />
            </Box>
          ) : (
            <Typography className={classes.emptyText}>
              Your predict slip is empty
            </Typography>
          )}
        </Box>
        <Box className={classes.walletInfoWapper}>
          {active && (sideBar.betSlipData?.id == 0 || betSlipData?.id) && (
            <Balance token={sideBar.organizingMethod.betting[0].token} />
          )}
          {active && (
            <Box className={classes.balanceWapper}>
              <Box> Potential payout:</Box>
              <Box className={classes.totalNumber}>
                {`${convertThousandSeperator(
                  Number(potentialPayout).toFixed(5).replace(/\.0+$/, ''),
                )} `}
                {betSlipData?.prize && ` + ${convertThousandSeperator(prize)} `}
                {renderTokenName}
                {betSlipData?.prize && ` Prize`}
              </Box>
            </Box>
          )}
        </Box>
        <LoadingButton
          isLoading={sideBar.isLoading}
          disabled={disabled}
          className={classes.notiWapper}
          onClick={onPlacePrediction}
        >
          Place your predict now
        </LoadingButton>
      </Box>
      {/* <Box>
        <CardMedia
          image="/images/bannerSideBar.png"
          className={classes.banner}
        />
      </Box> */}
      <Box className={classes.containerRecentBet}>
        <Slide
          infinite
          duration={30000}
          transitionDuration={500}
          arrows={false}
          indicators={(index: number) =>
            isDesktop ? <Box className={classes.indicator}></Box> : <></>
          }
        >
          {banners.map((v, i) => (
            <CardMedia
              key={i}
              image={v.logo}
              className={classes.banner}
              onClick={() => onRedirectToPage(v.link)}
            />
          ))}
        </Slide>
      </Box>
      {!isDesktop && (
        <></>
        // <Box className={classes.menu}>
        //   <Typography
        //     onClick={() => onRedirectTo(clientRoutesEnum.INTRODUCE, false)}
        //   >
        //     Introduction
        //   </Typography>
        //   <Typography
        //     onClick={() => onRedirectTo(clientRoutesEnum.ROADMAP, false)}
        //   >
        //     Roadmap
        //   </Typography>
        //   <Typography
        //     onClick={() => onRedirectTo(clientRoutesEnum.PARTNER, false)}
        //   >
        //     Partner
        //   </Typography>
        //   {/* <Typography onClick={() => onRedirectTo('/', false)}>
        //     Prediction
        //   </Typography> */}
        //   <Box display="flex" position="absolute">
        //     <Typography
        //       onClick={() => onRedirectTo('/decentralized-pool', false)}
        //     >
        //       Liquidity Pool
        //     </Typography>
        //     <Typography
        //       style={{
        //         color: '#3FADD5',
        //         marginLeft: '4px',
        //         lineHeight: 'unset',
        //         textTransform: 'unset',
        //         fontSize: 12,
        //         position: 'relative',
        //         top: '-6px',
        //         textShadow:
        //           '0 0 7px #77776c, 0 0 13px #6d6c52, 0 0 19px #707238, 0 0 25px #94872d',
        //       }}
        //       className="blink_me"
        //     >
        //       New
        //     </Typography>
        //   </Box>
        // </Box>
      )}
    </Box>
  );
};
