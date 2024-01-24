import { Box, CardMedia, makeStyles, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import clsx from 'clsx';
import Decimal from 'decimal.js';
import { getNFTThumbnailByIndex } from 'helpers';
import React, { useEffect, useState } from 'react';
import { elpTokenABI } from 'services/contract';
import Web3 from 'web3';

interface IProps {
  index: number;
  className?: any;
  id?: number | string;
}

const CommonCardNFT = ({ index, className, id }: IProps) => {
  const classes = useStyles();
  const { library } = useWeb3React();
  const [elp, setElp] = useState(0);
  // const [id, setId] = useState(0);

  useEffect(() => {
    (async () => {
      if (!library?.provider && !window.ethereum) return;
      const web3 = new Web3(library?.provider || window.ethereum);
      const contract = new web3.eth.Contract(
        elpTokenABI as any,
        process.env.REACT_APP_ELP,
      );
      const elpAmtClassMint = await contract.methods
        .elpAmtOfClass(index)
        .call();
      // const countMint = await contract.methods.counts(index).call();
      // setId(+countMint + 1);
      setElp(new Decimal(elpAmtClassMint).div(10 ** 18).toNumber());
    })();
  }, [library?.provider, index]);
  return (
    <Box className={clsx(classes.container, className)}>
      <CardMedia
        image={getNFTThumbnailByIndex(index)}
        className={classes.image}
      />
      {/* <CardMedia image={'/images/logo.png'} className={classes.logo} />
      <Typography className={classes.pool}>Liquidity pool</Typography>

      <Typography className={classes.type}>
        {getNFTTypeByIndex(index)}
      </Typography> */}
      {/* {elp != 0 && <Typography className={classes.elp}>{elp} ELP</Typography>} */}
      {id && <Typography className={classes.id}># {id}</Typography>}
    </Box>
  );
};

export default CommonCardNFT;

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    width: 300,
    '& p': {
      fontSize: 14,
      fontWeight: 600,
    },
  },
  pool: {
    fontSize: '14px !important',
    textTransform: 'uppercase',
    position: 'absolute',
    right: 20,
    top: 20,
  },
  logo: {
    width: '100px',
    height: '24px',
    position: 'absolute',
    left: 30,
    top: 20,
  },
  image: {
    height: 180,
    width: 300,
  },
  type: {
    position: 'absolute',
    left: 30,
    bottom: 20,
  },
  elp: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  id: {
    position: 'absolute',
    left: 160,
    bottom: 17,
  },
}));
