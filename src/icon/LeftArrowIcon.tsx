import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

import { IIconProperty } from 'types/iconProps';

const LeftArrowIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.90906 7.2652C9.50324 6.89059 8.87058 6.9159 8.49597 7.32171L5.2652 10.8217C4.9116 11.2047 4.9116 11.7952 5.26519 12.1782L8.49597 15.6783C8.87057 16.0841 9.50323 16.1094 9.90905 15.7348C10.3149 15.3602 10.3402 14.7275 9.96558 14.3217L8.28397 12.5L18 12.5C18.5523 12.5 19 12.0522 19 11.5C19 10.9477 18.5523 10.5 18 10.5L8.284 10.5L9.96557 8.67828C10.3402 8.27246 10.3149 7.63981 9.90906 7.2652Z"
        fill="#BDBDBD"
      />
    </SvgIcon>
  );
};

export default LeftArrowIcon;
