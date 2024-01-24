import React from 'react';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import clsx from 'clsx';
import ArrowRightIcon from 'icon/ArrowRightIcon';
import { useStyles } from './SelectMarketProEventStyles';

const PredictionOptionCorrectScore = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box
        className={clsx(classes.listOption, {
          [classes.listOptionMobile]: isMobile,
        })}
      >
        {correctScore.map((x, i) => (
          <Box
            className={clsx(
              classes.heightOptionDetailCorrectScore,
              classes.optionDetail,
              { [classes.optionDetailCorrectScore3]: i == 2 && isMobile },
              'center-root',
            )}
            key={x.name}
          >
            <Typography>{x.name}</Typography>
            {x.options.map((o, i) => (
              <Box className={classes.wrapperCorrectScore} key={i}>
                <Typography>{o.result}</Typography>
                <Typography>{o.odd}</Typography>
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <Box width="100%">
        <Button className={classes.viewMoreCorrectScore}>
          View More Score Line
          <ArrowRightIcon />
        </Button>
      </Box>
    </>
  );
};

export default PredictionOptionCorrectScore;

const correctScore = [
  {
    name: 'Liverpool to win',
    options: [
      {
        result: '1-0',
        odd: '2.4',
      },
      {
        result: '2-0',
        odd: '5.4',
      },
    ],
  },
  {
    name: 'Draw',
    options: [
      {
        result: '0-0',
        odd: '3.0',
      },
      {
        result: '0-1',
        odd: '2.8',
      },
    ],
  },
  {
    name: 'Manchester to win',
    options: [
      {
        result: '0-1',
        odd: '8.0',
      },
      {
        result: '0-2',
        odd: '10.2',
      },
    ],
  },
];
