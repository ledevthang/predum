import { Box } from '@material-ui/core';
import AdminHeader from 'components/AdminHeader';
import CommonDialog from 'components/common/CommonDialog';
import { LocalStorageEnum } from 'enums/auth';
import { clientRoutesEnum } from 'enums/routes';
import React, { ElementType, useCallback, useEffect } from 'react';
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
  const { routeProps, RenderComponent } = props;

  useEffect(() => {
    const accessToken = localStorage.getItem(LocalStorageEnum.ACCESS_TOKEN);
    const isAdmin = localStorage.getItem(LocalStorageEnum.IS_ADMIN);
    if (
      window.location.pathname === clientRoutesEnum.ADMIN &&
      (!accessToken || !isAdmin)
    ) {
      window.location.href = clientRoutesEnum.ADMIN_LOGIN;
    }
  }, [location.pathname]);

  return (
    <Box>
      {location.pathname != '/admin-login' && <AdminHeader />}
      <RenderComponent {...routeProps} />
      <CommonDialog />
    </Box>
  );
};

const AdminLayout = ({ RenderComponent, ...rest }: AdminLayoutProps) => {
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

export default AdminLayout;
