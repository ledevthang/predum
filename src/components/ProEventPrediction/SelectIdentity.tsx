import { Box, Button, CardMedia, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useStyles } from './SelectIndentityStyles';
import { FiberManualRecord } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEventIdentity,
  getOrganizingMethod,
  getUserState,
} from 'store/selectors';
import clsx from 'clsx';
import { EProEventIdentity } from 'types/proEvent';
import { isStringNumber } from 'helpers';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import CommonSelectInput from 'components/common/CommonSelectInput';
import CommonInput from 'components/common/CommonInput';
import CloseIcon from 'icon/CloseIcon';
import AddOptionButton from 'containers/HostPrediction/AddOptionButton';
import { EUnit, WhoTakeWith } from 'types/hostPrediction';
import { BNB_TOKEN } from 'common';

const SelectIdentity = () => {
  const classes = useStyles();
  const identity = useSelector(getEventIdentity);
  const dispatch = useDispatch();
  const organizingMethod = useSelector(getOrganizingMethod);
  const [liquidityPoolError, setLiquidityPoolError] = useState({
    bnbLiquidityError: false,
    linkLiquidityError: false,
    xmetaLiquidityError: false,
    efunLiquidityError: false,
  });
  const userState = useSelector(getUserState);

  const onSelect = useCallback(
    (identity: EProEventIdentity) => {
      let newEventType = undefined;
      if (identity == EProEventIdentity.BOOK_MARKER) {
        newEventType = WhoTakeWith.USER_POOL;
      } else if (identity == EProEventIdentity.SPONSOR) {
        newEventType = WhoTakeWith.USER_USER;
      }
      dispatch(
        updateHostPredictionStateAction({
          identity,
          ...(newEventType && {
            organizingMethod: {
              ...organizingMethod,
              eventType: newEventType,
            },
          }),
        }),
      );
    },
    [dispatch, organizingMethod],
  );

  const renderHint = useMemo(() => {
    if (!identity) return;
    if (identity == EProEventIdentity.BOOK_MARKER) {
      return 'Please select the token you want the user to play with (up to 3). Your earning will also be paid by the token (s) you selected';
    }
    if (identity == EProEventIdentity.SPONSOR) {
      return 'Please select the token you want the user to play with (up to 3)';
    }
  }, [identity]);

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

  const updateValidateLiquidityPool = useCallback(() => {
    const newLiquidityPoolError = {
      bnbLiquidityError: false,
      linkLiquidityError: false,
      efunLiquidityError: false,
      xmetaLiquidityError: false,
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
  }, [classes.coin]);

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
    [dispatch, organizingMethod],
  );

  const disabledAddOptions = useMemo(() => {
    return organizingMethod.betting.length >= chains.length;
  }, [organizingMethod.betting.length, chains.length]);

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

  useEffect(() => {
    const isUserVsPools = organizingMethod.eventType == WhoTakeWith.USER_POOL;
    let error = false;
    const testValidation = Object.values(liquidityPoolError).filter((l) => l);
    if (identity == EProEventIdentity.INFLUENCER) {
      error = false;
    } else if (Object.values(liquidityPoolError).filter((v) => v).length > 0) {
      error = true;
    } else if (testValidation.length > 0) error = true;
    else if (isUserVsPools) {
      const test = organizingMethod.betting.filter(
        (b) => !Number(b.liquidityPool || '0') || !b.token,
      );
      error = test.length > 0;
    } else {
      const test = organizingMethod.betting.filter(
        (b) => b.liquidityPool && !b.token,
      );
      error = test.length > 0;
    }
    dispatch(
      updateHostPredictionStateAction({
        error,
      }),
    );
  }, [organizingMethod, liquidityPoolError, identity]);

  return (
    <Box className={classes.container}>
      <Typography className={classes.title}>Select your identity</Typography>
      <Box className={classes.main}>
        {identities.map((i) => (
          <Box
            key={i.id}
            className={clsx(classes.block, {
              [classes.borderSelected]: identity == i.type,
            })}
            onClick={() => onSelect(i.type)}
          >
            <CardMedia image={i.imageUrl} className={classes.img} />
            <Typography
              className={clsx(classes.name, {
                [classes.selectedBackground]: identity == i.type,
              })}
            >
              {i.name}
            </Typography>
            <Typography
              className={clsx(classes.shortDescription, {
                [classes.selectedBackground]: identity == i.type,
              })}
            >
              {i.shortDescription}
            </Typography>
            {i.descriptions.map((d, index) => (
              <Box key={index} className={classes.wrapperDes}>
                <FiberManualRecord
                  className={clsx(classes.dot, {
                    [classes.selectedIcon]: identity == i.type,
                  })}
                />
                <Typography className={classes.description}>{d}</Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <Typography className={classes.text}>
        {identity == EProEventIdentity.SPONSOR
          ? 'Your event may have prize pools'
          : 'Your event will use the community liquidity pool'}
      </Typography>
      <Typography className={classes.hint}>{renderHint}</Typography>

      {identity != EProEventIdentity.INFLUENCER && (
        <Box className={classes.wrapperPool2}>
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
        </Box>
      )}
    </Box>
  );
};

export default SelectIdentity;

const identities = [
  {
    id: 1,
    type: EProEventIdentity.INFLUENCER,
    imageUrl: '/images/Influencer.png',
    name: 'Influencer',
    shortDescription: "I'm here to earn",
    descriptions: [
      'I want to host a prediction event without much liquidity.',
      'I will advertise and invite people to join my event.',
      "I will receive a portion of the event's profit.",
    ],
  },
  {
    id: 2,
    type: EProEventIdentity.BOOK_MARKER,
    imageUrl: '/images/Bookmarker.png',
    name: 'Bookmaker',
    shortDescription: "I'm here to make a profit",
    descriptions: [
      'I have the liquidity and want to host a prediction event of my own.',
      'I can adjust the odd value however I want.',
      'I can keep most of my profit and pay the platform a small fee.',
    ],
  },
  {
    id: 3,
    type: EProEventIdentity.SPONSOR,
    imageUrl: '/images/Sponsor.png',
    name: 'Sponsor',
    shortDescription: "I'm here to earn",
    descriptions: [
      'I want to host a peer-to-peer prediction event.',
      'I may provide a prize pool to reward the winners.',
      'The winners will take from the losers.',
      'I will not make any profit from my event.',
    ],
  },
];
