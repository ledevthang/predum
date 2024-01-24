import { Box } from '@material-ui/core';
import React, { useMemo } from 'react';
import queryString from 'query-string';
import EventReport from './EventReport';
import Statistic from './Statistic';
import P2PStatistic from './P2PStatistic';

const AdminPage = () => {
  const { type } = queryString.parse(location.search);

  const renderComponent = useMemo(() => {
    if (!type) return <EventReport />;
    if (type == 'statistic') return <Statistic />;
    if (type == 'p2p') return <P2PStatistic type="p2p" />;
    if (type == 'uvp') return <P2PStatistic type="uvp" />;
  }, [type]);

  return <Box>{renderComponent}</Box>;
};

export default AdminPage;
