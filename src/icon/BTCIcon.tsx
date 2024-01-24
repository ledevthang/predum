import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const BTCIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 28 28"
      style={{ transform: 'scale(1)', width, height }}
    >
      <g clipPath="url(#clip0_5653_20761)">
        <path
          d="M13.2808 17.8211C14.577 17.8165 17.4108 17.806 17.3781 16.0035C17.3466 14.1601 14.6248 14.271 13.2983 14.3258C13.1501 14.3316 13.0183 14.3375 12.911 14.3386L12.9716 17.8235C13.0591 17.8211 13.1641 17.8211 13.2808 17.8211ZM13.1431 12.7426C14.2246 12.7415 16.5848 12.7391 16.5568 11.1C16.5265 9.42347 14.2596 9.52263 13.1525 9.57163C13.0276 9.57747 12.9191 9.58213 12.8281 9.5833L12.883 12.7438L13.1431 12.7426Z"
          fill="#BDBDBD"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.6111 27.5806C18.1127 29.4508 25.7101 24.8856 27.5802 17.3863C29.4504 9.88576 24.8841 2.28842 17.3824 0.419423C9.88539 -1.45191 2.28805 3.11442 0.419053 10.6161C-1.45111 18.1154 3.11405 25.7128 10.6122 27.5818L10.6111 27.5806ZM15.6067 7.72392C17.6531 7.86859 19.2817 8.46826 19.4952 10.3396C19.6539 11.7093 19.0939 12.5434 18.1851 13.0264C19.7017 13.3624 20.6642 14.2433 20.5126 16.2593C20.3247 18.7618 18.4732 19.4653 15.8156 19.6636L15.8599 22.2886L14.2779 22.3178L14.2324 19.7278C13.8229 19.7348 13.4029 19.7394 12.9677 19.7371L13.0144 22.3388L11.4324 22.3668L11.3857 19.7371L10.9389 19.7406C10.7126 19.7418 10.4839 19.7429 10.2552 19.7476L8.19489 19.7826L8.47605 17.8879C8.47605 17.8879 9.64739 17.8856 9.62639 17.8681C10.0744 17.8588 10.1876 17.5356 10.2121 17.3326L10.1409 13.1828L10.2541 13.1804H10.3077C10.252 13.174 10.1958 13.1713 10.1397 13.1723L10.0884 10.2089C10.0219 9.88926 9.80722 9.52059 9.16672 9.53226C9.18422 9.50892 8.01639 9.55209 8.01639 9.55209L7.98605 7.86276L10.1701 7.82542V7.83359C10.4979 7.82776 10.8351 7.81609 11.1769 7.80326L11.1326 5.20276L12.7146 5.17592L12.7589 7.72392C13.1812 7.70876 13.6059 7.69242 14.0224 7.68542L13.9781 5.15376L15.5612 5.12576L15.6067 7.72626V7.72392Z"
          fill="#BDBDBD"
        />
      </g>
      <defs>
        <clipPath id="clip0_5653_20761">
          <rect width="28" height="28" fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
};

export default BTCIcon;
