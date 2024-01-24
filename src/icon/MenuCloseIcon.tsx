import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const MenuCloseIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 20 20"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M2.49902 5.91797H13.499"
        stroke="#BDBDBD"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2.5 10L11 10"
        stroke="#BDBDBD"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2.5 14H13.5"
        stroke="#BDBDBD"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16.9996 12.6401L14.8263 10.4668C14.5696 10.2101 14.5696 9.79011 14.8263 9.53344L16.9996 7.36011"
        stroke="url(#paint0_linear_8611_33452)"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_8611_33452"
          x1="14.6338"
          y1="10.0001"
          x2="16.9996"
          y2="10.0001"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FBC02D" />
          <stop offset="1" stopColor="#FACF66" />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
};

export default MenuCloseIcon;
