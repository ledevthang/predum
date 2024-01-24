import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const StepCompleteIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 48 48"
      style={{ transform: 'scale(1)', width, height }}
    >
      <circle cx="24" cy="24" r="24" fill="#17C7A7" />
      <path
        d="M14 24L20.6588 31L34 17"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default StepCompleteIcon;
