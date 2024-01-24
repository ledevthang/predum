import { Box, Typography } from '@material-ui/core';
import { useWeb3React } from '@web3-react/core';
import React, { ReactElement, useCallback } from 'react';
import { isAndroid, isBrowser, isDesktop, isIOS } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import Web3 from 'web3';

import ClaimAmountFailed from 'components/dialog/ClaimAmountFailed';
import { LocalStorageEnum } from 'enums/auth';
import { injected, resetWalletConnector, walletconnect } from 'services/wallet';
import { Coin98Connector } from 'services/wallet/Coin98';
import { updateAppStateAction } from 'store/actions/appActions';
import { updateDialogStateAction } from 'store/actions/dialogActions';

import { useStyles } from './styles';

interface IProps {
  name: string;
  icon: ReactElement;
}

const WalletItem = ({ name, icon }: IProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { activate } = useWeb3React();
  const callbackError = useCallback(
    (errMes: string) => {
      dispatch(
        updateDialogStateAction({
          component: <ClaimAmountFailed reason={errMes} />,
          open: true,
        }),
      );
    },
    [dispatch],
  );
  const onError = (err: Error) => {
    if (err.message.includes('Unsupported chain')) {
      localStorage.removeItem(LocalStorageEnum.WALLET_CONNECT);
      setTimeout(() => {
        callbackError('Wrong network. Please switch to the Arbitrum One');
      }, 1000);
    }
    resetWalletConnector(walletconnect);
  };
  const redirectMetaMaskExtension = (err: Error) => {
    if ((isAndroid || isIOS) && typeof window.ethereum == 'undefined') {
      const url = 'https://metamask.app.link/dapp/predum.io/';
      window.open(url, '_blank');
    }
    if (err.message.includes('Unsupported chain')) changeNetwork();
    if (err.message.includes('provider was found') && isBrowser && isDesktop) {
      window
        .open(
          'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
          '_blank',
        )
        ?.focus();
    }
  };
  const onErrorTrust = (err: Error) => {
    if (err.message.includes('Unsupported chain id')) {
      setTimeout(() => {
        callbackError('Wrong network. Please switch to the Arbitrum One');
      }, 1000);
    }
    if ((isAndroid || isIOS) && typeof window.ethereum == 'undefined') {
      const url = 'https://link.trustwallet.com/open_url?url=https://predum.io';
      window.open(url, '_self');
    }
  };
  const changeNetwork = async () => {
    if (window.ethereum) {
      try {
        await (window.ethereum as any).request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: Web3.utils.toHex(
                process.env.REACT_APP_NODE_ENV ? 42161 : 421613,
              ),
            },
          ],
        });
      } catch (error: any) {
        if (error.message.includes('Unrecognized chain ID'))
          process.env.REACT_APP_NODE_ENV ? addNetwork() : addNetworkTestnet();
      }
    }
  };
  const addNetwork = async () => {
    if (window.ethereum) {
      try {
        (window.ethereum as any).request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0xa4b1',
              chainName: 'Arbitrum One',
              nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: ['https://arbitrum-mainnet.infura.io'],
              blockExplorerUrls: ['https://explorer.arbitrum.io'],
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const addNetworkTestnet = async () => {
    if (window.ethereum) {
      try {
        (window.ethereum as any).request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x66eed',
              chainName: 'Arbitrum Goerli Testnet',
              nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18,
              },
              rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
              blockExplorerUrls: ['https://goerli.arbiscan.io/'],
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onLogin = async () => {
    if (name != 'TrustWallet') {
      dispatch(
        updateAppStateAction({
          connector: name,
          loginProcess: true,
        }),
      );
    }
    switch (name) {
      case 'Metamask':
        activate(injected, (err: any) => redirectMetaMaskExtension(err));
        break;
      case 'WalletConnect':
        activate(walletconnect, (err: any) => onError(err));
        break;
      case 'Coin98': {
        const coin98 = new Coin98Connector();
        activate(coin98);
        break;
      }
      case 'TrustWallet':
        activate(injected, (err: any) => onErrorTrust(err));
        break;
    }
  };

  return (
    <Box className={classes.item} onClick={onLogin}>
      {icon}
      <Typography>{name}</Typography>
    </Box>
  );
};

export default WalletItem;
