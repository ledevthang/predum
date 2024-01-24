import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const WarningIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 16 16"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M15.6676 11.9982L10.0155 1.60829C9.10743 0.079504 6.89378 0.0774728 5.98447 1.60829L0.332715 11.9982C-0.595597 13.5603 0.528309 15.5385 2.34778 15.5385H13.652C15.47 15.5385 16.5959 13.5619 15.6676 11.9982ZM8 13.6635C7.48318 13.6635 7.0625 13.2428 7.0625 12.726C7.0625 12.2092 7.48318 11.7885 8 11.7885C8.51681 11.7885 8.9375 12.2092 8.9375 12.726C8.9375 13.2428 8.51681 13.6635 8 13.6635ZM8.9375 9.9135C8.9375 10.4303 8.51681 10.851 8 10.851C7.48318 10.851 7.0625 10.4303 7.0625 9.9135V5.226C7.0625 4.70919 7.48318 4.2885 8 4.2885C8.51681 4.2885 8.9375 4.70919 8.9375 5.226V9.9135Z"
        fill="#3FADD5"
      />
    </SvgIcon>
  );
};

export default WarningIcon;
