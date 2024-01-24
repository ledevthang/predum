import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const ArrowDownIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 16 16"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M8.00001 11.1999C7.53335 11.1999 7.06668 11.0199 6.71335 10.6666L2.36668 6.31993C2.17335 6.12659 2.17335 5.8066 2.36668 5.61326C2.56001 5.41993 2.88001 5.41993 3.07335 5.61326L7.42001 9.95993C7.74001 10.2799 8.26001 10.2799 8.58001 9.95993L12.9267 5.61326C13.12 5.41993 13.44 5.41993 13.6333 5.61326C13.8267 5.8066 13.8267 6.12659 13.6333 6.31993L9.28668 10.6666C8.93335 11.0199 8.46668 11.1999 8.00001 11.1999Z"
        fill={color}
      />
    </SvgIcon>
  );
};

export default ArrowDownIcon;
