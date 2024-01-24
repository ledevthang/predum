import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import { convertTime, getNameToken, renderShortAddress } from 'helpers';
import ShiedTickIcon from 'icon/SheildTickIcon';
import BasketballIcon from 'icon/sidebar/BasketballIcon';
import CourthouseIcon from 'icon/sidebar/CourthouseIcon';
import DiagramIcon from 'icon/sidebar/DiagramIcon';
import Element4Icon from 'icon/sidebar/Element4Icon';
import FootballIcon from 'icon/sidebar/FoorballIcon';
import FormulaIcon from 'icon/sidebar/FormulaIcon';
import MMAIcon from 'icon/sidebar/MMAIcon';
import TennisBallIcon from 'icon/sidebar/TennisBallIcon';
import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  getHostPrediction,
  getAllCategories,
  getCompetitionsState,
} from 'store/selectors';
import { WhoTakeWith } from 'types/hostPrediction';
import { useStyles } from './EventReviewStyles';
import { MarketType } from 'types/hostPrediction';
import _ from 'lodash';
import TooltipTypography from 'components/common/TooltipTypography';

const EventReview = () => {
  const classes = useStyles();
  const { account } = useWeb3React();
  const predictState = useSelector(getHostPrediction);
  const categories = useSelector(getAllCategories);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const competitions = useSelector(getCompetitionsState);

  const categoryName = useMemo(() => {
    const index = categories.findIndex((c) => c.id == predictState.subcategory);
    if (index < 0) return;
    return categories[index].name;
  }, [categories, predictState.subcategory]);

  const renderIcon = useMemo(() => {
    switch (categoryName) {
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
  }, [categoryName]);

  const renderOverUnderName = useCallback((value: string) => {
    switch (value) {
      case 'totalScores':
        return 'Total Score';
      case 'over':
        return 'Over';
      case 'under':
        return 'Under';
    }
  }, []);

  const renderOptions = useMemo(() => {
    const isUserVsPools =
      predictState.organizingMethod.eventType != WhoTakeWith.USER_USER;
    if (predictState.marketType == MarketType.MULTIPLE_CHOICES) {
      const options = predictState.multipleChoices.options;
      return options.map((o, i) => (
        <Box key={i} className={clsx(classes.choice, 'center-root')}>
          <TooltipTypography text={o.name} />
          {isUserVsPools && <Typography>{o.odd}</Typography>}
        </Box>
      ));
    } else if (predictState.marketType == MarketType.HANDICAP) {
      const options = predictState.handicap;
      return (
        <>
          <Box className={clsx(classes.choice, 'center-root')}>
            <Typography>{options[0].name}</Typography>
            <Typography>{options[0].odd}</Typography>
          </Box>

          <Box className={classes.handicap}>
            <Typography>
              {options[0].value} : {options[1].value}
            </Typography>
          </Box>
          <Box className={clsx(classes.choice, 'center-root')}>
            <Typography>{options[1].name}</Typography>
            {isUserVsPools && <Typography>{options[1].odd}</Typography>}
          </Box>
        </>
      );
    } else if (predictState.marketType == MarketType.OVER_UNDER) {
      const options: any = _.omit(predictState.overUnder, ['totalScore']);
      if (isUserVsPools) {
        return Object.keys(options).map((o, i) => (
          <Box key={i} className={clsx('center-root')}>
            <Typography className={classes.overUnderName}>
              {renderOverUnderName(o)}
            </Typography>
            {options[o].map((v: number, i: number) => (
              <Typography key={i} className={classes.overUnderValue}>
                {v}
              </Typography>
            ))}
          </Box>
        ));
      } else {
        return (
          <>
            <Box className={clsx(classes.choiceOverUnderUvU, 'center-root')}>
              <Typography>Over</Typography>
              <Typography>{predictState.overUnder.totalScore}</Typography>
            </Box>
            <Box className={clsx(classes.choiceOverUnderUvU, 'center-root')}>
              <Typography>Under</Typography>
              <Typography>{predictState.overUnder.totalScore}</Typography>
            </Box>
          </>
        );
      }
    } else {
      const options = predictState.homeDrawAway;
      return options.map((o, i) => (
        <Box
          key={i}
          className={clsx(
            classes.choice,
            classes.choiceHomeDrawAway,
            'center-root',
          )}
        >
          <Typography>{o.name}</Typography>
          {isUserVsPools && <Typography>{o.odd}</Typography>}
        </Box>
      ));
    }
  }, [predictState, renderOverUnderName]);

  const isWrapperOverUnder = useMemo(() => {
    return (
      predictState.marketType == MarketType.OVER_UNDER &&
      predictState.organizingMethod.eventType != WhoTakeWith.USER_USER
    );
  }, [predictState]);

  const renderCategory = useMemo(() => {
    return (
      categoryName && (
        <Box className={clsx(classes.category2)}>
          {renderIcon}
          <Typography>{categoryName}</Typography>
        </Box>
      )
    );
  }, [renderIcon, categoryName]);

  const renderPoolValues = useMemo(() => {
    const result = predictState.organizingMethod.betting
      .filter((b) => b.liquidityPool)
      .map((b) => `${b.liquidityPool || '0'} ${getNameToken(b.token)}`)
      .join(' & ');
    return result || '0';
  }, [predictState.organizingMethod.betting, getNameToken]);

  const renderCompetitionName = useMemo(() => {
    const index = competitions.findIndex(
      (c) => c.id == Number(predictState.competition || '0'),
    );
    if (index < 0) return '';
    return competitions[index].name;
  }, [predictState.competition, competitions]);

  return (
    <>
      <Box className={classes.category}>
        <Typography>{renderCompetitionName || categoryName}</Typography>
        {renderCategory}
      </Box>
      <Box className={classes.container}>
        <Box>
          <Typography
            className={clsx(classes.hostBy, 'center-root')}
            style={{
              fontSize: 14,
            }}
          >
            {<ShiedTickIcon />} Hosted by{' '}
            {renderShortAddress(account || '', 4, 4)}
          </Typography>
          <Typography className={classes.name}>
            {predictState.eventName}
          </Typography>
          <Typography className={classes.short}>
            {predictState.shortDescription}
          </Typography>
          <Box className={classes.deadline}>
            <Box className={classes.deadlineItem}>
              <Typography>Deadline:</Typography>
              <Typography>{`${convertTime(predictState.deadline)}`}</Typography>
            </Box>
            <Box className={classes.deadlineItem}>
              <Typography>EndTime:</Typography>
              <Typography>{`${convertTime(predictState.endTime)}`}</Typography>
            </Box>
          </Box>
          <Typography className={classes.eventType}>
            {predictState.marketType == MarketType.TRUE_FALSE
              ? 'Yes / No'
              : predictState.marketType}
          </Typography>
          <Box
            className={clsx(classes.wrapperChoice, {
              [classes.wrapperOverUnder]: isWrapperOverUnder,
            })}
          >
            {renderOptions}
          </Box>
          <Box className={classes.wrapperPoolReview}>
            <Typography className={classes.labelPool}>
              {predictState.organizingMethod.eventType != WhoTakeWith.USER_USER
                ? 'Total liquidity pool: '
                : 'Total prize pool: '}
            </Typography>
            {isDesktop && (
              <Typography className={classes.liquidityPool}>
                {renderPoolValues}
              </Typography>
            )}
            {!isDesktop && (
              <Box className={classes.wrapperLiquidityMobile}>
                {predictState.organizingMethod.betting.map((b, i) => (
                  <Typography key={i}>
                    {`${b.liquidityPool || '0'} ${getNameToken(b.token)}`}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
          <Typography className={classes.notice}>
            Notice: You can only confirm result after end date EFUN will be
            refunded to participants if no result was declared 48 hours after
            end date
          </Typography>
        </Box>

        {/* <Box className={classes.right}>
          <Typography className={classes.statistic}>Statistics</Typography>
          <Box className={classes.wrapper}>
            <Typography>Liquidity Pool:</Typography>
            <Typography>300.000 EFUN</Typography>
          </Box>
          <Box className={classes.wrapper}>
            <Typography>Number of participants:</Typography>
            <Typography>0</Typography>
          </Box>
          <Box className={classes.wrapper}>
            <Typography>Total Predicted Pool:</Typography>
            <Typography>0 EFUN</Typography>
          </Box>
          <Box className={classes.wrapper}>
            <Typography>Event views:</Typography>
            <Typography>0 views</Typography>
          </Box>
        </Box> */}
      </Box>
    </>
  );
};

export default EventReview;
