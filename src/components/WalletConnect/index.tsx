import {
  Box,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import React, { useMemo } from 'react';

import MetamaskIcon from 'icon/MetamaskIcon';
import TrustWalletIcon from 'icon/TrustWalletIcon';
import WalletConnectIcon from 'icon/WalletConnectIcon';
import { isProd } from 'services/wallet';

import { useStyles } from './styles';
import WalletItem from './WalletItem';

const WalletConnectDialog = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const coin98 = isProd
    ? [
        {
          name: 'Coin98',
          icon: (
            <CardMedia
              image="/images/Coin98.png"
              style={{ height: 24, width: 24 }}
            />
          ),
        },
      ]
    : [];
  const connectMethods = useMemo(() => {
    if (isDesktop) {
      return [
        {
          name: 'Metamask',
          icon: <MetamaskIcon />,
        },
        {
          name: 'WalletConnect',
          icon: <WalletConnectIcon />,
        },
        // ...coin98,
      ];
    } else {
      return [
        {
          name: 'Metamask',
          icon: <MetamaskIcon />,
        },
        {
          name: 'TrustWallet',
          icon: <TrustWalletIcon />,
        },
        {
          name: 'WalletConnect',
          icon: <WalletConnectIcon />,
        },
        // ...coin98,
      ];
    }
  }, [isDesktop]);

  return (
    <Box className={classes.container}>
      <Typography>Connect Wallet</Typography>
      {connectMethods.map((c) => (
        <WalletItem key={c.name} name={c.name} icon={c.icon} />
      ))}
    </Box>
  );
};

export default WalletConnectDialog;
