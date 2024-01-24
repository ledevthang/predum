import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { getFixtureSelected, getShouldInitProMarket } from 'store/selectors';
import { ETypeOdd, IFixture } from 'types/fixture';

export const useInitDataProviderP2P = () => {
  const shouldInitProMarket = useSelector(getShouldInitProMarket);
  const fixture = useSelector(getFixtureSelected) as IFixture;

  const dispatch = useDispatch();

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

  const bets = useMemo(() => {
    const oddMeta = JSON.parse(fixture?.oddMeta || '{}');
    return oddMeta?.response?.[0]?.bookmakers[0].bets;
  }, [fixture?.oddMeta]);

  useEffect(() => {
    if (!shouldInitProMarket) return;
    let valueHome = '';
    let valueAway = '';
    const asianHandicap = bets?.find(
      (b: any) => b.name == ETypeOdd.ASIAN_HANDICAP,
    );
    if (asianHandicap) {
      const handicapHome = Number(asianHandicap.values[0].value.split(' ')[1]);
      valueHome = handicapHome > 0 ? handicapHome.toString() : '0';
      valueAway = handicapHome > 0 ? '0' : (-handicapHome).toString();
    }
    const homeDrawAway = [
      {
        name: home,
        odd: '',
      },
      {
        name: 'Draw',
        odd: '',
      },
      {
        name: away,
        odd: '',
      },
    ];
    const handicap = [
      {
        name: home,
        odd: '',
        value: valueHome,
      },
      {
        name: away,
        odd: '',
        value: valueAway,
      },
    ];

    dispatch(
      updateHostPredictionStateAction({
        handicap,
        homeDrawAway,
        shouldInitProMarket: false,
      }),
    );
  }, [shouldInitProMarket, bets]);
};
