import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import Decimal from 'decimal.js';
import { isUndefined } from 'lodash';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { betSlipItem } from 'components/BetSlip/betSlipItem';
import RenderIConByCategory from 'components/common/RenderIConByCategory';
import { convertWeiToToken, getNameToken } from 'helpers';
import { usePlatformFee } from 'hooks/usePlatformFee';
import ArrowDownIcon from 'icon/ArrowDownIcon';
import ArrowUpIcon from 'icon/ArrowUpIcon';
import {
  updateMultipleChoiceExpand,
  updateSingleEvent,
} from 'store/actions/eventActions';
import { updateSideBarStateAction } from 'store/actions/sideBarActions';
import { getSideBarState } from 'store/selectors';
import { IEvent } from 'types/event';
import { AnswerType, MarketType, WhoTakeWith } from 'types/hostPrediction';

import { useStyles } from './EventItemStyles';
import OptionItem from './OptionItem';
// import Web3 from 'web3';
// import { predictionABI } from 'services/contract';
import OptionItemWithOnlyText from './OptionItemWithOnlyText';

interface IProps {
  event: IEvent;
  isCountDownEnd?: boolean;
  disabledShowMore?: boolean;
}

const ListOption = ({ event, disabledShowMore, isCountDownEnd }: IProps) => {
  const sideBarState = useSelector(getSideBarState);
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  const isHome =
    location.pathname == '/' || location.pathname.includes('/host-info');
  const { uvpPlatformFee: UVP_PLATFORM_FEE } = usePlatformFee();
  const [activeChoiced, setActiveChoiced] = useState('');
  const [isEventOverDeadline, setIsEventOverDeadline] = useState(false);
  const [listDisabledOptions, setListDisabledOptions] = useState<string[]>();
  const { library } = useWeb3React();

  const ref = useRef<any>();

  const isOverTime = (a: string) => {
    let time = new Date(a);
    return new Date() > time;
  };

  useEffect(() => {
    setIsEventOverDeadline(isOverTime(`${event.deadline}`));
  }, [event.deadline, isCountDownEnd]);
  const getDisabledOptions = async () => {
    if (isEventOverDeadline) return;
    if (!event.metadata) return;
    // const options = JSON.parse(event.options) as string[];
    // const tokens = JSON.parse(event.metadata).tokens;
    // if (tokens.length > 1) return;
    // let disabledOptions: string[] = [];
    // let indexs = Array.from(Array(options.length).keys());
    // let ids: any = [];
    // let tokenList: any = [];
    // options.forEach((o: any, i: number) => {
    //   ids.push(event.id);
    //   tokenList.push(tokens[0]);
    // });
    // const web3 = new Web3(library?.provider || window.ethereum);
    // const contract = new web3.eth.Contract(
    //   predictionABI as any,
    //   process.env.REACT_APP_PREDICTION,
    // );
    // const res = await contract.methods
    //   .getMaxPayoutBatch(ids, tokenList, indexs)
    //   .call();
    // let tokenName = getNameToken(tokens[0]);
    // res.forEach((o: any, i: number) => {
    //   let wei = Number(convertWeiToToken(o));
    //   if (tokenName == 'EFUN') {
    //     wei < 2000 && disabledOptions.push(options[i]);
    //   } else if (tokenName == 'LINK') {
    //     wei < 0.1 && disabledOptions.push(options[i]);
    //   } else if (tokenName == 'XMETA') {
    //     wei < 100 && disabledOptions.push(options[i]);
    //   } else wei < 0.005 && disabledOptions.push(options[i]);
    // });
    // setListDisabledOptions(disabledOptions);
  };
  useEffect(() => {
    if (event?.result) {
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
  }, [event?.result, event.marketType, event.options, event?.metadata]);

  useEffect(() => {
    if (isEventOverDeadline) {
      const options = JSON.parse(event.options) as string[];
      setListDisabledOptions(options);
    } else {
      isUserVsPool && getDisabledOptions();
    }
  }, [isEventOverDeadline]);
  useEffect(() => {
    if (!sideBarState.isHighlightInEventItem && !event.result) {
      setActiveChoiced('');
    }
  }, [sideBarState.isHighlightInEventItem]);
  useEffect(() => {
    if (event.id != sideBarState.betSlipData?.id && !event.result) {
      setActiveChoiced('');
    }
  }, [sideBarState.betSlipData?.id]);

  const onToggleShowMore = () => {
    dispatch(updateMultipleChoiceExpand(event.id));
  };
  const isUserVsPool = useMemo(() => {
    const { eventType } = JSON.parse(event.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return eventType != WhoTakeWith.USER_USER;
  }, [event.metadata]);

  const renderPool = useCallback(
    (amount: any, isUvP?: boolean) => {
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
    },
    [UVP_PLATFORM_FEE],
  );
  const getActivedOverUnder = (a: string, type: string) => {
    if (isHome) return false;
    if (event.totalScore == null) return false;
    if (type == 'over') return event.totalScore > parseFloat(a);
    return event.totalScore < parseFloat(a);
  };
  useEffect(() => {
    if (!sideBarState.highlightItem || !sideBarState.betSlipData?.id) return;
    if (event.id == sideBarState.betSlipData?.id)
      setActiveChoiced(sideBarState.highlightItem);
  }, [sideBarState]);

  const handleClickPredictOptionItem = useCallback(
    (option: string, index: number, odds?: string) => {
      if (listDisabledOptions?.includes(option)) return;
      const { handicap } = JSON.parse(event.metadata || '{}') as {
        handicap: string[];
      };
      let betSlipData: betSlipItem = {
        id: event.id,
        title: event.name,
        icon: (
          <RenderIConByCategory category={event.subCategory} color="#BDBDBD" />
        ),
        subCategory: event.subCategory,
        typeBet: event.marketType,
        nameOdds: option,
        eventTotalPool: event.predictionTokenAmounts,
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
            highlightItem: option,
            isOpen:
              !window.location.pathname.includes('detail-event') &&
              !window.location.pathname.includes('widget') &&
              !isDesktop,
            isHighlightInEventItem: true,
          }),
        );
      }
    },
    [dispatch, isDesktop, event, listDisabledOptions, sideBarState],
  );

  useEffect(() => {
    const width = ref.current?.clientWidth;
    if (!width) return;
    const options = JSON.parse(event.options) as string[];
    const metadata = JSON.parse(event.metadata || '{}');
    let images = metadata.images || {};
    const maxOptsPerRow =
      window.innerWidth < 744
        ? images[0] != undefined
          ? Math.floor(width / 144)
          : Math.floor((width + 12) / 113)
        : Math.floor(width / 144);
    if (maxOptsPerRow < options.length && isUndefined(event.isExpand)) {
      dispatch(
        updateSingleEvent({
          ...event,
          isExpand: false,
          maxRow: Math.ceil(options.length / maxOptsPerRow),
        }),
      );
    }
  }, [event]);

  const renderOptions = () => {
    const options = JSON.parse(event.options) as string[];
    const odds = (JSON.parse(event.odds) as number[]).map((o) =>
      new Decimal(o).div(10000).toString(),
    );
    const metadata = JSON.parse(event.metadata || '{}');
    let images = metadata.images || {};
    if (event.pro != 0) {
      if (
        event?.metadata &&
        JSON.parse(event?.metadata) &&
        JSON.parse(event?.metadata).fixtureMeta
      ) {
        let fixtureMeta = JSON.parse(event?.metadata).fixtureMeta;
        let teamsMeta = JSON.parse(fixtureMeta).teams;
        if (event.marketType == MarketType.HANDICAP) {
          if (!images[0]) {
            images[0] = teamsMeta.home.logo;
          }
          if (!images[4]) {
            images[4] = teamsMeta.away.logo;
          }
        } else if (event.marketType == MarketType.HOME_DRAW_AWAY) {
          if (!images[0]) {
            images[0] = teamsMeta.home.logo;
          }
          if (!images[2]) {
            images[2] = teamsMeta.away.logo;
          }
        }
      }
    }
    const answerType = metadata.answerType;
    const predictionTokenOptionAmounts = event.predictionTokenOptionAmounts;
    const keys = Object.keys(predictionTokenOptionAmounts);
    let token = keys[0];
    if (keys.includes(process.env.REACT_APP_EFUN_TOKEN || '')) {
      token = process.env.REACT_APP_EFUN_TOKEN || '';
    }
    if (sideBarState.betSlipData?.id == event.id) {
      token = sideBarState.organizingMethod.betting[0].token || keys[0];
    }
    const { eventType: type } = JSON.parse(event.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    if (event.marketType == MarketType.MULTIPLE_CHOICES) {
      const width = ref.current?.clientWidth;
      let renderOptions: any[] = [];
      let maxOptsPerRow = options.length;
      if (width) {
        // maxOptsPerRow = Math.floor(width / 144);
        maxOptsPerRow = isMobile
          ? images[0] != undefined
            ? Math.floor(width / 144)
            : Math.floor((width + 12) / 113)
          : Math.floor(width / 144);
        renderOptions =
          disabledShowMore || event.isExpand
            ? options
            : options.slice(0, maxOptsPerRow);
      }
      return (
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className={classes.wrapperMultipleChoice} ref={ref}>
            {renderOptions.map((o, i) => {
              return (
                <OptionItem
                  key={i}
                  className={clsx('center-root', {
                    [classes.resetCursor]: isEventOverDeadline,
                    [classes.actived]:
                      activeChoiced == o && (event.result ? !isHome : true),
                    [classes.disableOption]:
                      listDisabledOptions?.includes(o) || isEventOverDeadline,
                  })}
                  image={images[i]}
                  onClick={() =>
                    handleClickPredictOptionItem(
                      o,
                      i,
                      type != WhoTakeWith.USER_USER ? odds[i] : undefined,
                    )
                  }
                  isImageOption={answerType == AnswerType.WITH_PHOTOS}
                  isDisable={
                    listDisabledOptions?.includes(o) || isEventOverDeadline
                  }
                  percentage={predictionTokenOptionAmounts[token]?.[i]}
                  name={o}
                  odd={type != WhoTakeWith.USER_USER ? odds[i] : undefined}
                />
              );
            })}
          </div>
          {!disabledShowMore && maxOptsPerRow < options.length && (
            <Button style={{ marginTop: 20 }} onClick={onToggleShowMore}>
              {event.isExpand ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </Button>
          )}
        </div>
      );
    } else if (event.marketType == MarketType.HANDICAP) {
      const { handicap } = JSON.parse(event.metadata || '{}') as {
        handicap: string[];
      };
      return (
        <>
          <OptionItem
            className={clsx('center-root', {
              [classes.resetCursor]: isEventOverDeadline,
              [classes.actived]:
                activeChoiced == options[0] && (event.result ? !isHome : true),
              [classes.disableOption]:
                listDisabledOptions?.includes(options[0]) ||
                isEventOverDeadline,
            })}
            isImageOption={answerType == AnswerType.WITH_PHOTOS}
            onClick={() =>
              handleClickPredictOptionItem(
                options[0],
                0,
                type != WhoTakeWith.USER_USER ? odds[0] : undefined,
              )
            }
            percentage={predictionTokenOptionAmounts[token]?.[0]}
            isDisable={
              listDisabledOptions?.includes(options[0]) || isEventOverDeadline
            }
            image={images[0]}
            name={options[0]}
            odd={type != WhoTakeWith.USER_USER ? odds[0] : undefined}
          />

          <Box className={classes.handicap}>
            <Typography>
              {handicap[0]} : {handicap[1]}
            </Typography>
          </Box>
          <OptionItem
            className={clsx('center-root', {
              [classes.resetCursor]: isEventOverDeadline == true,
              [classes.actived]:
                activeChoiced == options[4] && (event.result ? !isHome : true),
              [classes.disableOption]:
                listDisabledOptions?.includes(options[4]) ||
                isEventOverDeadline,
            })}
            onClick={() =>
              handleClickPredictOptionItem(
                options[4],
                4,
                type != WhoTakeWith.USER_USER ? odds[4] : undefined,
              )
            }
            isImageOption={answerType == AnswerType.WITH_PHOTOS}
            isDisable={
              listDisabledOptions?.includes(options[4]) || isEventOverDeadline
            }
            percentage={predictionTokenOptionAmounts[token]?.[4]}
            image={images[4]}
            name={options[4]}
            odd={type != WhoTakeWith.USER_USER ? odds[4] : undefined}
          />
        </>
      );
    } else if (event.marketType == MarketType.OVER_UNDER) {
      if (type != WhoTakeWith.USER_USER)
        return (
          <>
            <Box
              className={clsx('center-root')}
              style={{
                backgroundColor: '#2C2C2F',
              }}
            >
              <Typography className={classes.overUnderName}>
                Total Score
              </Typography>
              {options
                .filter((o, i) => i % 2 == 0)
                .map((v: string, i: number) => (
                  <Typography key={i} className={clsx(classes.overUnderValue)}>
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
                          options[i * 2 + 1].replace('>', 'Score Over ') &&
                        (event.result ? !isHome : true),
                      [classes.disableOptionOverUnder]: isEventOverDeadline,
                      [classes.activedOverUnder]: getActivedOverUnder(
                        options[i * 2 + 1].replace('>', ''),
                        'over',
                      ),
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
            <Box
              className={clsx('center-root', {
                [classes.disableOptionOverUnder]: isEventOverDeadline,
              })}
            >
              <Typography className={classes.overUnderName}>Under</Typography>
              {odds
                .filter((o, i) => i % 2 == 0)
                .map((v: string, i: number) => (
                  <Typography
                    key={i}
                    className={clsx(classes.overUnderValue, {
                      [classes.actived]:
                        activeChoiced ==
                          options[i * 2].replace('<', 'Score Under ') &&
                        (event.result ? !isHome : true),
                      [classes.disableOptionOverUnder]: isEventOverDeadline,
                      [classes.activedOverUnder]: getActivedOverUnder(
                        options[i * 2].replace('<', ''),
                        'under',
                      ),
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
          <OptionItemWithOnlyText
            className={clsx(classes.choiceOverUnderUvU, 'center-root', {
              [classes.resetCursor]: isEventOverDeadline,
              [classes.disableOption]: isEventOverDeadline,
              [classes.actived]:
                activeChoiced == `Over ${options[0].replace('<', '')}` &&
                (event.result ? !isHome : true),
            })}
            onClick={() =>
              handleClickPredictOptionItem(
                `Over ${options[0].replace('<', '')}`,
                1,
              )
            }
            name={`Over ${options[0].replace('<', '')}`}
            percentage={predictionTokenOptionAmounts[token]?.[1]}
          />
          <OptionItemWithOnlyText
            className={clsx(classes.choiceOverUnderUvU, 'center-root', {
              [classes.resetCursor]: isEventOverDeadline,
              [classes.disableOption]: isEventOverDeadline,
              [classes.actived]:
                activeChoiced == `Under ${options[0].replace('<', '')}` &&
                (event.result ? !isHome : true),
            })}
            onClick={() =>
              handleClickPredictOptionItem(
                `Under ${options[0].replace('<', '')}`,
                0,
              )
            }
            percentage={predictionTokenOptionAmounts[token]?.[0]}
            name={`Under ${options[0].replace('<', '')}`}
          />
        </>
      );
    } else if (event.marketType == MarketType.TRUE_FALSE) {
      return options.map((o, i) => (
        <OptionItem
          key={i}
          className={clsx('center-root', {
            [classes.resetCursor]: isEventOverDeadline,
            [classes.actived]:
              activeChoiced == o && (event.result ? !isHome : true),
            [classes.disableOption]:
              listDisabledOptions?.includes(o) || isEventOverDeadline,
          })}
          onClick={() =>
            handleClickPredictOptionItem(
              o,
              i,
              type != WhoTakeWith.USER_USER ? odds[i] : undefined,
            )
          }
          isImageOption={answerType == AnswerType.WITH_PHOTOS}
          isDisable={listDisabledOptions?.includes(o) || isEventOverDeadline}
          percentage={predictionTokenOptionAmounts[token]?.[i]}
          image={images[i]}
          name={o}
          odd={type != WhoTakeWith.USER_USER ? odds[i] : undefined}
        />
      ));
    } else {
      return (
        <div className={classes.wrapperMultipleChoice}>
          {options.map((o, i) => (
            <OptionItem
              key={i}
              className={clsx('center-root', {
                [classes.resetCursor]: isEventOverDeadline,
                [classes.actived]:
                  activeChoiced == o && (event.result ? !isHome : true),
                [classes.disableOption]: listDisabledOptions?.includes(o),
              })}
              onClick={() =>
                handleClickPredictOptionItem(
                  o,
                  i,
                  type != WhoTakeWith.USER_USER ? odds[i] : undefined,
                )
              }
              isDisable={
                listDisabledOptions?.includes(o) || isEventOverDeadline
              }
              isImageOption={answerType == AnswerType.WITH_PHOTOS}
              percentage={predictionTokenOptionAmounts[token]?.[i]}
              image={images[i]}
              name={o}
              odd={type != WhoTakeWith.USER_USER ? odds[i] : undefined}
            />
          ))}
        </div>
      );
    }
  };

  return <>{renderOptions()}</>;
};

export default ListOption;
