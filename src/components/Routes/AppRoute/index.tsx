import DetailEvent from 'containers/DetailEvent';
import PredictHistory from 'containers/PredictHistory';
import DetailHostPrediction from 'containers/DetailHostPrediction';
import { clientRoutesEnum } from 'enums/routes';
import DashBoardLayout from 'layouts/DashBoardLayout';
import React from 'react';
import { Switch } from 'react-router-dom';
import CreateProEvent from 'containers/CreateProEvent';
import HostPredictionV2 from 'containers/HostPredictionV2';
import HostInfo from 'containers/HostInfo';
import DecentralizedPool from 'containers/DecentralizedPool';
import NFTCollection from 'containers/NFTColection';
import MyInvestment from 'containers/MyInvestment';
import NFTMarket from 'containers/NFTMartket';
import NFTSell from 'containers/NFTSell';
import NFTDetail from 'containers/NFTDetail';
import WorldCupLandingPage from 'containers/WorldCupLandingPage';
import NewHome from 'containers/NewHome';
import FixtureDetail from 'containers/GroupFixture';
import SharePredict from 'containers/SharePredict';

const AppRoutes = () => {
  return (
    <Switch>
      <DashBoardLayout
        exact
        path={clientRoutesEnum.HOME}
        RenderComponent={NewHome}
      />
      <DashBoardLayout
        exact
        path={clientRoutesEnum.DETAIL_EVENT}
        RenderComponent={DetailEvent}
      />
      <DashBoardLayout
        exact={false}
        path={clientRoutesEnum.SHARE_PREDICT}
        RenderComponent={SharePredict}
      />
      <DashBoardLayout
        exact={false}
        path={clientRoutesEnum.HOST_INFO}
        RenderComponent={HostInfo}
      />
      <DashBoardLayout
        exact={false}
        path={clientRoutesEnum.HOST_PREDICTION}
        RenderComponent={HostPredictionV2}
      />
      <DashBoardLayout
        exact={false}
        path={clientRoutesEnum.DECENTRALIZED_POOL}
        RenderComponent={DecentralizedPool}
      />
      <DashBoardLayout
        exact={false}
        path={clientRoutesEnum.NFT_COLLECTIOM}
        RenderComponent={NFTCollection}
      />
      <DashBoardLayout
        exact={false}
        path={clientRoutesEnum.NFT_MARKET}
        RenderComponent={NFTMarket}
      />
      <DashBoardLayout
        exact={false}
        path={clientRoutesEnum.SELL_NFT}
        RenderComponent={NFTSell}
      />
      {/* <DashBoardLayout
        exact={false}
        path={clientRoutesEnum.CASHOUT_NFT}
        RenderComponent={NFTCashout}
      /> */}
      <DashBoardLayout
        exact={false}
        path={clientRoutesEnum.DETAIL_NFT}
        RenderComponent={NFTDetail}
      />
      <DashBoardLayout
        exact={false}
        path={clientRoutesEnum.HOST_PREDICTION_DETAIL}
        RenderComponent={DetailHostPrediction}
      />
      <DashBoardLayout
        exact={false}
        path={clientRoutesEnum.PREDICT_HISTORY}
        RenderComponent={PredictHistory}
      />
      <DashBoardLayout
        exact={false}
        path={clientRoutesEnum.PRO_EVENT_PREDICTION}
        RenderComponent={CreateProEvent}
      />
      <DashBoardLayout
        exact={false}
        path={clientRoutesEnum.MY_INVESTMENT}
        RenderComponent={MyInvestment}
      />
      <DashBoardLayout
        exact={false}
        path={clientRoutesEnum.WORLD_CUP}
        RenderComponent={WorldCupLandingPage}
      />
      <DashBoardLayout
        exact={false}
        path={clientRoutesEnum.GROUPS}
        RenderComponent={FixtureDetail}
      />
    </Switch>
  );
};

export default AppRoutes;
