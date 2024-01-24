import { Tooltip, Typography } from '@material-ui/core';
import { renderShortAddress } from 'helpers';
import React, { useEffect, useRef, useState } from 'react';
import Web3 from 'web3';

interface IProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

const TooltipTypography = ({ text, className, onClick }: IProps) => {
  const ref = useRef<any>();
  const [hoverStatus, setHoverStatus] = useState(false);

  useEffect(() => {
    if (ref.current.scrollWidth > ref.current.clientWidth) {
      setHoverStatus(true);
    }
  }, []);

  return (
    <Tooltip
      title={text}
      interactive
      disableHoverListener={!hoverStatus}
      placement="top"
    >
      <Typography
        ref={ref}
        className={className}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        onClick={onClick}
      >
        {Web3.utils.isAddress(text.toUpperCase())
          ? renderShortAddress(text, 10, 4)
          : text}
      </Typography>
    </Tooltip>
  );
};

export default TooltipTypography;
