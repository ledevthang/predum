import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

import { IIconProperty } from 'types/iconProps';

const EditIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 20 20"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M9.16699 1.6665H7.50033C3.33366 1.6665 1.66699 3.33317 1.66699 7.49984V12.4998C1.66699 16.6665 3.33366 18.3332 7.50033 18.3332H12.5003C16.667 18.3332 18.3337 16.6665 18.3337 12.4998V10.8332"
        stroke="#BDBDBD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3666 2.51688L6.7999 9.08354C6.5499 9.33354 6.2999 9.82521 6.2499 10.1835L5.89157 12.6919C5.75823 13.6002 6.3999 14.2335 7.30823 14.1085L9.81657 13.7502C10.1666 13.7002 10.6582 13.4502 10.9166 13.2002L17.4832 6.63354C18.6166 5.50021 19.1499 4.18354 17.4832 2.51688C15.8166 0.850211 14.4999 1.38354 13.3666 2.51688Z"
        stroke="#BDBDBD"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.4248 3.4585C12.9831 5.45016 14.5415 7.0085 16.5415 7.57516"
        stroke="#BDBDBD"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default EditIcon;
