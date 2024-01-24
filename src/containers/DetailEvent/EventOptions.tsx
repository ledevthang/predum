import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import { betSlipItem } from 'components/BetSlip/betSlipItem';
import TooltipTypography from 'components/common/TooltipTypography';
import Decimal from 'decimal.js';
import { convertWeiToToken, getNameToken } from 'helpers';
import { usePlatformFee } from 'hooks/usePlatformFee';
import BasketballIcon from 'icon/sidebar/BasketballIcon';
import CourthouseIcon from 'icon/sidebar/CourthouseIcon';
import DiagramIcon from 'icon/sidebar/DiagramIcon';
import Element4Icon from 'icon/sidebar/Element4Icon';
import FootballIcon from 'icon/sidebar/FoorballIcon';
import FormulaIcon from 'icon/sidebar/FormulaIcon';
import MMAIcon from 'icon/sidebar/MMAIcon';
import TennisBallIcon from 'icon/sidebar/TennisBallIcon';
import theme from 'material';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { predictionABI } from 'services/contract';
import { updateSideBarStateAction } from 'store/actions/sideBarActions';
import { getSideBarState } from 'store/selectors';
import { IEvent } from 'types/event';
import { MarketType, WhoTakeWith } from 'types/hostPrediction';
import Web3 from 'web3';
import { useStyles } from './EventOptionsStyles';

interface IProps {
  event: IEvent;
}

const EventOptions = ({ event }: IProps) => {
  const classes = useStyles();
  const [isEventOverDeadline, setIsEventOverDeadline] = useState(false);
  const { uvpPlatformFee: UVP_PLATFORM_FEE } = usePlatformFee();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [activeChoiced, setActiveChoiced] = useState('');
  const sideBarState = useSelector(getSideBarState);
  const [listDisabledOptions, setListDisabledOptions] = useState<string[]>();
  const { library } = useWeb3React();
  const dispatch = useDispatch();
  const web3 = new Web3(library?.provider || window.ethereum);
  const contract = new web3.eth.Contract(
    predictionABI as any,
    process.env.REACT_APP_PREDICTION,
  );
  useEffect(() => {
    setIsEventOverDeadline(isOverTime(`${event?.deadline}`));
    if (sideBarState.betSlipData?.nameOdds) {
      setActiveChoiced(sideBarState.betSlipData?.nameOdds);
    }
  }, [activeChoiced]);
  useEffect(() => {
    if (isEventOverDeadline) {
      const options = JSON.parse(event.options) as string[];
      setListDisabledOptions(options);
    } else {
      if (isUserVsPool) {
        getDisableOptions();
      }
    }
  }, [isEventOverDeadline, sideBarState.betSlipData?.id]);
  const renderIcon = useMemo(() => {
    switch (event?.subCategory) {
      case 'Football':
        return <FootballIcon color="#BDBDBD" />;
      case 'Baseball':
        return <BasketballIcon color="#BDBDBD" />;
      case 'Tennis':
        return <TennisBallIcon color="#BDBDBD" />;
      case 'Formula 1':
        return <FormulaIcon color="#BDBDBD" />;
      case 'MMA':
        return <MMAIcon color="#BDBDBD" />;
      case 'Coin Price':
        return <DiagramIcon color="#BDBDBD" />;
      case 'Politics':
        return <CourthouseIcon color="#BDBDBD" />;
      default:
        return <Element4Icon color="#BDBDBD" />;
    }
  }, [event?.subCategory]);
  useEffect(() => {
    if (event?.id != sideBarState.betSlipData?.id) {
      setActiveChoiced('');
    }
  }, [sideBarState.betSlipData?.id]);

  const getDisableOptions = async () => {
    if (isEventOverDeadline) return;
    if (!event.metadata) return;
    const options = JSON.parse(event.options) as string[];
    const tokens = JSON.parse(event.metadata).tokens;
    if (tokens.length > 1) return;
    let disabledOptions: string[] = [];
    for await (const [i, o] of options.entries()) {
      const res = await contract.methods
        .getMaxPayout(event.id, tokens[0], i)
        .call();
      const wei = Number(convertWeiToToken(res));
      let tokenName = getNameToken(tokens[0]);
      if (tokenName == 'EFUN') {
        wei < 2000 && disabledOptions.push(o);
      } else if (tokenName == 'LINK') {
        wei < 0.1 && disabledOptions.push(o);
      } else if (tokenName == 'XMETA') {
        wei < 100 && disabledOptions.push(o);
      } else wei < 0.005 && disabledOptions.push(o);
    }
    setListDisabledOptions(disabledOptions);
  };
  useEffect(() => {
    if (event?.result && event) {
      const options = JSON.parse(event.options) as string[];
      if (event.marketType == MarketType.HANDICAP) {
        if (event.result == 'Half Lose - Half Win')
          setActiveChoiced(options[4]);
        else if (event.result == 'Half Win - Half Lose')
          setActiveChoiced(options[0]);
        else setActiveChoiced(event.result);
      } else if (event.marketType == MarketType.OVER_UNDER) {
        if (
          JSON.parse(event.metadata || '{}').eventType == WhoTakeWith.USER_USER
        ) {
          if (event.result.includes('>')) setActiveChoiced('Over');
          if (event.result.includes('<')) setActiveChoiced('Under');
        }
      } else setActiveChoiced(event.result);
    }
  }, [event?.result]);

  const handleClickPredictOptionItem = useCallback(
    (option: string, index: number, odds?: string) => {
      if (!event) return;
      const { handicap } = JSON.parse(event.metadata || '{}') as {
        handicap: string[];
      };
      let betSlipData: betSlipItem = {
        id: event.id,
        title: event.name,
        icon: renderIcon,
        subCategory: event.subCategory,
        typeBet: event.marketType,
        nameOdds: option,
        address: event.address,
        marketType: event.marketType,
        chains: JSON.parse(event.metadata || '{}').tokens,
        index,
        type: event.type,
        eventType: JSON.parse(event.metadata || '{}').eventType,
        hostFee: event.hostFee,
      };
      if (odds) {
        betSlipData.odds = +odds;
      }
      if (handicap) {
        betSlipData.handicap =
          index == 0
            ? handicap[0] == '0'
              ? `-${handicap[1]}`
              : handicap[0]
            : handicap[1] == '0'
            ? `-${handicap[0]}`
            : handicap[1];
      }
      if (!isUserVsPool) {
        betSlipData.prize = renderPool(event.poolTokenAmounts);
      }
      if (!isEventOverDeadline) {
        setActiveChoiced(option);
        dispatch(
          updateSideBarStateAction({
            ...sideBarState,
            betSlipData: betSlipData,
            isOpen: false,
            isHighlightInEventItem: true,
          }),
        );
      }
    },
    [dispatch, isDesktop, event],
  );
  const renderPool = useCallback((amount: any, isUvP?: boolean) => {
    const result = Object.keys(amount)
      .filter((a) => !!Number(amount[a] || '0'))
      .map((p, i) => {
        return {
          value: convertWeiToToken(
            isUvP
              ? new Decimal(amount[p])
                  .div(1 - UVP_PLATFORM_FEE)
                  .toNumber()
                  .toLocaleString('fullwide', { useGrouping: false })
              : amount[p],
          ),
          name: getNameToken(p),
        };
      });
    return result || undefined;
  }, []);
  const isUserVsPool = useMemo(() => {
    if (!event) return;
    const { eventType } = JSON.parse(event?.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return eventType != WhoTakeWith.USER_USER;
  }, [event?.metadata]);

  const isOverTime = (a: string) => {
    let time = new Date(a);
    return new Date() > time;
  };
  const renderOptions = () => {
    if (!event) return <></>;
    const options = JSON.parse(event.options) as string[];
    const odds = (JSON.parse(event.odds) as number[]).map((o) =>
      new Decimal(o).div(10000).toString(),
    );

    if (event.marketType == MarketType.MULTIPLE_CHOICES) {
      return (
        <Box width="100%" className={classes.wapperMultiChoice}>
          {options.map((o, i) => {
            const keys = { itemId: o };
            return (
              <Box
                key={i}
                className={clsx(classes.choice, 'center-root', {
                  [classes.resetCursor]: isEventOverDeadline,
                  [classes.actived]: activeChoiced == o,
                  [classes.disableOption]:
                    listDisabledOptions?.includes(o) || isEventOverDeadline,
                })}
                {...keys}
                onClick={() =>
                  handleClickPredictOptionItem(
                    o,
                    i,
                    isUserVsPool ? odds[i] : undefined,
                  )
                }
              >
                <TooltipTypography text={o} />
                {isUserVsPool && <Typography>{odds[i]}</Typography>}
              </Box>
            );
          })}
        </Box>
      );
    } else if (event.marketType == MarketType.HANDICAP) {
      const { handicap } = JSON.parse(event.metadata || '{}') as {
        handicap: string[];
      };
      return (
        <>
          <Box
            className={clsx(classes.choice, 'center-root', {
              [classes.resetCursor]: isEventOverDeadline,
              [classes.actived]: activeChoiced == options[0],
              [classes.disableOption]:
                listDisabledOptions?.includes(options[0]) ||
                isEventOverDeadline,
            })}
            onClick={() =>
              handleClickPredictOptionItem(
                options[0],
                0,
                isUserVsPool ? odds[0] : undefined,
              )
            }
          >
            <TooltipTypography text={options[0]} />
            {isUserVsPool && <Typography>{odds[0]}</Typography>}
          </Box>

          <Box className={classes.handicap}>
            <Typography>
              {handicap[0]} : {handicap[1]}
            </Typography>
          </Box>
          <Box
            className={clsx(classes.choice, 'center-root', {
              [classes.resetCursor]: isEventOverDeadline == true,
              [classes.actived]: activeChoiced == options[4],
              [classes.disableOption]:
                listDisabledOptions?.includes(options[4]) ||
                isEventOverDeadline,
            })}
            onClick={() =>
              handleClickPredictOptionItem(
                options[4],
                4,
                isUserVsPool ? odds[4] : undefined,
              )
            }
          >
            <TooltipTypography text={options[4]} />

            {isUserVsPool && <Typography>{odds[4]}</Typography>}
          </Box>
        </>
      );
    } else if (event.marketType == MarketType.OVER_UNDER) {
      if (isUserVsPool)
        return (
          <>
            <Box className={clsx('center-root')}>
              <Typography className={classes.overUnderName}>
                Total Score
              </Typography>
              {options
                .filter((o, i) => i % 2 == 0)
                .map((v: string, i: number) => (
                  <Typography key={i} className={classes.overUnderValue}>
                    {v.replace('<', '')}
                  </Typography>
                ))}
            </Box>
            <Box className={clsx('center-root')}>
              <Typography className={classes.overUnderName}>Over</Typography>
              {odds
                .filter((o, i) => i % 2 == 1)
                .map((v: string, i: number) => (
                  <Typography
                    key={i}
                    className={clsx(classes.overUnderValue, {
                      [classes.actived]:
                        activeChoiced ==
                        options[i * 2 + 1].replace('>', 'Score Over '),
                      [classes.disableOptionOverUnder]: isEventOverDeadline,
                    })}
                    onClick={() =>
                      handleClickPredictOptionItem(
                        options[i * 2 + 1].replace('>', 'Score Over '),
                        i * 2 + 1,
                        v,
                      )
                    }
                  >
                    {v}
                  </Typography>
                ))}
            </Box>
            <Box className={clsx('center-root')}>
              <Typography className={classes.overUnderName}>Under</Typography>
              {odds
                .filter((o, i) => i % 2 == 0)
                .map((v: string, i: number) => (
                  <Typography
                    key={i}
                    className={clsx(classes.overUnderValue, {
                      [classes.actived]:
                        activeChoiced ==
                        options[i * 2].replace('<', 'Score Under '),
                      [classes.disableOptionOverUnder]: isEventOverDeadline,
                    })}
                    onClick={() =>
                      handleClickPredictOptionItem(
                        options[i * 2].replace('<', 'Score Under '),
                        i * 2,
                        v,
                      )
                    }
                  >
                    {v}
                  </Typography>
                ))}
            </Box>
          </>
        );
      return (
        <>
          <Box
            className={clsx(classes.choiceOverUnderUvU, 'center-root', {
              [classes.resetCursor]: isEventOverDeadline,
              [classes.disableOption]: isEventOverDeadline,
              [classes.actived]:
                activeChoiced == `Over ${options[0].replace('<', '')}`,
            })}
            onClick={() =>
              handleClickPredictOptionItem(
                `Over ${options[0].replace('<', '')}`,
                1,
              )
            }
          >
            <Typography>Over {options[0].replace('<', '')}</Typography>
          </Box>
          <Box
            className={clsx(classes.choiceOverUnderUvU, 'center-root', {
              [classes.resetCursor]: isEventOverDeadline,
              [classes.disableOption]: isEventOverDeadline,
              [classes.actived]:
                activeChoiced == `Under ${options[0].replace('<', '')}`,
            })}
            onClick={() =>
              handleClickPredictOptionItem(
                `Under ${options[0].replace('<', '')}`,
                0,
              )
            }
          >
            <Typography>Under {options[0].replace('<', '')}</Typography>
          </Box>
        </>
      );
    } else {
      return options.map((o, i) => (
        <Box
          key={i}
          className={clsx(classes.choice, 'center-root', {
            [classes.resetCursor]: isEventOverDeadline,
            [classes.actived]: activeChoiced == o,
            [classes.disableOption]:
              listDisabledOptions?.includes(o) || isEventOverDeadline,
          })}
          onClick={() =>
            handleClickPredictOptionItem(
              o,
              i,
              isUserVsPool ? odds[i] : undefined,
            )
          }
        >
          <TooltipTypography text={o} />
          {isUserVsPool && <Typography>{odds[i]}</Typography>}
        </Box>
      ));
    }
  };

  return <> {renderOptions()} </>;
};

export default EventOptions;
