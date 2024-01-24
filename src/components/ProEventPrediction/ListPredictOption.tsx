import { Box } from '@material-ui/core';
import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { getFixtureSelected, getMarketType } from 'store/selectors';
import { ETypeOdd, IFixture } from 'types/fixture';
import { EProEventMarket, MarketType } from 'types/hostPrediction';
import PredictionOption1x2 from './PredictionOption1x2';
import PredictionOptionHandicap from './PredictionOptionHandicap';
import PredictionOptionItem from './PredictionOptionItem';
import PredictionOptionOverUnder from './PredictionOptionOverUnder';
import { useStyles } from './SelectMarketProEventStyles';

interface IProps {
  disabledSelect?: boolean;
  disabledEdit?: boolean;
}

const ListPredictOption = ({ disabledSelect, disabledEdit }: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const marketType = useSelector(getMarketType);
  const fixture = useSelector(getFixtureSelected) as IFixture;

  const home = useMemo(() => {
    const meta = JSON.parse(fixture.meta);
    return meta.teams.home.name;
  }, [fixture?.meta]);

  const away = useMemo(() => {
    const meta = JSON.parse(fixture.meta);
    return meta.teams.away.name;
  }, [fixture?.meta]);

  const bets = useMemo(() => {
    const oddMeta = JSON.parse(fixture.oddMeta || '{}');
    return oddMeta?.response?.[0]?.bookmakers[0].bets;
  }, [fixture?.oddMeta]);

  const renderMainComponent = useCallback(
    (type: EProEventMarket) => {
      if (!bets) return;
      switch (type) {
        case EProEventMarket.X12: {
          const matchWinner = bets.find(
            (b: any) => b.name == ETypeOdd.MATCH_WINNER,
          );
          if (!matchWinner) return;
          return (
            <PredictionOption1x2
              disabledSelect={disabledSelect}
              disabledEdit={disabledEdit}
            />
          );
        }
        // case EProEventMarket.CORRECT_SCORE:
        //   return <PredictionOptionCorrectStore />;
        case EProEventMarket.OVER_UNDER: {
          const overUnder = bets.find(
            (b: any) => b.name == ETypeOdd.OVER_UNDER,
          );
          if (!overUnder) return;
          return (
            <PredictionOptionOverUnder
              disabledSelect={disabledSelect}
              disabledEdit={disabledEdit}
            />
          );
        }
        case EProEventMarket.ASIAN_HANDICAP: {
          const asianHandicap = bets.find(
            (b: any) => b.name == ETypeOdd.ASIAN_HANDICAP,
          );
          if (!asianHandicap) return;
          return (
            <PredictionOptionHandicap
              disabledSelect={disabledSelect}
              disabledEdit={disabledEdit}
            />
          );
        }
      }
    },
    [bets, home, away, disabledSelect],
  );

  const onChooseMarket = useCallback(
    (type: EProEventMarket) => {
      let marketType;
      if (type == EProEventMarket.X12) {
        marketType = MarketType.HOME_DRAW_AWAY;
      } else if (type == EProEventMarket.ASIAN_HANDICAP) {
        marketType = MarketType.HANDICAP;
      } else if (type == EProEventMarket.OVER_UNDER) {
        marketType = MarketType.OVER_UNDER;
      }
      dispatch(
        updateHostPredictionStateAction({
          marketType,
        }),
      );
    },
    [dispatch],
  );

  return (
    <Box className={classes.wrapperOption}>
      {(!disabledSelect || marketType == MarketType.HOME_DRAW_AWAY) && (
        <PredictionOptionItem
          type={EProEventMarket.X12}
          disabledSelect={disabledSelect}
          renderMainComponent={renderMainComponent(EProEventMarket.X12)}
          onChooseMarket={() => onChooseMarket(EProEventMarket.X12)}
          active={marketType == MarketType.HOME_DRAW_AWAY}
        />
      )}
      {(!disabledSelect || marketType == MarketType.OVER_UNDER) && (
        <PredictionOptionItem
          type={EProEventMarket.OVER_UNDER}
          disabledSelect={disabledSelect}
          renderMainComponent={renderMainComponent(EProEventMarket.OVER_UNDER)}
          onChooseMarket={() => onChooseMarket(EProEventMarket.OVER_UNDER)}
          active={marketType == MarketType.OVER_UNDER}
        />
      )}
      {(!disabledSelect || marketType == MarketType.HANDICAP) && (
        <PredictionOptionItem
          type={EProEventMarket.ASIAN_HANDICAP}
          disabledSelect={disabledSelect}
          renderMainComponent={renderMainComponent(
            EProEventMarket.ASIAN_HANDICAP,
          )}
          onChooseMarket={() => onChooseMarket(EProEventMarket.ASIAN_HANDICAP)}
          active={marketType == MarketType.HANDICAP}
        />
      )}
    </Box>
  );
};

export default ListPredictOption;
