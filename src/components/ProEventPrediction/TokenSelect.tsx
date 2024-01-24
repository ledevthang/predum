import { Box, Button, CardMedia, makeStyles } from '@material-ui/core';
import { BNB_TOKEN } from 'common';
import CommonInput from 'components/common/CommonInput';
import CommonSelectInput from 'components/common/CommonSelectInput';
import AddOptionButton from 'containers/HostPrediction/AddOptionButton';
import CloseIcon from 'icon/CloseIcon';
import React, { useCallback, useMemo } from 'react';
import { EUnit } from 'types/hostPrediction';

interface IProps {
  betting: {
    token: string;
    liquidityPool: string;
  }[];
  handleChangeUnit: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeLiquidityPool: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  onRemoveOption: (i: number) => void;
  addNewToken: () => void;
}

const TokenSelect = ({
  betting,
  handleChangeUnit,
  onRemoveOption,
  addNewToken,
  handleChangeLiquidityPool,
  error,
  helperText,
  required,
}: IProps) => {
  const classes = useStyles();

  const chains = useMemo(() => {
    return [
      {
        value: EUnit.EFUN,
        id: process.env.REACT_APP_EFUN_TOKEN || '',
        Icon: (
          <CardMedia image="/images/EfunCoin.png" className={classes.coin} />
        ),
      },
      {
        value: EUnit.BNB,
        id: BNB_TOKEN,
        Icon: (
          <CardMedia image="/images/BNBCoin.png" className={classes.coin} />
        ),
      },
      {
        value: EUnit.LINK,
        id: process.env.REACT_APP_LINK_TOKEN || '',
        Icon: (
          <CardMedia image="/images/LinkCoin.png" className={classes.coin} />
        ),
      },
      {
        value: EUnit.XMETA,
        id: process.env.REACT_APP_XMETA_TOKEN || '',
        Icon: <CardMedia image="/images/XMETA.png" className={classes.coin} />,
      },
    ];
  }, []);

  const renderChains = useCallback(
    (index: number) => {
      const selectedUnit = betting
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
    [chains, betting],
  );

  const disabledAddOptions = useMemo(() => {
    return betting.length >= chains.length;
  }, [betting.length, chains.length]);

  return (
    <>
      {betting.map((b, i) => (
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
            error={error}
            helperText={helperText}
            required={required}
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
    </>
  );
};

export default TokenSelect;

const useStyles = makeStyles((theme) => ({
  coin: {
    height: 24,
    width: 24,
    marginRight: 8,
  },
  selectCoin: {
    width: 124,
    marginRight: 12,
  },
  liquidityPool: {
    height: 44,
    flexGrow: 1,
    width: 'unset',
    backgroundColor: '#4B4B4B',
    '& input::placeholder': {
      color: '#FFFFFF',
    },
    [theme.breakpoints.down('sm')]: {
      height: 36,
    },
  },
  wrapperPool: {
    marginBottom: 24,
    display: 'flex',
    position: 'relative' as any,
  },
  clear: {
    position: 'absolute' as any,
    right: -40,
    top: 12,
    '& svg': {
      width: 16,
      height: 16,
    },
  },
}));
