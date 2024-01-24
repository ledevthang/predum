import { Box } from '@material-ui/core';
import ListFixtureByType from 'components/GroupFixture/ListFixtureByType';
import React from 'react';

const AllType = ({ setStatus }: any) => {
  return (
    <Box>
      <ListFixtureByType type="affiliate" setStatus={setStatus} />
      <ListFixtureByType type="user vs user" setStatus={setStatus} />
      <ListFixtureByType type="user vs pool" setStatus={setStatus} />
    </Box>
  );
};

export default AllType;
