/* eslint-disable prettier/prettier */
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Decimal from 'decimal.js';
import { isNil } from 'lodash';
import Web3 from 'web3';

import {
  DIAMOND_NFT_URL,
  FOOTBALL_URL,
  GOLD_NFT_URL,
  PLATINUM_NFT_URL,
  SILVER_NFT_URL,
  TITAN_NFT_URL,
} from 'common';
import { erc20abi } from 'services/contract';
import { IEvent } from 'types/event';

import {
  BASKETBALL_URL,
  COIN_URL,
  CS_GO_URL,
  DOTA_URL,
  F1_URL,
  GAME_FI_URL,
  LOL_URL,
  MMA_URL,
  OTHER_URL,
  POLITICS_URL,
  STOCK_PRICE_URL,
  TENNIS_URL,
} from './../common/index';

export const isMobileFn = () => {
  return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);
};

export const renderShortAddress = (
  address: string,
  prefix: number,
  suffix: number,
) => {
  const first = address.substring(0, prefix);
  const last = address.substring(address.length - suffix, address.length);
  return `${first}...${last}`;
};

export const hasMoreFn = (pagination: {
  pageNumber: number;
  pageSize: number;
  total: number;
}) => {
  return pagination.pageNumber * pagination.pageSize < pagination.total;
};

export const getId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

export const isStringNumber = (value?: string): boolean => {
  if (isNil(value)) return false;
  const regex = /^\d*[.,]?\d*$/;
  return regex.test(value.toString());
};

export const convertWeiToToken = (value: string, fixed?: number) => {
  const web3 = new Web3(window.ethereum as any);
  const valueDecimal = web3.utils.fromWei(value);
  if (fixed) return parseFloat(Number(valueDecimal).toFixed(fixed)).toString();
  return valueDecimal.toString();
};

export const convertFloatWeiToToken = (value: string, fixed?: number) => {
  const index = value.indexOf('.');
  if (index >= 0) {
    return convertWeiToToken(value.substring(0, index), fixed);
  }
  return convertWeiToToken(value, fixed);
};

export const roundNumberWithFixed = (value: string, fixed: number) => {
  return parseFloat(Number(value).toFixed(fixed)).toString();
};
const tokens = [
  {
    id: 2,
    logo: 'https://efun-public.s3.ap-southeast-1.amazonaws.com/tokens/eth-logo.png',
    name: 'ETH',
    address: '0x0000000000000000000000000000000000000000',
    linkBuy:
      'https://pancakeswap.finance/swap?outputCurrency=0x6746e37a756da9e34f0bbf1c0495784ba33b79b4',
    min: 0.0003,
  },
  {
    id: 3,
    logo: 'https://efun-public.s3.ap-southeast-1.amazonaws.com/tokens/arb-logo.png',
    name: 'ARB',
    address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
    linkBuy:
      'https://pancakeswap.finance/info/tokens/0x784b120e0de5e45dc072c8859c15388755364837',
    min: 0.5,
  },
];

export const getNameToken = (token: string) => {
  let temp = tokens.filter((o, i) => o.address == token);
  if (temp && temp[0]) return temp[0].name;
  else return 'ETH';
};

export const getMinPredictionValue = (newValue: string) => {
  return tokens.filter((o, i) => o.address == newValue)[0].min;
};

export const checkApproveTx = async (
  web3: Web3,
  from: string,
  amount: string,
  token?: string,
  isElp?: boolean,
) => {
  const contractEcr20 = new web3.eth.Contract(erc20abi as any, token);
  const allowance = await contractEcr20.methods
    .allowance(
      from,
      !isElp ? process.env.REACT_APP_PREDICTION : process.env.REACT_APP_ELP,
    )
    .call();
  const allowanceToken = web3.utils.fromWei(allowance);
  if (+allowanceToken > +amount) return;
  const amountValue =
    +amount > 1000000
      ? web3.utils.toBN(web3.utils.toWei(`${+amount + 100000}`, 'ether'))
      : web3.utils.toBN(web3.utils.toWei(`${1000000}`, 'ether'));
  await contractEcr20.methods
    .approve(
      !isElp ? process.env.REACT_APP_PREDICTION : process.env.REACT_APP_ELP,
      amountValue,
    )
    .send({
      from,
    });
};

export const roundValue = (value: number | string, digit: number) => {
  return Math.round(Number(value) * 10 ** digit) / 10 ** digit;
};

export const findClosestValue = (arr: number[], value: number) => {
  let curr = arr[0],
    diff = Math.abs(value - curr),
    index = 0;

  for (let val = 0; val < arr.length; val++) {
    let newdiff = Math.abs(value - arr[val]);
    if (newdiff < diff) {
      diff = newdiff;
      curr = arr[val];
      index = val;
    }
  }
  return index;
};

export const renderLeagueName = (leagueMeta: string) => {
  const leagueData = JSON.parse(leagueMeta);
  return leagueData.round;
};

export const renderMathName = (teamsMeta: string) => {
  const matchData = JSON.parse(teamsMeta);
  return `${matchData.home.name} - ${matchData.away.name}`;
};

export const isDisabledProEvent = (date: string) => {
  const thirtyMins = 30 * 60 * 1000;
  if (new Date(date).getTime() < Date.now() + thirtyMins) {
    return true;
  }
  return false;
};

export const convertNumberToFixed = (val: number) => {
  if (val.toString().split('-')[1]) {
    return val.toFixed(+val.toString().split('-')[1]);
  }
  return val.toString();
};
export const convertThousandSeperator = (
  val: number | string,
  isSlice?: boolean,
  isOver100M?: boolean,
) => {
  if (val == '') return '';
  if (isOver100M) return `${(+val / 1000000).toFixed(2)} M`;
  if (val.toString().includes('.')) {
    const valueSplit = val.toString().split('.');
    const natural = valueSplit[0];
    let decimal = valueSplit[1];
    if (Number(natural) < 1000) return `${val}`;
    if (decimal.length > 4 && !isSlice) decimal = decimal.slice(0, 4);
    const thousandSeperatorNatural = `${natural}`.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ',',
    );
    return `${thousandSeperatorNatural}.${decimal}`;
  } else return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const setIntervalCallAPI = async (
  promise: () => Promise<any>,
  times: number,
) => {
  for (let count = 0; count < times; count++) {
    const res = await promise();
    if (res) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
};

export const isOverEndTime = (endTime: Date) => {
  return new Date(endTime).getTime() < new Date().getTime();
};

export const isOver48hEndTime = (host: IEvent) => {
  let stringEndtime = `${host.endTime}`;
  let endTime = new Date(stringEndtime).getTime();
  let now = new Date().getTime();
  if (now < endTime) {
    return 'on going';
  } else {
    let difference = now - endTime;
    if (host.result || difference > 48 * 3600 * 1000) {
      return 'ended';
    } else return 'pending result';
  }
};
export const generateBackupBanner = (
  category?: string,
  subcategory?: string,
) => {
  if (!category) return;
  switch (category) {
    case 'Sport':
      if (subcategory == 'Football') {
        return FOOTBALL_URL;
      }
      if (subcategory == 'Basketball') {
        return BASKETBALL_URL;
      }
      if (subcategory == 'Tennis') {
        return TENNIS_URL;
      }
      if (subcategory == 'Formula 1') {
        return F1_URL;
      }
      if (subcategory == 'MMA') {
        return MMA_URL;
      }
      break;
    case 'eSport':
      if (subcategory == 'LoL') {
        return LOL_URL;
      }
      if (subcategory == 'CS:GO') {
        return CS_GO_URL;
      }
      if (subcategory == 'Dota 2') {
        return DOTA_URL;
      }
      break;
    case 'Market Prediction':
      if (subcategory == 'Coin Price') {
        return COIN_URL;
      }
      if (subcategory == 'Stock Price') {
        return STOCK_PRICE_URL;
      }
      break;
    case 'GameFi':
      return GAME_FI_URL;
    case 'Politics':
      return POLITICS_URL;
  }
  return OTHER_URL;
};

export const getMonday = () => {
  const d = new Date();
  const day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d.setDate(diff));
};

export const sendFileToIPFS = async (fileImg: File) => {
  const formData = new FormData();
  formData.append('file', fileImg);

  const resFile = await axios({
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
    data: formData,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_PINATA_API_JWT}`,
    },
  });

  const ImgHash = `https://${process.env.REACT_APP_PINATA_GATEWAY}/ipfs/${resFile.data.IpfsHash}`;
  return ImgHash;
};

export const sendJsonToIPFS = async (data: any) => {
  const res = await axios({
    method: 'POST',
    url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_PINATA_API_JWT}`,
    },
    data,
  });
  return `https://${process.env.REACT_APP_PINATA_GATEWAY}/ipfs/${res.data.IpfsHash}`;
};

export const isSorted = (arr: number[]) =>
  arr.every((v, i, a) => !i || a[i - 1] <= v);

export const convertTime = (
  date?: Date | string | null,
  format?: string,
  isShowGMT?: boolean,
) => {
  const dateTime = dayjs(date).format(format || 'DD/MM/YYYY - HH:mm');
  const timezone = dayjs(date).format('Z');
  const operator = timezone.charAt(0);
  const zone = Number(timezone.substring(1, 3));
  if (!isShowGMT) return `${dateTime} GMT${operator}${zone}`;
  else return `${dateTime}`;
};

export const getTimeZone = () => {
  const timezone = dayjs().format('Z');
  const operator = timezone.charAt(0);
  const zone = Number(timezone.substring(1, 3));
  return `GMT${operator}${zone}`;
};

export const convertTimeUTC = (
  date?: Date | string | null,
  format?: string,
) => {
  dayjs.extend(utc);
  return dayjs(date)
    .utc()
    .format(format || 'DD/MM/YYYY - HH:mm UTC');
};
export const getTimeZoneInt = () => {
  const timezone = dayjs().format('Z');
  return Number(timezone.substring(1, 3));
};

export const getNFTThumbnail = (wei: string) => {
  const eth = new Decimal(wei).div(10 ** 18).toNumber();
  switch (eth) {
    case 100:
      return SILVER_NFT_URL;
    case 500:
      return GOLD_NFT_URL;
    case 1000:
      return TITAN_NFT_URL;
    case 5000:
      return PLATINUM_NFT_URL;
    case 10000:
      return DIAMOND_NFT_URL;
  }
};
export const getELPOwn = (wei: string) => {
  const eth = new Decimal(wei).div(10 ** 18).toNumber();
  return eth;
};
export const getNFTThumbnailByIndex = (index: number) => {
  switch (index) {
    case 0:
      return SILVER_NFT_URL;
    case 1:
      return GOLD_NFT_URL;
    case 2:
      return TITAN_NFT_URL;
    case 3:
      return PLATINUM_NFT_URL;
    case 4:
      return DIAMOND_NFT_URL;
  }
};

export const getNFTTypeByIndex = (index: number) => {
  switch (index) {
    case 0:
      return 'Silver NFT';
    case 1:
      return 'Gold NFT';
    case 2:
      return 'Titan NFT';
    case 3:
      return 'Platinum NFT';
    case 4:
      return 'Diamond NFT';
  }
};

export const getNFTType = (wei: string) => {
  const eth = new Decimal(wei).div(10 ** 18).toNumber();
  switch (eth) {
    case 100:
      return 'Silver NFT';
    case 500:
      return 'Gold NFT';
    case 1000:
      return 'Titan NFT';
    case 5000:
      return 'Platinum NFT';
    case 10000:
      return 'Diamond NFT';
  }
};
export const getNFTIndex = (wei: string) => {
  const eth = new Decimal(wei).div(10 ** 18).toNumber();
  switch (eth) {
    case 100:
      return 0;
    case 500:
      return 1;
    case 1000:
      return 2;
    case 5000:
      return 3;
    case 10000:
      return 4;
    default:
      return 0;
  }
};
export const jsUcfirst = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const timeSince = (date: Date, isAfter?: boolean) => {
  let seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000) + 2;
  if (isAfter) seconds = -seconds;
  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} years`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} months`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} days`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} hours`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes`;
  }
  return `${Math.floor(seconds)} seconds`;
};
export const isEmail = (str1: string) => {
  let filter =
    // eslint-disable-next-line no-useless-escape
    /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  return String(str1).search(filter) != -1;
};
export const validURL = (str: string) => {
  let urlRegex =
    '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  let url = new RegExp(urlRegex, 'i');
  return str.length < 2083 && url.test(str);
};
