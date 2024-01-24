import { Box } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getFilerAdminState } from 'store/selectors';
import { IEventP2PState } from 'types/admin';
import AdminChart from './AdminChart';
import { useStyles } from './p2pStyles';
import SummaryCreationP2P from './SummaryCreationP2P';
import adminService from 'services/admin';
import { WhoTakeWith } from 'types/hostPrediction';

interface IProps {
  type: 'p2p' | 'uvp';
}

const EventCreation = ({ type }: IProps) => {
  const classes = useStyles();
  const filterAmin = useSelector(getFilerAdminState);
  const queueAPI = useRef<number[]>([]);

  const [data, setData] = useState<IEventP2PState>({
    dataSource: [0, 0],
    summary: {
      totalEvents: '0',
      totalHosts: '0',
      totalPoolAmount: '0',
      avgPoolAmount: '0',
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
      const data = await adminService.GetEventP2PStatistic({
        ...filterAmin,
        playType: type == 'p2p' ? WhoTakeWith.USER_USER : WhoTakeWith.USER_POOL,
      });
      if (queueAPI.current[queueAPI.current.length - 1] != value) return;
      queueAPI.current = [];
      setData(data);
    })();
  }, [filterAmin, type]);

  return (
    <Box>
      <Box className={classes.wrapper}>
        <AdminChart
          labelLeft="Total events"
          labelDetails={['Data Provider', 'Self Data']}
          label="Data source"
          data={data.dataSource}
        />
        <SummaryCreationP2P data={data.summary} token={filterAmin.token} />
      </Box>
      <Box className={classes.wrapper}>
        <AdminChart
          labelLeft="Total events"
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
          labelLeft="Total events"
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

export default EventCreation;
