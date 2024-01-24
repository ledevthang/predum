import { Box, CardMedia } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import CommonInput from 'components/common/CommonInput';
import CommonSelectInput from 'components/common/CommonSelectInput';
import {
  convertThousandSeperator,
  getMinPredictionValue,
  getNameToken,
  renderShortAddress,
} from 'helpers';
import DeleteIcon from 'icon/sidebar/DeleteIcon';
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetSideBarStateAction,
  updateSideBarStateAction,
} from 'store/actions/sideBarActions';
import {
  getAllTokensAction,
  getAllTokensActionByJSON,
} from 'store/actions/tokensActions';
import {
  getNewTokenState,
  getSideBarState,
  getUserState,
} from 'store/selectors';
import { WhoTakeWith } from 'types/hostPrediction';
import Web3 from 'web3';
import { useStyles } from './styles';

export type betSlipItem = {
  id: number;
  title: string;
  icon: ReactElement;
  category?: string;
  typeBet?: string;
  odds?: number;
  prize?: {
    value: string;
    name: string;
  }[];
  address?: string;
  eventTotalPool?: any;
  nameOdds: string;
  subCategory?: string;
  handicap?: string;
  marketType?: string;
  chains: string[];
  index: number;
  type: string;
  eventType: WhoTakeWith;
  hostFee: number;
};
export const BetSlipItem = ({
  title,
  category,
  typeBet,
  odds,
  nameOdds,
  subCategory,
  icon,
  prize,
  index,
  handicap,
  maxPredictValue,
}: betSlipItem & { maxPredictValue: string }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sideBarState = useSelector(getSideBarState);
  const [errorBet, setErrorBet] = useState(false);
  const [insufficient, setInsufficient] = useState(false);
  const [overThanMaxPredict, setOverThanMaxPredict] = useState(false);
  const userState = useSelector(getUserState);
  const tokens = useSelector(getNewTokenState);
  const { active, library } = useWeb3React();
  const web3 = new Web3(library?.provider || window.ethereum);
  const deleteCurrentBetSlip = useCallback(() => {
    dispatch(resetSideBarStateAction());
  }, [dispatch]);
  const minPredictAmount = useMemo(() => {
    return getMinPredictionValue(
      sideBarState.organizingMethod.betting[0].token,
    );
  }, [sideBarState.organizingMethod.betting[0].token]);
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
        Icon: <CardMedia image={token.logo} className={classes.coin} />,
      };
    });
  }, [classes.coin, tokens]);

  const renderChains = useMemo(() => {
    const newChains = !sideBarState.betSlipData?.chains
      ? chains
      : chains.filter((c) => sideBarState.betSlipData?.chains.includes(c.id));
    return newChains.map((c) => ({
      id: c.id,
      value: c.value,
      Icon: c.Icon,
    }));
  }, [
    chains,
    sideBarState.betSlipData?.chains,
    sideBarState.betSlipData?.eventType,
  ]);

  const handleChangeUnit = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setErrorBet(false);
      let newValue = event.target.value;
      const name = event.target.name.split('-');
      const newOption: any = [...sideBarState.organizingMethod.betting];
      newOption[+name[1]][name[0]] = newValue;
      newOption[0].liquidityPool = getMinPredictionValue(newValue);
      dispatch(
        updateSideBarStateAction({
          ...sideBarState,
          organizingMethod: {
            eventType: sideBarState.betSlipData?.eventType as any,
            betting: newOption,
          },
        }),
      );
    },
    [dispatch, sideBarState.organizingMethod, sideBarState],
  );

  const maxPredictAmount = useMemo(() => {
    const selectedToken = sideBarState.organizingMethod.betting[0].token;
    const userBalance = userState.userBalance;
    let balance = '';
    userBalance.forEach((t) => {
      if (t.token == selectedToken) balance = t.balance;
    });
    return balance;
  }, [sideBarState.organizingMethod.betting[0].token, userState]);

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

      const newOption: any = [...sideBarState.organizingMethod.betting];
      newOption[+name[1]][name[0]] = newValue;
      dispatch(
        updateSideBarStateAction({
          ...sideBarState,
          organizingMethod: {
            ...sideBarState.organizingMethod,
            betting: newOption,
          },
        }),
      );
    },
    [
      dispatch,
      sideBarState.organizingMethod,
      sideBarState,
      errorBet,
      maxPredictValue,
      active,
    ],
  );

  const renderHelperText = useMemo(() => {
    if (errorBet)
      return `Min predict amount >= ${convertThousandSeperator(
        minPredictAmount,
      )}`;
    if (insufficient) return 'Insufficient amount';
    if (overThanMaxPredict)
      return `Max predict amount is ${Number(maxPredictValue).toFixed(5)}`;
    return '';
  }, [
    errorBet,
    minPredictAmount,
    insufficient,
    overThanMaxPredict,
    maxPredictValue,
  ]);

  useEffect(() => {
    const value = +sideBarState.organizingMethod.betting[0].liquidityPool;
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
    sideBarState.organizingMethod.betting[0].liquidityPool,
    maxPredictAmount,
    maxPredictValue,
  ]);
  useEffect(() => {
    const newOption: any = [...sideBarState.organizingMethod.betting];
    newOption[0]['liquidityPool'] = sideBarState.isSaveData
      ? sideBarState.organizingMethod.betting[0].liquidityPool
      : getMinPredictionValue(newOption[0].token);
    dispatch(
      updateSideBarStateAction({
        ...sideBarState,
        organizingMethod: {
          ...sideBarState.organizingMethod,
          betting: newOption,
        },
      }),
    );
  }, [sideBarState.organizingMethod.betting[0].token]);
  useEffect(() => {
    if (renderChains.length == 0) return;
    const newOption: any = [...sideBarState.organizingMethod.betting];
    newOption[0]['token'] = sideBarState.isSaveData
      ? sideBarState.organizingMethod.betting[0].token
      : renderChains[0].id;
    dispatch(
      updateSideBarStateAction({
        ...sideBarState,
        organizingMethod: {
          ...sideBarState.organizingMethod,
          betting: newOption,
        },
      }),
    );
  }, [renderChains]);

  const handleMaxValue = useCallback(() => {
    if (!active) return;
    const newOption: any = [...sideBarState.organizingMethod.betting];
    newOption[0].liquidityPool = maxPredictAmount;
    dispatch(
      updateSideBarStateAction({
        ...sideBarState,
        organizingMethod: {
          ...sideBarState.organizingMethod,
          betting: newOption,
        },
      }),
    );
  }, [maxPredictAmount, sideBarState, active]);
  const handleBuyToken = () => {
    let token = getNameToken(sideBarState.organizingMethod.betting[0].token);
    let url = '';
    tokens.forEach((t, i) => {
      if (t.name == token) url = t.linkBuy;
    });
    window.open(url, '_blank')?.focus();
  };

  return (
    <Box className={classes.wapperBetSlipItem}>
      <Box className={classes.headerBetSlipItem}>
        <Box className={classes.titleEachBet}>{title}</Box>
        <Box onClick={deleteCurrentBetSlip}>
          <DeleteIcon color="#BDBDBD" height={16.67} width={16.67} />
        </Box>
      </Box>
      <Box className={classes.type}>
        {icon}
        <Box className={classes.typeBet}>
          {subCategory} / {typeBet}
        </Box>
      </Box>
      <Box className={classes.odds}>
        {odds && <Box className={classes.oddsNumber}>{odds}</Box>}
        <Box className={classes.oddsName}>
          {web3.utils.isAddress(nameOdds.toUpperCase())
            ? renderShortAddress(nameOdds, 20, 4)
            : nameOdds}
          {handicap && ` (${handicap})`}
        </Box>
      </Box>
      <Box className={classes.placeBet}>
        <Box className={classes.inputBet}>
          <CommonInput
            placeholder={'Place predict'}
            name={`liquidityPool-0`}
            value={convertThousandSeperator(
              sideBarState.organizingMethod.betting[0].liquidityPool,
              true,
            )}
            onChange={handleChangeBetValue}
            className={classes.input}
            error={errorBet || insufficient || overThanMaxPredict}
            helperText={renderHelperText}
          />
          <Box className={classes.buttonMax} onClick={handleMaxValue}>
            Max
          </Box>
        </Box>
        {sideBarState.organizingMethod.betting.map((b, i) => (
          <Box className={classes.wrapperPool} key={i}>
            <CommonSelectInput
              values={renderChains}
              onChange={handleChangeUnit}
              currentValue={b.token}
              className={classes.selectCoin}
              label="Token selector"
              name={`token-${i}`}
            />
          </Box>
        ))}
      </Box>
      {/* <Box className={classes.buyToken}>
        <Typography onClick={() => handleBuyToken()}>
          Buy {getNameToken(sideBarState.organizingMethod.betting[0].token)}
        </Typography>
      </Box> */}
    </Box>
  );
};
