import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { AbstractConnector } from '@web3-react/abstract-connector';

const RPC_URLS = {
  42161: 'https://arb1.arbitrum.io/rpc',
  421613: 'https://data-seed-prebsc-1-s1.binance.org:8545',
};
export const isProd = process.env.REACT_APP_NODE_ENV == 'production';

export const supportedChainIds = isProd ? [42161, 1] : [421613];

export const injected = new InjectedConnector({
  supportedChainIds,
});

export const walletconnect = new WalletConnectConnector({
  rpc: isProd
    ? {
        42161: RPC_URLS[42161],
      }
    : {
        421613: RPC_URLS[421613],
      },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});
export const resetWalletConnector = (connector: AbstractConnector) => {
  if (
    connector &&
    connector instanceof WalletConnectConnector &&
    connector.walletConnectProvider?.wc?.uri
  ) {
    connector.walletConnectProvider = undefined;
  }
};
