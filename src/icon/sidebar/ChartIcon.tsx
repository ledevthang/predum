import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const ChartIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 20 20"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M1.66663 18.334H18.3333"
        stroke="#BDBDBD"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.125 3.33268V18.3327H11.875V3.33268C11.875 2.41602 11.5 1.66602 10.375 1.66602H9.625C8.5 1.66602 8.125 2.41602 8.125 3.33268Z"
        stroke="#BDBDBD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 8.33268V18.3327H5.83333V8.33268C5.83333 7.41602 5.5 6.66602 4.5 6.66602H3.83333C2.83333 6.66602 2.5 7.41602 2.5 8.33268Z"
        stroke="#BDBDBD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1666 12.5007V18.334H17.5V12.5007C17.5 11.584 17.1666 10.834 16.1666 10.834H15.5C14.5 10.834 14.1666 11.584 14.1666 12.5007Z"
        stroke="#BDBDBD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default ChartIcon;
