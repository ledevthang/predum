import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import AdminRoutes from 'components/Routes/AdminRoute';
import AppRoutes from 'components/Routes/AppRoute';
import LandingRoutes from 'components/Routes/LandingRoute';
import RouteChangeTracker from 'components/Routes/RouteChangeTracker';

import './App.css';

const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
};

function App() {
  useEffect(() => {
    process.env.REACT_APP_TRACKING_ID &&
      ReactGA.initialize(process.env.REACT_APP_TRACKING_ID);
  }, []);
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <HelmetProvider>
        <BrowserRouter>
          <RouteChangeTracker />
          <AppRoutes />
          <LandingRoutes />
          <AdminRoutes />
        </BrowserRouter>
      </HelmetProvider>
    </Web3ReactProvider>
  );
}

export default App;
