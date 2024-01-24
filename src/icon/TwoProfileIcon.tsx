import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

import { IIconProperty } from 'types/iconProps';

const TwoProfileIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 14 14"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M5.34349 6.34091C5.28516 6.33508 5.21516 6.33508 5.15099 6.34091C3.76266 6.29425 2.66016 5.15675 2.66016 3.75675C2.66016 2.32758 3.81516 1.16675 5.25016 1.16675C6.67932 1.16675 7.84016 2.32758 7.84016 3.75675C7.83432 5.15675 6.73182 6.29425 5.34349 6.34091Z"
        stroke="#212121"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5729 2.33325C10.7046 2.33325 11.6146 3.24909 11.6146 4.37492C11.6146 5.47742 10.7396 6.37575 9.64874 6.41659C9.60207 6.41075 9.54957 6.41075 9.49707 6.41659"
        stroke="#212121"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.42691 8.49325C1.01525 9.43825 1.01525 10.9783 2.42691 11.9174C4.03108 12.9908 6.66191 12.9908 8.26608 11.9174C9.67775 10.9724 9.67775 9.43242 8.26608 8.49325C6.66775 7.42575 4.03691 7.42575 2.42691 8.49325Z"
        stroke="#212121"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.6982 11.6667C11.1182 11.5792 11.5149 11.4101 11.8416 11.1592C12.7516 10.4767 12.7516 9.35091 11.8416 8.66841C11.5207 8.42341 11.1299 8.26008 10.7157 8.16675"
        stroke="#212121"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default TwoProfileIcon;
