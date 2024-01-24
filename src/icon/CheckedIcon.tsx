import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const CheckedIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 36 36"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M34.9707 4.92146C34.4411 4.39095 33.5819 4.39003 33.0523 4.9192L16.7754 21.1531L10.9028 14.7748C10.3953 14.224 9.53738 14.1883 8.98563 14.6957C8.43431 15.2031 8.39902 16.0615 8.90646 16.6128L15.7356 24.0294C15.9857 24.3013 16.3358 24.4591 16.7048 24.4668C16.7147 24.4672 16.7243 24.4672 16.7338 24.4672C17.0925 24.4672 17.4375 24.3248 17.6917 24.0715L34.9681 6.84035C35.499 6.31125 35.4999 5.45196 34.9707 4.92146Z"
        fill="#17C7A7"
      />
      <path
        d="M34.6432 16.6432C33.8938 16.6432 33.2864 17.2505 33.2864 18C33.2864 26.4293 26.4293 33.2864 18 33.2864C9.57122 33.2864 2.71357 26.4293 2.71357 18C2.71357 9.57122 9.57122 2.71357 18 2.71357C18.7494 2.71357 19.3568 2.10621 19.3568 1.35682C19.3568 0.607359 18.7494 0 18 0C8.07469 0 0 8.07469 0 18C0 27.9249 8.07469 36 18 36C27.9249 36 36 27.9249 36 18C36 17.2506 35.3926 16.6432 34.6432 16.6432Z"
        fill="#17C7A7"
      />
    </SvgIcon>
  );
};

export default CheckedIcon;