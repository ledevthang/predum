import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

import { IIconProperty } from 'types/iconProps';

const RightArrowIcon = ({ width, height, color }: IIconProperty) => {
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
        d="M14.0909 7.2652C14.4968 6.89059 15.1294 6.9159 15.504 7.32171L18.7348 10.8217C19.0884 11.2047 19.0884 11.7952 18.7348 12.1782L15.504 15.6783C15.1294 16.0841 14.4968 16.1094 14.091 15.7348C13.6851 15.3602 13.6598 14.7275 14.0344 14.3217L15.716 12.5L6 12.5C5.44771 12.5 5 12.0522 5 11.5C5 10.9477 5.44771 10.5 6 10.5L15.716 10.5L14.0344 8.67828C13.6598 8.27246 13.6851 7.63981 14.0909 7.2652Z"
        fill="#BDBDBD"
      />
    </SvgIcon>
  );
};

export default RightArrowIcon;
