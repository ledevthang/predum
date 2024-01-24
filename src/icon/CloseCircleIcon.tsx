import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const CloseCircleIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 37 36"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M18.5 3C10.235 3 3.5 9.735 3.5 18C3.5 26.265 10.235 33 18.5 33C26.765 33 33.5 26.265 33.5 18C33.5 9.735 26.765 3 18.5 3ZM23.54 21.45C23.975 21.885 23.975 22.605 23.54 23.04C23.315 23.265 23.03 23.37 22.745 23.37C22.46 23.37 22.175 23.265 21.95 23.04L18.5 19.59L15.05 23.04C14.825 23.265 14.54 23.37 14.255 23.37C13.97 23.37 13.685 23.265 13.46 23.04C13.025 22.605 13.025 21.885 13.46 21.45L16.91 18L13.46 14.55C13.025 14.115 13.025 13.395 13.46 12.96C13.895 12.525 14.615 12.525 15.05 12.96L18.5 16.41L21.95 12.96C22.385 12.525 23.105 12.525 23.54 12.96C23.975 13.395 23.975 14.115 23.54 14.55L20.09 18L23.54 21.45Z"
        fill="#E53935"
      />
    </SvgIcon>
  );
};

export default CloseCircleIcon;
