import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
import { IIconProperty } from 'types/iconProps';

const TennisBallIcon = ({ width, height, color }: IIconProperty) => {
  return (
    <SvgIcon
      width={width}
      height={height}
      viewBox="0 0 20 20"
      style={{ transform: 'scale(1)', width, height }}
    >
      <path
        d="M9.06164 0.0385742C6.82433 0.247208 4.64027 1.21025 2.92381 2.92573C1.20734 4.64073 0.245281 6.82479 0.0371361 9.06503C2.49383 9.34989 5.10591 10.6056 7.25039 12.7501C9.39585 14.895 10.653 17.5091 10.9354 19.9638C13.1791 19.7557 15.3578 18.7931 17.0757 17.0786C18.7917 15.3641 19.7528 13.1791 19.9599 10.9393C17.5091 10.6549 14.8926 9.39924 12.7482 7.25427C10.6051 5.10979 9.34796 2.49527 9.06164 0.0385742Z"
        fill={color}
      />
      <path
        d="M20 9.69878C19.9272 7.23866 18.9539 4.80151 17.0786 2.9238C15.2024 1.0461 12.7623 0.0762221 10.3022 0C10.5787 2.14839 11.7196 4.45704 13.632 6.36992C15.5444 8.2828 17.8501 9.42174 20 9.69878Z"
        fill={color}
      />
      <path
        d="M0.000488281 10.3047C0.0728016 12.7638 1.04659 15.2015 2.9238 17.0782C4.79955 18.9539 7.2367 19.9287 9.69633 20C9.41978 17.8546 8.28036 15.5474 6.36699 13.6345C4.45557 11.7226 2.14741 10.5832 0.000488281 10.3047Z"
        fill={color}
      />
    </SvgIcon>
  );
};

export default TennisBallIcon;
