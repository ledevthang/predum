import { Box, CardMedia, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import FilterNFT from './FilterNFT';
import NFTMartketItem from './NFTMarketItem';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import { useStyles } from './styles';
import LeftArrow from './Arrow/LeftArrow';
import RightArrow from './Arrow/RightArrow';

const NFTMarket = () => {
  const classes = useStyles();
  const renderNFTCard = () => {
    return (
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        scrollContainerClassName={classes.wrapperEventScroll}
        wrapperClassName={classes.wrapper}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((o, i) => {
          return (
            <Box key={o} className={classes.wapperCardScroll}>
              <CardMedia image="/images/Test.png" className={classes.image} />
              <Typography className={classes.cardInfo}>
                10.000.000 - 15.000.000 EFUN
              </Typography>
              <Typography className={classes.cardInfo2}>2 for sale</Typography>
            </Box>
          );
        })}
      </ScrollMenu>
    );
  };

  return (
    <Box className={clsx(classes.container, 'center-root')}>
      <Typography className={classes.mainText}>EFUN NFT Market</Typography>
      <Typography className={classes.noteText}>
        190 NFTs in the market
      </Typography>
      <Box className={classes.wapperScroll}>{renderNFTCard()}</Box>
      <Box className={classes.wapperFilter}>
        <FilterNFT />
      </Box>
      <Box className={classes.wapperCard}>
        {fakeData.map((item, index) => {
          return <NFTMartketItem key={index} data={item} />;
        })}
      </Box>
    </Box>
  );
};
export default NFTMarket;

const fakeData = [
  {
    benefits: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
      'Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
      'Proin sodales pulvinar tempor.',
    ],
  },
  {
    benefits: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
      'Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
      'Proin sodales pulvinar tempor.',
    ],
  },
  {
    benefits: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
      'Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
      'Proin sodales pulvinar tempor.',
    ],
  },
  {
    benefits: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
      'Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
      'Proin sodales pulvinar tempor.',
    ],
  },
];
