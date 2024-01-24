import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const BottomArrowIcon = ({ width, height, color, viewBox }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox={viewBox ? viewBox : '0 0 20 20'}
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M4.79341 0.953125H8.94674C9.13985 0.953125 9.24068 1.1885 9.10485 1.32791C9.10454 1.32823 9.10423 1.32855 9.10391 1.32887L6.96652 3.46624L5.65319 4.77957C5.29512 5.13764 4.7117 5.13764 4.35363 4.77957L0.900297 1.32624C0.761019 1.18696 0.860172 0.953125 1.05341 0.953125H4.79341Z"
        fill={color}
        stroke="white"
      />
    </SvgIcon>
  );
};

export default BottomArrowIcon;
