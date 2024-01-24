import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

import { IIconProperty } from 'types/iconProps';

const TelegramIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 36 36"
      style={{ transform: 'scale(1)', width, height }}
    >
      <circle cx="18" cy="18" r="17.5" stroke="#ABABAB" />
      <path
        d="M10.9257 17.4564L14.3052 18.7177L15.6133 22.9245C15.697 23.1939 16.0264 23.2935 16.2451 23.1147L18.1289 21.579C18.3263 21.4181 18.6076 21.4101 18.814 21.5599L22.2116 24.0267C22.4456 24.1967 22.777 24.0685 22.8357 23.7858L25.3247 11.8134C25.3887 11.5046 25.0853 11.247 24.7913 11.3607L10.9217 16.7112C10.5795 16.8432 10.5824 17.3278 10.9257 17.4564ZM15.4024 18.0463L22.0072 13.9784C22.1259 13.9055 22.2481 14.066 22.1461 14.1605L16.6953 19.2274C16.5037 19.4057 16.3801 19.6444 16.3451 19.9035L16.1594 21.2795C16.1348 21.4632 15.8767 21.4815 15.826 21.3037L15.1119 18.7944C15.0301 18.5082 15.1493 18.2025 15.4024 18.0463Z"
        fill="#ABABAB"
      />
    </SvgIcon>
  );
};

export default TelegramIcon;
