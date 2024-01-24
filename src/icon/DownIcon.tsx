import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

import { IIconProperty } from 'types/iconProps';

const DownIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 20 20"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M9.7417 7.31665H14.9334C15.2864 7.31665 15.4673 7.74523 15.2199 7.99798C15.2196 7.99834 15.2192 7.9987 15.2189 7.99906L12.5465 10.6714L10.9048 12.3131C10.4084 12.8095 9.59999 12.8095 9.10359 12.3131L4.78692 7.99643C4.53431 7.74382 4.71346 7.31665 5.0667 7.31665H9.7417Z"
        fill={color}
        stroke={color}
      />
    </SvgIcon>
  );
};

export default DownIcon;
