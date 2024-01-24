import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const DotaIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 20 20"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M20 0H17.5179L16.4844 0.516758L15.4508 0H10.5859L9.41406 0.585938H6.17508L5.0032 0H0V9.41406L0.585938 10.5859V13.8249L0 14.9968V20H10L11.0336 19.4832L12.0671 20H20V12.0671L19.4832 11.0336L20 10V0ZM5.27344 16.4844L3.51562 14.7266V11.2109L8.78906 16.4844H5.27344ZM15.8984 16.4844H13.5547L12.0357 14.6995L11.7225 13.4273L10.5168 12.9145L10 12.3073L3.51562 4.6875L4.6875 3.51562L10 7.50879L16.4844 12.3828L15.8984 16.4844ZM16.4844 8.78906L11.2109 3.51562H14.7266L16.4844 5.27344V8.78906Z"
        fill={color}
      />
    </SvgIcon>
  );
};

export default DotaIcon;
