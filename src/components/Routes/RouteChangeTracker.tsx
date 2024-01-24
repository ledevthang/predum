import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga4';
const RouteChangeTracker = ({ history }: { history: any }) => {
  history.listen((location: any, action: any) => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname });
  });

  return <></>;
};

export default withRouter(RouteChangeTracker);
