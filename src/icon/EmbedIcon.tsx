import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

import { IIconProperty } from 'types/iconProps';

const EmbedIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 32 32"
      style={{ transform: 'scale(1)', width, height, color: '#111111' }}
    >
      <circle cx="16" cy="16" r="15.5" />
      <path
        d="M12 23L5.56957 17.2374C4.81014 16.5568 4.81014 15.4432 5.56957 14.7626L12 9"
        stroke="#BDBDBD"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 23L26.4304 17.2374C27.1899 16.5568 27.1899 15.4432 26.4304 14.7626L20 9"
        stroke="#BDBDBD"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default EmbedIcon;
