import { Box } from '@material-ui/core';
import CommonDialog from 'components/common/CommonDialog';
import CommonMenu from 'components/common/CommonMenu';
import FooterLanding from 'components/FooterLanding';
import TopBar from 'components/TopBar';
import React, { ElementType, useCallback } from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';

export interface AdminLayoutProps extends RouteProps {
  RenderComponent: ElementType;
}

interface LayoutProps {
  routeProps: RouteComponentProps;
  RenderComponent: ElementType;
  path?: string | string[];
}

const Layout = (props: LayoutProps) => {
  const isWidget = location.pathname.includes('widget');
  const { routeProps, RenderComponent } = props;
  return (
    <Box>
      <TopBar />
      <RenderComponent {...routeProps} />
      <CommonMenu />
      <CommonDialog />
      {!isWidget && <FooterLanding />}
    </Box>
  );
};

const LandingLayout = ({ RenderComponent, ...rest }: AdminLayoutProps) => {
  const render = useCallback(
    (routeProps: RouteComponentProps) => {
      return (
        <Layout
          routeProps={routeProps}
          RenderComponent={RenderComponent}
          path={rest.path as any}
        />
      );
    },
    [RenderComponent, rest.path],
  );

  return <Route {...rest} render={render} />;
};

export default LandingLayout;
