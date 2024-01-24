import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { getFixtureSelected, getShouldInitProMarket } from 'store/selectors';
import { ETypeOdd, IFixture } from 'types/fixture';

export const useInitDataProviderOdd = () => {
  const shouldInitProMarket = useSelector(getShouldInitProMarket);
  const fixture = useSelector(getFixtureSelected) as IFixture;

  const dispatch = useDispatch();

  const bets = useMemo(() => {
    const oddMeta = JSON.parse(fixture?.oddMeta || '{}');
    return oddMeta?.response?.[0]?.bookmakers[0].bets;
  }, [fixture?.oddMeta]);

  const home = useMemo(() => {
    if (!fixture) return;
    const meta = JSON.parse(fixture.meta);
    return meta.teams.home.name;
  }, [fixture?.meta]);

  const away = useMemo(() => {
    if (!fixture) return;
    const meta = JSON.parse(fixture.meta);
    return meta.teams.away.name;
  }, [fixture?.meta]);

  useEffect(() => {
    if (!bets || !shouldInitProMarket) return;
    let homeDrawAway;
    let handicap;
    let overUnder;
    const matchWinner = bets.find((b: any) => b.name == ETypeOdd.MATCH_WINNER);
    if (matchWinner) {
      homeDrawAway = [
        {
          name: home,
          odd: `${matchWinner.values[0].odd}`,
        },
        {
          name: 'Draw',
          odd: `${matchWinner.values[1].odd}`,
        },
        {
          name: away,
          odd: `${matchWinner.values[2].odd}`,
        },
      ];
    }
    const overUnderF = bets.find((b: any) => b.name == ETypeOdd.OVER_UNDER);
    if (overUnderF) {
      overUnderF.values.sort(
        (a: any, b: any) =>
          Number(a.value.split(' ')[1]) - Number(b.value.split(' ')[1]),
      );
      const totalScores = overUnderF.values
        .filter((o: string, i: number) => i % 2 == 0)
        .map((o: any) => o.value.split(' ')[1]);
      const over = overUnderF.values
        .filter((o: string, i: number) => i % 2 == 0)
        .map((o: any) => `${o.odd}`);
      const under = overUnderF.values
        .filter((o: string, i: number) => i % 2 == 1)
        .map((o: any) => `${o.odd}`);
      overUnder = {
        totalScore: '',
        totalScores,
        over,
        under,
      };
    }

    const asianHandicap = bets.find(
      (b: any) => b.name == ETypeOdd.ASIAN_HANDICAP,
    );
    if (asianHandicap) {
      const handicapHome = Number(asianHandicap.values[0].value.split(' ')[1]);
      handicap = [
        {
          name: home,
          odd: `${asianHandicap.values[0].odd}`,
          value: handicapHome > 0 ? handicapHome.toString() : '0',
        },
        {
          name: away,
          odd: `${asianHandicap.values[1].odd}`,
          value: handicapHome > 0 ? '0' : (-handicapHome).toString(),
        },
      ];
    }
    dispatch(
      updateHostPredictionStateAction({
        ...(handicap && { handicap }),
        ...(overUnder && { overUnder }),
        ...(homeDrawAway && { homeDrawAway }),
        shouldInitProMarket: false,
      }),
    );
  }, [bets, shouldInitProMarket]);
};
