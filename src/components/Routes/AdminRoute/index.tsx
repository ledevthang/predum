import AdminPage from 'containers/Admin';
import AdminLogin from 'containers/AdminLogin';
import { clientRoutesEnum } from 'enums/routes';
import AdminLayout from 'layouts/AdminLayout';
import React from 'react';
import { Switch } from 'react-router-dom';

const AdminRoutes = () => {
  return (
    <Switch>
      <AdminLayout
        exact
        path={clientRoutesEnum.ADMIN_LOGIN}
        RenderComponent={AdminLogin}
      />
      <AdminLayout
        exact
        path={clientRoutesEnum.ADMIN}
        RenderComponent={AdminPage}
      />
    </Switch>
  );
};

export default AdminRoutes;
