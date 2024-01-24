import { Box, CardMedia, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import FilterProEvent from 'components/Event/FilterProEvent';
import EventTypeFilter from 'components/GroupFixture/EventTypeFilter';
import FixtureDetail from 'components/GroupFixture/FixtureDetail';
import ListFixtureByTypeNoLimit from 'components/GroupFixture/ListFixtureByTypeNoLimit';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import fixtureService from 'services/fixture';
import { IFixture } from 'types/fixture';
import { WhoTakeWith } from 'types/hostPrediction';
import AllType from './AllType';
import { useStyles } from './styles';

const GroupFixture = () => {
  const classes = useStyles();
  const { groupId } = useParams<{ groupId: string }>();
  const [status, setStatus] = useState();
  const [fixture, getFixture] = useState<IFixture | undefined>();
  const [isLoading, setisLoading] = useState(false);
  const [type, setType] = useState<WhoTakeWith | 'All'>('All');
  const { account } = useWeb3React();
  useEffect(() => {
    (async () => {
      const result = await fixtureService.GetFixtureDetail(groupId);
      getFixture(result);
    })();
  }, [account]);

  const leagueName = useMemo(() => {
    if (!fixture) return;
    const leagueMeta = JSON.parse(fixture.leagueMeta);
    return leagueMeta.name;
  }, [fixture]);

  const renderMain = useMemo(() => {
    switch (type) {
      case 'All':
        return <AllType setStatus={setStatus} />;
      case WhoTakeWith.AFFILIATE:
        return (
          <ListFixtureByTypeNoLimit
            type={WhoTakeWith.AFFILIATE}
            setStatus={setStatus}
          />
        );
      case WhoTakeWith.USER_POOL:
        return (
          <ListFixtureByTypeNoLimit
            type={WhoTakeWith.USER_POOL}
            setStatus={setStatus}
          />
        );
      case WhoTakeWith.USER_USER:
        return (
          <ListFixtureByTypeNoLimit
            type={WhoTakeWith.USER_USER}
            setStatus={setStatus}
          />
        );
    }
  }, [type]);

  return (
    <Box>
      {/* <MainBanner /> */}
      <Box width="100%">
        <CardMedia
          image="https://efun-public.s3.ap-southeast-1.amazonaws.com/top-banner/bannerGroup.png"
          style={{
            height: 120,
          }}
        />
      </Box>
      <Box mt={3}>
        <Typography className={classes.league}>{leagueName}</Typography>
      </Box>
      {fixture && <FixtureDetail fixture={fixture} listingStatus={status} />}
      <Box className={classes.wrapperFilter}>
        <EventTypeFilter type={type} setType={setType} />
        <FilterProEvent
          shouldRemoveStatus
          shouldRemoveUpcomingSort
          shouldRemoveEventType
          className={classes.filter}
        />
      </Box>
      {!isLoading && renderMain}
    </Box>
  );
};

export default GroupFixture;
