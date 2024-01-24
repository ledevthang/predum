import { Box, Button, CardMedia, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import CommonInput from 'components/common/CommonInput';
import CommonSelectInput from 'components/common/CommonSelectInput';
import { convertThousandSeperator } from 'helpers';
import CloseIcon from 'icon/CloseIcon';
import MoneyBagIcon from 'icon/MoneyBagIcon';
import RefreshIcon from 'icon/RefreshIcon';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { getUserBalance } from 'store/actions/userActions';
import {
  getEventType,
  getNewTokenState,
  getOrganizingMethod,
  getUserState,
} from 'store/selectors';
import { WhoTakeWith } from 'types/hostPrediction';
import ComponentWithTooltip from './ComponentWithTooltip';
import { useStyles } from './PrizePoolStyle';

const PrizePool = () => {
  const classes = useStyles();
  const organizingMethod = useSelector(getOrganizingMethod);
  const userState = useSelector(getUserState);
  const eventType = useSelector(getEventType);
  const tokens = useSelector(getNewTokenState);
  const [isRefresh, setIsRefresh] = useState(false);
  const { library, account } = useWeb3React();
  const dispatch = useDispatch();
  const [liquidityPoolError, setLiquidityPoolError] = useState<boolean[]>([]);
  useEffect(() => {
    if (tokens.length == 0) return;
    const arr = Array(tokens.length).fill(false);
    setLiquidityPoolError(arr);
  }, [tokens]);
  const chains = useMemo(() => {
    return tokens.map((token) => {
      return {
        value: token.name,
        id: token.address,
        Icon: <CardMedia image={token.logo} className={classes.coin} />,
      };
    });
  }, [classes.coin, tokens]);

  const addNewToken = useCallback(() => {
    const tokenChoose = organizingMethod.betting.map((b) => b.token);
    const chainNotChoose = chains
      .map((c) => c.id)
      .filter((u) => !tokenChoose.includes(u));
    if (chainNotChoose.length == 0) return;
    dispatch(
      updateHostPredictionStateAction({
        organizingMethod: {
          ...organizingMethod,
          betting: [
            ...organizingMethod.betting,
            {
              token: chainNotChoose[0],
              liquidityPool: '',
            },
          ],
        },
      }),
    );
  }, [dispatch, organizingMethod, chains]);

  const renderChains = useCallback(
    (index: number) => {
      const selectedUnit = organizingMethod.betting
        .filter((b, i) => i != index && !!b.token)
        .map((b) => b.token);
      return chains
        .filter((c) => !selectedUnit.includes(c.id))
        .map((c) => ({
          id: c.id,
          value: c.value,
          Icon: c.Icon,
        }));
    },
    [chains, organizingMethod.betting],
  );

  const onRemoveOption = useCallback(
    (index: number) => {
      const newOptions = organizingMethod.betting;
      newOptions.splice(index, 1);
      dispatch(
        updateHostPredictionStateAction({
          organizingMethod: {
            ...organizingMethod,
            betting: newOptions,
          },
        }),
      );
    },
    [dispatch, organizingMethod.betting],
  );

  const handleChangeUnit = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;
      const name = event.target.name.split('-');
      const newOption: any = [...organizingMethod.betting];
      newOption[+name[1]][name[0]] = newValue;
      dispatch(
        updateHostPredictionStateAction({
          organizingMethod: {
            ...organizingMethod,
            betting: newOption,
          },
        }),
      );
    },
    [dispatch, organizingMethod],
  );

  const handleChangeLiquidityPool = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;
      if (newValue.includes(',')) {
        newValue = newValue.replace(/,/g, '');
      }
      const name = event.target.name.split('-');
      const newOption: any = [...organizingMethod.betting];
      newOption[+name[1]][name[0]] = newValue;
      dispatch(
        updateHostPredictionStateAction({
          organizingMethod: {
            ...organizingMethod,
            betting: newOption,
          },
        }),
      );
    },
    [dispatch, organizingMethod],
  );

  const renderError = useCallback(
    (token: string) => {
      let index = 0;
      userState.userBalance.forEach((item, i) => {
        if (item.token == token) index = i;
      });
      return liquidityPoolError[index];
    },
    [liquidityPoolError, userState.userBalance],
  );

  const disabledAddOptions = useMemo(() => {
    return organizingMethod.betting.length >= chains.length;
  }, [organizingMethod.betting.length, chains.length]);

  const updateValidateLiquidityPool = useCallback(() => {
    const newLiquidityPoolError = Array(tokens.length).fill(false);
    organizingMethod.betting.forEach((b) => {
      let index = 0;
      userState.userBalance.forEach((item, i) => {
        if (item.token == b.token) index = i;
      });
      if (
        Number(b.liquidityPool || '0') >= +userState.userBalance[index].balance
      ) {
        newLiquidityPoolError[index] = true;
      }
    });
    setLiquidityPoolError(newLiquidityPoolError);
  }, [organizingMethod.betting, userState, tokens]);

  useEffect(() => {
    updateValidateLiquidityPool();
  }, [organizingMethod, userState]);

  useEffect(() => {
    let error = false;
    const testValidation = Object.values(liquidityPoolError).filter((l) => l);
    if (Object.values(liquidityPoolError).filter((v) => v).length > 0) {
      error = true;
    } else if (testValidation.length > 0) error = true;
    else {
      const test = organizingMethod.betting.filter(
        (b) => !Number(b.liquidityPool || '0') || !b.token,
      );
      error = test.length > 0;
    }
    dispatch(
      updateHostPredictionStateAction({
        errorPool: error,
      }),
    );
  }, [organizingMethod, liquidityPoolError]);
  const titlePoolAnnotate = () => {
    return (
      <Box>
        <Typography>
          You can add up to 3 prize pools to your event. If you want to offer
          your own token as prize, please contact the Predum admin team via
          Telegram.
        </Typography>
        <Typography>
          What tokens user uses to predict, he will be rewarded with the same
          tokens from the corresponding prize pool.
        </Typography>
      </Box>
    );
  };
  const titleLiquidityPoolAnnotate = () => {
    return (
      <Box>
        <Typography>
          The liquidity pool is used to pay for winners of the event.
        </Typography>
        <Typography>
          You can add up to 3 liquidity pools to your event. If you want to
          offer your own token as prize, please contact the Predum admin team
          via Telegram.
        </Typography>
        <Typography>
          What tokens user uses to predict, he will be rewarded with the same
          tokens from the corresponding liquidity pool.
        </Typography>
      </Box>
    );
  };

  const onRefreshBalance = useCallback(() => {
    if (!account) return;
    setIsRefresh(true);
    dispatch(
      getUserBalance(library.provider, account, () => {
        setIsRefresh(false);
      }),
    );
  }, [dispatch, library.provider, account]);

  return (
    <ComponentWithTooltip
      title={
        eventType === WhoTakeWith.USER_USER ? 'Prize Pool' : 'Liquidity pool'
      }
      isAnnotate={true}
      titleAnnotate={
        eventType === WhoTakeWith.USER_USER
          ? titlePoolAnnotate()
          : titleLiquidityPoolAnnotate()
      }
      className={classes.marginTop}
    >
      <Box className={classes.container}>
        <Box className={clsx(classes.svg, 'center-root')}>
          <MoneyBagIcon width={67} height={67} />
        </Box>
        <Box className={classes.main}>
          {organizingMethod.betting.map((b, i) => (
            <Box className={classes.wrapperPool} key={i}>
              <CommonInput
                value={convertThousandSeperator(b.liquidityPool || '', true)}
                onChange={handleChangeLiquidityPool}
                className={classes.liquidityPool}
                name={`liquidityPool-${i}`}
                placeholder="Enter your pool"
                error={renderError(b.token)}
                helperText={renderError(b.token) ? 'Insufficient balance' : ''}
                required={true}
              />
              <CommonSelectInput
                values={renderChains(i)}
                onChange={handleChangeUnit}
                currentValue={b.token}
                className={classes.selectCoin}
                label="Token selector"
                name={`token-${i}`}
              />
              {i != 0 && (
                <Button
                  disableRipple
                  className={classes.clear}
                  onClick={() => onRemoveOption(i)}
                >
                  <CloseIcon color="#FFFFFF" />
                </Button>
              )}
            </Box>
          ))}
          <Button
            disabled={disabledAddOptions}
            onClick={addNewToken}
            className={classes.addPoolBtn}
            classes={{ disabled: classes.disabled }}
          >
            Additional pool
          </Button>
        </Box>
        <Button
          disableRipple
          onClick={onRefreshBalance}
          className={clsx(classes.refreshBtn, {
            [classes.refreshAnimation]: isRefresh,
          })}
        >
          <RefreshIcon color="white" />
        </Button>
      </Box>
    </ComponentWithTooltip>
  );
};

export default PrizePool;
