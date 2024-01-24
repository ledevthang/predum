import { Box, Button, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import AdditionalInfo from 'components/Investment/AdditionalInfo';
import WalletConnectDialog from 'components/WalletConnect';
import dayjs from 'dayjs';
import Decimal from 'decimal.js';
import { useGetCurrentNav } from 'hooks/useGetCurrentNav';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import nftService from 'services/nft';
import { isProd } from 'services/wallet';
import { updateDialogStateAction } from 'store/actions/dialogActions';
import QuestionDecentralized from './QuestionDecentralized';
import FailedDialog from 'components/dialog/FailedDialog';
import { useStyles } from './styles';
import CommonLineChartFilterDate from 'components/common/CommonLineChartFilterDate';
import { useGetCapacity } from 'hooks/useGetCapacity';

const DecentralizedPool = () => {
  const classes = useStyles();
  const history = useHistory();
  const [navs, setNavs] = useState<any[]>([]);
  const { active } = useWeb3React();
  const dispatch = useDispatch();
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
  const callbackError = useCallback(
    (errMes: string) => {
      dispatch(
        updateDialogStateAction({
          component: <FailedDialog reason={errMes} />,
          open: true,
        }),
      );
    },
    [dispatch],
  );
  const switchNetwork = async () => {
    let currentChain = await window.ethereum.request({ method: 'eth_chainId' });
    if (isProd) {
      if (currentChain == '0xa4b1') return;
      callbackError(
        "Please switch to Arbitrum One to view pool's chart and information",
      );
    } else {
      if (currentChain == '0x66eed') return;
      callbackError(
        "Please switch to Arbitrum Goerli Testnet to view pool's chart and information",
      );
    }
  };
  useEffect(() => {
    switchNetwork();
  }, []);

  const indexToday = useMemo(() => {
    const index: any = navs.findIndex((f: any) => {
      return dayjs(f.createdAt).startOf('day').isSame(dayjs().startOf('day'));
    });
    return index;
  }, [navs]);

  return (
    <Box className={clsx(classes.container, 'center-root')}>
      <Box className={clsx(classes.wapperChart)}>
        <CommonLineChartFilterDate
          data={navs.map((n: any, index: any) =>
            chartType == 'NAV'
              ? navs.length == index + 1 && currentNav != 0
                ? currentNav
                : n.value
              : navs.length == index + 1 && currentCapacity != 0
              ? currentCapacity * currentNav
              : new Decimal(n.capacity).div(10 ** 18).toNumber(),
          )}
          labels={navs.map((n: any) => n.createdAt)}
          title="Decentralized Liquidity Pool"
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
        <Box className={clsx(classes.wapperButton, 'center-root')}>
          <Button
            onClick={() => {
              history.push('/nft-collection');
            }}
          >
            Mint NFT & Invest
          </Button>
          {/* <Button
            onClick={() => {
              history.push('/nft-market');
            }}
            disabled
          >
            Go to Marketplace
          </Button> */}
        </Box>
        <Box
          onClick={() => {
            if (!active) {
              dispatch(
                updateDialogStateAction({
                  open: true,
                  component: <WalletConnectDialog />,
                }),
              );
              return;
            }
            history.push('/my-investment');
          }}
        >
          <Typography className={classes.viewInvesment}>
            View my investment
          </Typography>
        </Box>
      </Box>
      <Box className={classes.wapperQuestion}>
        <QuestionDecentralized questionList={questionList} />
      </Box>
    </Box>
  );
};
export default DecentralizedPool;
const questionList = [
  {
    id: 1,
    question: 'What is decentralized liquidity pool?',
    content: `Predum's decentralized liquidity pool is the collection of PLP (token) that is locked in a smart contract that provide liquidity to decentralized exchanges (Prediction event's pool, winner's rewards...). When these decentralized exchanges turn profit, investors who invested in the decentralized liquidity pool will receive their share of profit.`,
    banner:
      'https://efun-public.s3.ap-southeast-1.amazonaws.com/dex-pool/image1.png',
  },
  {
    id: 2,
    question: 'How does it work?',
    content: `Investor can mint an iNFT, which is digital asset that proves holder's investment in Liquidity Pool. Each iNFT will represent certain amount of PLP tokens, and the value of an iNFT is determined by the PLP tokens represented and the current pool's NAV. During the investment period, if the NAV is higher than that at the time of purchasing the iNFT, this means the investor is making a profit.`,
    banner:
      'https://efun-public.s3.ap-southeast-1.amazonaws.com/dex-pool/image2.png',
  },
  {
    id: 3,
    question: 'Who can invest in decentralized liquidity pool?',
    content: `Anyone with enough PRT can invest in the decentralized liquidity pool by minting or buying iNFT.`,
    banner:
      'https://efun-public.s3.ap-southeast-1.amazonaws.com/dex-pool/image3.png',
  },
  {
    id: 4,
    question: 'Where can I start?',
    content: `You can start minting iNFT or buy from other users.`,
    banner:
      'https://efun-public.s3.ap-southeast-1.amazonaws.com/dex-pool/image4.png',
  },
  {
    id: 5,
    question: 'FAQ',
    content: `<i>What is NAV?</i>
    <p>NAV is the value of one PLP token. This NAV value will change depending on how well the liquidity pool perform. If liquidity pool is making a profit, then NAV will increase. The initial NAV will be set at 10 PRT.</p>
    <i>What is ELP?</i>
    <p>ELP is a platform token that defines the value of iNFT. For example, Silver iNFT represent 100 PLP tokens; if pool's NAV is 10 PRT, then the asset value of Silver iNFT is 1,000 PRT (100 * 10).</p>
    `,
    banner:
      'https://efun-public.s3.ap-southeast-1.amazonaws.com/dex-pool/image5.png',
  },
];
