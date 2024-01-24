import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import CommonCardNFT from 'components/common/CommonCardNFT';
import QuestionDecentralized from 'containers/DecentralizedPool/QuestionDecentralized';
import Decimal from 'decimal.js';
import { getNFTIndex } from 'helpers';
import { useGetCurrentNav } from 'hooks/useGetCurrentNav';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { elpTokenABI } from 'services/contract';
import { getDetailNFTAction } from 'store/actions/nftActions';
import { getNFTDetailState } from 'store/selectors';
import Web3 from 'web3';
const NFTCashout = () => {
  const classes = useStyles();
  const { nftId } = useParams<{ nftId: string }>();
  const currentNav = useGetCurrentNav();
  const dispatch = useDispatch();
  const nftDetail = useSelector(getNFTDetailState);
  const { library } = useWeb3React();
  useEffect(() => {
    dispatch(getDetailNFTAction(+nftId));
  }, [nftId]);
  useEffect(() => {
    (async () => {
      if (!library?.provider && !window.ethereum) return;
      const web3 = new Web3(library?.provider || window.ethereum);
      const contract = new web3.eth.Contract(
        elpTokenABI as any,
        process.env.REACT_APP_ELP,
      );
      // const fee = await contract.methods.sellFee().call();
      // console.log('fee', fee);
      // const nft = await contract.methods.sellNft([12]).call();
      // console.log('nft', nft);
    })();
  }, [library?.provider]);

  return (
    <Box className={classes.container}>
      <Box className={classes.sellZone}>
        <Typography>Cash out NFT</Typography>
        <Box display="flex" alignItems="center">
          <CommonCardNFT index={getNFTIndex(`${+nftDetail.buyAmount}`) || 0} />
          <Box className={classes.wapper}>
            <Box display="flex" className={classes.wapperAsset}>
              <Typography>Your current asset:</Typography>
              <Typography>
                {' '}
                {`${new Decimal(currentNav)
                  .mul(+nftDetail.buyNav)
                  .toString()} EFUN`}
              </Typography>
            </Box>
            <Box display="flex" className={classes.wapperAsset}>
              <Typography>Fee:</Typography>
              <Typography>
                {' '}
                {`${new Decimal(currentNav)
                  .mul(+nftDetail.buyNav)
                  .toString()} EFUN`}
              </Typography>
            </Box>
            <Box
              display="flex"
              className={clsx(classes.receive, classes.wapperAsset)}
            >
              <Typography>You will receive:</Typography>
              <Typography>
                {' '}
                {`${new Decimal(currentNav)
                  .mul(+nftDetail.buyNav)
                  .toString()} EFUN`}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Button className={classes.confirm}>Confirm now</Button>
      </Box>
      <QuestionDecentralized questionList={questionList} />
    </Box>
  );
};
export default NFTCashout;
const questionList = [
  {
    id: 1,
    question: 'FEE',
    content: `
      <p>Fee will apply when cashing out. </p>
      <ul>
      <li>Diamond 0.5%</li>
      <li>Platinum 0.9%</li>
      <li>Titan 1.3%</li>
      <li>Gold 1.7%</li>
      <li>Silver 2%</li>
      </ul>
      `,
  },
  {
    id: 2,
    question: 'FAQ when cashing out NFT',
    content: `<i>Where will my iNFT go when cashing out?</i>
    <p>The NFT will be burned and cannot be recovered. Therefore, consider carefully before cashing out, or you can trade your iNFT with others instead.</p>
    <i>How many time I can cash out each day?</i>
    <p>There’s a limit of how much you can cash out each day. Usually, you can cash out 1% of total pool cap each day. If the limit of the day is reached, you can try again the next day. </p>
    `,
  },
];
const useStyles = makeStyles((theme) => ({
  container: {},
  sellZone: {
    padding: 20,
    backgroundColor: '#1C1C1E',
    '&>p:first-child': {
      fontSize: 28,
      lineHeight: '36px',
      fontWeight: 600,
      marginBottom: 20,
    },
    marginBottom: 24,
  },
  receive: {
    flexDirection: 'column',
    '&>p:first-child': {
      color: 'white',
      fontSize: '20px !important',
      lineHeight: '18px !important',
      marginBottom: '16px !important',
    },
    '&>p:last-child': {
      color: '#3FADD5',
      fontWeight: '600',
      marginLeft: '0 !important',
      fontSize: '28px !important',
      lineHeight: '22px !important',
    },
  },
  wapperAsset: {
    marginBottom: 12,
    '&>p:first-child': {
      color: '#BDBDBD',
      fontSize: 18,
      lineHeight: '17px',
    },
    '&>p:last-child': {
      color: '#3FADD5',
      fontWeight: '600',
      fontSize: 18,
      lineHeight: '17px',
      marginLeft: 4,
    },
  },
  wapper: {
    marginLeft: 24,
  },
  inputField: {
    background: '#4B4B4B',
    width: 290,
    height: 44,
    marginBottom: 8,
  },
  confirm: {
    background:
      'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
    padding: '12px 46px !important',
    borderRadius: 30,
    height: 44,
    color: '#0B0B0E',
    fontSize: 16,
    fontWeight: 600,
    marginTop: 24,
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      padding: '8px 24px !important',
      fontSize: 14,
    },
  },
}));
