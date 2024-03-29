import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const TickIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 36 36"
      style={{ transform: 'scale(1)', width, height }}
    >
      <g clipPath="url(#clip0_1782_40237)">
        <path
          d="M18 36C27.9247 36 36 27.9254 36 18C36 16.2869 35.7609 14.5986 35.2874 12.9818C35.0541 12.1868 34.2239 11.7301 33.4266 11.9634C32.6309 12.1959 32.1757 13.0291 32.4082 13.8241C32.8004 15.1674 33 16.5729 33 18C33 26.2709 26.2709 33 18 33C9.72913 33 3 26.2709 3 18C3 9.72913 9.72913 3 18 3C21.0059 3 23.8978 3.87891 26.3632 5.54114C27.0494 6.00439 27.9825 5.82239 28.4451 5.13611C28.908 4.4491 28.7274 3.51672 28.0404 3.05383C25.0778 1.05615 21.6061 0 18 0C8.07532 0 0 8.07458 0 18C0 27.9254 8.07532 36 18 36Z"
          fill={color}
        />
        <path
          d="M33.4392 3.43918L17.9997 18.8779L13.0603 13.9392C12.4743 13.3536 11.5251 13.3536 10.9392 13.9392C10.3536 14.5251 10.3536 15.4743 10.9392 16.0603L16.9392 22.0603C17.2325 22.3536 17.6156 22.4997 17.9997 22.4997C18.3839 22.4997 18.7669 22.3536 19.0603 22.0603L35.5603 5.56027C36.1458 4.97433 36.1458 4.02512 35.5603 3.43918C34.9743 2.85361 34.0251 2.85361 33.4392 3.43918Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_1782_40237">
          <rect width="36" height="36" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default TickIcon;
