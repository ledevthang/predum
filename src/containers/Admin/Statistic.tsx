import { Box, Typography } from '@material-ui/core';
import ActiveUser from 'components/AdminStatistic/ActiveUser';
import FilterAdmin from 'components/AdminStatistic/Filter';
import TotalEvent from 'components/AdminStatistic/TotalEvent';
import TotalPrediction from 'components/AdminStatistic/TotalPrediction';
import Wallet from 'components/AdminStatistic/Wallet';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFilerAdminState } from 'store/selectors';
import { useStyles } from './styles';
import adminService from 'services/admin';
import dayjs from 'dayjs';
import { IPlatformIncome } from 'types/admin';
import PlatformIncome from 'components/AdminStatistic/PlatformIncome';

const Statistic = () => {
  const classes = useStyles();
  const filterAdmin = useSelector(getFilerAdminState);
  const [viewCount, setViewCount] = useState(0);
  const [eventCount, setEventCount] = useState([0, 0, 0]);
  const [predictionCount, setPredictionCount] = useState([0, 0, 0]);
  const [hosts, setHosts] = useState([0, 0]);
  const [predictions, setPredictions] = useState([0, 0]);
  const queueAPI = useRef<number[]>([]);
  const [income, setIncome] = useState<IPlatformIncome>({
    eventCreateFee: [
      {
        total: '0',
      },
    ],
    uvpTotalAmount: [],
    uvuTotalAmount: [],
  });

  useEffect(() => {
    (async () => {
      const current = queueAPI.current[queueAPI.current.length - 1];
      const value = current ? current + 1 : 1;
      queueAPI.current.push(value);
      const totalWalletAllTime = await adminService.GetWalletCount({
        from: new Date('2022-01-01'),
        to: dayjs(new Date()).endOf('day').toDate(),
      });
      const totalWallet = await adminService.GetWalletCount({
        from: filterAdmin.from,
        to: filterAdmin.to,
      });
      const eventCount = await adminService.GetEventCount({
        from: filterAdmin.from,
        to: filterAdmin.to,
        token: filterAdmin.token,
      });
      const predictionCount = await adminService.GetPredictionCount({
        from: filterAdmin.from,
        to: filterAdmin.to,
        token: filterAdmin.token,
      });
      const newUserCount = await adminService.GetNewUserEvent({
        from: filterAdmin.from,
        to: filterAdmin.to,
        token: filterAdmin.token,
      });
      const newUserPrediction = await adminService.GetNewUserPrediction({
        from: filterAdmin.from,
        to: filterAdmin.to,
        token: filterAdmin.token,
      });
      const platformIncome = await adminService.GetPlatformIncome({
        from: filterAdmin.from,
        to: filterAdmin.to,
        token: filterAdmin.token,
      });
      if (queueAPI.current[queueAPI.current.length - 1] != value) return;
      queueAPI.current = [];
      setIncome(platformIncome);
      setPredictions([
        newUserPrediction,
        totalWalletAllTime - newUserPrediction,
      ]);
      setHosts([newUserCount, totalWalletAllTime - newUserCount]);
      setPredictionCount(predictionCount.map((d) => d.cnt));
      setEventCount(eventCount.map((d) => d.cnt));
      setViewCount(totalWallet);
    })();
  }, [filterAdmin]);

  return (
    <Box padding={8}>
      <Typography className={classes.headline}>Statistic</Typography>
      <FilterAdmin shouldShowAllTokens />
      <Box className={classes.statistics}>
        <PlatformIncome income={income} token={filterAdmin.token} />
        <Wallet viewCount={viewCount} />
      </Box>
      <Box className={classes.wrapperChart}>
        <TotalEvent data={eventCount} />
        <TotalPrediction data={predictionCount} />
      </Box>
      <ActiveUser
        hosts={hosts}
        predictions={predictions}
        totalWallet={hosts[0] + hosts[1]}
      />
    </Box>
  );
};

export default Statistic;
