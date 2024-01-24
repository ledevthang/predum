import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const CalendarIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 20 20"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M6.66669 4.79167C6.32502 4.79167 6.04169 4.50834 6.04169 4.16667V1.66667C6.04169 1.32501 6.32502 1.04167 6.66669 1.04167C7.00835 1.04167 7.29169 1.32501 7.29169 1.66667V4.16667C7.29169 4.50834 7.00835 4.79167 6.66669 4.79167Z"
        fill="white"
      />
      <path
        d="M13.3333 4.79167C12.9916 4.79167 12.7083 4.50834 12.7083 4.16667V1.66667C12.7083 1.32501 12.9916 1.04167 13.3333 1.04167C13.675 1.04167 13.9583 1.32501 13.9583 1.66667V4.16667C13.9583 4.50834 13.675 4.79167 13.3333 4.79167Z"
        fill="white"
      />
      <path
        d="M7.08333 12.0833C6.975 12.0833 6.86667 12.0584 6.76667 12.0167C6.65833 11.975 6.575 11.9167 6.49167 11.8417C6.34167 11.6833 6.25 11.475 6.25 11.25C6.25 11.1417 6.275 11.0333 6.31667 10.9333C6.35833 10.8333 6.41667 10.7417 6.49167 10.6583C6.575 10.5833 6.65833 10.525 6.76667 10.4833C7.06667 10.3583 7.44167 10.425 7.675 10.6583C7.825 10.8167 7.91667 11.0333 7.91667 11.25C7.91667 11.3 7.90833 11.3583 7.9 11.4167C7.89167 11.4667 7.875 11.5167 7.85 11.5667C7.83333 11.6167 7.80834 11.6667 7.775 11.7167C7.75 11.7583 7.70833 11.8 7.675 11.8417C7.51667 11.9917 7.3 12.0833 7.08333 12.0833Z"
        fill="white"
      />
      <path
        d="M10 12.0833C9.89169 12.0833 9.78335 12.0583 9.68335 12.0167C9.57502 11.975 9.49169 11.9167 9.40835 11.8417C9.25835 11.6833 9.16669 11.475 9.16669 11.25C9.16669 11.1417 9.19169 11.0333 9.23336 10.9333C9.27502 10.8333 9.33335 10.7417 9.40835 10.6583C9.49169 10.5833 9.57502 10.525 9.68335 10.4833C9.98335 10.35 10.3584 10.425 10.5917 10.6583C10.7417 10.8167 10.8334 11.0333 10.8334 11.25C10.8334 11.3 10.825 11.3583 10.8167 11.4167C10.8084 11.4667 10.7917 11.5167 10.7667 11.5667C10.75 11.6167 10.725 11.6667 10.6917 11.7167C10.6667 11.7583 10.625 11.8 10.5917 11.8417C10.4334 11.9917 10.2167 12.0833 10 12.0833Z"
        fill="white"
      />
      <path
        d="M12.9166 12.0833C12.8083 12.0833 12.7 12.0583 12.6 12.0167C12.4916 11.975 12.4083 11.9167 12.325 11.8417C12.2916 11.8 12.2583 11.7583 12.225 11.7167C12.1916 11.6667 12.1666 11.6167 12.15 11.5667C12.125 11.5167 12.1083 11.4667 12.1 11.4167C12.0916 11.3583 12.0833 11.3 12.0833 11.25C12.0833 11.0333 12.175 10.8167 12.325 10.6583C12.4083 10.5833 12.4916 10.525 12.6 10.4833C12.9083 10.35 13.275 10.425 13.5083 10.6583C13.6583 10.8167 13.75 11.0333 13.75 11.25C13.75 11.3 13.7416 11.3583 13.7333 11.4167C13.725 11.4667 13.7083 11.5167 13.6833 11.5667C13.6666 11.6167 13.6416 11.6667 13.6083 11.7167C13.5833 11.7583 13.5416 11.8 13.5083 11.8417C13.35 11.9917 13.1333 12.0833 12.9166 12.0833Z"
        fill="white"
      />
      <path
        d="M7.08333 15C6.975 15 6.86667 14.975 6.76667 14.9334C6.66667 14.8917 6.575 14.8333 6.49167 14.7583C6.34167 14.6 6.25 14.3833 6.25 14.1667C6.25 14.0583 6.275 13.95 6.31667 13.85C6.35833 13.7417 6.41667 13.65 6.49167 13.575C6.8 13.2667 7.36667 13.2667 7.675 13.575C7.825 13.7333 7.91667 13.95 7.91667 14.1667C7.91667 14.3833 7.825 14.6 7.675 14.7583C7.51667 14.9083 7.3 15 7.08333 15Z"
        fill="white"
      />
      <path
        d="M10 15C9.78335 15 9.56669 14.9083 9.40835 14.7583C9.25835 14.6 9.16669 14.3833 9.16669 14.1667C9.16669 14.0583 9.19169 13.95 9.23336 13.85C9.27502 13.7417 9.33335 13.65 9.40835 13.575C9.71669 13.2667 10.2834 13.2667 10.5917 13.575C10.6667 13.65 10.725 13.7417 10.7667 13.85C10.8084 13.95 10.8334 14.0583 10.8334 14.1667C10.8334 14.3833 10.7417 14.6 10.5917 14.7583C10.4334 14.9083 10.2167 15 10 15Z"
        fill="white"
      />
      <path
        d="M12.9166 15C12.7 15 12.4833 14.9084 12.325 14.7584C12.25 14.6834 12.1916 14.5917 12.15 14.4834C12.1083 14.3834 12.0833 14.275 12.0833 14.1667C12.0833 14.0584 12.1083 13.95 12.15 13.85C12.1916 13.7417 12.25 13.65 12.325 13.575C12.5166 13.3834 12.8083 13.2917 13.075 13.35C13.1333 13.3584 13.1833 13.375 13.2333 13.4C13.2833 13.4167 13.3333 13.4417 13.3833 13.475C13.425 13.5 13.4666 13.5417 13.5083 13.575C13.6583 13.7334 13.75 13.95 13.75 14.1667C13.75 14.3834 13.6583 14.6 13.5083 14.7584C13.35 14.9084 13.1333 15 12.9166 15Z"
        fill="white"
      />
      <path
        d="M17.0834 8.19997H2.91669C2.57502 8.19997 2.29169 7.91663 2.29169 7.57497C2.29169 7.2333 2.57502 6.94997 2.91669 6.94997H17.0834C17.425 6.94997 17.7084 7.2333 17.7084 7.57497C17.7084 7.91663 17.425 8.19997 17.0834 8.19997Z"
        fill="white"
      />
      <path
        d="M13.3333 18.9583H6.66667C3.625 18.9583 1.875 17.2083 1.875 14.1667V7.08334C1.875 4.04167 3.625 2.29167 6.66667 2.29167H13.3333C16.375 2.29167 18.125 4.04167 18.125 7.08334V14.1667C18.125 17.2083 16.375 18.9583 13.3333 18.9583ZM6.66667 3.54167C4.28333 3.54167 3.125 4.70001 3.125 7.08334V14.1667C3.125 16.55 4.28333 17.7083 6.66667 17.7083H13.3333C15.7167 17.7083 16.875 16.55 16.875 14.1667V7.08334C16.875 4.70001 15.7167 3.54167 13.3333 3.54167H6.66667Z"
        fill="white"
      />
    </SvgIcon>
  );
};

export default CalendarIcon;