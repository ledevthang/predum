import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getNFTDetailState } from 'store/selectors';
import { getNFTType } from 'helpers';
import nftService from 'services/nft';
import dayjs from 'dayjs';
import Decimal from 'decimal.js';
import CommonLineChartFilterDate from 'components/common/CommonLineChartFilterDate';
const ChartNFTDetail = ({
  current,
  startTime,
  mintPrice,
}: {
  current: string;
  mintPrice: string;
  startTime?: Date;
}) => {
  const classes = useStyles();
  const nftDetail = useSelector(getNFTDetailState);
  const [navs, setNavs] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  useEffect(() => {
    let type = getNFTType(
      nftDetail.buyAmount == '' ? '0' : nftDetail.buyAmount,
    );
    setTitle(`Your ${type} Card #${nftDetail.id}`);
  }, [nftDetail]);

  useEffect(() => {
    (async () => {
      const res = await nftService.GetNavs({
        pageNumber: 1,
        pageSize: 1000,
        startTime: startTime
          ? startTime
          : dayjs(Date.now()).add(-3, 'M').toDate(),
        endTime: dayjs(Date.now()).toDate(),
      });
      setNavs(res.data);
    })();
  }, [startTime]);
  return (
    <Box className={classes.container}>
      <CommonLineChartFilterDate
        data={navs.map((n: any, index: any) => {
          if (navs.length == index + 1) {
            n.value = current;
          }
          if (index == 0) n.value = mintPrice;
          return (
            n.value * new Decimal(nftDetail.buyAmount).div(10 ** 18).toNumber()
          );
        })}
        labels={navs.map((n: any) => n.createdAt)}
        yText="ASSET"
        title={title}
      />
    </Box>
  );
};
export default ChartNFTDetail;
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0px 20px',
    '&>div:first-child': {
      width: '100%',
    },
  },
  chart: {
    height: 400,
    width: '100%',
  },
}));
