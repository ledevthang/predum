import { Box, Button, CardMedia, Typography } from '@material-ui/core';
import { FiberManualRecord } from '@material-ui/icons';
import clsx from 'clsx';
import { BNB_TOKEN } from 'common';
import CommonInput from 'components/common/CommonInput';
import CommonSelectInput from 'components/common/CommonSelectInput';
import { isStringNumber } from 'helpers';
import CloseIcon from 'icon/CloseIcon';
import MoneyBagIcon from 'icon/MoneyBagIcon';
import Profile2UsersIcon from 'icon/Profile2UsersIcon';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import {
  getNewTokenState,
  getOrganizingMethod,
  getUserState,
} from 'store/selectors';
import { WhoTakeWith } from 'types/hostPrediction';
import AddOptionButton from './AddOptionButton';
import { useStyles } from './OrganizingMethodStyles';

interface ILiquidityPoolError {
  bnbLiquidityError: boolean;
  linkLiquidityError: boolean;
  xmetaLiquidityError: boolean;
  efunLiquidityError: boolean;
}
interface IProps {
  setLiquidityPoolError: (value: ILiquidityPoolError) => void;
  liquidityPoolError: ILiquidityPoolError;
}
const OrganizingMethod = ({
  setLiquidityPoolError,
  liquidityPoolError,
}: IProps) => {
  const classes = useStyles();
  const organizingMethod = useSelector(getOrganizingMethod);
  const userState = useSelector(getUserState);
  const dispatch = useDispatch();
  const tokens = useSelector(getNewTokenState);
  const onChangeType = useCallback(
    (value: WhoTakeWith) => {
      dispatch(
        updateHostPredictionStateAction({
          organizingMethod: {
            ...organizingMethod,
            eventType: value,
          },
        }),
      );
    },
    [organizingMethod],
  );

  const chains = useMemo(() => {
    return tokens.map((token) => {
      return {
        value: token.name,
        id: token.address,
        Icon: <CardMedia image={token.logo} className={classes.coin} />,
      };
    });
  }, [classes.coin, tokens]);

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
      const name = event.target.name.split('-');
      if (name[0] == 'liquidityPool') {
        if (!isStringNumber(newValue)) {
          return;
        }
        newValue = newValue.replace(',', '.');
      }
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

  const disabledAddOptions = useMemo(() => {
    return organizingMethod.betting.length >= chains.length;
  }, [organizingMethod.betting.length, chains.length]);

  const updateValidateLiquidityPool = useCallback(() => {
    const newLiquidityPoolError = {
      bnbLiquidityError: false,
      linkLiquidityError: false,
      xmetaLiquidityError: false,
      efunLiquidityError: false,
    };
    organizingMethod.betting.forEach((b) => {
      if (b.token == BNB_TOKEN) {
        if (Number(b.liquidityPool || '0') > +userState.mainTokenBalance) {
          newLiquidityPoolError.bnbLiquidityError = true;
        } else if (
          Number(b.liquidityPool || '0') <= +userState.mainTokenBalance
        ) {
          newLiquidityPoolError.bnbLiquidityError = false;
        }
      } else if (b.token == process.env.REACT_APP_EFUN_TOKEN) {
        if (Number(b.liquidityPool || '0') > +userState.efunBalance) {
          newLiquidityPoolError.efunLiquidityError = true;
        } else if (Number(b.liquidityPool || '0') <= +userState.efunBalance) {
          newLiquidityPoolError.efunLiquidityError = false;
        }
      } else if (b.token == process.env.REACT_APP_LINK_TOKEN) {
        if (Number(b.liquidityPool || '0') > +userState.linkBalance) {
          newLiquidityPoolError.linkLiquidityError = true;
        } else if (Number(b.liquidityPool || '0') <= +userState.linkBalance) {
          newLiquidityPoolError.linkLiquidityError = false;
        }
      } else if (b.token == process.env.REACT_APP_XMETA_TOKEN) {
        if (Number(b.liquidityPool || '0') > +userState.xmetaBalance) {
          newLiquidityPoolError.xmetaLiquidityError = true;
        } else if (Number(b.liquidityPool || '0') <= +userState.xmetaBalance) {
          newLiquidityPoolError.xmetaLiquidityError = false;
        }
      }
    });
    setLiquidityPoolError(newLiquidityPoolError);
  }, [organizingMethod.betting, liquidityPoolError, userState]);

  useEffect(() => {
    updateValidateLiquidityPool();
  }, [organizingMethod.betting]);

  const renderError = useCallback(
    (index: number) => {
      const token = organizingMethod.betting[index].token;
      if (token == BNB_TOKEN) {
        return liquidityPoolError.bnbLiquidityError;
      }
      if (token == process.env.REACT_APP_EFUN_TOKEN) {
        return liquidityPoolError.efunLiquidityError;
      }
      if (token == process.env.REACT_APP_XMETA_TOKEN) {
        return liquidityPoolError.xmetaLiquidityError;
      }
      return liquidityPoolError.linkLiquidityError;
    },
    [organizingMethod.betting, liquidityPoolError],
  );

  return (
    <Box className={classes.container}>
      <Typography className={classes.header}>
        Select who will take bets
      </Typography>
      <Box className={classes.wrapperType}>
        <Box
          onClick={() => onChangeType(WhoTakeWith.USER_USER)}
          className={clsx(classes.type, {
            [classes.selected]:
              organizingMethod.eventType == WhoTakeWith.USER_USER,
          })}
        >
          <Box className={classes.wrapperIcon}>
            <Box>
              <Profile2UsersIcon />
              <Typography className={classes.users}>Users</Typography>
            </Box>
            <Typography>VS</Typography>
            <Box>
              <Profile2UsersIcon />
              <Typography className={classes.users}>Users</Typography>
            </Box>
          </Box>
          <Box>
            <Typography className={classes.hint}>
              <FiberManualRecord />
              The users will wager against each other.
            </Typography>
            <Typography className={classes.hint}>
              <FiberManualRecord />
              Winners will take from losers.
            </Typography>
            <Typography className={classes.hint}>
              <FiberManualRecord />
              Host may offer a prize pool to reward winners.
            </Typography>
          </Box>
        </Box>
        <Box
          onClick={() => onChangeType(WhoTakeWith.USER_POOL)}
          className={clsx(classes.type, {
            [classes.selected]:
              organizingMethod.eventType != WhoTakeWith.USER_USER,
          })}
        >
          <Box className={classes.wrapperIcon}>
            <Box>
              <Profile2UsersIcon />
              <Typography className={classes.users}>Users</Typography>
            </Box>
            <Typography>VS</Typography>
            <Box>
              <MoneyBagIcon />
              <Typography className={classes.users}>Pools</Typography>
            </Box>
          </Box>
          <Box>
            <Typography className={classes.hint}>
              <FiberManualRecord />
              The host will take bets from users.
            </Typography>
            <Typography className={classes.hint}>
              <FiberManualRecord />
              The host will calculate and provide odds.
            </Typography>
            <Typography className={classes.hint}>
              <FiberManualRecord />
              {"The host's liquidity pool is used to pay for winners."}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography className={classes.label}>
        Select the betting token and enter Prize / Liquidity pool amount
      </Typography>
      {organizingMethod.betting.map((b, i) => (
        <Box className={classes.wrapperPool} key={i}>
          <CommonSelectInput
            values={renderChains(i)}
            onChange={handleChangeUnit}
            currentValue={b.token}
            className={classes.selectCoin}
            label="Token selector"
            name={`token-${i}`}
          />
          <CommonInput
            value={b.liquidityPool || ''}
            onChange={handleChangeLiquidityPool}
            className={classes.liquidityPool}
            name={`liquidityPool-${i}`}
            placeholder="Prize / Liquidity pool"
            error={renderError(i)}
            helperText={renderError(i) ? 'Insufficient balance' : ''}
            required={organizingMethod.eventType == WhoTakeWith.USER_POOL}
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
      <AddOptionButton
        disabled={disabledAddOptions}
        label="Add Token"
        onClick={addNewToken}
      />
      <Box className={classes.wrapperFooter}>
        <Typography className={classes.footer}>
          <FiberManualRecord />
          For user vs user, host can offer a prize pool (though not required).
        </Typography>
        <Typography className={classes.footer}>
          <FiberManualRecord />
          For user vs pool, host is required to provide a liquidity pool.
        </Typography>
      </Box>
    </Box>
  );
};

export default OrganizingMethod;
