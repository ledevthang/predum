import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const MenuOpenIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 20 20"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M2.5 5.91797H11"
        stroke="#BDBDBD"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2.5 10L13.5 10"
        stroke="#BDBDBD"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2.5 14H11"
        stroke="#BDBDBD"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.9697 12.6401L17.1431 10.4668C17.3997 10.2101 17.3997 9.79011 17.1431 9.53344L14.9697 7.36011"
        stroke="url(#paint0_linear_8611_33805)"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_8611_33805"
          x1="14.9697"
          y1="10.0001"
          x2="17.3356"
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

export default MenuOpenIcon;
