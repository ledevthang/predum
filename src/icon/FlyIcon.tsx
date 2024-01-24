import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const FlyIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={12}
      height={13}
      viewBox="0 0 12 13"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M8.41531 1.22669L3.14781 2.97669C-0.393021 4.16086 -0.393021 6.09169 3.14781 7.27002L4.71115 7.78919L5.23031 9.35252C6.40865 12.8934 8.34531 12.8934 9.52365 9.35252L11.2795 4.09086C12.0611 1.72836 10.7778 0.439192 8.41531 1.22669ZM8.60198 4.36503L6.38531 6.59336C6.29781 6.68086 6.18698 6.72169 6.07615 6.72169C5.96531 6.72169 5.85448 6.68086 5.76698 6.59336C5.59781 6.42419 5.59781 6.14419 5.76698 5.97503L7.98365 3.74669C8.15281 3.57753 8.43281 3.57753 8.60198 3.74669C8.77114 3.91586 8.77114 4.19586 8.60198 4.36503Z"
        fill="#1976D2"
      />
    </SvgIcon>
  );
};

export default FlyIcon;
