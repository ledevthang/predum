import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const FacebookIcon2 = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 36 36"
      style={{ transform: 'scale(1)', width, height }}
    >
      <g clipPath="url(#clip0_7558_27901)">
        <path
          d="M36 17.9999C36 8.05878 27.9411 -8.39233e-05 18 -8.39233e-05C8.05887 -8.39233e-05 0 8.05878 0 17.9999C0 26.9842 6.58234 34.4309 15.1875 35.7812V23.203H10.6172V17.9999H15.1875V14.0343C15.1875 9.52304 17.8748 7.03117 21.9864 7.03117C23.9557 7.03117 26.0156 7.38273 26.0156 7.38273V11.8124H23.7459C21.5098 11.8124 20.8125 13.1999 20.8125 14.6234V17.9999H25.8047L25.0066 23.203H20.8125V35.7812C29.4177 34.4309 36 26.9842 36 17.9999Z"
          fill="#0B0B0E"
        />
        <path
          d="M25.0066 23.2031L25.8047 18H20.8125V14.6235C20.8125 13.2 21.5098 11.8125 23.7459 11.8125H26.0156V7.38281C26.0156 7.38281 23.9557 7.03125 21.9864 7.03125C17.8748 7.03125 15.1875 9.52313 15.1875 14.0344V18H10.6172V23.2031H15.1875V35.7813C16.1039 35.9251 17.0432 36 18 36C18.9568 36 19.8961 35.9251 20.8125 35.7813V23.2031H25.0066Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_7558_27901">
          <rect width="36" height="36" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default FacebookIcon2;
