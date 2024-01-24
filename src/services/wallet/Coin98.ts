import { AbstractConnector } from '@web3-react/abstract-connector';
import { Client, Chain } from '@coin98-com/connect-sdk';
import { ConnectorUpdate } from '@web3-react/types';

export class Coin98Connector extends AbstractConnector {
  client;
  supportedChainIds;
  error: any;
  constructor() {
    super();
    this.client = new Client();
    this.supportedChainIds = [56];
  }
  async activate(): Promise<ConnectorUpdate> {
    if (!(window as any).coin98) {
      await this.client.connect(Chain.binanceSmart, {
        name: 'Efun',
        url: 'https://efun.tech',
      });
    }
    const newAccounts = await (window as any).coin98.provider.request({
      method: 'eth_accounts',
    });
    return {
      provider: (window as any).coin98.provider,
      chainId: this.client.chain,
      account: newAccounts[0],
    };
  }
  getProvider(): Promise<any> {
    return Promise.resolve((window as any).coin98.provider);
  }

  getChainId(): Promise<string | number> {
    return Promise.resolve(56);
  }

  async getAccount(): Promise<null | string> {
    const newAccounts = await (window as any).coin98.provider.request({
      method: 'eth_accounts',
    });
    return newAccounts;
  }

  deactivate(): void {
    this.client.disconnect();
  }

  isAuthorized(): Promise<boolean> {
    return Promise.resolve((window as any).coin98?.provider.isConnected());
  }

  setError() {
    return false;
  }
}
