import {
  Box,
  Button,
  CardMedia,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useStyles } from './styles';
import ArrowRightIcon from 'icon/ArrowRightIcon';
import theme from 'material';
import { renderShortAddress } from 'helpers';
import CopyIcon from 'icon/CopyIcon';
import VerifyIcon from 'icon/VerifyIcon';
import { useHistory } from 'react-router-dom';

const EfunContract = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isShowContract, setIsShowContract] = useState(true);
  const [copied, setCopied] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setCopied(false);
  }, [history.location.pathname]);
  return (
    <Box className={copied ? classes.contract : classes.contract2}>
      {!isShowContract && (
        <Box display="flex">
          <Typography className={classes.text}>PRT contract</Typography>
          <Box
            onClick={() => {
              setIsShowContract(true);
            }}
            className={classes.forceSvg}
          >
            <ArrowRightIcon />
          </Box>
        </Box>
      )}
      {isShowContract && (
        <Box display="flex" alignItems="center">
          <Typography className={classes.text}>PRT contract: </Typography>
          <Typography>
            {isMobile
              ? renderShortAddress(
                  '0xA1A0b9147136e09CF14F740202c5d26d05b9424b',
                  5,
                  5,
                )
              : '0xA1A0b9147136e09CF14F740202c5d26d05b9424b'}
          </Typography>
          <Box
            onClick={() => {
              navigator.clipboard.writeText(
                process.env.REACT_APP_EFUN_TOKEN || '',
              );
              setCopied(true);
            }}
            ml={2}
            style={{
              cursor: 'pointer',
            }}
          >
            {!copied ? <CopyIcon /> : <VerifyIcon />}
          </Box>
        </Box>
      )}
      {isShowContract && (
        <Box display="flex" className={classes.wapper}>
          <Button
            onClick={() => {
              window
                .open(
                  'https://pancakeswap.finance/swap?outputCurrency=0x6746e37a756da9e34f0bbf1c0495784ba33b79b4',
                  '_blank',
                )
                ?.focus();
            }}
          >
            <CardMedia image="/images/cake-logo.png" className={classes.logo} />
            {isMobile ? '' : 'PancakeSwap'}
          </Button>
          <Box
            onClick={() => {
              setIsShowContract(false);
            }}
            className="center-root"
          >
            <Typography>X</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default EfunContract;
