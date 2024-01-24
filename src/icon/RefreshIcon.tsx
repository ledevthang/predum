import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const RefreshIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 16.44H7.63M3.11 16.44V21.44M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default RefreshIcon;
