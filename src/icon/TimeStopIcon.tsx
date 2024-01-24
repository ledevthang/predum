import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

import { IIconProperty } from 'types/iconProps';

const TimeStopIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 16 16"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M9.9266 2.30016H6.07326C5.80659 2.30016 5.59326 2.08683 5.59326 1.82016C5.59326 1.5535 5.80659 1.3335 6.07326 1.3335H9.9266C10.1933 1.3335 10.4066 1.54683 10.4066 1.8135C10.4066 2.08016 10.1933 2.30016 9.9266 2.30016Z"
        fill="#BDBDBD"
      />
      <path
        d="M8.99994 13.3334V13.0001C8.99994 10.0001 10.9999 9.0001 12.9999 9.0001C12.8866 9.0001 13.6666 9.0001 12.9999 9.0001C13.5156 9.0001 13.9999 9.0001 13.9999 8.33344C13.9999 5.1401 11.4066 3.1001 8.21994 3.1001C5.03327 3.1001 2.43994 5.69343 2.43994 8.88676C2.43994 12.0734 5.03327 14.6668 8.21994 14.6668C7.55328 14.6668 8.78661 14.6668 8.21994 14.6668C9.14514 14.7811 8.99994 14.3334 8.99994 13.3334ZM8.71994 8.66676C8.71994 8.9401 8.49328 9.16676 8.21994 9.16676C7.94661 9.16676 7.71994 8.9401 7.71994 8.66676V5.33343C7.71994 5.0601 7.94661 4.83343 8.21994 4.83343C8.49328 4.83343 8.71994 5.0601 8.71994 5.33343V8.66676Z"
        fill="#BDBDBD"
      />
      <path
        d="M12.6667 10C11.1933 10 10 11.1933 10 12.6667C10 14.14 11.1933 15.3333 12.6667 15.3333C14.14 15.3333 15.3333 14.14 15.3333 12.6667C15.3333 11.1933 14.14 10 12.6667 10ZM13.7333 13.76C13.6333 13.86 13.5067 13.9067 13.38 13.9067C13.2533 13.9067 13.1267 13.86 13.0267 13.76L12.6733 13.4067L12.3067 13.7733C12.2067 13.8733 12.08 13.92 11.9533 13.92C11.8267 13.92 11.7 13.8733 11.6 13.7733C11.4067 13.58 11.4067 13.26 11.6 13.0667L11.9667 12.7L11.6133 12.3467C11.42 12.1533 11.42 11.8333 11.6133 11.64C11.8067 11.4467 12.1267 11.4467 12.32 11.64L12.6733 12L13.0067 11.6667C13.2 11.4733 13.52 11.4733 13.7133 11.6667C13.9067 11.86 13.9067 12.18 13.7133 12.3733L13.38 12.7067L13.7333 13.06C13.9267 13.2533 13.9267 13.5667 13.7333 13.76Z"
        fill="#BDBDBD"
      />
    </SvgIcon>
  );
};

export default TimeStopIcon;
