import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const DangerWithColor = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 20 20"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M10 12.2917C9.65833 12.2917 9.375 12.0083 9.375 11.6667V7.5C9.375 7.15833 9.65833 6.875 10 6.875C10.3417 6.875 10.625 7.15833 10.625 7.5V11.6667C10.625 12.0083 10.3417 12.2917 10 12.2917Z"
        fill="url(#paint0_linear_1052_5298)"
      />
      <path
        d="M9.99935 15C9.94935 15 9.89102 14.9917 9.83268 14.9833C9.78268 14.975 9.73268 14.9583 9.68268 14.9333C9.63268 14.9167 9.58268 14.8917 9.53268 14.8583C9.49102 14.825 9.44935 14.7917 9.40768 14.7583C9.25768 14.6 9.16602 14.3833 9.16602 14.1667C9.16602 13.95 9.25768 13.7333 9.40768 13.575C9.44935 13.5417 9.49102 13.5083 9.53268 13.475C9.58268 13.4417 9.63268 13.4167 9.68268 13.4C9.73268 13.375 9.78268 13.3583 9.83268 13.35C9.94102 13.325 10.0577 13.325 10.1577 13.35C10.216 13.3583 10.266 13.375 10.316 13.4C10.366 13.4167 10.416 13.4417 10.466 13.475C10.5077 13.5083 10.5493 13.5417 10.591 13.575C10.741 13.7333 10.8327 13.95 10.8327 14.1667C10.8327 14.3833 10.741 14.6 10.591 14.7583C10.5493 14.7917 10.5077 14.825 10.466 14.8583C10.416 14.8917 10.366 14.9167 10.316 14.9333C10.266 14.9583 10.216 14.975 10.1577 14.9833C10.1077 14.9917 10.0493 15 9.99935 15Z"
        fill="url(#paint1_linear_1052_5298)"
      />
      <path
        d="M15.0507 18.4667H4.95071C3.32571 18.4667 2.08405 17.875 1.45071 16.8083C0.825712 15.7417 0.909046 14.3667 1.70071 12.9417L6.75071 3.85833C7.58405 2.35833 8.73405 1.53333 10.0007 1.53333C11.2674 1.53333 12.4174 2.35833 13.2507 3.85833L18.3007 12.95C19.0924 14.375 19.184 15.7417 18.5507 16.8167C17.9174 17.875 16.6757 18.4667 15.0507 18.4667ZM10.0007 2.78333C9.21738 2.78333 8.45071 3.38333 7.84238 4.46666L2.80071 13.5583C2.23405 14.575 2.14238 15.5083 2.53405 16.1833C2.92571 16.8583 3.79238 17.225 4.95905 17.225H15.059C16.2257 17.225 17.084 16.8583 17.484 16.1833C17.884 15.5083 17.784 14.5833 17.2174 13.5583L12.159 4.46666C11.5507 3.38333 10.784 2.78333 10.0007 2.78333Z"
        fill="url(#paint2_linear_1052_5298)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1052_5298"
          x1="9.375"
          y1="9.58333"
          x2="10.625"
          y2="9.58333"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3FADD5" />
          <stop offset="1" stopColor="#3FADD5" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1052_5298"
          x1="9.16602"
          y1="14.1656"
          x2="10.8327"
          y2="14.1656"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3FADD5" />
          <stop offset="1" stopColor="#3FADD5" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_1052_5298"
          x1="1.03711"
          y1="9.99999"
          x2="18.9678"
          y2="9.99999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3FADD5" />
          <stop offset="1" stopColor="#3FADD5" />
        </linearGradient>
      </defs>
    </SvgIcon>
  );
};

export default DangerWithColor;
