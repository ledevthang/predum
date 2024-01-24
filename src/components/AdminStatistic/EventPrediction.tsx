import { Box } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFilerAdminState } from 'store/selectors';
import AdminChart from './AdminChart';
import { useStyles } from './p2pStyles';
import SummaryPredictionP2P from './SummaryPredictionP2P';
import adminService from 'services/admin';
import { IPredictionP2PState } from 'types/admin';
import { WhoTakeWith } from 'types/hostPrediction';
import { usePlatformFee } from 'hooks/usePlatformFee';

interface IProps {
  type: 'p2p' | 'uvp';
}

const EventPredictionP2P = ({ type }: IProps) => {
  const classes = useStyles();
  const filterAmin = useSelector(getFilerAdminState);
  const queueAPI = useRef<number[]>([]);
  const { uvpPlatformFee: UVP_PLATFORM_FEE } = usePlatformFee();

  const [data, setData] = useState<IPredictionP2PState>({
    dataSource: [0, 0],
    summary: {
      totalPredictions: '0',
      totalVolume: {
        selfData: '0',
        dataPro: '0',
        total: '0',
      },
      avgPredictAmount: '0',
      avgPredictNum: '0',
      avgPredictPerUser: '0',
    },
    selfData: [0, 0, 0, 0, 0, 0],
    dataPro: [0, 0, 0, 0, 0, 0],
  });

  useEffect(() => {
    (async () => {
      if (!filterAmin.token) return;
      const current = queueAPI.current[queueAPI.current.length - 1];
      const value = current ? current + 1 : 1;
      queueAPI.current.push(value);
      const data = await adminService.GetPredictionP2PStatistic(
        {
          ...filterAmin,
          playType:
            type == 'p2p' ? WhoTakeWith.USER_USER : WhoTakeWith.USER_POOL,
        },
        UVP_PLATFORM_FEE,
      );
      if (queueAPI.current[queueAPI.current.length - 1] != value) return;
      queueAPI.current = [];
      setData(data);
    })();
  }, [filterAmin, type, UVP_PLATFORM_FEE]);

  return (
    <Box>
      <Box className={classes.wrapper}>
        <AdminChart
          labelLeft="Total predictions"
          labelDetails={['Data Provider', 'Self Data']}
          label="Data source"
          data={data.dataSource}
        />
        <SummaryPredictionP2P data={data.summary} token={filterAmin.token} />
      </Box>
      <Box className={classes.wrapper}>
        <AdminChart
          labelLeft="Total predictions"
          labelDetails={[
            'eSport',
            'Sport',
            'Market Prediction',
            'GameFi',
            'Politics',
            'Others',
          ]}
          label="Self Data by Categories"
          data={data.selfData}
        />
        <AdminChart
          labelLeft="Total predictions"
          labelDetails={[
            'eSport',
            'Sport',
            'Market Prediction',
            'GameFi',
            'Politics',
            'Others',
          ]}
          label="Data Provider by Categories"
          data={data.dataPro}
        />
      </Box>
    </Box>
  );
};

export default EventPredictionP2P;
