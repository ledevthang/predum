import { Box, Button, CardMedia, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import WalletConnectDialog from 'components/WalletConnect';
import { convertTime } from 'helpers';
import React, { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import { updateHostPredictionStateAction } from 'store/actions/hostPredictionActions';
import { getAllCategories, getSelectEventState } from 'store/selectors';
import { IFixture } from 'types/fixture';
import { useStyles } from './WCMatchItemStyles';

const WCMatchItem = ({ item, list }: { item: IFixture; list: IFixture[] }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { active } = useWeb3React();
  const categoriesDB = useSelector(getAllCategories);
  const selectEventState = useSelector(getSelectEventState, shallowEqual);

  const generateDescriptions = useCallback((fixture: IFixture) => {
    const leagueMeta = JSON.parse(fixture.leagueMeta);
    return `${leagueMeta.name}, ${leagueMeta.round}, ${fixture.venueName}`;
  }, []);
  const onHostEvent = useCallback(
    (fixtureId: number, isHot: boolean) => {
      if (!active) {
        dispatch(
          updateDialogStateAction({
            open: true,
            component: <WalletConnectDialog />,
          }),
        );
        return;
      }
      const fixture = list.find((f) => f.id == fixtureId);
      if (!fixture) return;
      const subCategory = categoriesDB.find((c) => c.name == 'Football');
      if (!subCategory) return;
      const teamsMeta = JSON.parse(fixture.teamsMeta);
      const name = `${teamsMeta.home.name} - ${teamsMeta.away.name}`;
      const deadline = new Date(fixture.date);

      const reset =
        fixtureId == selectEventState.fixtureId
          ? {}
          : {
              eventBanner: null,
              thumbnailUrl: null,
              shouldInitProMarket: true,
            };
      const data: any = {
        fixtureId,
        selectedType: isHot ? 'hot' : 'other',
        eventName: name,
        deadline,
        subcategory: subCategory.id,
        category: subCategory.fatherId,
        subcategoryName: 'Football',
        categoryName: 'Sport',
        league: `${fixture.leagueId}`,
        fixture,
        endTime: new Date(deadline.getTime() + 2.5 * 60 * 60 * 1000),
        preShowOtherEvent: selectEventState.showOtherEvent,
        description: generateDescriptions(fixture),
        ...reset,
      };
      dispatch(
        updateHostPredictionStateAction({
          step: 2,
          ...data,
        }),
      );
      history.push('/host-prediction');
    },
    [
      dispatch,
      selectEventState.fixtureId,
      selectEventState.selectedType,
      list,
      selectEventState.showOtherEvent,
      selectEventState.dataSource,
      generateDescriptions,
      active,
    ],
  );
  return (
    <Box>
      <Box className={classes.header}>{JSON.parse(item.leagueMeta).round}</Box>
      <Box className={classes.wrapper}>
        <Box className={classes.wrapper4}>
          <Box className={classes.wrapper2}>
            <CardMedia
              image={JSON.parse(item.teamsMeta).home.logo}
              className={classes.image}
            />
            <Typography>{JSON.parse(item.teamsMeta).home.name}</Typography>
          </Box>
          <Box className={classes.wrapper2} mt={2}>
            <CardMedia
              image={JSON.parse(item.teamsMeta).away.logo}
              className={classes.image}
            />
            <Typography>{JSON.parse(item.teamsMeta).away.name}</Typography>
          </Box>
        </Box>
        <Box className={classes.wrapper3}>
          <Box className={classes.wapperButton}>
            {Number(item.eventRelated || 0) > 0 && (
              <Button
                className={classes.button2}
                onClick={() => {
                  history.push(`/groups/${item.id}`);
                }}
                disabled={
                  (new Date(`${item.date}`).getTime() - new Date().getTime()) /
                    60 /
                    60 /
                    1000 <
                  1
                }
              >
                PREDICT NOW
              </Button>
            )}
            <Button
              className={classes.button}
              onClick={() => onHostEvent(item.id, true)}
              disabled={
                (new Date(`${item.date}`).getTime() - new Date().getTime()) /
                  60 /
                  60 /
                  1000 <
                1
              }
            >
              HOST NOW
            </Button>
          </Box>
          <Typography>{convertTime(item.date, 'DD MMMM YYYY')}</Typography>
          <Typography>{convertTime(item.date, 'HH:mm', true)}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default WCMatchItem;
