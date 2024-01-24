import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Decimal from 'decimal.js';
import { isUndefined } from 'lodash';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ReactLoading from 'react-loading';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Web3 from 'web3';

import CommonInput from 'components/common/CommonInput';
import CommonSelectInput from 'components/common/CommonSelectInput';
import CommonUploadFileInput from 'components/common/CommonUploadFileInput';
import LoadingButton from 'components/common/LoadingButton';
import OptionItem from 'components/Event/OptionItem';
import OptionItemWithOnlyText from 'components/Event/OptionItemWithOnlyText';
import LabelInput from 'components/HostPrediction/LabelInput';
import {
  convertThousandSeperator,
  convertWeiToToken,
  findClosestValue,
  getNameToken,
  isOver48hEndTime,
  isOverEndTime,
  renderShortAddress,
} from 'helpers';
import { usePlatformFee } from 'hooks/usePlatformFee';
import ArrowDownIcon from 'icon/ArrowDownIcon';
import ArrowUpIcon from 'icon/ArrowUpIcon';
import { eventABI, predictionABI } from 'services/contract';
import {
  updateEventProof,
  updateEventProofWithLink,
  updateEventScoreAction,
  updateMultipleChoiceExpand,
  updateSingleEvent,
} from 'store/actions/eventActions';
import { IEvent } from 'types/event';
import { AnswerType, MarketType, WhoTakeWith } from 'types/hostPrediction';

import EventHeader from './EventHeader';
import EventTitle from './EventTitle';
import { useStyles } from './HostHistoryItemStyle';

interface IProps {
  host: IEvent;
  reloadHostEventData: (id: number, callback: () => void) => void;
}

const HostHistoryItem = ({ host, reloadHostEventData }: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [fileResultName, setFileResultName] = useState('');
  const [file, setFile] = useState<File>();
  const history = useHistory();
  const [isActived, setIsActived] = useState('');
  const [helperTextTotal, setHelperTextTotal] = useState('');
  const [helperTextOne, setHelperTextOne] = useState('');
  const [helperTextTwo, setHelperTextTwo] = useState('');
  const { library, account } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(true);
  const dispatch = useDispatch();
  const [totalScore, setTotalScore] = useState<number | string>();
  const [isChangeTotalScore, setIsChangeTotalScore] = useState(false);
  const [scoreTeamOne, setScoreTeamOne] = useState<number | string>();
  const [scoreTeamTwo, setScoreTeamTwo] = useState<number | string>();
  const [remainingPool, setRemainingPool] = useState({});
  const [isHasFileResult, setIsHasFileResult] = useState(false);
  const [isPoolValueEqualZero, setIsPoolValueEqualZero] = useState(true);
  const [eventType, setEventType] = useState<WhoTakeWith>();
  const [uploadType, setUploadType] = useState('file');
  const [linkResult, setLinkResult] = useState<string>();
  const [isLoadingPool, setIsLoadingPool] = useState(false);
  const [isHiddenDeleteButton, setIsHiddenDeleteButton] = useState(false);
  const { uvpPlatformFee: UVP_PLATFORM_FEE } = usePlatformFee();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const ref = useRef<any>();
  const typeUpload = useMemo(() => {
    return [
      { value: 'File', id: 'file' },
      { value: 'Link', id: 'link' },
    ];
  }, []);

  const isUserVsPool = useMemo(() => {
    const { eventType } = JSON.parse(host?.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return eventType != WhoTakeWith.USER_USER;
  }, [host?.metadata]);

  const handleChangeFileInput = useCallback((e: React.ChangeEvent<any>) => {
    let fileName = e.target.files[0].name;
    let idxDot = fileName.lastIndexOf('.') + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png') {
      setIsHasFileResult(true);
      setFile(e.target.files[0]);
    } else {
      alert('Only jpg/jpeg and png files are allowed!');
    }
  }, []);
  const handleChangeScoreTeamOne = useCallback(
    (e: React.ChangeEvent<any>) => {
      setIsChangeTotalScore(true);
      const newValue = e.target.value;
      setScoreTeamOne(newValue);
    },
    [scoreTeamOne, isChangeTotalScore, setIsChangeTotalScore],
  );
  const handleChangeScoreTeamTwo = useCallback(
    (e: React.ChangeEvent<any>) => {
      setIsChangeTotalScore(true);
      const newValue = e.target.value;
      setScoreTeamTwo(newValue);
    },
    [scoreTeamTwo, isChangeTotalScore, setIsChangeTotalScore],
  );

  const getRemainingLiquidityPool = useCallback(async () => {
    console.log('run get pool');
    setIsLoadingPool(true);
    const web3 = new Web3(library?.provider || window.ethereum);
    const contract = new web3.eth.Contract(
      predictionABI as any,
      process.env.REACT_APP_PREDICTION,
    );
    const poolTokens = host.poolTokenAmounts;
    const tokens = Object.keys(poolTokens).filter((a) => !!poolTokens[a]);
    try {
      const result: any = {};
      if (tokens.length == 0) return;
      const res = await contract.methods.getRemainingLP(host.id, tokens).call();
      tokens.forEach((t, i) => {
        result[t] = res[i];
      });
      setIsLoadingPool(false);
      setRemainingPool(result);
    } catch (e) {
      setIsLoadingPool(false);
      console.log('get remaining error', e);
    }
  }, [host.id, host.poolTokenAmounts, library?.provider]);
  useEffect(() => {
    const options = JSON.parse(host.options) as string[];
    const { handicap } = JSON.parse(host.metadata || '{}') as {
      handicap: string[];
    };
    if (scoreTeamOne && scoreTeamTwo) {
      if (host.marketType == MarketType.HOME_DRAW_AWAY) {
        if (scoreTeamOne == scoreTeamTwo) setIsActived(options[1]);
        else if (scoreTeamOne < scoreTeamTwo) setIsActived(options[2]);
        else setIsActived(options[0]);
      }
      if (host.marketType == MarketType.HANDICAP) {
        if (
          +scoreTeamOne + Number(handicap[0]) ==
          +scoreTeamTwo + Number(handicap[1])
        ) {
          setIsActived(options[2]);
        } else if (
          +scoreTeamOne + Number(handicap[0]) <
          +scoreTeamTwo + Number(handicap[1])
        ) {
          setIsActived(options[4]);
        } else setIsActived(options[0]);
      }
    }
  }, [scoreTeamOne, scoreTeamTwo]);
  useEffect(() => {
    setIsDisabledButton(false);
    if (
      (file == undefined && linkResult == undefined) ||
      (file == undefined && linkResult == '')
    ) {
      setIsDisabledButton(true);
    }
    if (host.marketType == MarketType.OVER_UNDER) {
      if (totalScore == undefined || `${totalScore}` == '') {
        setIsDisabledButton(true);
      } else {
        isPositiveInt(+totalScore)
          ? setHelperTextTotal('')
          : setHelperTextTotal('Total score must be positive integer');
      }
    }
    if (
      host.marketType == MarketType.MULTIPLE_CHOICES ||
      host.marketType == MarketType.TRUE_FALSE
    ) {
      if (isActived == '') {
        setIsDisabledButton(true);
      }
    }
    if (
      host.marketType == MarketType.HANDICAP ||
      host.marketType == MarketType.HOME_DRAW_AWAY
    ) {
      if (
        scoreTeamOne == undefined ||
        scoreTeamTwo == undefined ||
        !isPositiveInt(+scoreTeamOne) ||
        !isPositiveInt(+scoreTeamTwo) ||
        `${scoreTeamOne}` == '' ||
        `${scoreTeamTwo}` == ''
      ) {
        setIsDisabledButton(true);
      }
      if (scoreTeamOne != undefined) {
        isPositiveInt(+scoreTeamOne)
          ? setHelperTextOne('')
          : setHelperTextOne('Score must be positive integer');
      }
      if (scoreTeamTwo != undefined) {
        isPositiveInt(+scoreTeamTwo)
          ? setHelperTextTwo('')
          : setHelperTextTwo('Score must be positive integer');
      }
    }
  }, [file, totalScore, scoreTeamOne, scoreTeamTwo, isActived, linkResult]);
  const isPositiveInt = (a: number) => {
    if (a < 0) {
      return false;
    } else if (a == 0) {
      return true;
    } else {
      return Number.isInteger(a);
    }
  };
  useEffect(() => {
    if (!host.id || isOver48hEndTime(host) != 'ended') return;
    getRemainingLiquidityPool();
  }, [host.id, host.result]);
  const getValidActived = (
    totalScore: number | string | undefined,
    index: number,
    type: string,
  ) => {
    if (totalScore == undefined) totalScore = 0;
    if (host.result && host.totalScore) {
      totalScore = host.totalScore;
    }
    const options = JSON.parse(host.options) as string[];
    let indexActive = 100;
    let a = options.filter((o, i) => i % 2 == 1);
    let b = a.map((v, i) => +v.replace('>', ''));
    for (let i = 0; i < b.length; i++) {
      if ((b[i] < totalScore && b[i + 1] > totalScore) || b[i] == totalScore) {
        indexActive = i;
      }
    }
    if (b[0] > totalScore) return type == 'over' ? false : true;
    else if (b[length - 1] > totalScore) return type == 'over' ? false : true;
    if (b[index] == totalScore) return false;
    return type == 'over' ? indexActive >= index : indexActive < index;
  };
  useEffect(() => {
    if (file) {
      file?.name.length > 20
        ? setFileResultName(renderShortAddress(file?.name, 10, 10))
        : setFileResultName(file?.name);
    }
  }, [file]);
  useEffect(() => {
    const { eventType: type } = JSON.parse(host.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    setEventType(type);
  }, [host.metadata]);
  useEffect(() => {
    const options = JSON.parse(host.options) as string[];
    if (host.result) {
      setIsChangeTotalScore(true);
      if (host.marketType == MarketType.HANDICAP) {
        if (host.result == 'Half Lose - Half Win') setIsActived(options[4]);
        else if (host.result == 'Half Win - Half Lose')
          setIsActived(options[0]);
        else setIsActived(host.result);
      }
      if (host.marketType == MarketType.OVER_UNDER) {
        if (eventType == WhoTakeWith.USER_USER) {
          if (host.result.includes('>')) setIsActived('Over');
          if (host.result.includes('<')) setIsActived('Under');
        }
      }
      if (
        host.marketType == MarketType.MULTIPLE_CHOICES ||
        host.marketType == MarketType.TRUE_FALSE
      ) {
        setIsActived(host.result);
      }
    }
  }, [host.result]);
  useEffect(() => {
    host.resultProofUrl
      ? host.resultProofUrl.length > 40
        ? setFileResultName(renderShortAddress(host.resultProofUrl, 20, 10))
        : setFileResultName(host.resultProofUrl)
      : setFileResultName('');
  }, [host.resultProofUrl]);
  useEffect(() => {
    if (host.scoreOne != null && host.scoreTwo != null) {
      setScoreTeamOne(host.scoreOne);
      setScoreTeamTwo(host.scoreTwo);
    } else {
      setScoreTeamOne('');
      setScoreTeamTwo('');
    }
    if (host.totalScore != null) {
      setTotalScore(host.totalScore);
    } else {
      setTotalScore('');
    }
  }, [host.scoreOne, host.scoreTwo, host.totalScore]);

  const renderPoolValuesMobile = useCallback((amount: any) => {
    const result = Object.keys(amount)
      .filter((a) => !!amount[a])
      .map((b, i) => (
        <Typography key={i}>
          {`${convertThousandSeperator(
            Number(convertWeiToToken(amount[b]))
              .toFixed(5)
              .replace(/\.0+$/, ''),
          )} ${getNameToken(b)} `}
        </Typography>
      ));
    return Object.keys(amount).length != 0 ? (
      result
    ) : (
      <Typography>0</Typography>
    );
  }, []);
  const onClaimLiquidity = useCallback(async () => {
    setIsLoading(true);
    const web3 = new Web3(library?.provider || window.ethereum);
    const contract = new web3.eth.Contract(
      predictionABI as any,
      process.env.REACT_APP_PREDICTION,
    );
    const poolTokens = host.poolTokenAmounts;
    const tokens = Object.keys(poolTokens).filter((a) => !!poolTokens[a]);
    try {
      const res = await contract.methods
        .claimRemainingLP(host.id, tokens)
        .send({
          from: account,
          // gasPrice: web3.utils.toWei('0.1', 'gwei'),
        });
    } catch (e) {
      setIsLoading(false);
    }
    reloadHostEventData(host.id, () => {
      setIsLoading(false);
    });
  }, [host.id, library?.provider, account, host.poolTokenAmounts]);
  const handleChangeTotalScore = useCallback(
    (e: React.ChangeEvent<any>) => {
      setIsChangeTotalScore(true);
      const newValue = e.target.value;
      const options = JSON.parse(host.options) as string[];
      setTotalScore(newValue);
      if (eventType == WhoTakeWith.USER_USER) {
        if (newValue == '') {
          setIsActived('');
        } else if (newValue > +options[0].replace('<', '')) {
          setIsActived('Over');
        } else if (newValue < +options[0].replace('<', '')) {
          setIsActived('Under');
        } else {
          setIsActived('');
        }
      } else {
        setTotalScore(newValue);
      }
    },
    [host, setIsChangeTotalScore, isChangeTotalScore],
  );

  const isClaimed = () => {
    return (
      host.poolTokenClaimAmounts[Object.keys(host.poolTokenClaimAmounts)[0]] !=
      null
    );
  };

  const onToggleShowMore = () => {
    dispatch(updateMultipleChoiceExpand(host.id));
  };

  const renderOptions = useMemo(() => {
    const options = JSON.parse(host.options) as string[];
    const odds = (JSON.parse(host.odds) as number[]).map((o) =>
      new Decimal(o).div(10000).toString(),
    );
    const metadata = JSON.parse(host.metadata || '{}');
    const images = metadata.images || {};
    if (host.pro != 0) {
      if (
        host?.metadata &&
        JSON.parse(host?.metadata) &&
        JSON.parse(host?.metadata).fixtureMeta
      ) {
        let fixtureMeta = JSON.parse(host?.metadata).fixtureMeta;
        let teamsMeta = JSON.parse(fixtureMeta).teams;
        if (host.marketType == MarketType.HANDICAP) {
          if (!images[0]) {
            images[0] = teamsMeta.home.logo;
          }
          if (!images[4]) {
            images[4] = teamsMeta.away.logo;
          }
        } else if (host.marketType == MarketType.HOME_DRAW_AWAY) {
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
    const predictionTokenOptionAmounts = host.predictionTokenOptionAmounts;
    const keys = Object.keys(predictionTokenOptionAmounts);
    let token = keys[0];
    if (host.marketType == MarketType.MULTIPLE_CHOICES) {
      const width = ref.current?.clientWidth;
      let renderOptions: any[] = [];
      let maxOptsPerRow = options.length;
      if (width) {
        maxOptsPerRow = Math.floor(width / 138);
        renderOptions = host.isExpand
          ? options
          : options.slice(0, maxOptsPerRow);
      }
      return (
        <Box className={classes.wapperMulti}>
          <div className={classes.wrapperMultipleChoice} ref={ref}>
            {renderOptions.map((o, i) => {
              const keys = { itemId: o };
              return (
                <OptionItem
                  key={i}
                  className={clsx({
                    [classes.choosed]: isActived == `${o}`,
                    [classes.optionHasResult]:
                      host.result != undefined || host.pro != 0,
                  })}
                  {...keys}
                  onClick={() => {
                    if (host.pro != 0) return;
                    host.result != undefined || setIsActived(`${o}`);
                  }}
                  isImageOption={answerType == AnswerType.WITH_PHOTOS}
                  percentage={predictionTokenOptionAmounts[token]?.[i]}
                  image={images[i]}
                  name={o}
                  odd={isUserVsPool ? odds[i] : undefined}
                />
              );
            })}
          </div>
          {maxOptsPerRow < options.length && (
            <Button style={{ marginTop: 20 }} onClick={onToggleShowMore}>
              {host.isExpand ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </Button>
          )}
        </Box>
      );
    } else if (host.marketType == MarketType.HANDICAP) {
      const { handicap } = JSON.parse(host.metadata || '{}') as {
        handicap: string[];
      };
      return (
        <Box className={classes.wapperHandicap}>
          <Box>
            <OptionItem
              className={clsx(classes.optionHasResult, {
                [classes.choosed]: isActived == options[0],
              })}
              isImageOption={answerType == AnswerType.WITH_PHOTOS}
              percentage={predictionTokenOptionAmounts[token]?.[0]}
              image={images[0]}
              name={options[0]}
              odd={isUserVsPool ? odds[0] : undefined}
            />
            {isOverEndTime(host.endTime) &&
              (host.scoreOne != null
                ? true
                : isOver48hEndTime(host) != 'ended') && (
                <CommonInput
                  value={scoreTeamOne}
                  error={true}
                  helperText={helperTextOne}
                  disabled={host.result != null}
                  required={true}
                  onChange={(e) => handleChangeScoreTeamOne(e)}
                  className={classes.commonInputHomeDrawAway}
                />
              )}
          </Box>

          <Box
            className={
              host.result == null ? classes.handicap : classes.handicapHasResult
            }
          >
            <Typography>
              {handicap[0]} : {handicap[1]}
            </Typography>
          </Box>
          <Box>
            <OptionItem
              className={clsx(classes.optionHasResult, {
                [classes.choosed]: isActived == options[4],
              })}
              isImageOption={answerType == AnswerType.WITH_PHOTOS}
              percentage={predictionTokenOptionAmounts[token]?.[4]}
              image={images[4]}
              name={options[4]}
              odd={isUserVsPool ? odds[4] : undefined}
            />
            {isOverEndTime(host.endTime) &&
              (host.scoreTwo != null
                ? true
                : isOver48hEndTime(host) != 'ended') && (
                <CommonInput
                  value={scoreTeamTwo}
                  required={true}
                  error={true}
                  disabled={host.result != null}
                  helperText={helperTextTwo}
                  onChange={(e) => handleChangeScoreTeamTwo(e)}
                  className={classes.commonInputHomeDrawAway}
                />
              )}
          </Box>
        </Box>
      );
    } else if (host.marketType == MarketType.OVER_UNDER) {
      if (isUserVsPool)
        return (
          <Box className={classes.wapperOverUnder}>
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
                      [classes.overUnderCorrect]:
                        isChangeTotalScore &&
                        getValidActived(totalScore, i, 'over'),
                    })}
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
                      [classes.overUnderCorrect]:
                        isChangeTotalScore &&
                        getValidActived(totalScore, i, 'under'),
                    })}
                  >
                    {v}
                  </Typography>
                ))}
            </Box>
          </Box>
        );
      return (
        <>
          <OptionItemWithOnlyText
            className={clsx(classes.optionOverUnder, {
              [classes.choosed]: isActived == 'Over',
            })}
            name={`Over ${options[0].replace('<', '')}`}
            percentage={predictionTokenOptionAmounts[token]?.[0]}
          />
          <OptionItemWithOnlyText
            className={clsx(classes.optionOverUnder, {
              [classes.choosed]: isActived == 'Under',
            })}
            name={`Under ${options[0].replace('<', '')}`}
            percentage={predictionTokenOptionAmounts[token]?.[1]}
          />
        </>
      );
    } else if (host.marketType == MarketType.TRUE_FALSE) {
      return (
        <Box className={classes.wrapperTruFalse}>
          {options.map((o, i) => (
            <Box key={i}>
              <OptionItem
                className={clsx({
                  [classes.choosed]: isActived == o,
                })}
                onClick={() => {
                  if (host.pro != 0) return;
                  host.result != undefined || setIsActived(`${o}`);
                }}
                isImageOption={answerType == AnswerType.WITH_PHOTOS}
                percentage={predictionTokenOptionAmounts[token]?.[i]}
                name={o}
                odd={isUserVsPool ? odds[i] : undefined}
                image={images[i]}
              />
            </Box>
          ))}
        </Box>
      );
    } else {
      return (
        <Box className={classes.containerHomeDrawAway}>
          {options.map((o, i) => (
            <Box key={i} className={classes.wrapperHomeDrawAway}>
              <OptionItem
                className={clsx({
                  [classes.choosed]: isChangeTotalScore && isActived == o,
                })}
                name={o}
                isImageOption={answerType == AnswerType.WITH_PHOTOS}
                image={images[i]}
                percentage={predictionTokenOptionAmounts[token]?.[i]}
                odd={isUserVsPool ? odds[i] : undefined}
              />
              {i == 0 &&
                isOverEndTime(host.endTime) &&
                (host.scoreOne != null
                  ? true
                  : isOver48hEndTime(host) != 'ended') && (
                  <Box>
                    <CommonInput
                      value={scoreTeamOne}
                      error={true}
                      helperText={helperTextOne}
                      disabled={host.result != null}
                      required={true}
                      onChange={(e) => handleChangeScoreTeamOne(e)}
                      className={classes.commonInputHomeDrawAway}
                    />
                  </Box>
                )}
              {i == 2 &&
                isOverEndTime(host.endTime) &&
                (host.scoreTwo != null
                  ? true
                  : isOver48hEndTime(host) != 'ended') && (
                  <Box>
                    <CommonInput
                      value={scoreTeamTwo}
                      error={true}
                      helperText={helperTextTwo}
                      disabled={host.result != null}
                      required={true}
                      onChange={(e) => handleChangeScoreTeamTwo(e)}
                      className={classes.commonInputHomeDrawAway}
                    />
                  </Box>
                )}
            </Box>
          ))}
        </Box>
      );
    }
  }, [
    host,
    isActived,
    isDesktop,
    scoreTeamOne,
    helperTextOne,
    helperTextTwo,
    scoreTeamTwo,
    totalScore,
    isChangeTotalScore,
    isMobile,
  ]);

  const updateResultToSC = useCallback(
    async (result: number, account: string) => {
      const web3 = new Web3(library?.provider || window.ethereum);
      const contract = new web3.eth.Contract(
        eventABI as any,
        process.env.REACT_APP_EVENT,
      );
      const res = await contract.methods
        .updateEventResult(host.id, result)
        .send({
          from: account,
          // gasPrice: web3.utils.toWei('0.1', 'gwei'),
        });
    },
    [library?.provider, host.id],
  );

  const getResultHandicap = useCallback(
    (result1: number, result2: number) => {
      const { handicap } = JSON.parse(host.metadata || '{}') as {
        handicap: string[];
      };
      const totalResult1 = result1 + Number(handicap[0]);
      const totalResult2 = result2 + Number(handicap[1]);
      const result = totalResult1 - totalResult2;
      if (result >= 0.5) {
        return 0;
      } else if (result > 0) {
        return 1;
      } else if (result == 0) {
        return 2;
      } else if (result > -0.5) {
        return 3;
      } else {
        return 4;
      }
    },
    [host.metadata, host.options],
  );

  const renderPoolValues = useCallback(
    (amount: any, isUvP?: boolean) => {
      const result = Object.keys(amount)
        .filter((a) => !!amount[a])
        .map((p, i) => {
          let x = `${convertThousandSeperator(
            // @ts-ignore
            Number(
              convertWeiToToken(
                isUvP
                  ? new Decimal(amount[p])
                      .div(1 - UVP_PLATFORM_FEE)
                      .toNumber()
                      .toLocaleString('fullwide', { useGrouping: false })
                  : amount[p],
              ),
            )
              .toFixed(5)
              .replace(/\.0+$/, '') * 1,
          )}`;
          if (x != '') return `${x} ${getNameToken(p)}`;
          return '0';
        })
        .join(' & ');
      return result || '0';
    },
    [UVP_PLATFORM_FEE],
  );
  useEffect(() => {
    let amount = host.poolTokenEstimateClaimAmounts || {};
    let temp = Object.keys(amount).filter(
      (a) => !!amount[a] && amount[a] != '0',
    );
    if (temp.length != 0) {
      setIsPoolValueEqualZero(false);
    } else setIsPoolValueEqualZero(true);
  }, [host.poolTokenEstimateClaimAmounts]);
  const getResultOverUnder = useCallback(
    (totalScore: number | string) => {
      const options = JSON.parse(host.options) as string[];
      const optionsNum = options
        .filter((o, i) => i % 2 == 0)
        .map((o) => +o.replace('<', ''));
      const index = findClosestValue(optionsNum, +totalScore);
      if (optionsNum[index] >= totalScore) {
        return index * 2;
      }
      return index * 2 + 1;
    },
    [host.options],
  );

  const getResultHomeDrawAway = useCallback(
    (result1: number, result2: number) => {
      const options = JSON.parse(host.options) as string[];
      if (result1 > result2) {
        return 0;
      } else if (result1 == result2) {
        return 1;
      }
      return 2;
    },
    [host.options],
  );

  const onConfirmResult = useCallback(async () => {
    try {
      setIsLoading(true);
      let result = 0;
      if (
        host.marketType == MarketType.MULTIPLE_CHOICES ||
        host.marketType == MarketType.TRUE_FALSE
      ) {
        const options = JSON.parse(host.options) as string[];
        options.forEach((option, index) => {
          if (option == isActived) {
            result = index;
          }
        });
      } else if (host.marketType == MarketType.HANDICAP) {
        // TODO pass result of 2 teams
        result = getResultHandicap(Number(scoreTeamOne), Number(scoreTeamTwo));
        dispatch(
          updateEventScoreAction(
            host.id,
            { scoreOne: scoreTeamOne, scoreTwo: scoreTeamTwo },
            () => {},
          ),
        );
      } else if (host.marketType == MarketType.OVER_UNDER) {
        // TODO pass result of totalScore
        if (totalScore) {
          result = getResultOverUnder(totalScore) || 0;
          dispatch(
            updateEventScoreAction(
              host.id,
              { totalScore: totalScore },
              () => {},
            ),
          );
        }
      } else {
        result = getResultHomeDrawAway(
          Number(scoreTeamOne),
          Number(scoreTeamTwo),
        );
        dispatch(
          updateEventScoreAction(
            host.id,
            { scoreOne: scoreTeamOne, scoreTwo: scoreTeamTwo },
            () => {},
          ),
        );
      }
      await updateResultToSC(result, account || '');
      reloadHostEventData(host.id, () => {
        setIsLoading(false);
      });
      if (uploadType == 'file' && file) {
        dispatch(updateEventProof(host.id, file, () => {}));
      } else if (uploadType == 'link' && linkResult) {
        dispatch(updateEventProofWithLink(host.id, linkResult, () => {}));
      } else {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
    }
    // setIsHasFileResult(false);
    setIsHiddenDeleteButton(true);
  }, [
    account,
    host.marketType,
    host.id,
    host.options,
    isActived,
    updateResultToSC,
    getResultHandicap,
    getResultOverUnder,
    getResultHomeDrawAway,
    dispatch,
    linkResult,
    file,
    scoreTeamOne,
    scoreTeamTwo,
    totalScore,
    uploadType,
  ]);
  const clearFileResult = useCallback(
    (e: React.ChangeEvent<any>) => {
      setIsHasFileResult(false);
      setFile(undefined);
      setFileResultName('');
    },
    [dispatch, isHasFileResult],
  );

  const disableClaimLiquidity = useMemo(() => {
    const date = dayjs(host.claimTime);
    const dateToMilliSecond = date.valueOf();
    return Date.now() <= dateToMilliSecond;
  }, [host.finalTime]);

  useEffect(() => {
    const width = ref.current?.clientWidth;
    if (!width) return;
    const options = JSON.parse(host.options) as string[];
    const isMobile = window.innerWidth < 376;
    const maxOptsPerRow = Math.floor(width / 138);
    if (maxOptsPerRow < options.length && isUndefined(host.isExpand)) {
      dispatch(
        updateSingleEvent({
          ...host,
          isExpand: false,
          maxRow: Math.ceil(options.length / maxOptsPerRow),
        }),
      );
    }
  }, [host]);
  const handleChangeType = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setUploadType(newValue);
      setFile(undefined);
    },
    [],
  );
  const isOverTime = (a: string | undefined) => {
    if (a == undefined) return false;
    let time = new Date(a);
    return new Date() > time;
  };
  const getPrice = (e: IEvent) => {
    if (e.finalResult == null) return 0;
    else {
      if (e?.pro == 5)
        return new Decimal(e.finalResult).div(100000000).toString();
      else return e.finalResult;
    }
  };
  const getTokenName = (metadata: string | undefined) => {
    if (metadata == undefined) return '';
    let meta = JSON.parse(metadata);
    return meta.coinSelected.symbol;
  };
  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value;
    setLinkResult(newValue);
  };

  const type = useMemo(() => {
    const { eventType } = JSON.parse(host?.metadata || '{}') as {
      eventType: WhoTakeWith;
    };
    return eventType;
  }, [host?.metadata]);

  const renderType = useMemo(() => {
    if (type == WhoTakeWith.AFFILIATE) return 'Affiliate';
    if (type == WhoTakeWith.USER_POOL) return 'user vs pool';
    return 'Peer-to-Peer & Prize';
  }, [type]);

  return (
    <Box
      className={clsx({
        [classes.containerDisable]: isOver48hEndTime(host) == 'on going',
        [classes.containerEnded]: isOver48hEndTime(host) == 'ended',
        [classes.container]: isOver48hEndTime(host) == 'pending result',
      })}
    >
      <EventHeader host={host} />
      <Box className={classes.body}>
        <Box className={classes.mainBodyWapper}>
          <EventTitle
            host={host}
            statusType={isOver48hEndTime(host)}
            className={classes.customTitle}
          />
          <Typography>
            {host.marketType == MarketType.TRUE_FALSE
              ? 'Yes / No'
              : host.marketType}{' '}
            {host.pro != 0 ? '' : '(Select correct result)'}
          </Typography>
          <Box className={classes.optionsWapper}>{renderOptions}</Box>

          {host.marketType == MarketType.OVER_UNDER &&
            isOverEndTime(host.endTime) &&
            (host.totalScore != null
              ? true
              : isOver48hEndTime(host) != 'ended') && (
              <Box className={classes.totalScore}>
                <Typography>Total Score</Typography>
                <CommonInput
                  value={totalScore}
                  error={true}
                  helperText={helperTextTotal}
                  disabled={host.result != null}
                  required={true}
                  onChange={handleChangeTotalScore}
                  className={classes.commonInputTotalScore}
                />
              </Box>
            )}
          {host.pro != 0 &&
            isOverEndTime(host.endTime) &&
            !(
              isOverTime(`${host?.endTime}`) &&
              (host?.pro == 5 || host?.pro == 6)
            ) && (
              <Typography className={classes.proNoti}>
                {host.isBlock
                  ? 'Event is canceled or postponed'
                  : 'Result is automatically updated'}
              </Typography>
            )}
          {isOverTime(`${host?.endTime}`) &&
            (host?.pro == 5 || host?.pro == 6) && (
              <Box className={classes.proNoti}>
                <Typography>
                  <>
                    {getTokenName(host?.metadata)}{' '}
                    {host?.pro == 5 ? 'price' : 'volume'} on{' '}
                    {dayjs(host.endTime).format('DD/MM/YYYY - HH:mm')} is{' $'}
                    {convertThousandSeperator(getPrice(host))}
                  </>
                </Typography>
              </Box>
            )}
          {host.result == null &&
            host.pro == 0 &&
            isOverEndTime(host.endTime) &&
            isOver48hEndTime(host) != 'ended' && (
              <>
                <Typography className={classes.label}>
                  Proof of result
                </Typography>
                <Box className={classes.wapperChooseResult}>
                  {uploadType == 'file' && (
                    <LabelInput
                      component={
                        <CommonUploadFileInput
                          name={fileResultName}
                          required={true}
                          isHiddenChooseFile={false}
                          isHasData={isHasFileResult}
                          clearFileData={clearFileResult}
                          isHiddenDeleteButton={isHiddenDeleteButton}
                          onChange={handleChangeFileInput}
                          className={classes.commonInput}
                        />
                      }
                    />
                  )}
                  {uploadType == 'link' && (
                    <Box className={classes.wapperLink}>
                      <CommonInput
                        value={linkResult}
                        onChange={handleChangeInputValue}
                        className={classes.input}
                      />
                      {/* <Button className={classes.button}>Save</Button> */}
                    </Box>
                  )}
                  <CommonSelectInput
                    values={typeUpload}
                    currentValue={uploadType}
                    onChange={handleChangeType}
                    className={classes.select}
                  />
                </Box>
              </>
            )}
          {host.result != null &&
            isOverEndTime(host.endTime) &&
            host.pro == 0 && (
              <LabelInput
                label="Proof of result"
                component={
                  <CommonUploadFileInput
                    name={fileResultName}
                    required={true}
                    link={host.resultProofUrl}
                    isHasData={isHasFileResult}
                    isUnderlineText={true}
                    isHiddenChooseFile={true}
                    clearFileData={clearFileResult}
                    isHiddenDeleteButton={isHiddenDeleteButton}
                    onChange={handleChangeFileInput}
                    className={clsx(classes.commonInput, classes.cursorPointer)}
                  />
                }
              />
            )}
        </Box>
        <Box className={classes.statisticsWapper}>
          <Typography className={classes.titleStatistics}>
            Statistics
          </Typography>
          <Box className={classes.statistics}>
            <Box className={classes.statisticsInfo}>
              <Typography>Method:</Typography>
              <Typography>{renderType}</Typography>
            </Box>
            {type != WhoTakeWith.AFFILIATE && (
              <Box className={classes.statisticsInfo}>
                <Typography>
                  Total {isUserVsPool ? 'liquidity' : 'prize'} pool:
                </Typography>
                <Typography className={classes.highline}>
                  {renderPoolValues(host.poolTokenAmounts)}
                </Typography>
              </Box>
            )}
            <Box className={classes.statisticsInfo}>
              <Typography>Number of participants:</Typography>
              <Typography>
                {host.participants ? host.participants.length : 0}
              </Typography>
            </Box>
            <Box className={classes.statisticsInfo}>
              <Typography>Total Predicted Pool:</Typography>
              <Typography className={classes.highline}>
                {renderPoolValues(host.predictionTokenAmounts, isUserVsPool)}
              </Typography>
            </Box>
            <Box className={classes.statisticsInfo}>
              <Typography>Event views:</Typography>
              <Typography>{host.views}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {isOverEndTime(host.endTime) && (
        <Box className={classes.confirmWapper1}>
          {isOver48hEndTime(host) != 'ended' && !host.result ? (
            <LoadingButton
              className={
                isDisabledButton
                  ? classes.confirmWapper2Disabled
                  : classes.confirmWapper2
              }
              onClick={isDisabledButton ? () => {} : onConfirmResult}
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isDisabledButton ? (
                <Typography className={classes.confirmDisabled}>
                  Confirm result
                </Typography>
              ) : (
                <Typography className={classes.confirm}>
                  Confirm result
                </Typography>
              )}
            </LoadingButton>
          ) : (
            <Box className={classes.claimLiquidityResult}>
              <>
                <Typography className={classes.remainingPoolText}>
                  {isLoadingPool ? (
                    <ReactLoading
                      className={classes.loading}
                      type="bubbles"
                      color="#FFFFFF"
                      width={24}
                      height={24}
                    />
                  ) : (
                    renderPoolValues(remainingPool)
                  )}
                </Typography>
                <Box className={classes.remainingPoolMobile}>
                  {isLoadingPool ? (
                    <ReactLoading
                      className={classes.loading}
                      type="bubbles"
                      color="#FFFFFF"
                      width={24}
                      height={24}
                    />
                  ) : (
                    renderPoolValuesMobile(remainingPool)
                  )}
                </Box>
              </>
              {isPoolValueEqualZero ? (
                <></>
              ) : (
                <LoadingButton
                  className={
                    isClaimed()
                      ? classes.confirmWapperClaimBtnDisabled
                      : classes.confirmWapperClaimBtn
                  }
                  disabled={disableClaimLiquidity}
                  isLoading={isLoading}
                  onClick={onClaimLiquidity}
                >
                  <Typography
                    className={clsx(
                      isClaimed()
                        ? classes.confirmDisabledClaimed
                        : classes.confirm,
                      { [classes.disabledClaim]: disableClaimLiquidity },
                    )}
                  >
                    {isClaimed()
                      ? `CLAIMED`
                      : eventType == WhoTakeWith.USER_USER
                      ? `CLAIM PRIZE`
                      : `CLAIM LIQUIDITY`}
                  </Typography>
                </LoadingButton>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default HostHistoryItem;
