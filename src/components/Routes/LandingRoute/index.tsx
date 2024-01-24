import React from 'react';
import { Switch } from 'react-router-dom';

import Audit from 'containers/Audit';
import Disclaimer from 'containers/Disclaimer';
import Introduce from 'containers/Introduce';
import OurTeam from 'containers/OurTeam';
import Partner from 'containers/Partner';
import Privacy from 'containers/Privacy';
import Roadmap from 'containers/Roadmap';
import Term from 'containers/Term';
import WidgetDetail from 'containers/Widget';
import { clientRoutesEnum } from 'enums/routes';
import LandingLayout from 'layouts/LandingLayout';

const LandingRoutes = () => {
  return (
    <Switch>
      <LandingLayout
        exact={false}
        path={clientRoutesEnum.INTRODUCE}
        RenderComponent={Introduce}
      />
      <LandingLayout
        exact={false}
        path={clientRoutesEnum.PARTNER}
        RenderComponent={Partner}
      />
      <LandingLayout
        exact={false}
        path={clientRoutesEnum.ROADMAP}
        RenderComponent={Roadmap}
      />
      <LandingLayout
        exact={false}
        path={clientRoutesEnum.AUDIT}
        RenderComponent={Audit}
      />
      <LandingLayout
        exact={false}
        path={clientRoutesEnum.DISCLAIMER}
        RenderComponent={Disclaimer}
      />
      <LandingLayout
        exact={false}
        path={clientRoutesEnum.OUR_TEAM}
        RenderComponent={OurTeam}
      />
      <LandingLayout
        exact={false}
        path={clientRoutesEnum.TERM}
        RenderComponent={Term}
      />
      <LandingLayout
        exact={false}
        path={clientRoutesEnum.PRIVACY}
        RenderComponent={Privacy}
      />
      <LandingLayout
        exact={false}
        path={clientRoutesEnum.WIDGET_DETAIL}
        RenderComponent={WidgetDetail}
      />
    </Switch>
  );
};

export default LandingRoutes;
