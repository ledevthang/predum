import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import TooltipTypography from 'components/common/TooltipTypography';
import DollarIcon from 'icon/DollarCircleIcon';
import React, { useMemo } from 'react';
import { useStyles } from './EventItemStyles';
import OptionItemWithOnlyText from './OptionItemWithOnlyText';

interface IProps {
  isImageOption: boolean;
  image?: string;
  name: string;
  odd?: string;
  isDisable?: boolean;
  onClick?: () => void;
  className?: string;
  percentage?: number;
  disabledPercentage?: boolean;
}

const OptionItem = ({
  image,
  name,
  odd,
  onClick,
  className,
  percentage,
  disabledPercentage,
  isDisable,
  isImageOption,
}: IProps) => {
  const classes = useStyles();

  const styleImage = useMemo(() => {
    let style: any = image
      ? {
          backgroundImage: `url("${image}")`,
          backgroundSize: 'cover',
          justifyContent: 'end',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundColor: '#111111',
          alignItems: 'start',
        }
      : {
          backgroundColor: '#111111',
          alignItems: 'start',
          justifyContent: 'end',
        };
    if (image && isDisable) style.backgroundBlendMode = 'luminosity';
    return style;
  }, [image, isDisable]);

  return (
    <>
      {!isImageOption ? (
        <OptionItemWithOnlyText
          name={name}
          odd={odd}
          percentage={percentage}
          className={className}
          disabledPercentage={disabledPercentage}
          onClick={onClick}
        />
      ) : (
        <Box
          className={clsx(classes.choiceV2, className)}
          style={{
            ...styleImage,
          }}
          onClick={onClick}
        >
          <Box className={classes.wrapperOddAndPercentage}>
            {odd && <Box className={classes.optionOddV2}>{odd}</Box>}
            {!disabledPercentage && (
              <Box className={classes.optionPercentage}>
                <DollarIcon />
                <Typography>{percentage || 0}%</Typography>
              </Box>
            )}
          </Box>
          <Box className={classes.wrapperOptionName}>
            <TooltipTypography text={name} className={classes.tooltip} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default OptionItem;
