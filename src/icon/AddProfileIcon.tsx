import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

import { IIconProperty } from 'types/iconProps';

const AddProfileIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 14 14"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M10.7913 11.375H8.45801"
        stroke="#1976D2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.625 12.5416V10.2083"
        stroke="#1976D2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.09351 6.34091C7.03518 6.33508 6.96518 6.33508 6.90101 6.34091C5.51268 6.29425 4.41018 5.15675 4.41018 3.75675C4.40434 2.32758 5.56518 1.16675 6.99434 1.16675C8.42351 1.16675 9.58434 2.32758 9.58434 3.75675C9.58434 5.15675 8.47601 6.29425 7.09351 6.34091Z"
        stroke="#1976D2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.99395 12.7224C5.93228 12.7224 4.87645 12.4541 4.07145 11.9174C2.65978 10.9724 2.65978 9.4324 4.07145 8.49323C5.67561 7.4199 8.30645 7.4199 9.91061 8.49323"
        stroke="#1976D2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default AddProfileIcon;
