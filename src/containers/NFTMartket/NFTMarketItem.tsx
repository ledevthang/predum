import {
  Box,
  Button,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
const NFTMarketItem = ({ data }: { data: any }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box>
        <Box className={classes.card}>
          <CardMedia image="/images/Test.png" className={classes.image} />
        </Box>
        <Box className={classes.benefits}>
          <Typography>Benefits</Typography>
          <Box component="ul">
            {data.benefits.map((item: any, index: any) => {
              return (
                <Typography
                  component="li"
                  key={index}
                  className={classes.benefitsItem}
                >
                  {item}
                </Typography>
              );
            })}
          </Box>
        </Box>
      </Box>
      {
        <Box className={classes.mint}>
          <Box className={classes.info}>
            <Box className={classes.owner}>
              <Typography>Owner:</Typography>
              <Typography>0xu722..67</Typography>
            </Box>
            <Box className={classes.askPrice}>
              <Typography>Asking Price</Typography>
              <Typography>15.000.000 EFUN</Typography>
            </Box>
            <Typography>
              *The asking price may not reflect the actual asset value of the
              NFT
            </Typography>
          </Box>
          <Box className={classes.wapperButton}>
            <Button className={classes.buyButton}>Buy now</Button>
            <Button className={clsx(classes.buyButton, classes.counterButton)}>
              Counter Offer
            </Button>
          </Box>
        </Box>
      }
    </Box>
  );
};
export default NFTMarketItem;
const useStyles = makeStyles((theme) => ({
  container: {
    padding: '32px 20px',
    marginBottom: 24,
    background: '#1C1C1E',
    borderRadius: '2px',
    width: '100%',
    '&>div:first-child': {
      display: 'flex',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
  },
  wapperButton: {
    display: 'flex',
    marginTop: 40,
  },
  minted: {
    color: '#BDBDBD',
  },
  info: {
    '&>p': {
      fontSize: 14,
      lineHeight: '17px',
      color: '#BDBDBD',
    },
  },
  owner: {
    display: 'flex',
    '&>p': {
      fontSize: 14,
      lineHeight: '17px',
    },
    '&>p:last-child': {
      marginLeft: 4,
      color: '#29B6F6',
    },
  },
  askPrice: {
    display: 'flex',
    alignItems: 'center',
    margin: '8px 0px',
    '&>p': {
      fontSize: 24,
      lineHeight: '29px',
    },
    '&>p:last-child': {
      fontSize: 32,
      lineHeight: '38px',
      color: '#3FADD5',
      fontWeight: '600',
      marginLeft: 4,
    },
  },
  buyButton: {
    width: 171,
    height: 44,
    border: '1px solid #3FADD5',
    borderRadius: '22px',
    color: '#1C1C1E',
    background:
      'linear-gradient(90deg, #28BFBF 0%, rgba(18, 140, 184, 0.99) 100%);',
    '& span': {
      textTransform: 'uppercase',
      fontWeight: 600,
      fontSize: 16,
    },
  },
  counterButton: {
    border: '1px solid #3FADD5',
    background: '#1C1C1E',
    color: '#3FADD5',
    marginLeft: 16,
  },
  mint: {
    borderTop: '1px solid gray',
    marginTop: 20,
    paddingTop: 20,
  },
  card: {
    marginRight: 24,
  },
  benefitsItem: {
    fontSize: 16,
    lineHeight: '20px',
    color: '#BDBDBD',
  },
  image: {
    height: 180,
    width: 300,
  },
  benefits: {
    '&>p:first-child': {
      fontSize: 20,
      lineHeight: '24px',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 16,
    },
  },
}));
