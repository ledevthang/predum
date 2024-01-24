import { Box, Button, useMediaQuery, useTheme } from '@material-ui/core';
import clsx from 'clsx';
import TickCircleIcon from 'icon/TickCircleIcon';
import TickIcon from 'icon/TickIcon';
import { useDispatch } from 'react-redux';
import { EProEventMarket } from 'types/hostPrediction';
import { useStyles } from './SelectMarketProEventStyles';
import React from 'react';

interface IProps {
  type: EProEventMarket;
  disabledSelect?: boolean;
  renderMainComponent?: any;
  onChooseMarket: (type: EProEventMarket) => void;
  active: boolean;
}
const PredictionOptionItem = ({
  type,
  disabledSelect,
  renderMainComponent,
  onChooseMarket,
  active,
}: IProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const dispatch = useDispatch();

  return (
    <>
      {renderMainComponent && (
        <Box className={classes.wrapper}>
          <Box className={classes.wrapperOptionItem}>
            {!disabledSelect && (
              <Box
                display="flex"
                justifyContent="space-between"
                width={isMobile ? '100%' : 'fit-content'}
                alignContent="center"
                mb={2}
              >
                <Button
                  className={classes.tickBtn}
                  onClick={() => onChooseMarket(type)}
                >
                  {active ? <TickIcon color="#17C7A7" /> : <TickCircleIcon />}
                </Button>
              </Box>
            )}
            <Box className={classes.mainOption}>
              <Box className={clsx(classes.optionHeader, 'center-root')}>
                {type}
              </Box>
              {renderMainComponent}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PredictionOptionItem;

const x12 = [
  {
    name: 'Liverpool',
    odd: '2.4',
  },
  {
    name: 'X',
    odd: '5.0',
  },
  {
    name: 'Manchester',
    odd: '2.4',
  },
];
