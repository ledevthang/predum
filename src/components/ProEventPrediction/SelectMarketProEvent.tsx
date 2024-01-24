import {
  Box,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { convertTime, renderLeagueName, renderMathName } from 'helpers';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  getLeagueById,
  getFixtureById,
  getSelectEventState,
} from 'store/selectors';
import ListPredictOption from './ListPredictOption';
import { useStyles } from './SelectMarketProEventStyles';

const SelectMarketProEvent = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const selectEventState = useSelector(getSelectEventState);
  const selectedLeague = useSelector((store) =>
    getLeagueById(store, Number(selectEventState.leagueSelected || '0')),
  );

  const selectedEvent = useSelector((store) =>
    getFixtureById(store, Number(selectEventState.fixtureId || '0')),
  );

  return (
    <Box className={classes.container}>
      {isMobile && (
        <Box className={classes.competitionNameMobile}>
          <CardMedia
            image={selectedLeague.logo}
            className={classes.competitionLogoMobile}
          />
          <Typography className={classes.competitionName}>
            {selectedLeague.name}
          </Typography>
        </Box>
      )}
      <Box className={classes.header}>
        {!isMobile && (
          <CardMedia
            image={selectedLeague.logo}
            className={classes.competitionLogo}
          />
        )}
        <Box flexGrow={1}>
          {!isMobile && (
            <Typography className={classes.competitionName}>
              {selectedLeague.name}
            </Typography>
          )}
          <Box className={classes.competitionInfo}>
            <Box className={classes.cell1}>
              <Typography className={classes.type}>Round</Typography>
              <Typography className={classes.value}>
                {renderLeagueName(selectedEvent.leagueMeta)}
              </Typography>
            </Box>
            <Box className={classes.cell2}>
              <Typography className={classes.type}>Match</Typography>
              <Typography className={classes.value}>
                {renderMathName(selectedEvent.teamsMeta)}
              </Typography>
            </Box>
            <Box className={classes.cell3}>
              <Typography className={classes.type}>Date</Typography>
              <Typography className={classes.value}>
                {convertTime(selectedEvent.date)}
              </Typography>
            </Box>
            <Box className={classes.cell4}>
              <Typography className={classes.type}>Number of market</Typography>
              <Typography className={classes.value}>3</Typography>
            </Box>
            <Box className={classes.cell5}>
              <Typography className={classes.type}>
                Potential commission
              </Typography>
              <Typography className={classes.value}>5%</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <ListPredictOption />
    </Box>
  );
};

export default SelectMarketProEvent;
