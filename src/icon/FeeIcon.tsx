import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const FeeIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 64 64"
      style={{ transform: 'scale(1)', width, height }}
    >
      <g clipPath="url(#clip0_3354_40439)">
        <path
          d="M62.99 2.57254C62.9607 1.59061 62.1721 0.801542 61.1907 0.771757L35.8732 0.000759471C35.3566 -0.013889 34.8596 0.183865 34.4968 0.550565L3.2472 32.1219C-0.582399 35.9911 -0.582399 42.286 3.2472 46.1551L18.0241 61.0839C19.8849 62.9643 22.361 63.9999 24.9953 63.9999C27.6301 63.9999 30.1061 62.9643 31.967 61.0839L63.217 29.512C63.5745 29.1507 63.7683 28.6585 63.7532 28.1502L62.99 2.57254ZM38.9587 41.8085C38.5959 42.1708 38.1208 42.3524 37.6452 42.3524C37.1701 42.3524 36.695 42.1712 36.3322 41.8085L35.5246 41.0003L34.1877 42.3373C33.8249 42.6996 33.3498 42.8807 32.8747 42.8807C32.3991 42.8807 31.924 42.6996 31.5617 42.3368C30.8361 41.6117 30.8361 40.4359 31.5617 39.7108L35.1174 36.1551C35.7829 35.4896 35.7824 34.4066 35.1169 33.7411C34.4509 33.075 33.3683 33.0745 32.7028 33.7401L31.7971 34.6454C31.7971 34.6458 31.7971 34.6458 31.7966 34.6458L30.8908 35.5521C29.8342 36.6087 28.446 37.1371 27.0583 37.1371C25.6696 37.1371 24.2814 36.6087 23.2243 35.5511C22.2004 34.5272 21.6364 33.1663 21.6359 31.7181C21.6359 30.4637 22.0592 29.2747 22.8381 28.3138L22.0085 27.4837C21.2834 26.7586 21.2834 25.5828 22.0085 24.8577C22.7336 24.1326 23.9093 24.1326 24.6344 24.8577L25.4426 25.6658L26.2892 24.8187C27.0143 24.0936 28.1901 24.0936 28.9157 24.8187C29.6408 25.5443 29.6408 26.72 28.9157 27.4451L25.8493 30.5111C25.527 30.8333 25.3498 31.2616 25.3498 31.7176C25.3498 32.1737 25.5275 32.6024 25.8503 32.9251C26.5163 33.5912 27.5993 33.5912 28.2643 32.9261L29.1706 32.0199C29.1706 32.0199 29.1706 32.0194 29.1711 32.0194L30.0763 31.1136C32.1901 29.0003 35.6291 29.0008 37.7429 31.1146C39.7194 33.0907 39.8479 36.2254 38.1291 38.3519L38.9587 39.182C39.6838 39.9076 39.6838 41.0834 38.9587 41.8085ZM52.0964 19.6776C51.0105 20.7635 49.5837 21.3065 48.1574 21.3065C46.7307 21.3065 45.3039 20.7635 44.218 19.6776C43.1657 18.6253 42.5861 17.2264 42.5861 15.7381C42.5861 14.2503 43.1657 12.8514 44.218 11.7991C46.3899 9.62724 49.9245 9.62675 52.0964 11.7991C54.2688 13.971 54.2688 17.5057 52.0964 19.6776Z"
          fill="#BDBDBD"
        />
      </g>
      <defs>
        <clipPath id="clip0_3354_40439">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default FeeIcon;
