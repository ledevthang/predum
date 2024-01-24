import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const ImageGallery = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 33 30"
      style={{ transform: 'scale(1)', width, height }}
      fill="none"
    >
      <g clipPath="url(#clip0_3195_34590)">
        <path
          d="M23.7171 29.6478C23.4947 29.6478 23.2671 29.62 23.0421 29.5604L2.57636 24.0797C1.17342 23.6932 0.33695 22.24 0.704891 20.837L3.2871 11.2123C3.38239 10.8589 3.74504 10.6538 4.0971 10.7438C4.45048 10.8378 4.6596 11.2017 4.56563 11.5538L1.98474 21.1759C1.80077 21.8773 2.22166 22.6079 2.92445 22.8025L23.3822 28.2806C24.085 28.4658 24.8103 28.0476 24.993 27.3488L26.0267 23.5185C26.122 23.1651 26.4846 22.9547 26.838 23.0513C27.1914 23.1466 27.3992 23.5106 27.3052 23.8626L26.2728 27.6876C25.9618 28.8656 24.8897 29.6478 23.7171 29.6478Z"
          fill="#BDBDBD"
        />
        <path
          d="M29.7347 21.7038H8.55819C7.09834 21.7038 5.91113 20.5166 5.91113 19.0568V3.1744C5.91113 1.71455 7.09834 0.527344 8.55819 0.527344H29.7347C31.1945 0.527344 32.3817 1.71455 32.3817 3.1744V19.0568C32.3817 20.5166 31.1945 21.7038 29.7347 21.7038ZM8.55819 1.85087C7.82893 1.85087 7.23466 2.44514 7.23466 3.1744V19.0568C7.23466 19.786 7.82893 20.3803 8.55819 20.3803H29.7347C30.4639 20.3803 31.0582 19.786 31.0582 19.0568V3.1744C31.0582 2.44514 30.4639 1.85087 29.7347 1.85087H8.55819Z"
          fill="#BDBDBD"
        />
        <path
          d="M12.5289 9.79412C11.069 9.79412 9.88184 8.60691 9.88184 7.14706C9.88184 5.68721 11.069 4.5 12.5289 4.5C13.9887 4.5 15.176 5.68721 15.176 7.14706C15.176 8.60691 13.9887 9.79412 12.5289 9.79412ZM12.5289 5.82353C11.7996 5.82353 11.2054 6.41779 11.2054 7.14706C11.2054 7.87632 11.7996 8.47059 12.5289 8.47059C13.2582 8.47059 13.8524 7.87632 13.8524 7.14706C13.8524 6.41779 13.2582 5.82353 12.5289 5.82353Z"
          fill="#BDBDBD"
        />
        <path
          d="M6.666 20.2897C6.49659 20.2897 6.32718 20.2249 6.19747 20.0965C5.93938 19.8384 5.93938 19.4188 6.19747 19.1607L12.4485 12.9097C13.1976 12.1606 14.5066 12.1606 15.2557 12.9097L17.1166 14.7706L22.2678 8.58971C22.6423 8.14103 23.1929 7.88029 23.7792 7.875H23.7938C24.3735 7.875 24.9228 8.12647 25.3013 8.56721L32.2234 16.6434C32.4616 16.92 32.4298 17.3382 32.1519 17.5765C31.8753 17.8147 31.4584 17.7843 31.2188 17.505L24.2967 9.42882C24.1684 9.28059 23.991 9.19853 23.7938 9.19853C23.6561 9.18662 23.4139 9.28191 23.2856 9.43676L17.6698 16.1749C17.5507 16.3178 17.3773 16.4038 17.1907 16.4118C17.0028 16.425 16.8241 16.3509 16.6931 16.2185L14.32 13.8454C14.0698 13.5966 13.6344 13.5966 13.3842 13.8454L7.13321 20.0965C7.00482 20.2249 6.83541 20.2897 6.666 20.2897Z"
          fill="#BDBDBD"
        />
      </g>
      <defs>
        <clipPath id="clip0_3195_34590">
          <rect
            width="31.7656"
            height="30"
            fill="white"
            transform="translate(0.617188)"
          />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default ImageGallery;
