import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

import { IIconProperty } from 'types/iconProps';

const MoneyBagIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 54 54"
      style={{
        transform: 'scale(1)',
        filter: 'brightness(0.4)',
        width,
        height,
      }}
    >
      <path
        d="M15.7767 23.6738C14.046 24.5535 12.1219 24.9841 10.1813 24.9262C8.24072 24.9841 6.31667 24.5535 4.58594 23.6738V46.3666C5.09299 46.3155 5.60232 46.29 6.11195 46.2903C8.05254 46.2324 9.97659 46.663 11.7073 47.5427V40.1863C11.7073 38.5585 13.3188 37.2197 15.7767 36.5595V23.6738Z"
        fill="#BDBDBD"
      />
      <path
        d="M6.111 52.3992C9.20124 52.3992 11.7064 51.4882 11.7064 50.3645C11.7064 49.2408 9.20124 48.3298 6.111 48.3298C3.02076 48.3298 0.515625 49.2408 0.515625 50.3645C0.515625 51.4882 3.02076 52.3992 6.111 52.3992Z"
        fill="#BDBDBD"
      />
      <path
        d="M0.515625 53.1741V55.4438C0.515625 56.2576 2.74665 57.4784 6.111 57.4784C9.47535 57.4784 11.7064 56.2576 11.7064 55.4438V53.1741C9.97564 54.0538 8.05159 54.4844 6.111 54.4264C4.1704 54.4844 2.24636 54.0538 0.515625 53.1741Z"
        fill="#BDBDBD"
      />
      <path
        d="M30.5485 9.79987C31.3009 10.3648 32.2151 10.6726 33.1559 10.6778C32.2744 9.16391 31.5766 7.55019 31.0775 5.8709C30.9266 5.32955 31.2432 4.7684 31.7845 4.61754C32.3259 4.46668 32.887 4.78323 33.0379 5.32459C33.6045 7.23593 34.4708 9.04523 35.6047 10.685H36.6505C37.7864 9.04699 38.6527 7.23761 39.2162 5.32561C39.3668 4.78397 39.9279 4.46696 40.4696 4.61754C41.0112 4.76812 41.3282 5.32927 41.1777 5.8709C40.679 7.54874 39.982 9.1611 39.1013 10.6738C40.0234 10.6596 40.9174 10.3537 41.6548 9.79987C44.0364 7.93814 44.8716 4.97767 45.1463 2.82091C45.2012 2.45132 45.0302 2.08463 44.7119 1.88903C44.361 1.66023 43.9081 1.66023 43.5572 1.88903C42.8445 2.33595 42.0166 2.56442 41.1756 2.54623C39.9971 2.55575 38.8601 2.11131 38.0005 1.30507C37.4976 0.79736 36.8127 0.511719 36.0981 0.511719C35.3835 0.511719 34.6985 0.79736 34.1956 1.30507C33.336 2.11071 32.1996 2.55507 31.0215 2.54623C30.1846 2.56469 29.3605 2.33763 28.6511 1.8931C28.4791 1.78315 28.2795 1.72424 28.0753 1.7232C27.8684 1.7239 27.666 1.78316 27.4914 1.89411C27.1743 2.08925 27.0042 2.4547 27.059 2.82295C27.3367 4.97971 28.1689 7.93814 30.5485 9.79987Z"
        fill="#BDBDBD"
      />
      <path
        d="M16.2829 8.64578C19.3731 8.64578 21.8782 7.73482 21.8782 6.6111C21.8782 5.48737 19.3731 4.57642 16.2829 4.57642C13.1926 4.57642 10.6875 5.48737 10.6875 6.6111C10.6875 7.73482 13.1926 8.64578 16.2829 8.64578Z"
        fill="#BDBDBD"
      />
      <path
        d="M10.1813 22.8877C13.2716 22.8877 15.7767 21.9768 15.7767 20.853C15.7767 19.7293 13.2716 18.8184 10.1813 18.8184C7.09107 18.8184 4.58594 19.7293 4.58594 20.853C4.58594 21.9768 7.09107 22.8877 10.1813 22.8877Z"
        fill="#BDBDBD"
      />
      <path
        d="M56.6886 33.3024C53.3782 19.252 44.5395 13.504 41.8507 12.0492C41.3554 12.2899 40.8313 12.466 40.2911 12.5731L42.1803 14.3362C42.3778 14.5202 42.494 14.7753 42.5034 15.0451C42.5127 15.3149 42.4144 15.5774 42.2302 15.7747C42.0461 15.9722 41.791 16.0884 41.5212 16.0977C41.2514 16.1071 40.989 16.0088 40.7916 15.8245L37.469 12.7227H37.1435V15.7747C37.1435 16.3365 36.688 16.792 36.1261 16.792C35.5643 16.792 35.1088 16.3365 35.1088 15.7747V12.7227H34.7832L31.4606 15.8245C31.2633 16.0088 31.0008 16.1071 30.731 16.0977C30.4612 16.0884 30.2062 15.9722 30.0221 15.7747C29.8377 15.5775 29.7392 15.3151 29.7484 15.0453C29.7575 14.7755 29.8736 14.5204 30.0709 14.3362L31.9499 12.5833C31.4061 12.4775 30.8782 12.3021 30.3792 12.0614C27.8496 13.4867 25.5691 15.3143 23.6271 17.4726C23.6189 17.4808 23.6118 17.4899 23.6037 17.4991C22.8608 18.3106 22.1619 19.1613 21.51 20.0475C21.1729 20.486 20.5473 20.575 20.1014 20.2477C19.6556 19.9205 19.5528 19.297 19.87 18.844C20.5343 17.9386 21.2088 17.1216 21.8783 16.3719V9.43359C20.1477 10.314 18.2236 10.7453 16.2829 10.688C14.3423 10.7459 12.4182 10.3153 10.6875 9.43563V16.8052C14.7803 16.9365 17.8089 18.6365 17.8089 20.8614V36.1978C18.3159 36.1466 18.8253 36.1212 19.3349 36.1215C23.684 36.1215 26.965 37.8713 26.965 40.1909V51.3816H45.4704C46.5335 51.3816 51.9987 51.1782 55.1473 47.2105C57.6093 44.0975 58.1281 39.4187 56.6886 33.3024ZM41.2077 33.0695C41.2077 35.3169 39.3858 37.1388 37.1384 37.1388V38.1562C37.1384 38.718 36.6829 39.1735 36.121 39.1735C35.5592 39.1735 35.1037 38.718 35.1037 38.1562V37.1388C32.8562 37.1388 31.0343 35.3169 31.0343 33.0695C31.0343 32.5076 31.4898 32.0521 32.0517 32.0521C32.6135 32.0521 33.069 32.5076 33.069 33.0695C33.069 34.1932 33.98 35.1042 35.1037 35.1042V31.0348C32.8562 31.0348 31.0343 29.2129 31.0343 26.9654C31.0343 24.718 32.8562 22.8961 35.1037 22.8961V21.8787C35.1037 21.3169 35.5592 20.8614 36.121 20.8614C36.6829 20.8614 37.1384 21.3169 37.1384 21.8787V22.8961C39.3858 22.8961 41.2077 24.718 41.2077 26.9654C41.2077 27.5273 40.7523 27.9828 40.1904 27.9828C39.6285 27.9828 39.173 27.5273 39.173 26.9654C39.173 25.8417 38.2621 24.9307 37.1384 24.9307V29.0001C39.3858 29.0001 41.2077 30.822 41.2077 33.0695ZM53.5532 45.9419C50.9854 49.1831 46.3697 49.3469 45.4704 49.3469C44.9085 49.3469 44.453 48.8915 44.453 48.3296C44.453 47.7677 44.9085 47.3123 45.4704 47.3123C46.2059 47.3123 49.9721 47.1851 51.957 44.6784C52.8955 43.3522 53.396 41.7657 53.3884 40.141C53.4222 39.583 53.8948 39.1537 54.4535 39.1735C54.7231 39.1864 54.9765 39.3059 55.1579 39.5057C55.3394 39.7055 55.434 39.9691 55.421 40.2387C55.4124 42.2887 54.7589 44.284 53.5532 45.9419Z"
        fill="#BDBDBD"
      />
      <path
        d="M33.0684 26.9663C33.0684 28.09 33.9793 29.001 35.103 29.001V24.9316C33.9793 24.9316 33.0684 25.8426 33.0684 26.9663Z"
        fill="#BDBDBD"
      />
      <path
        d="M37.1406 35.1026C38.2643 35.1026 39.1753 34.1916 39.1753 33.0679C39.1753 31.9442 38.2643 31.0332 37.1406 31.0332V35.1026Z"
        fill="#BDBDBD"
      />
      <path
        d="M13.7383 43.0056V53.414C13.7383 54.2279 15.9693 55.4487 19.3337 55.4487C22.698 55.4487 24.929 54.2279 24.929 53.414V43.0056C23.1983 43.8853 21.2743 44.3159 19.3337 44.258C17.3931 44.3159 15.469 43.8853 13.7383 43.0056Z"
        fill="#BDBDBD"
      />
      <path
        d="M19.3356 42.2276C22.4258 42.2276 24.931 41.3166 24.931 40.1929C24.931 39.0692 22.4258 38.1582 19.3356 38.1582C16.2454 38.1582 13.7402 39.0692 13.7402 40.1929C13.7402 41.3166 16.2454 42.2276 19.3356 42.2276Z"
        fill="#BDBDBD"
      />
      <path
        d="M49.0443 7.63392C49.0443 9.30236 47.2334 10.6656 44.9749 10.6859C44.5951 10.6867 44.2165 10.6458 43.8456 10.5639C43.7915 10.6321 43.7262 10.6906 43.6523 10.7368C43.8151 10.8385 43.9982 10.9504 44.1915 11.0624C44.8121 11.4693 45.5344 11.9678 46.3279 12.5884C46.4093 12.6494 46.4805 12.7104 46.5619 12.7817C51.6283 13.1581 53.2357 15.2741 53.2866 15.3352C53.4784 15.6117 53.7945 15.7754 54.131 15.7726C54.331 15.775 54.5267 15.7145 54.6905 15.5997C55.1547 15.2892 55.2818 14.6626 54.9753 14.1958C54.894 14.0737 53.49 12.0593 49.3901 11.1336C50.4367 10.2693 51.0536 8.991 51.0789 7.63392C50.9397 5.37604 49.3695 3.4614 47.1825 2.88293C47.1808 2.95117 47.174 3.01918 47.1622 3.0864C47.0839 3.70657 46.9684 4.32148 46.8163 4.92779C48.0453 5.28504 48.9296 6.35917 49.0443 7.63392Z"
        fill="#BDBDBD"
      />
    </SvgIcon>
  );
};

export default MoneyBagIcon;
