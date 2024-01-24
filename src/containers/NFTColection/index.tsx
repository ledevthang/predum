import { Box, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { elpTokenABI } from 'services/contract';
import Web3 from 'web3';
import NFTCollectionItem from './NFTCollectionItem';
import { useStyles } from './styles';

const NFTCollection = () => {
  const classes = useStyles();
  const [activedIndex, setActivedIndex] = useState<number>();
  const [isMinted, setIsMinted] = useState(false);
  const [counts, setCounts] = useState<any>([]);
  const { library } = useWeb3React();
  useEffect(() => {
    (async () => {
      if (!library?.provider && !window.ethereum) return;
      const web3 = new Web3(library?.provider || window.ethereum);
      const contract = new web3.eth.Contract(
        elpTokenABI as any,
        process.env.REACT_APP_ELP,
      );
      let sum = 0;
      [4, 3, 2, 1, 0].forEach(async (number) => {
        const countMint = await contract.methods.counts(number).call();
        sum += +countMint;
        setCounts(sum);
      });
    })();
  }, [library?.provider, isMinted]);
  return (
    <Box className={clsx(classes.container, 'center-root')}>
      <Typography className={classes.mainText}>iNFT Collection</Typography>
      <Typography className={classes.noteText}>
        {counts} of 252 NFTs minted
      </Typography>
      {/* <Typography className={classes.closeText}>
        Whitelist close in 03:02:11
      </Typography> */}
      <Box className={classes.wapperCard}>
        {fakeData.map((item, index) => {
          return (
            <NFTCollectionItem
              key={index}
              data={item}
              activedIndex={activedIndex}
              setActivedIndex={setActivedIndex}
              setIsMinted={setIsMinted}
              isMinted={isMinted}
              index={4 - index}
            />
          );
        })}
      </Box>
    </Box>
  );
};
export default NFTCollection;

const fakeData = [
  {
    benefits: [
      'No event creation fee when hosting new event',
      'Receive a share of profit from platform',
      'Cash out fee at 0.5%',
      'Join executive prediction events for iNFT holders only',
      'Join exclusive offline events hosted by Predum',
      'Whitelisted for the next investment round',
    ],
  },
  {
    benefits: [
      'No event creation fee when hosting new event',
      'Receive a share of profit from platform',
      'Cash out fee at 0.9%',
      'Join executive prediction events for iNFT holders only',
      'Join exclusive offline events hosted by Predum',
      'Whitelisted for the next investment round',
    ],
  },
  {
    benefits: [
      'No event creation fee when hosting new event',
      'Receive a share of profit from platform',
      'Cash out fee at 1.3%',
      'Join executive prediction events for iNFT holders only',
      'Join exclusive offline events hosted by Predum',
      'Whitelisted for the next investment round',
    ],
  },
  {
    benefits: [
      'No event creation fee when hosting new event',
      'Receive a share of profit from platform',
      'Cash out fee at 1.7%',
      'Join executive prediction events for iNFT holders only',
      'Join exclusive offline events hosted by Predum',
      'Whitelisted for the next investment round',
    ],
  },
  {
    benefits: [
      'No event creation fee when hosting new event',
      'Receive a share of profit from platform',
      'Cash out fee at 2%',
      'Join executive prediction events for iNFT holders only',
      'Join exclusive offline events hosted by Predum',
      'Whitelisted for the next investment round',
    ],
  },
];
