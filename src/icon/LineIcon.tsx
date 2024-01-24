import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const LineIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 16 1"
      style={{ transform: 'scale(1)', width, height }}
    >
      <line
        x1="0.5"
        y1="0.5"
        x2="15.5"
        y2="0.5"
        stroke="#BDBDBD"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
};

export default LineIcon;
