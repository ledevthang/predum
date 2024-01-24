import {
  Box,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import Decimal from 'decimal.js';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Web3 from 'web3';

import { BNB_TOKEN } from 'common';
import Balance from 'components/BetSlip/Balance';
import { betSlipItem } from 'components/BetSlip/betSlipItem';
import CommonInput from 'components/common/CommonInput';
import CommonSelectInput from 'components/common/CommonSelectInput';
import LoadingButton from 'components/common/LoadingButton';
import CustomDialog from 'components/dialog/CustomDialog';
import PredictAcceptDialog from 'components/dialog/PredictAcceptedDialog';
import WalletConnectDialog from 'components/WalletConnect';
import PredictedDialog from 'containers/SharePredict/PredictedDialog';
import { LocalStorageEnum } from 'enums/auth';
import {
  checkApproveTx,
  convertThousandSeperator,
  convertWeiToToken,
  getMinPredictionValue,
  getNameToken,
  renderShortAddress,
} from 'helpers';
import { usePlatformFee } from 'hooks/usePlatformFee';
import { predictionABI } from 'services/contract';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { updateEventAfterPredictSuccess } from 'store/actions/eventActions';
import { getAllPredictionEachEventAction } from 'store/actions/predictionActions';
import {
  resetSideBarStateAction,
  updateSideBarStateAction,
} from 'store/actions/sideBarActions';
import { getAllTokensActionByJSON } from 'store/actions/tokensActions';
import { getUserBalance } from 'store/actions/userActions';
import {
  getEventDetail,
  getNewTokenState,
  getSideBarState,
  getUserState,
} from 'store/selectors';
import { IEvent } from 'types/event';
import { EventType, WhoTakeWith } from 'types/hostPrediction';
import { IPrediction } from 'types/prediction';
import localStorageUtils from 'utils/LocalStorage';

import { useStyles } from './BetSlipDetailEventStyles';

interface IProps {
  event: IEvent;
}

const BetSlipDetailEvent = ({ event }: IProps) => {
  const classes = useStyles();
  const { library, account, active } = useWeb3React();
  const [betSlipData, setBetSlipData] = useState<betSlipItem>();
  const userState = useSelector(getUserState);
  const eventDetail = useSelector(getEventDetail);
  const sideBar = useSelector(getSideBarState);
  const { themeWidget } = useParams<{ themeWidget: string }>();
  const isWidget = location.pathname.includes('widget');
  const dispatch = useDispatch();
  const [maxPredictValue, setMaxPredictValue] = useState('0');
  const [potentialPayout, setPotentialPayout] = useState('0');
  const [prize, setPrize] = useState('0');
  const [errorBet, setErrorBet] = useState(false);
  const [insufficient, setInsufficient] = useState(false);
  const [overThanMaxPredict, setOverThanMaxPredict] = useState(false);
  const tokens = useSelector(getNewTokenState);
  const theme = useTheme();
  const web3 = new Web3(library?.provider || window.ethereum);
  const [timer, setTimer] = useState<number>(10000);
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { uvpPlatformFee: UVP_PLATFORM_FEE, uvuPlatformFee: P2P_PLATFORM_FEE } =
    usePlatformFee();

  useEffect(() => {
    sideBar.betSlipData
      ? setBetSlipData(sideBar.betSlipData)
      : setBetSlipData(undefined);
  }, [sideBar]);
  useEffect(() => {
    dispatch(getAllTokensActionByJSON());
  }, []);
  useEffect(() => {
    if (!timer) return;
    if (timer >= 0 && timer <= 1000) {
      window.location.reload();
    }
    const intervalId = setInterval(() => {
      setTimer(timer - 1000);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [event, timer]);
  useEffect(() => {
    setTimer(new Date(event.deadline).getTime() - new Date().getTime());
  }, [event]);
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
          gasPrice: web3.utils.toWei('0.5', 'gwei'),
        });
      dispatch(getUserBalance(library.provider, account));
      dispatch(
        updateEventAfterPredictSuccess(
          betSlipData.id,
          localStorageUtils.getItem(LocalStorageEnum.USER_ID) || '',
          JSON.stringify(betSlipData.eventTotalPool),
          () => {
            changeIsLoading(false);
            dispatch(
              updateDialogStateAction({
                open: true,
                component: <PredictAcceptDialog eventId={betSlipData.id} />,
                callback: () => {},
              }),
            );
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
        .getPotentialReward(id, token, index, web3.utils.toWei(`${amount}`))
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
  const debouncedGetPotential = debounce(getPotentialAmount, 2000);
  const maxPredictAmount = useMemo(() => {
    const selectedToken = sideBar.organizingMethod.betting[0].token;
    const userBalance = userState.userBalance;
    let balance = '';
    userBalance.forEach((t) => {
      if (t.token == selectedToken) balance = t.balance;
    });
    return balance;
  }, [sideBar.organizingMethod.betting[0].token, userState]);
  useEffect(() => {
    setPotentialPayout('0');
    debouncedGetPotential();
  }, [
    sideBar.betSlipData?.id,
    sideBar.betSlipData?.index,
    sideBar.organizingMethod.betting[0].liquidityPool,
    sideBar.organizingMethod.betting[0].token,
    P2P_PLATFORM_FEE,
  ]);
  useEffect(() => {
    const value = +sideBar.organizingMethod.betting[0].liquidityPool;
    if (!active) {
      setInsufficient(false);
    } else if (!insufficient && value > +maxPredictAmount) {
      setInsufficient(true);
    } else if (insufficient && value <= +maxPredictAmount) {
      setInsufficient(false);
    }

    if (Number(maxPredictValue)) {
      if (!overThanMaxPredict && value > +maxPredictValue) {
        setOverThanMaxPredict(true);
      } else if (overThanMaxPredict && value <= +maxPredictValue) {
        setOverThanMaxPredict(false);
      }
    }
  }, [
    active,
    sideBar.organizingMethod.betting[0].liquidityPool,
    maxPredictAmount,
    maxPredictValue,
  ]);
  const chains = useMemo(() => {
    return tokens.map((token) => {
      return {
        value: token.name,
        id: token.address,
        Icon: <CardMedia image={token.logo} className={classes.coin} />,
      };
    });
  }, [classes.coin, tokens]);
  const renderIconToken = useMemo(() => {
    let temp = chains.filter((t, i) => t.value == renderTokenName);
    if (renderTokenName) {
      return temp[0].Icon;
    } else return '';
  }, [chains, renderTokenName]);
  const renderChains = useMemo(() => {
    let newChains = !sideBar.betSlipData?.chains
      ? chains
      : chains.filter((c) => sideBar.betSlipData?.chains.includes(c.id));
    if (eventDetail) {
      newChains = chains.filter((c, i) => {
        return eventDetail.tokens?.includes(c.id);
      });
    }
    return newChains.map((c) => ({
      id: c.id,
      value: c.value,
      Icon: c.Icon,
    }));
  }, [
    chains,
    sideBar.betSlipData?.chains,
    sideBar.betSlipData?.eventType,
    eventDetail,
  ]);
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

  useEffect(() => {
    if (sideBar.betSlipData?.id == 0 || sideBar.betSlipData?.id) {
      const newOption: any = [...sideBar.organizingMethod.betting];
      newOption[0]['liquidityPool'] = sideBar.isSaveData
        ? sideBar.organizingMethod.betting[0].liquidityPool
        : getMinPredictionValue(newOption[0].token);
      dispatch(
        updateSideBarStateAction({
          ...sideBar,
          organizingMethod: {
            ...sideBar.organizingMethod,
            betting: newOption,
          },
        }),
      );
    }
  }, [sideBar.organizingMethod.betting[0].token, sideBar.betSlipData?.id]);

  useEffect(() => {
    if (renderChains.length == 0) return;
    const newOption: any = [...sideBar.organizingMethod.betting];
    newOption[0]['token'] = sideBar.isSaveData
      ? sideBar.organizingMethod.betting[0].token
      : renderChains[0].id;
    dispatch(
      updateSideBarStateAction({
        ...sideBar,
        organizingMethod: {
          ...sideBar.organizingMethod,
          betting: newOption,
        },
      }),
    );
  }, [renderChains]);
  const isUvP = useMemo(() => {
    return (
      JSON.parse(event.metadata || '{}').eventType != WhoTakeWith.USER_USER
    );
  }, [event]);
  const renderPoolValuesInfo = (amount: any) => {
    let token: any = [];
    Object.keys(amount)
      .filter((a) => !!Number(amount[a] || '0'))
      .map((p, i) => {
        token.push({
          name: getNameToken(p),
          wei: convertWeiToToken(amount[p]),
        });
      });
    token = token.filter((t: any, i: number) => t.name == renderTokenName);
    const result = token.map((t: any, i: number) => {
      return convertThousandSeperator(t.wei);
    });
    return result;
  };

  const handleMaxValue = useCallback(() => {
    if (!active) return;
    const newOption: any = [...sideBar.organizingMethod.betting];
    newOption[0].liquidityPool = maxPredictAmount;
    dispatch(
      updateSideBarStateAction({
        ...sideBar,
        organizingMethod: {
          ...sideBar.organizingMethod,
          betting: newOption,
        },
      }),
    );
  }, [maxPredictAmount, sideBar, active]);
  const minPredictAmount = useMemo(() => {
    return getMinPredictionValue(sideBar.organizingMethod.betting[0].token);
  }, [sideBar.organizingMethod.betting[0].token]);

  const renderHelperText = useMemo(() => {
    if (errorBet)
      return `Min predict amount >= ${convertThousandSeperator(
        minPredictAmount,
      )}`;
    if (insufficient) return 'Insufficient amount';
    if (overThanMaxPredict)
      return `Max predict amount is ${convertThousandSeperator(
        maxPredictValue,
      )}`;
    return '';
  }, [
    errorBet,
    minPredictAmount,
    insufficient,
    overThanMaxPredict,
    maxPredictValue,
  ]);

  const handleChangeUnit = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setErrorBet(false);
      let newValue = event.target.value;
      const name = event.target.name.split('-');
      const newOption: any = [...sideBar.organizingMethod.betting];
      newOption[+name[1]][name[0]] = newValue;
      newOption[0].liquidityPool = getMinPredictionValue(newValue);

      dispatch(
        updateSideBarStateAction({
          ...sideBar,
          organizingMethod: {
            eventType: sideBar.organizingMethod.eventType,
            betting: newOption,
          },
        }),
      );
    },
    [dispatch, sideBar.organizingMethod, sideBar],
  );

  const handleChangeBetValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;
      if (newValue.includes(',')) {
        newValue = newValue.replace(/,/g, '');
      }
      const name = event.target.name.split('-');
      if (!errorBet && +newValue < +minPredictAmount) {
        setErrorBet(true);
      } else if (errorBet && +newValue >= +minPredictAmount) {
        setErrorBet(false);
      }

      const newOption: any = [...sideBar.organizingMethod.betting];
      newOption[+name[1]][name[0]] = newValue;

      dispatch(
        updateSideBarStateAction({
          ...sideBar,
          organizingMethod: {
            ...sideBar.organizingMethod,
            betting: newOption,
          },
        }),
      );
    },
    [
      dispatch,
      sideBar.organizingMethod,
      sideBar,
      errorBet,
      maxPredictValue,
      active,
    ],
  );
  const handleBuyToken = (name: string) => {
    let url = '';
    tokens.forEach((t, i) => {
      if (t.name == name) url = t.linkBuy;
    });
    window.open(url, '_blank')?.focus();
  };
  const renderBuyToken = () => {
    return (
      <Box
        className={classes.buyToken}
        style={{
          display: renderTokenName == 'ETH' ? 'none' : 'block',
        }}
      >
        <Typography onClick={() => handleBuyToken(renderTokenName)}>
          Buy {renderTokenName}
        </Typography>
      </Box>
    );
  };
  const titleAnnotate = () => {
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
      </>
    );
  };
  const renderPvPTitleAnnotate = () => {
    const fee = sideBar.betSlipData?.hostFee
      ? (sideBar.betSlipData?.hostFee + 100) / 100
      : 0;
    return (
      <>
        <Typography>
          {isUvP
            ? '0.5% of total predicted amount will be deducted as fee'
            : `${fee}% winner's profit will be deducted as fee`}
        </Typography>
      </>
    );
  };
  return (
    <Box>
      {!isDesktop &&
        (sideBar.betSlipData?.id == 0 || sideBar.betSlipData?.id) && (
          <Box className={classes.selectedOption}>
            <Typography>Selected Option: </Typography>
            <Typography>
              {web3.utils.isAddress(sideBar.betSlipData.nameOdds.toUpperCase())
                ? renderShortAddress(sideBar.betSlipData.nameOdds, 20, 4)
                : sideBar.betSlipData.nameOdds}
            </Typography>
          </Box>
        )}
      <Box className={classes.wrapper}>
        <Box className={classes.wrapper2}>
          <Box
            className={
              themeWidget == 'light'
                ? classes.predictTitleLight
                : classes.predictTitle
            }
          >
            <Typography>Predict Amount</Typography>
            {/* {JSON.parse(event.metadata || '{}').eventType !=
          WhoTakeWith.USER_USER &&
          (isDesktop ? (
            <CommonTooltip title={titleAnnotate()}>
              <InfoIcon />
            </CommonTooltip>
          ) : (
            <CommonTooltipMobile title={titleAnnotate()}>
              <InfoIcon />
            </CommonTooltipMobile>
          ))} */}
            {active &&
              (sideBar.betSlipData?.id == 0 || sideBar.betSlipData?.id) && (
                <Balance token={sideBar.organizingMethod.betting[0].token} />
              )}
          </Box>

          {
            <Box className={classes.placeBet}>
              <Box
                className={classes.inputBet}
                style={{
                  backgroundColor:
                    themeWidget == 'light' ? '#e8e8e8' : '#616161',
                }}
              >
                <CommonInput
                  placeholder={'Place predict'}
                  name={`liquidityPool-0`}
                  value={convertThousandSeperator(
                    sideBar.organizingMethod.betting[0].liquidityPool,
                    true,
                  )}
                  onChange={handleChangeBetValue}
                  className={
                    themeWidget == 'light' ? classes.inputLight : classes.input
                  }
                  error={errorBet || insufficient || overThanMaxPredict}
                  helperText={renderHelperText}
                />
                <Box className={classes.buttonMax} onClick={handleMaxValue}>
                  Max
                </Box>
              </Box>
              {sideBar.organizingMethod.betting.map((b, i) => (
                <Box className={classes.wrapperPool} key={i}>
                  <CommonSelectInput
                    values={renderChains}
                    onChange={handleChangeUnit}
                    currentValue={b.token}
                    className={
                      themeWidget == 'light'
                        ? classes.selectCoinLight
                        : classes.selectCoin
                    }
                    label="Token selector"
                    name={`token-${i}`}
                  />
                </Box>
              ))}
              {renderTokenName && renderBuyToken()}
            </Box>
          }
        </Box>
        <Box className={classes.walletInfoWapper}>
          {active && (
            <Box className={classes.balanceWapper}>
              <Box
                className={classes.tooltip}
                style={{
                  color: themeWidget == 'light' ? '#1c1c1e' : '#bdbdbd',
                }}
              >
                Potential payout :
              </Box>
              <Box className={classes.totalNumber}>
                <Typography>
                  {betSlipData?.prize
                    ? ` ${convertThousandSeperator(
                        (+prize + +potentialPayout)
                          .toFixed(4)
                          .replace(/\.0+$/, ''),
                      )} `
                    : convertThousandSeperator(
                        (+potentialPayout).toFixed(4).replace(/\.0+$/, ''),
                      )}
                </Typography>

                {renderIconToken}
                <Typography>{` ${renderTokenName}`}</Typography>
              </Box>
            </Box>
          )}
          <Box
            className={
              themeWidget == 'light' ? classes.moreNotiLight : classes.moreNoti
            }
          >
            <Box display="flex">
              {!isUvP ? (
                <>
                  <Typography>You may win</Typography>
                  <Typography className={classes.highlightNoti}>
                    {event.hostFee / 100 +
                      (isUvP
                        ? UVP_PLATFORM_FEE * 100
                        : P2P_PLATFORM_FEE * 100)}{' '}
                    %
                  </Typography>
                  <Typography>of the</Typography>
                  <Typography className={classes.highlightNoti}>
                    {renderPoolValuesInfo(event.poolTokenAmounts)}
                  </Typography>
                  <Typography>prize pool.</Typography>
                </>
              ) : (
                <>
                  <Typography>You may predict up to</Typography>
                  <Typography className={classes.highlightNoti}>
                    {convertThousandSeperator(
                      Number(maxPredictValue).toFixed(5).replace(/\.0+$/, ''),
                    )}{' '}
                    {renderTokenName}
                  </Typography>
                  <Typography>on this option</Typography>
                </>
              )}
            </Box>
            <Box display="flex">
              {!isUvP && (
                <Typography>The payout may change in the future.</Typography>
              )}
              {/* <Box>
                <Typography
                  style={{
                    color: '#029ADE',
                    marginLeft: isUvP ? 0 : 2,
                    cursor: 'pointer',
                  }}
                >
                  Learn more
                </Typography>
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent={isWidget ? 'space-between' : 'center'}
        style={{
          width: '100%',
        }}
      >
        <LoadingButton
          isLoading={sideBar.isLoading}
          disabled={disabled}
          className={classes.notiWapper}
          onClick={onPlacePrediction}
        >
          Place predict now
        </LoadingButton>
        {isWidget && (
          <Box className="center-root">
            <Typography
              style={{
                color: '#3FADD5',
                fontSize: 14,
                marginRight: 3,
              }}
            >
              Powered by
            </Typography>
            <Typography
              style={{
                color: '#3FADD5',
                fontSize: 14,
                fontWeight: 700,
                paddingRight: 8,
              }}
            >
              Predum.io
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BetSlipDetailEvent;
