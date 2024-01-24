import { isProd } from 'services/wallet';
import { EUnit } from 'types/hostPrediction';

export const SCROLL_THRESHOLD = 500;
export const GUTTER_SIZE = 12;
export const SALT_VALUE = '4560ede97f76ee16cc61e81f4b406b04';
export const BNB_TOKEN = '0x0000000000000000000000000000000000000000';
export const PUBLIC_SOURCES = [
  {
    pathname: '/',
    exact: true,
  },
  {
    pathname: '/detail-event',
    exact: false,
  },
  {
    pathname: '/host-prediction-detail',
    exact: false,
  },
  {
    pathname: '/host-info',
    exact: false,
  },
  {
    pathname: '/decentralized-pool',
    exact: false,
  },
  {
    pathname: '/nft-collection',
    exact: false,
  },
  {
    pathname: '/world-cup',
    exact: false,
  },
  {
    pathname: '/groups',
    exact: false,
  },
];
export const DEBOUNCE_UPDATE_VALIDATION = 500;

export const LIMIT_FILE_SIZE = 1024 * 1024 * 5; //MB
export const BASKETBALL_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/Predum/Basketball.jpg';
export const COIN_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/Predum/COIN+PRICE.jpg';
export const CS_GO_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/banner/CSGO.png';
export const DOTA_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/banner/DOTA2.png';
export const F1_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/Predum/F1.jpg';
export const FOOTBALL_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/Predum/Football.jpg';
export const GAME_FI_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/GAMEFI.jpeg';
export const LOL_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/banner/Lol.png';
export const MMA_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/Predum/MMA.jpg';
export const OTHER_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/Predum/OTHER.jpg';
export const POLITICS_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/Predum/POLITICS.jpg';
export const STOCK_PRICE_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/banner/Stock-Price.png';
export const TENNIS_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/Predum/Tennis.jpg';

export const CHAINS = [
  {
    value: EUnit.EFUN,
    id: process.env.REACT_APP_EFUN_TOKEN || '',
    icon: '/images/EfunCoin.png',
  },
  {
    value: EUnit.BNB,
    id: BNB_TOKEN,
    icon: '/images/BNBCoin.png',
  },
  {
    value: EUnit.LINK,
    id: process.env.REACT_APP_LINK_TOKEN || '',
    icon: '/images/LinkCoin.png',
  },
  {
    value: EUnit.XMETA,
    id: process.env.REACT_APP_XMETA_TOKEN || '',
    icon: '/images/XMETA.png',
  },
];

export const CHART_BACKGROUNDS = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
];

export const MAP_TOKEN_USD_TESTNET = {
  Bitcoin: '0x5741306c21795FdCBb9b265Ea0255F499DFe515C',
  Ethereum: '0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7',
  Chainlink: '0x1B329402Cb1825C6F30A0d92aB9E2862BE47333f',
  BNB: '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526',
  'Bitcoin Cash': '0x887f177CBED2cf555a64e7bF125E1825EB69dB82',
  Cardano: '0x5e66a1775BbC249b5D51C13d29245522582E671C',
  Dogecoin: '0x963D5e7f285Cc84ed566C486c3c1bC911291be38',
  Litecoin: '0x9Dcf949BCA2F4A8a62350E0065d18902eE87Dca3',
  PancakeSwap: '0x81faeDDfeBc2F8Ac524327d70Cf913001732224C',
  TRON: '0x135deD16bFFEB51E01afab45362D3C4be31AA2B0',
  Polkadot: '0xEA8731FD0685DB8AeAde9EcAE90C4fdf1d8164ed',
  XRP: '0x4046332373C24Aed1dC8bAd489A04E187833B28d',
};
export const CHAIN_LINK_ETH_USD = isProd
  ? '0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e'
  : '0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7';
export const CHAIN_LINK_BTC_USD = isProd
  ? '0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf'
  : '0x5741306c21795FdCBb9b265Ea0255F499DFe515C';
export const CHAIN_LINK_LINK_USD = isProd
  ? '0xca236E327F629f9Fc2c30A4E95775EbF0B89fac8'
  : '0x1B329402Cb1825C6F30A0d92aB9E2862BE47333f';
export const CHAIN_LINK_BNB_USD = isProd
  ? '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE'
  : '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526';
export const MAP_TOKEN_USD_MAINNET = {
  Bitcoin: '0x6ce185860a4963106506C203335A2910413708e9',
  Ethereum: '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612',
  Chainlink: '0x86E53CF1B870786351Da77A57575e79CB55812CB',
  BNB: '0x6970460aabF80C5BE983C6b74e5D06dEDCA95D4A',
  Avalanche: '0x8bf61728eeDCE2F32c456454d87B5d6eD6150208',
  'Axie Infinity': '0x5B58aA6E0651Ae311864876A55411F481aD86080',
  Cardano: '0xD9f615A9b820225edbA2d821c4A696a0924051c6',
  Cosmos: '0xCDA67618e51762235eacA373894F0C79256768fa',
  Dogecoin: '0x9A7FB1b3950837a8D9b40517626E11D4127C098C',
  Litecoin: '0x74E72F37A8c415c8f1a98Ed42E78Ff997435791D',
  'NEAR Protocol': '0xBF5C3fB2633e924598A46B9D07a174a9DBcF57C0',
  PancakeSwap: '0xB6064eD41d4f67e353768aA239cA86f4F73665a1',
  Fantom: '0xe2A47e87C0f4134c8D06A41975F6860468b2F925',
  'Shiba Inu': '0xA615Be6cb0f3F36A641858dB6F30B9242d0ABeD8',
  TRON: '0xF4C5e535756D11994fCBB12Ba8adD0192D9b88be',
  Polkadot: '0xa6bC5bAF2000424e90434bA7104ee399dEe80DEc',
  Solana: '0x24ceA4b8ce57cdA5058b924B9B9987992450590c',
  XRP: '0xB4AD57B52aB9141de9926a3e0C8dc6264c2ef205',
  Uniswap: '0x9C917083fDb403ab5ADbEC26Ee294f6EcAda2720',
};
export const BNB_LOGO_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/BNB-.png';
export const BTC_LOGO_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/BTC-.png';
export const ETH_LOGO_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/ETH-.png';
export const LINK_LOGO_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/LINK-.png';
export const DIAMOND_NFT_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/nft/Diamond.png';
export const GOLD_NFT_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/nft/Gold.png';
export const MEMBERSHIP_NFT_NFT_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/nft/Membership_NFT.png';
export const PLATINUM_NFT_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/nft/Platinum.png';
export const SILVER_NFT_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/nft/Silver.png';
export const TITAN_NFT_URL =
  'https://efun-public.s3.ap-southeast-1.amazonaws.com/nft/Titan.png';
export const SUPPORTED_COIN = [
  'Bitcoin',
  'Ethereum',
  'Chainlink',
  'BNB',
  'Avalanche',
  'Axie Infinity',
  'Bitcoin Cash',
  'Cardano',
  'Cosmos',
  'Dogecoin',
  'Litecoin',
  'Near',
  'PancakeSwap',
  'Fantom',
  'Shiba Inu',
  'TRON',
  'Polkadot',
  'Solana',
  'XRP',
  'Uniswap',
  'Stellar',
];

export const SUPPORTED_COIN_LOGO = {
  Bitcoin: BTC_LOGO_URL,
  Ethereum: ETH_LOGO_URL,
  Chainlink: LINK_LOGO_URL,
  BNB: BNB_LOGO_URL,
  Avalanche:
    'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/avalanche-avax-logo.png',
  'Axie Infinity':
    'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/axie-infinity-axs-logo.png',
  'Bitcoin Cash':
    'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/bitcoin-cash-bch-logo.png',
  Cardano:
    'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/cardano-ada-logo.png',
  Cosmos:
    'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/cosmos-atom-logo.png',
  Dogecoin:
    'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/dogecoin-doge-logo.png',
  Litecoin:
    'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/litecoin-ltc-logo.png',
  'NEAR Protocol':
    'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/near-protocol-near-logo.png',
  PancakeSwap:
    'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/pancakeswap-cake-logo.png',
  Fantom:
    'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/fantom-ftm-logo.png',
  'Shiba Inu':
    'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/shiba-inu-shib-logo.png',
  TRON: 'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/tron-trx-logo.png',
  Polkadot:
    'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/polkadot-new-dot-logo.png',
  Solana:
    'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/solana-sol-logo.png',
  XRP: 'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/xrp-xrp-logo.png',
  Uniswap:
    'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/uniswap-uni-logo.png',
  Stellar:
    'https://efun-public.s3.ap-southeast-1.amazonaws.com/coin-logo/stellar-xlm-logo.png',
};
