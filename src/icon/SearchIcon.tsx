import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const SearchIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 20 20"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M9.16667 17.2915C4.68334 17.2915 1.04167 13.6498 1.04167 9.1665C1.04167 4.68317 4.68334 1.0415 9.16667 1.0415C13.65 1.0415 17.2917 4.68317 17.2917 9.1665C17.2917 13.6498 13.65 17.2915 9.16667 17.2915ZM9.16667 2.2915C5.375 2.2915 2.29167 5.37484 2.29167 9.1665C2.29167 12.9582 5.375 16.0415 9.16667 16.0415C12.9583 16.0415 16.0417 12.9582 16.0417 9.1665C16.0417 5.37484 12.9583 2.2915 9.16667 2.2915Z"
        fill={color}
      />
      <path
        d="M16.8 18.9917C16.7333 18.9917 16.6667 18.9833 16.6083 18.975C16.2167 18.925 15.5083 18.6583 15.1083 17.4667C14.9 16.8417 14.975 16.2167 15.3167 15.7417C15.6583 15.2667 16.2333 15 16.8917 15C17.7417 15 18.4083 15.325 18.7083 15.9C19.0083 16.475 18.925 17.2083 18.45 17.9167C17.8583 18.8083 17.2167 18.9917 16.8 18.9917ZM16.3 17.075C16.4417 17.5083 16.6417 17.725 16.775 17.7417C16.9083 17.7583 17.1583 17.6 17.4167 17.225C17.6583 16.8667 17.675 16.6083 17.6167 16.4917C17.5583 16.375 17.325 16.25 16.8917 16.25C16.6333 16.25 16.4417 16.3333 16.3333 16.475C16.2333 16.6167 16.2167 16.8333 16.3 17.075Z"
        fill={color}
      />
    </SvgIcon>
  );
};

export default SearchIcon;