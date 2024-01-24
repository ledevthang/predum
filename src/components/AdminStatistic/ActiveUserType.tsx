import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFilerAdminState } from 'store/selectors';
import ActiveUser from './ActiveUser';
import adminService from 'services/admin';
import dayjs from 'dayjs';
import { WhoTakeWith } from 'types/hostPrediction';

interface IProps {
  type: 'p2p' | 'uvp';
}

const ActiveUserType = ({ type }: IProps) => {
  const filterAdmin = useSelector(getFilerAdminState);
  const [hosts, setHosts] = useState([0, 0]);
  const [predictions, setPredictions] = useState([0, 0]);
  const queueAPI = useRef<number[]>([]);

  useEffect(() => {
    (async () => {
      if (!filterAdmin.token) return;
      const current = queueAPI.current[queueAPI.current.length - 1];
      const value = current ? current + 1 : 1;
      queueAPI.current.push(value);
      const totalWalletAllTime = await adminService.GetWalletCount({
        from: new Date('2022-01-01'),
        to: dayjs(new Date()).endOf('day').toDate(),
      });
      const newUserCount = await adminService.GetNewUserEvent({
        from: filterAdmin.from,
        to: filterAdmin.to,
        token: filterAdmin.token,
        playType: type == 'p2p' ? WhoTakeWith.USER_USER : WhoTakeWith.USER_POOL,
      });
      const newUserPrediction = await adminService.GetNewUserPrediction({
        from: filterAdmin.from,
        to: filterAdmin.to,
        token: filterAdmin.token,
        playType: type == 'p2p' ? WhoTakeWith.USER_USER : WhoTakeWith.USER_POOL,
      });
      if (queueAPI.current[queueAPI.current.length - 1] != value) return;
      queueAPI.current = [];
      setPredictions([
        newUserPrediction,
        totalWalletAllTime - newUserPrediction,
      ]);
      setHosts([newUserCount, totalWalletAllTime - newUserCount]);
    })();
  }, [filterAdmin, type]);

  return (
    <ActiveUser
      predictions={predictions}
      hosts={hosts}
      totalWallet={hosts[0] + hosts[1]}
    />
  );
};

export default ActiveUserType;
