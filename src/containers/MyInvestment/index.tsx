import { Box } from '@material-ui/core';
import AdditionalInfo from 'components/Investment/AdditionalInfo';
import Cumulative from 'components/Investment/Cumulative';
import Filter from 'components/Investment/Filter';
import ListMyInvestment from 'components/Investment/ListMyInvestment';
import React, { useEffect, useMemo, useState } from 'react';
import { MyInvestmentFilter } from 'types/investment';
import { useStyles } from './styles';
import nftService from 'services/nft';
import dayjs from 'dayjs';
import Decimal from 'decimal.js';
import { useGetCurrentNav } from 'hooks/useGetCurrentNav';
import CommonLineChartFilterDate from 'components/common/CommonLineChartFilterDate';
import { useGetCapacity } from 'hooks/useGetCapacity';

const MyInvestment = () => {
  const classes = useStyles();
  const [filterValue, setFilter] = useState(MyInvestmentFilter.MOST_PROFIT);
  const [navs, setNavs] = useState<any[]>([]);
  const currentNav = useGetCurrentNav();
  const currentCapacity = useGetCapacity();
  const [chartType, setChartYpe] = useState<'NAV' | 'Pool'>('Pool');

  useEffect(() => {
    (async () => {
      const res = await nftService.GetNavs({
        pageNumber: 1,
        pageSize: 1000,
        startTime: dayjs(Date.now()).add(-3, 'M').toDate(),
        endTime: dayjs(Date.now()).toDate(),
      });
      setNavs(res.data);
    })();
  }, []);

  const indexToday = useMemo(() => {
    const index: any = navs.findIndex((f: any) => {
      return dayjs(f.createdAt).startOf('day').isSame(dayjs().startOf('day'));
    });
    return index;
  }, [navs]);

  return (
    <Box className={classes.container}>
      <Box className={classes.wrapperChart}>
        <CommonLineChartFilterDate
          data={navs.map((n: any, index: any) =>
            chartType == 'NAV'
              ? navs.length == index + 1
                ? currentNav
                : n.value
              : navs.length == index + 1 && currentCapacity != 0
              ? currentCapacity * currentNav
              : new Decimal(n.capacity).div(10 ** 18).toNumber(),
          )}
          labels={navs.map((n: any) => n.createdAt)}
          yText={chartType}
        />
        <AdditionalInfo
          valueToday={indexToday >= 0 && navs[indexToday].value}
          capacityToday={
            indexToday >= 0
              ? new Decimal(navs[indexToday].capacity).div(10 ** 18).toString()
              : undefined
          }
          setChartYpe={setChartYpe}
          chartType={chartType}
        />
        <Cumulative />
      </Box>
      <Filter filterValue={filterValue} setFilter={setFilter} />
      <ListMyInvestment filterValue={filterValue} />
    </Box>
  );
};

export default MyInvestment;
